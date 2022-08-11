import { ThemeProperties } from "../theme/ThemeProperties";
import type { Viewport } from '../core/Viewport';
import type { Bounds } from '../helpers/Bounds';
import { BaseTheme } from '../theme/BaseTheme';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Rect } from '../helpers/Rect';
import type { Root } from '../core/Root';
/**
 * Optional Widget constructor properties.
 *
 * @category Widget
 */
export interface WidgetProperties extends ThemeProperties {
    /** Sets {@link Widget#enabled}. */
    enabled?: boolean;
    /** Sets {@link Widget#flex}. */
    flex?: number;
}
/**
 * A generic widget. All widgets extend this class. All widgets extend
 * {@link BaseTheme} so that the theme in use can be overridden.
 *
 * @category Widget
 */
export declare abstract class Widget extends BaseTheme {
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist,
     * but will still be present in the UI tree.
     */
    private _enabled;
    /** Widget will only be painted if dirty is true. */
    protected _dirty: boolean;
    /**
     * If this is true, widget needs their layout resolved. If implementing a
     * container, propagate this up.
     */
    protected _layoutDirty: boolean;
    /**
     * Widget will have its background automatically cleared when painting if
     * needsClear is true. The background fill style used is
     * {@link BaseTheme#canvasFill}.
     */
    readonly needsClear: boolean;
    /**
     * Widget will get targetted events even if the target is not itself if it
     * this is true. Useful for implementing container widgets.
     */
    readonly propagatesEvents: boolean;
    /** Width of widget in pixels. */
    protected width: number;
    /** Height of widget in pixels. */
    protected height: number;
    /** Absolute horizontal offset of widget in pixels. */
    protected x: number;
    /** Absolute vertical offset of widget in pixels. */
    protected y: number;
    /**
     * The ideal width of the widget in pixels; if non-integer widget dimensions
     * were allowed, the widget would have this size. Use this for layout
     * calculations, but never use this for painting so that subpixel issues are
     * avoided.
     */
    protected idealWidth: number;
    /** The ideal height of the widget in pixels. See {@link Widget#width}. */
    protected idealHeight: number;
    /**
     * The ideal absolute horizontal offset of the widget in pixels; if
     * non-integer positions were allowed, the widget would have this position.
     * Use this for layout calculations, but never use this for painting so that
     * subpixel issues are avoided.
     */
    protected idealX: number;
    /**
     * The ideal absolute vertical offset of the widget in pixels. See
     * {@link Widget#x}.
     */
    protected idealY: number;
    /** {@link Widget#flex} but for internal use. */
    protected _flex: number;
    /**
     * The {@link Root} that this widget is currently inside.
     *
     * Widgets not {@link Widget#attached} to a UI tree will have this property
     * set to null.
     */
    protected _root: Root | null;
    /**
     * The {@link Viewport} that this widget is currently painting to. A UI tree
     * can have multiple Viewports due to {@link ViewportWidget}, so this is not
     * equivalent to {@link Root#viewport}.
     *
     * Widgets not {@link Widget#attached} to a UI tree will have this property
     * set to null.
     */
    protected _viewport: Viewport | null;
    /**
     * The parent {@link Widget} of this widget.
     *
     * Widgets not {@link Widget#attached} to a UI tree will have this property
     * set to null, but root widgets will also have a null parent.
     */
    protected _parent: Widget | null;
    /** Can this widget be focused by pressing tab? */
    protected tabFocusable: boolean;
    /**
     * Is the Widget attached to a UI tree, enabled and in a UI sub-tree where
     * all ascendants are enabled?
     */
    private _active;
    /**
     * How much this widget will expand relative to other widgets in a flexbox
     * container. If changed, sets {@link Widget#_layoutDirty} to true.
     */
    get flex(): number;
    set flex(flex: number);
    /** Create a new Widget. */
    constructor(needsClear: boolean, propagatesEvents: boolean, properties?: Readonly<WidgetProperties>);
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
     *
     * If getting, {@link Widget#_enabled} is returned.
     */
    set enabled(enabled: boolean);
    get enabled(): boolean;
    /**
     * The inherited theme of this widget. Sets {@link BaseTheme#fallbackTheme}.
     */
    set inheritedTheme(theme: Theme | undefined);
    get inheritedTheme(): Theme | undefined;
    protected onThemeUpdated(property?: string | null): void;
    /**
     * Get the resolved dimensions. Returns a 2-tuple containing
     * {@link Widget#width} and {@link Widget#height}.
     *
     * Use {@link Widget#idealDimensions} for layout calculations.
     */
    get dimensions(): [number, number];
    /**
     * Get the resolved ideal dimensions. Returns a 2-tuple containing
     * {@link Widget#idealWidth} and {@link Widget#idealHeight}.
     *
     * Use this for layout calculations, and {@link Widget#dimensions} for
     * painting.
     */
    get idealDimensions(): [number, number];
    /**
     * Get the resolved position. Returns a 2-tuple containing {@link Widget#x}
     * and {@link Widget#y}.
     *
     * Use {@link Widget#idealPosition} for layout calculations.
     */
    get position(): [number, number];
    /**
     * Get the resolved ideal position. Returns a 2-tuple containing
     * {@link Widget#idealX} and {@link Widget#idealY}.
     *
     * Use this for layout calculations, and {@link Widget#position} for
     * painting.
     */
    get idealPosition(): [number, number];
    /** Get the rectangle bounds (left, right, top, bottom) of this widget. */
    get bounds(): Bounds;
    /** Similar to {@link Widget#bounds}, but uses ideal values */
    get idealBounds(): Bounds;
    /** Get the rectangle (x, y, width, height) of this widget. */
    get rect(): Rect;
    /** Similar to {@link Widget#rect}, but uses ideal values */
    get idealRect(): Rect;
    /**
     * Check if the widget is dirty. Returns {@link Widget#_dirty}, as long as
     * {@link Widget#dimensionless} is not true.
     */
    get dirty(): boolean;
    /**
     * Check if the widget's layout is dirty. Returns
     * {@link Widget#_layoutDirty}.
     */
    get layoutDirty(): boolean;
    /**
     * Check if the widget has zero width or height.
     *
     * If true, {@link Widget#paint} will do nothing and {@link Widget#dirty}
     * will be false even if {@link Widget#_dirty} is true.
     *
     * Usually becomes true when containers overflow.
     */
    get dimensionless(): boolean;
    /**
     * Called when a focus type has been grabbed by this Widget. Does nothing by
     * default. Can be overridden.
     */
    onFocusGrabbed(focusType: FocusType): void;
    /**
     * Called when a focus type owned by this Widget has been dropped. Does
     * nothing by default. Can be overridden.
     */
    onFocusDropped(focusType: FocusType): void;
    /**
     * Widget event handling callback. If the event is to be captured, the
     * capturer is returned, else, null.
     *
     * By default, this will do nothing and capture the event if it is targetted
     * at itself.
     *
     * If overriding, return the widget that has captured the event (could be
     * `this`, for example, or a child widget if implementing a container), or
     * null if no widget captured the event. Make sure to not capture any events
     * that you do not need, or you may have unexpected results; for example, if
     * you capture all dispatched events indiscriminately, a {@link TabSelect}
     * event may be captured and result in weird behaviour when the user
     * attempts to use tab to select another widget.
     */
    protected handleEvent(event: Event): Widget | null;
    /**
     * Called when an event is passed to the Widget. Checks if the target
     * matches the Widget, unless the Widget propagates events, or if the event
     * is a {@link PointerEvent} and is in the bounds of the Widget. If neither
     * of the conditions are true, the event is not captured (null is returned),
     * else, the {@link Widget#handleEvent} method is called and its result is
     * returned. Must not be overridden.
     *
     * @returns Returns the widget that captured the event or null if none captured the event.
     */
    dispatchEvent(event: Event): Widget | null;
    /**
     * Generic update method which is called before layout is resolved. Does
     * nothing by default. Should be implemented.
     */
    protected handlePreLayoutUpdate(): void;
    /**
     * Generic update method which is called before layout is resolved. Calls
     * {@link Widget#handlePreLayoutUpdate} if widget is enabled. Must not be
     * overridden.
     */
    preLayoutUpdate(): void;
    /**
     * Resolve dimensions of this widget. Must be implemented; set
     * {@link Widget#width} and {@link Widget#height}.
     */
    protected abstract handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * Wrapper for {@link Widget#handleResolveDimensions}. Does nothing if
     * {@link Widget#_enabled} is false. If the resolved dimensions change,
     * {@link Widget#_dirty} is set to true. {@link Widget#_layoutDirty} is set
     * to false. If the widget is not loose and the layout has non-infinite max
     * constraints, then the widget is stretched to fit max constraints. Must
     * not be overridden.
     */
    resolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * Like {@link Widget#resolveDimensions} but for widgets at the top of the
     * widget tree (the child of the {@link Root}). This retries dimension
     * resolving if there is at least one unconstrained axis so that flex layout
     * works even in infinite layout.
     */
    resolveDimensionsAsTop(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * Set the ideal position of this widget ({@link Widget#idealX} and
     * {@link Widget#idealY}). Does not set any flags of the widget.
     *
     * Can be overridden, but `super.resolvePosition` must always be called, and
     * the arguments must be preserved. Container widgets should override this
     * method such that `resolvePosition` is called for each child of the
     * container.
     */
    resolvePosition(x: number, y: number): void;
    /**
     * Sets {@link Widget#x}, {@link Widget#y}, {@link Widget#width} and
     * {@link Widget#y} from {@link Widget#idealX}, {@link Widget#idealY},
     * {@link Widget#idealWidth} and {@link Widget#idealHeight} by rounding
     * them. If the final values have changed, {@link Widget#_dirty} is set to
     * true.
     *
     * Can be overridden, but `super.finalizeBounds` must still be called; if
     * you have parts of the widget that can be pre-calculated when the layout
     * is known, such as the length and offset of a {@link Checkbox}, or
     * non-default dirty flags, such as {@link MultiContainer#backgroundDirty},
     * then this is the perfect method to override, since it's only called after
     * the layout is resolved to final (non-ideal) values, is only called if
     * needed (unlike {@link postLayoutUpdate}, which is always called after the
     * layout phase) and can be used to compare old and new positions and
     * dimensions.
     *
     * Abstract container widgets such as {@link Parent} must always override
     * this and call `finalizeBounds` on each child widget.
     */
    finalizeBounds(): void;
    /**
     * Generic update method which is called after layout is resolved. Does
     * nothing by default. Should be implemented.
     */
    protected handlePostLayoutUpdate(): void;
    /**
     * Generic update method which is called after layout is resolved. Calls
     * {@link Widget#handlePostLayoutUpdate} if widget is enabled. Must not be
     * overridden.
     */
    postLayoutUpdate(): void;
    /**
     * Paiting utility: clears background of widget. Should not be overridden.
     *
     * Rounds to nearest pixels; no subpixel clearing.
     *
     * The background fill style used is {@link ThemeProperties#canvasFill}.
     *
     * @param fillStyle - The fill style to use for clearing. If null (default), then the value of {@link ThemeProperties#canvasFill} is used
     */
    protected clear(x: number, y: number, width: number, height: number, fillStyle?: string | CanvasGradient | CanvasPattern | null): void;
    /**
     * Paiting utility: start a clear operation with no clipping path, the user
     * has to add their own paths to the context. Should not be overridden.
     *
     * @param fillStyle - The fill style to use for clearing. If null (default), then the value of {@link ThemeProperties#canvasFill} is used
     */
    protected clearStart(fillStyle?: string | CanvasGradient | CanvasPattern | null): void;
    /**
     * Paiting utility: end a clear operation (from {@link Widget#clearStart}). Should
     * not be overridden.
     *
     * @param fillRule - The canvas fill rule for clipping. See the {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip#parameters | canvas clip documentation}
     */
    protected clearEnd(fillRule?: CanvasFillRule): void;
    /**
     * Painting utility: paints a circle. Should not be overridden. Coordinates
     * are relative to the center of the circle. Uses ctx's current fillStyle.
     * Does not restore the context state after finishing.
     */
    protected paintCircle(x: number, y: number, radius: number): void;
    /**
     * Widget painting callback. By default does nothing. Do painting logic here
     * when extending Widget. Even if {@link Widget#_dirty} is false, if this
     * method is called, then the widget must still be painted. Should be
     * overridden.
     *
     * @param forced - Was this widget force-painted? If calling a child's paint method, propagate this value
     */
    protected handlePainting(forced: boolean): void;
    /**
     * Called when the Widget is dirty and the Root is being rendered. Does
     * nothing if dirty flag is not set, else, clears the background if
     * {@link Widget#needsClear} is true, calls the
     * {@link Widget#handlePainting} method and unsets the dirty flag.
     * Automatically calls {@link Widget#dryPaint} if
     * {@link Widget#dimensionless} is true. Must not be overridden.
     *
     * @param force - Force re-paint even if {@link Widget#_dirty} is false
     */
    paint(force?: boolean): void;
    /**
     * Unset this widget's dirty flag. Call this when painting a child that you
     * know will not be visible, such as if clipping and the child is out of
     * bounds. If implementing a container widget, override this so that each
     * child widget's dryPaint method is called.
     */
    dryPaint(): void;
    /**
     * Force the widget to be fully re-painted and (by default) have layout
     * resolved. For internal use only or for use by {@link Parent} widgets so
     * that children get properly marked as dirty when added to a new container
     * after reuse.
     *
     * Should be overridden if the derived Widget has more dirty flags other
     * than the default ones (such as {@link MultiContainer#backgroundDirty}),
     * but `super.forceDirty` must be called.
     */
    forceDirty(markLayout?: boolean): void;
    /**
     * Check if this Widget is attached to a UI tree. If not, then this Widget
     * must not be used. Must not be overridden.
     */
    get attached(): boolean;
    /**
     * Similar to {@link Widget#_root}, but throws an error if the widget is not
     * {@link Widget#attached}.
     */
    get root(): Root;
    /**
     * Similar to {@link Widget#_viewport}, but throws an error if the widget is
     * not {@link Widget#attached}.
     */
    get viewport(): Viewport;
    /**
     * Similar to {@link Widget#_parent}, but throws an error if the widget is
     * not {@link Widget#attached}.
     */
    get parent(): Widget | null;
    /**
     * Called when the Widget is attached to a UI tree. Should only be
     * overridden by container widgets to attach children or for resource
     * management, but `super.attach` must still be called.
     *
     * If the widget is already in a UI tree (already has a {@link parent} or is
     * the {@link Root#child | root Widget}, both checked via
     * {@link Widget#attached}), then this method will throw an exception; a
     * Widget cannot be in multiple UI trees.
     *
     * @param root - The {@link Root} of the UI tree
     * @param viewport - The {@link Viewport} in this part of the UI tree. A UI tree can have multiple nested Viewports due to {@link ViewportWidget}
     * @param parent - The new parent of this Widget. If `null`, then this Widget has no parent and is the {@link Root#child | root Widget}
     */
    attach(root: Root, viewport: Viewport, parent: Widget | null): void;
    /**
     * Called when the Widget is detached from a UI tree. Should only be
     * overridden by container widgets to detach children or for resource
     * management, but `super.detach` must still be called.
     *
     * Sets {@link Widget#_root}, {@link Widget#_viewport} and
     * {@link Widget#_parent} to null.
     *
     * Drops all foci set to this Widget.
     *
     * If the widget was not in a UI tree, then an exception is thrown.
     */
    detach(): void;
    /**
     * Public getter for {@link Widget#_active}. Can only be updated by calling
     * {@link Widget#updateActiveState}, although this should never be done
     * manually; only done automatically by container Widgets and Roots.
     */
    get active(): boolean;
    /**
     * Update the {@link Widget#active} state of the Widget. If the active state
     * changes from `false` to `true`, then {@link Widget#activate} is called.
     * If the active state changes from `true` to `false`, then
     * {@link Widget#deactivate} is called.
     *
     * Container Widgets must override this so that the active state of each
     * child is updated, but `super.updateActiveState` must still be called.
     * Each child's active state must only be updated if the container's active
     * state changed; this is indicated by the return value of this method.
     *
     * @returns Returns true if the active state changed.
     */
    updateActiveState(): boolean;
    /**
     * Called after the Widget is attached to a UI tree, its parent is
     * {@link Widget#active} (or {@link Root} is enabled if this is the top
     * Widget), and the Widget itself is enabled; only called when all of the
     * previous conditions are fulfilled, not when one of the conditions is
     * fulfilled. Should be overridden for resource management, but
     * `super.activate` must be called.
     *
     * Must not be propagated to children by container Widgets. This is already
     * done automatically by {@link Widget#updateActiveState}.
     *
     * Marks {@link Widget#dirty} and {@link Widget#layoutDirty} as true.
     */
    protected activate(): void;
    /**
     * Called when the Widget is no longer {@link Widget#active}. Should be
     * overridden for resource management, but `super.deactivate` must be
     * called.
     *
     * Must not be propagated to children by container Widgets. This is already
     * done automatically by {@link Widget#updateActiveState}.
     *
     * Marks {@link Widget#dirty} and {@link Widget#layoutDirty} as true, and
     * drops all foci set to this Widget if the Widget is attached.
     */
    protected deactivate(): void;
    /**
     * {@link AutoScroll | Auto-scroll} to this widget. Uses the whole widget as
     * the {@link AutoScroll#bounds | auto-scroll bounds}.
     */
    autoScroll(): void;
}
