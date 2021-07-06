import type { PointerStyleHandler } from './PointerStyleHandler';
import type { TextInputHandler } from './TextInputHandler';
import { defaultTheme } from '../theme/defaultTheme';
import type { Widget } from '../widgets/Widget';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import { FocusType } from './FocusType';
import { Leave } from '../events/Leave';
import type { Driver } from './Driver';
import { Viewport } from './Viewport';

export class Root {
    /** The Root's child; the parent Widget of all widgets in this Root */
    readonly child: Widget;
    /** The internal viewport. Manages drawing */
    protected viewport: Viewport;
    /** The list of drivers */
    protected drivers: Set<Driver> = new Set();
    /**
     * Is the Root enabled? For internal use only.
     *
     * See {@link enabled}
     */
    protected _enabled = true;
    /**
     * The pointer style this root wants. Will be set on {@link postLayoutUpdate} by {@link pointerStyleHandler} */
    pointerStyle = 'default';
    /**
     * The actual current pointer style.
     *
     * For internal use only.
     *
     * See {@link pointerStyle}
     */
    protected _currentPointerStyle = 'default';
    /** Pointer style handler, decides how to show the given pointer style. Normally a function which sets the CSS cursor style of the Root's canvas */
    pointerStyleHandler: PointerStyleHandler | null;
    /**
     * Current component foci (event targets for each focus type).
     *
     * For internal use only.
     *
     * See {@link requestFocus}, {@link dropFocus}, {@link clearFocus} and {@link getFocus}
     */
    protected _foci: Map<FocusType, Widget | null> = new Map([
        [FocusType.Keyboard, null],
        [FocusType.Pointer, null],
    ]);
    /**
     * Last capturer of each component focus (event targets for each focus type).
     *
     * For internal use only.
     *
     * See {@link getFocusCapturer}
     */
    protected _fociCapturers: Map<FocusType, Widget | null> = new Map([
        [FocusType.Keyboard, null],
        [FocusType.Pointer, null],
    ]);
    /**
     * Handler for mobile-friendly text input. If not null, widgets that need text may call this to get a string.
     *
     * See {@link hasMobileTextInput}, {@link usingMobileTextInput} and {@link getTextInput}
     */
    textInputHandler: TextInputHandler | null = null;
    /**
     * Is the mobile-friendly text input in use?
     *
     * For internal use only.
     *
     * See {@link hasMobileTextInput}, {@link usingMobileTextInput} and {@link getTextInput}
     */
    protected _mobileTextInUse = false;

    // A Root is the parent of all widgets, but not a widget itself. It contains
    // a single child and manages dimensions and input handling
    constructor(child: Widget, pointerStyleHandler: PointerStyleHandler | null = null, theme: Theme = defaultTheme) {
        this.viewport = new Viewport();
        this.child = child;
        this.pointerStyleHandler = pointerStyleHandler;
        this.child.inheritedTheme = theme;
    }

    get maxDimensions(): [number, number] {
        return this.viewport.maxDimensions;
    }

    set maxDimensions(maxDimensions: [number, number]) {
        this.viewport.maxDimensions = maxDimensions;
    }

    get canvasDimensions(): [number, number] {
        return this.viewport.canvasDimensions;
    }

    get dimensions(): [number, number] {
        return this.child.dimensions;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    set enabled(newEnabled: boolean) {
        const oldEnabled = this._enabled;

        if(oldEnabled !== newEnabled) {
            this._enabled = newEnabled;

            // Call driver hooks, reset pointer style and release foci if UI
            // disabled
            if(newEnabled) {
                for(const driver of this.drivers)
                    driver.onEnable(this);
            }
            else {
                for(const driver of this.drivers)
                    driver.onDisable(this);

                this.updatePointerStyle('default');

                for(const focus of this._foci.keys())
                    this.clearFocus(focus);
            }
        }
    }

    get canvas(): HTMLCanvasElement {
        return this.viewport.canvas;
    }

    resolveLayout(): boolean {
        // Don't do anything if Root is disabled
        if(!this.enabled)
            return false;

        const layoutCtx = this.viewport.populateChildsLayout(this.child);
        return this.viewport.resolveChildsLayout(this.child, layoutCtx);
    }

    paint(): boolean {
        // Don't do anything if Root is disabled
        if(!this.enabled)
            return false;

        return this.viewport.paintToCanvas(this.child);
    }

    dispatchEvent(event: Event): void {
        // Ignore event if Root is disabled
        if(!this.enabled)
            return;

        // If event is focusable and is missing a target...
        if(event.focusType !== null && event.target === null) {
            // Ignore event if it needs a focus but there is no component
            // focused in the needed focus
            let focus = this._foci.get(event.focusType);
            if(typeof focus === 'undefined')
                focus = null;

            if(event.needsFocus && focus === null) {
                //console.warn('Dropped event due to lack of target', event);
                return;
            }

            // Set event target
            event = event.cloneWithTarget(focus);
        }

        // Clear pointer style. This will be set by children if neccessary
        this.pointerStyle = 'default';

        // Pass event down to internal Container
        const [width, height] = this.dimensions;
        const captured = this.child.dispatchEvent(event, width, height, this);
        if(captured === null) {
            // If the event wasn't captured but it had a focus, clear the focus
            // NOTE: This is for preventing a component that is no longer
            // present in the UI from capturing events
            if(event.focusType !== null) {
                //console.warn('Focus cleared due to uncaptured focused event', event);
                this.clearFocus(event.focusType);
            }
        }
        /*else
            console.info('Event captured by widget:', captured.constructor.name);*/

        // Update focus capturer if it changed
        if(event.focusType === null)
            return;

        const oldCapturer = this._fociCapturers.get(event.focusType) ?? null;
        if(oldCapturer === captured)
            return;

        // Special case: when the pointer focus capturer changes, dispatch a
        // leave event to the last capturer
        if(event.focusType === FocusType.Pointer && oldCapturer !== null)
            this.child.dispatchEvent(new Leave(oldCapturer), width, height, this);

        this._fociCapturers.set(event.focusType, captured);
        for(const driver of this.drivers)
            driver.onFocusCapturerChanged(this, event.focusType, oldCapturer, captured);
    }

    preLayoutUpdate(): void {
        // Skip if UI is disabled
        if(!this.enabled)
            return;

        // Update drivers
        for(const driver of this.drivers)
            driver.update(this);

        // Pre-layout update child
        this.child.preLayoutUpdate(this);
    }

    postLayoutUpdate(): void {
        // Skip if UI is disabled
        if(!this.enabled)
            return;

        // Post-layout update child
        this.child.postLayoutUpdate(this);

        // Update pointer style
        this.updatePointerStyle();
    }

    updatePointerStyle(newStyle: string | null = null): void {
        if(newStyle !== null)
            this.pointerStyle = newStyle;

        if(this.pointerStyle !== this._currentPointerStyle) {
            this._currentPointerStyle = this.pointerStyle;
            if(this.pointerStyleHandler !== null)
                this.pointerStyleHandler(this._currentPointerStyle);
        }
    }

    requestFocus(focusType: FocusType, widget: Widget): void {
        if(widget !== null) {
            // Replace focus if current focus is not the desired one
            const currentFocus = this._foci.get(focusType);
            if(widget !== currentFocus) {
                this.clearFocus(focusType);
                //console.log('Set focus type', focusType, 'to widget', widget);
                this._foci.set(focusType, widget);
                for(const driver of this.drivers)
                    driver.onFocusChanged(this, focusType, widget);
            }
        }
    }

    dropFocus(focusType: FocusType, widget: Widget): void {
        // NOTE: Use this instead of clearFocus if your intent is to make sure a
        // SPECIFIC COMPONENT is no longer focused, NOT ANY COMPONENT
        const currentFocus = this._foci.get(focusType);
        if(widget === currentFocus)
            this.clearFocus(focusType);
    }

    clearFocus(focusType: FocusType): void {
        const currentFocus = this._foci.get(focusType);
        if(currentFocus !== null && typeof currentFocus !== 'undefined') {
            //console.log('Dropped focus type', focusType, 'from widget', currentFocus);
            currentFocus.onFocusDropped(focusType, this);

            this._foci.set(focusType, null);
            for(const driver of this.drivers)
                driver.onFocusChanged(this, focusType, null);
        }
    }

    getFocus(focusType: FocusType): Widget | null {
        return this._foci.get(focusType) ?? null;
    }

    getFocusCapturer(focusType: FocusType): Widget | null {
        return this._fociCapturers.get(focusType) ?? null;
    }

    registerDriver(driver: Driver): void {
        // If driver is not registered, register it
        if(this.drivers.has(driver))
            return;

        this.drivers.add(driver);
        if(this._enabled && driver.onEnable)
            driver.onEnable(this);
    }

    unregisterDriver(driver: Driver): void {
        // If driver is registered, unregister it
        if(!this.drivers.delete(driver))
            return;

        if(this._enabled && driver.onDisable)
            driver.onDisable(this);
    }

    clearDrivers(): void {
        // Unregister all drivers
        if(this._enabled) {
            for(const driver of this.drivers)
                this.unregisterDriver(driver);
        }
    }

    get hasMobileTextInput(): boolean {
        return this.textInputHandler !== null && !this._mobileTextInUse;
    }

    get usingMobileTextInput(): boolean {
        return this._mobileTextInUse;
    }

    async getTextInput(initialInput = ''): Promise<string | null> {
        // Only get if text input is currently available
        // XXX even though this if statement is equivalent to
        // hasMobileTextInput, typescript type inference is bad and only works
        // if its done this way, else it thinks that textInputHandler may be
        // null and throws an error when compiling
        if(this.textInputHandler !== null && !this._mobileTextInUse) {
            // Flag text input as in-use
            this._mobileTextInUse = true;

            // Get input from handler
            const newInput = await this.textInputHandler(initialInput);

            // Flag text input as not in-use
            this._mobileTextInUse = false;

            // Return new value
            return newInput;
        }

        return null;
    }
}
