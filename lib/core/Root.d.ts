import type { PointerStyleHandler } from './PointerStyleHandler';
import type { LayoutConstraints } from './LayoutConstraints';
import type { TextInputHandler } from './TextInputHandler';
import { CanvasViewport } from './CanvasViewport';
import type { Widget } from '../widgets/Widget';
import type { Event } from '../events/Event';
import { FocusType } from './FocusType';
import type { Driver } from './Driver';
import { Theme } from '../theme/Theme';
/**
 * Optional Root constructor properties.
 *
 * @category Core
 */
export interface RootProperties {
    /** Sets {@link Root#pointerStyleHandler}. */
    pointerStyleHandler?: PointerStyleHandler | null;
    /** Sets {@link Root#child}'s {@link Widget#inheritedTheme}. */
    theme?: Theme;
    /** Sets {@link Root#resolution}. */
    resolution?: number;
    /** Sets {@link Root#preventBleeding}. */
    preventBleeding?: boolean;
    /** The starting width of the {@link Root#viewport}'s canvas. */
    canvasStartingWidth?: number;
    /** The starting height of the {@link Root#viewport}'s canvas. */
    canvasStartingHeight?: number;
}
/**
 * A Root is the parent of all widgets, but not a widget itself. It contains a
 * single child and manages dimensions and input handling
 *
 * @category Core
 */
export declare class Root {
    /** The internal viewport. Manages drawing */
    protected viewport: CanvasViewport;
    /** The list of drivers registered to this root */
    protected drivers: Set<Driver>;
    /**
     * Is the Root enabled? For internal use only.
     *
     * See {@link Root#enabled}
     */
    protected _enabled: boolean;
    /**
     * The pointer style this root wants. Will be set on
     * {@link Root#postLayoutUpdate} by {@link Root#pointerStyleHandler}
     */
    pointerStyle: string;
    /**
     * The actual current pointer style.
     *
     * For internal use only.
     *
     * See {@link Root#pointerStyle}
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
     * See {@link Root#requestFocus}, {@link Root#dropFocus},
     * {@link Root#clearFocus} and {@link Root#getFocus}
     */
    protected _foci: Map<FocusType, Widget | null>;
    /**
     * Last capturer of each component focus (event targets for each focus
     * type).
     *
     * For internal use only.
     *
     * See {@link Root#getFocusCapturer}
     */
    protected _fociCapturers: Map<FocusType, Widget | null>;
    /**
     * Handler for mobile-friendly text input. If not null, widgets that need
     * text may call this to get a string.
     *
     * See {@link Root#hasMobileTextInput}, {@link Root#usingMobileTextInput}
     * and {@link Root#getTextInput}
     */
    textInputHandler: TextInputHandler | null;
    /**
     * Is the mobile-friendly text input in use?
     *
     * For internal use only.
     *
     * See {@link Root#hasMobileTextInput}, {@link Root#usingMobileTextInput}
     * and {@link Root#getTextInput}
     */
    protected _mobileTextInUse: boolean;
    /** Has the warning for poorly captured TabSelect events been issued? */
    private static badTabCaptureWarned;
    /**
     * Creates a new Root.
     *
     * Sets {@link Root#child}, {@link Root#pointerStyleHandler} and
     * {@link Root#child}'s {@link Widget#inheritedTheme | inherited theme}.
     */
    constructor(child: Widget, properties?: Readonly<RootProperties>);
    /** The {@link Root#viewport}'s {@link Viewport#constraints | constraints} */
    get constraints(): LayoutConstraints;
    set constraints(constraints: LayoutConstraints);
    /**
     * The {@link Root#viewport}'s
     * {@link CanvasViewport#canvasDimensions | canvasDimensions}
     */
    get canvasDimensions(): [number, number];
    /**
     * The {@link Root#child}'s {@link Widget#dimensions | dimensions}
     */
    get dimensions(): [number, number];
    /**
     * Is this root enabled? If not enabled, painting, updating or resolving
     * layout will do nothing. {@link Root#drivers | Drivers} will also be
     * notified by calling {@link Driver#onEnable} or {@link Driver#onDisable},
     * pointer style will be reset ({@link Root#updatePointerStyle} called with
     * 'default') and all {@link Root#_foci | foci} will be cleared
     * ({@link Root#clearFocus}).
     *
     * See {@link Root#_enabled}
     */
    get enabled(): boolean;
    set enabled(newEnabled: boolean);
    /**
     * The {@link Root#viewport}'s {@link CanvasViewport#canvas | canvas}
     */
    get canvas(): HTMLCanvasElement;
    /**
     * Resolve the layout of this root. Does nothing if root is disabled.
     *
     * Calls {@link Root#viewport}'s {@link Viewport#resolveLayout} with
     * {@link Root#child}
     *
     * Call this before calling {@link Root#postLayoutUpdate} and after calling
     * {@link Root#preLayoutUpdate}
     *
     * @returns Returns true if the viewport was resized or re-scaled
     */
    resolveLayout(): boolean;
    /**
     * Paint this root's next frame if needed. Does nothing if root is disabled.
     *
     * Calls {@link Root#viewport}'s {@link Viewport#paint} with
     * {@link Root#child}.
     *
     * Call this after calling {@link Root#postLayoutUpdate}.
     *
     * @returns Returns whether the child was dirty or not. Use this to tell an external 3D library whether to update a mesh's texture or not.
     */
    paint(): boolean;
    /**
     * Dispatches an {@link Event} to this root's {@link Root#child} by calling
     * {@link Widget#dispatchEvent}. Updates
     * {@link Root#_fociCapturers | foci capturers} and notifies
     * {@link Root#drivers} by calling {@link Driver#onFocusCapturerChanged} if
     * the capturer changes. Does nothing if root is disabled.
     *
     * Note that if an event with a focus is dispatched and no widget captures
     * the event due to the widget not existing anymore or being disabled, the
     * focus type of the event will be cleared in the root with
     * {@link Root#clearFocus}.
     *
     * @returns Returns true if the event was captured
     */
    dispatchEvent(event: Event): boolean;
    /**
     * Do a pre-layout update; calls {@link Root#drivers}' {@link Driver#update}
     * and {@link Root#child}'s {@link Widget#preLayoutUpdate}. Does nothing if
     * root is disabled.
     *
     * Call this before calling {@link Root#resolveLayout}
     */
    preLayoutUpdate(): void;
    /**
     * Do a post-layout update; calls {@link Root#child}'s
     * {@link Widget#postLayoutUpdate} and {@link Root#updatePointerStyle}. Does
     * nothing if root is disabled.
     *
     * Call this before calling {@link Root#paint} and after calling
     * {@link Root#resolveLayout}
     */
    postLayoutUpdate(): void;
    /**
     * Calls {@link Root#pointerStyleHandler} if the {@link Root#pointerStyle}
     * has changed (checked by comparing with
     * {@link Root#_currentPointerStyle}). Also updates
     * {@link Root#_currentPointerStyle}. Can also be optionally supplied a new
     * pointer style.
     */
    updatePointerStyle(newStyle?: string | null): void;
    /**
     * Sets the current {@link Root#_foci | focus} of a given type to a given
     * widget. If the focus changes, {@link Root#clearFocus} is called and
     * {@link Root#drivers} are notified by calling
     * {@link Driver#onFocusChanged}.
     */
    requestFocus(focusType: FocusType, widget: Widget): void;
    /**
     * Clears the current {@link Root#_foci | focus} of a given type if it is
     * currently set to a given widget. Achieved by calling
     * {@link Root#clearFocus}.
     */
    dropFocus(focusType: FocusType, widget: Widget): void;
    /**
     * Clears all the {@link Root#_foci | foci} that are set to a given Widget.
     * Achieved by calling {@link Root#dropFocus}
     */
    dropFoci(widget: Widget): void;
    /**
     * Clears the current {@link Root#_foci | focus} of a given type. If there
     * was a focus set, {@link Root#drivers} are notified by calling
     * {@link Driver#onFocusChanged}.
     */
    clearFocus(focusType: FocusType): void;
    /**
     * Gets the current {@link Root#_foci | focus} of a given type.
     */
    getFocus(focusType: FocusType): Widget | null;
    /**
     * Gets the last {@link Root#_fociCapturers | focus capturer} of a given
     * type.
     */
    getFocusCapturer(focusType: FocusType): Widget | null;
    /**
     * Registers a {@link Driver} to the root, adding it to the
     * {@link Root#drivers} list and calling {@link Driver#onEnable}. If the
     * driver was already registered, nothing happens.
     */
    registerDriver(driver: Driver): void;
    /**
     * Unregisters a {@link Driver} from the root, removing it from the
     * {@link Root#drivers} list and calling {@link Driver#onDisable}. If the
     * driver was not registered, nothing happens.
     */
    unregisterDriver(driver: Driver): void;
    /**
     * Unregisters all {@link Root#drivers} from the root, by calling
     * {@link Root#unregisterDriver}.
     */
    clearDrivers(): void;
    /**
     * Can {@link Root#getTextInput} be called? True if
     * {@link Root#textInputHandler} is not null and
     * {@link Root#usingMobileTextInput} is false.
     */
    get hasMobileTextInput(): boolean;
    /**
     * Is {@link Root#getTextInput} in use?
     *
     * See {@link Root#_mobileTextInUse}.
     */
    get usingMobileTextInput(): boolean;
    /**
     * Get text input from the user. Used for mobile where keyboard events are
     * hard to get.
     *
     * @returns If this is already in use ({@link Root#usingMobileTextInput}), returns null, else, returns a string typed by the user.
     */
    getTextInput(initialInput?: string): Promise<string | null>;
    /**
     * Shortcut for {@link Root#viewport}'s {@link CanvasViewport#resolution}
     * property.
     *
     * Note that, although the resolution is part of the {@link CanvasViewport}
     * API, widgets will treat the resolution property as being per-Root, not
     * per-Viewport (hence the lack of a Viewport.resolution property). The
     * resolution property is part of the CanvasViewport class so that
     * CanvasViewport is not circularly dependent on the Root class.
     */
    get resolution(): number;
    set resolution(resolution: number);
    /**
     * Shortcut for {@link Root#viewport}'s
     * {@link CanvasViewport#preventBleeding} property.
     */
    get preventBleeding(): boolean;
    set preventBleeding(preventBleeding: boolean);
    /**
     * Shortcut for {@link Root#viewport}'s
     * {@link CanvasViewport#maxCanvasWidth} property
     */
    get maxCanvasWidth(): number;
    set maxCanvasWidth(maxCanvasWidth: number);
    /**
     * Shortcut for {@link Root#viewport}'s
     * {@link CanvasViewport#maxCanvasHeight} property
     */
    get maxCanvasHeight(): number;
    set maxCanvasHeight(maxCanvasHeight: number);
    /**
     * Get the scale used for the {@link Root#viewport}. The horizontal and/or
     * vertical scale may not be 1 if {@link Root#maxCanvasWidth} or
     * {@link Root#maxCanvasHeight} are exceeded.
     *
     * Note that this is only valid after resolving {@link Root#child}'s layout.
     *
     * Equivalent to getting {@link Viewport#effectiveScale} on
     * {@link Root#viewport}.
     */
    get effectiveScale(): [scaleX: number, scaleY: number];
    /**
     * The root widget of this UI tree. Equivalent to getting
     * {@link Root#viewport}.{@link Viewport#child}.
     */
    get child(): Widget;
    /**
     * Destroy this Root. Disables the Root, clears all drivers, detaches the
     * {@link Root#child} Widget and resets {@link Root#textInputHandler}.
     *
     * Root must not be used after calling this method. Doing so will cause
     * exceptions to be thrown. There is no way to un-destroy a destroyed Root.
     *
     * Call this if you are no longer going to use this Root.
     */
    destroy(): void;
}
