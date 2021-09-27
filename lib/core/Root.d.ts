import type { PointerStyleHandler } from './PointerStyleHandler';
import type { TextInputHandler } from './TextInputHandler';
import type { Widget } from '../widgets/Widget';
import type { Event } from '../events/Event';
import { FocusType } from './FocusType';
import type { Driver } from './Driver';
import { Theme } from '../theme/Theme';
import { Viewport } from './Viewport';
/**
 * A Root is the parent of all widgets, but not a widget itself. It contains a
 * single child and manages dimensions and input handling
 *
 * @category Core
 */
export declare class Root {
    /** The Root's child; the parent Widget of all widgets in this Root */
    readonly child: Widget;
    /** The internal viewport. Manages drawing */
    protected viewport: Viewport;
    /** The list of drivers registered to this root */
    protected drivers: Set<Driver>;
    /**
     * Is the Root enabled? For internal use only.
     *
     * See {@link enabled}
     */
    protected _enabled: boolean;
    /**
     * The pointer style this root wants. Will be set on
     * {@link postLayoutUpdate} by {@link pointerStyleHandler}
     */
    pointerStyle: string;
    /**
     * The actual current pointer style.
     *
     * For internal use only.
     *
     * See {@link pointerStyle}
     */
    protected _currentPointerStyle: string;
    /**
     * Pointer style handler, decides how to show the given pointer style.
     * Normally a function which sets the CSS cursor style of the Root's canvas
     */
    pointerStyleHandler: PointerStyleHandler | null;
    /**
     * Current component foci (event targets for each focus type).
     *
     * For internal use only.
     *
     * See {@link requestFocus}, {@link dropFocus}, {@link clearFocus} and
     * {@link getFocus}
     */
    protected _foci: Map<FocusType, Widget | null>;
    /**
     * Last capturer of each component focus (event targets for each focus
     * type).
     *
     * For internal use only.
     *
     * See {@link getFocusCapturer}
     */
    protected _fociCapturers: Map<FocusType, Widget | null>;
    /**
     * Handler for mobile-friendly text input. If not null, widgets that need
     * text may call this to get a string.
     *
     * See {@link hasMobileTextInput}, {@link usingMobileTextInput} and
     * {@link getTextInput}
     */
    textInputHandler: TextInputHandler | null;
    /**
     * Is the mobile-friendly text input in use?
     *
     * For internal use only.
     *
     * See {@link hasMobileTextInput}, {@link usingMobileTextInput} and
     * {@link getTextInput}
     */
    protected _mobileTextInUse: boolean;
    /** See {@link resolution} */
    private _resolution;
    /**
     * Creates a new Root.
     *
     * Sets {@link child}, {@link pointerStyleHandler} and {@link child}'s
     * {@link Widget.inheritedTheme | inherited theme}.
     *
     * @param theme If none supplied, then the default theme found in {@link Theme.constructor} is used
     */
    constructor(child: Widget, pointerStyleHandler?: PointerStyleHandler | null, theme?: Theme);
    /** The {@link viewport}'s {@link Viewport.constraints | constraints} */
    get constraints(): [number, number, number, number];
    set constraints(constraints: [number, number, number, number]);
    /**
     * The {@link viewport}'s
     * {@link Viewport.canvasDimensions | canvasDimensions}
     */
    get canvasDimensions(): [number, number];
    /**
     * The {@link child}'s {@link Widget.dimensions | dimensions}
     */
    get dimensions(): [number, number];
    /**
     * Is this root enabled? If not enabled, painting, updating or resolving
     * layout will do nothing. {@link drivers | Drivers} will also be notified
     * by calling {@link Driver.onEnable} or {@link Driver.onDisable}, pointer
     * style will be reset ({@link updatePointerStyle} called with 'default')
     * and all {@link _foci | foci} will be cleared ({@link clearFocus}).
     *
     * See {@link _enabled}
     */
    get enabled(): boolean;
    set enabled(newEnabled: boolean);
    /**
     * The {@link viewport}'s {@link Viewport.canvas | canvas}
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Resolve the layout of this root. Does nothing if root is disabled.
     *
     * Calls {@link viewport}'s {@link resolveChildsLayout} with {@link child}
     *
     * Call this before calling {@link postLayoutUpdate} and after calling
     * {@link preLayoutUpdate}
     *
     * @returns Returns true if viewport was resized
     */
    resolveLayout(): boolean;
    /**
     * Paint this root's next frame if needed. Does nothing if root is disabled.
     *
     * Calls {@link viewport}'s {@link Viewport.paintToCanvas} with
     * {@link child}.
     *
     * Call this after calling {@link postLayoutUpdate}.
     *
     * @returns Returns whether the child was dirty or not. Use this to tell an external 3D library whether to update a mesh's texture or not.
     */
    paint(): boolean;
    /**
     * Dispatches an {@link Event} to this root's {@link child} by calling
     * {@link Widget.dispatchEvent}. Updates
     * {@link _fociCapturers | foci capturers} and notifies {@link drivers} by
     * calling {@link Driver.onFocusCapturerChanged} if the capturer changes.
     * Does nothing if root is disabled.
     *
     * Note that if an event with a focus is dispatched and no widget captures
     * the event due to the widget not existing anymore or being disabled, the
     * focus type of the event will be cleared in the root with
     * {@link clearFocus}.
     *
     * @returns Returns true if the event was captured
     */
    dispatchEvent(event: Event): boolean;
    /**
     * Do a pre-layout update; calls {@link drivers}' {@link Driver.update} and
     * {@link child}'s {@link Widget.preLayoutUpdate}. Does nothing if root is
     * disabled.
     *
     * Call this before calling {@link resolveLayout}
     */
    preLayoutUpdate(): void;
    /**
     * Do a post-layout update; calls {@link child}'s
     * {@link Widget.postLayoutUpdate} and {@link updatePointerStyle}. Does
     * nothing if root is disabled.
     *
     * Call this before calling {@link paint} and after calling
     * {@link resolveLayout}
     */
    postLayoutUpdate(): void;
    /**
     * Calls {@link pointerStyleHandler} if the {@link pointerStyle} has changed
     * (checked by comparing with {@link _currentPointerStyle}). Also updates
     * {@link _currentPointerStyle}. Can also be optionally supplied a new
     * pointer style.
     */
    updatePointerStyle(newStyle?: string | null): void;
    /**
     * Sets the current {@link _foci | focus} of a given type to a given widget.
     * If the focus changes, {@link clearFocus} is called and {@link drivers}
     * are notified by calling {@link Driver.onFocusChanged}.
     */
    requestFocus(focusType: FocusType, widget: Widget): void;
    /**
     * Clears the current {@link _foci | focus} of a given type if it is
     * currently set to a given widget. Achieved by calling {@link clearFocus}.
     */
    dropFocus(focusType: FocusType, widget: Widget): void;
    /**
     * Clears the current {@link _foci | focus} of a given type. If there was a
     * focus set, {@link drivers} are notified by calling
     * {@link Driver.onFocusChanged}.
     */
    clearFocus(focusType: FocusType): void;
    /**
     * Gets the current {@link _foci | focus} of a given type.
     */
    getFocus(focusType: FocusType): Widget | null;
    /**
     * Gets the last {@link _fociCapturers | focus capturer} of a given type.
     */
    getFocusCapturer(focusType: FocusType): Widget | null;
    /**
     * Registers a {@link Driver} to the root, adding it to the {@link drivers}
     * list and calling {@link Driver.onEnable}. If the driver was already
     * registered, nothing happens.
     */
    registerDriver(driver: Driver): void;
    /**
     * Unregisters a {@link Driver} from the root, removing it from the
     * {@link drivers} list and calling {@link Driver.onDisable}. If the driver
     * was not registered, nothing happens.
     */
    unregisterDriver(driver: Driver): void;
    /**
     * Unregisters all {@link drivers} from the root, by calling
     * {@link unregisterDriver}.
     */
    clearDrivers(): void;
    /**
     * Can {@link getTextInput} be called? True if {@link textInputHandler} is
     * not null and {@link usingMobileTextInput} is false.
     */
    get hasMobileTextInput(): boolean;
    /**
     * Is {@link getTextInput} in use?
     *
     * See {@link _mobileTextInUse}.
     */
    get usingMobileTextInput(): boolean;
    /**
     * Get text input from the user. Used for mobile where keyboard events are
     * hard to get.
     *
     * @returns If this is already in use ({@link usingMobileTextInput}), returns null, else, returns a string typed by the user.
     */
    getTextInput(initialInput?: string): Promise<string | null>;
    /**
     * The resolution of this Root; theme properties that are absolute sizes in
     * pixels will automatically be multiplied by this value. Keep this value in
     * mind when implementing your own properties that have absolute sizes.
     */
    get resolution(): number;
    set resolution(resolution: number);
}
