import type { ThemeProperties } from '../theme/ThemeProperties';
import type { FocusType } from '../core/FocusType';
import type { Padding } from '../theme/Padding';
import { BaseTheme } from '../theme/BaseTheme';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
/**
 * A generic widget. All widgets extend this class. All widgets extend
 * {@link BaseTheme} so that the theme in use can be overridden.
 *
 * @category Widget
 */
export declare abstract class Widget extends BaseTheme {
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
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
     * {@link canvasFill}.
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
    /** {@link flex} but for internal use. */
    protected _flex: number;
    /**
     * The {@link Root} that this widget is currently inside.
     * Note that this will replace the root argument in the update functions,
     * but for now, both can be used. For now, this value is set whenever
     * {@link preLayoutUpdate} is called.
     */
    protected root: Root | null;
    /**
     * How much this widget will expand relative to other widgets in a flexbox
     * container. If changed, sets {@link _layoutDirty} to true.
     */
    get flex(): number;
    set flex(flex: number);
    /** Create a new Widget. */
    constructor(needsClear: boolean, propagatesEvents: boolean, themeProperties?: ThemeProperties);
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
     *
     * If changed, calls {@link forceDirty}
     *
     * If getting, {@link _enabled} is returned.
     */
    set enabled(enabled: boolean);
    get enabled(): boolean;
    /** The inherited theme of this widget. Sets {@link fallbackTheme}. */
    set inheritedTheme(theme: Theme | undefined);
    get inheritedTheme(): Theme | undefined;
    protected onThemeUpdated(property?: string | null): void;
    /**
     * Get the resolved dimensions. Returns a 2-tuple containing
     * {@link width} and {@link height}.
     */
    get dimensions(): [number, number];
    /**
     * Get the resolved position. Returns a 2-tuple containing {@link x} and
     * {@link y}.
     */
    get position(): [number, number];
    /**
     * Check if the widget is dirty. Returns {@link _dirty}, as long as
     * {@link dimensionless} is not true.
     */
    get dirty(): boolean;
    /** Check if the widget's layout is dirty. Returns {@link _layoutDirty}. */
    get layoutDirty(): boolean;
    /**
     * Check if the widget has zero width or height.
     *
     * If true, {@link paint} will do nothing and {@link dirty} will be false
     * even if {@link _dirty} is true.
     *
     * Usually becomes true when containers overflow.
     */
    get dimensionless(): boolean;
    /**
     * Called when a focus type owned by this Widget has been dropped. Does
     * nothing by default. Can be overridden.
     */
    onFocusDropped(_focusType: FocusType, _root: Root): void;
    /**
     * Widget event handling callback. If the event is to be captured, the
     * capturer is returned, else, null.
     *
     * By default, this will do nothing and capture the event if it is targetted
     * at itself.
     *
     * If overriding, return the widget that has captured the event (could be
     * this, for example, or a child widget if implementing a container), or
     * null if no widget captured the event.
     */
    protected handleEvent(event: Event, _root: Root): Widget | null;
    /**
     * Called when an event is passed to the Widget. Checks if the target
     * matches the Widget, unless the Widget propagates events, or if the event
     * is a {@link PointerEvent} and is in the bounds of the Widget. If neither
     * of the conditions are true, the event is not captured (null is returned),
     * else, the {@link handleEvent} method is called and its result is
     * returned. Must not be overridden.
     *
     * @returns Returns the widget that captured the event or null if none captured the event.
     */
    dispatchEvent(event: Event, root: Root): Widget | null;
    /**
     * Generic update method which is called before layout is resolved. Does
     * nothing by default. Should be implemented.
     */
    protected handlePreLayoutUpdate(_root: Root): void;
    /**
     * Generic update method which is called before layout is resolved. Calls
     * {@link handlePreLayoutUpdate} if widget is enabled. Must not be
     * overridden.
     */
    preLayoutUpdate(root: Root): void;
    /**
     * Resolve dimensions of this widget. Must be implemented; set {@link width}
     * and {@link height}.
     */
    protected abstract handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * Wrapper for {@link handleResolveDimensions}. Does nothing if
     * {@link _enabled} is false. If the resolved dimensions change,
     * {@link _dirty} is set to true. {@link _layoutDirty} is set to false. If
     * the widget is not loose and the layout has non-infinite max constraints,
     * then the widget is stretched to fit max constraints. Must not be
     * overridden.
     */
    resolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * Like {@link resolveDimensions} but for widgets at the top of the widget
     * tree (the child of the {@link Root}). This retries dimension resolving if
     * there is at least one unconstrained axis so that flex layout works even
     * in infinite layout.
     */
    resolveDimensionsAsTop(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * Called after resolving position of this widget. Should be implemented if
     * widget is a container; call resolvePosition of children. Does nothing by
     * default.
     */
    protected afterPositionResolved(): void;
    /**
     * Set the position of this widget and calls {@link afterPositionResolved}.
     * If the resolved position changes, sets {@link _dirty} to true. Does
     * nothing if {@link _enabled} is false. Must not be overridden.
     */
    resolvePosition(x: number, y: number): void;
    /**
     * Generic update method which is called after layout is resolved. Does
     * nothing by default. Should be implemented.
     */
    protected handlePostLayoutUpdate(_root: Root): void;
    /**
     * Generic update method which is called after layout is resolved. Calls
     * {@link handlePostLayoutUpdate} if widget is enabled. Must not be
     * overridden.
     */
    postLayoutUpdate(root: Root): void;
    /**
     * Paiting utility: clears background of widget. Should not be overridden.
     *
     * Rounds to nearest pixels; no subpixel clearing.
     *
     * The background fill style used is {@link ThemeProperty.CanvasFill}.
     *
     * @param fillStyle The fill style to use for clearing. If null (default), then the value of {@link canvasFill} is used
     */
    protected clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, fillStyle?: string | CanvasGradient | CanvasPattern | null): void;
    /**
     * Paiting utility: start a clear operation with no clipping path, the user
     * has to add their own paths to the context. Should not be overridden.
     *
     * The background fill style used is {@link ThemeProperty.CanvasFill}.
     *
     * @param fillStyle The fill style to use for clearing. If null (default), then the value of {@link canvasFill} is used
     */
    protected clearStart(ctx: CanvasRenderingContext2D, fillStyle?: string | CanvasGradient | CanvasPattern | null): void;
    /**
     * Paiting utility: end a clear operation (from {@link clearStart}). Should
     * not be overridden.
     *
     * @param fillRule The canvas fill rule for clipping. See the {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip#parameters | canvas clip documentation}
     */
    protected clearEnd(ctx: CanvasRenderingContext2D, fillRule?: CanvasFillRule): void;
    /**
     * Paiting/layout utility: rounds the bounds of a rectangle to the nearest
     * pixels.
     *
     * @param roundInwards Should the rectangle be rounded inwards (shrunk instead of expanded)? False by default
     * @returns Returns a 4-tuple containing rounded x, y, width and height respectively
     */
    protected roundRect(x: number, y: number, width: number, height: number, roundInwards?: boolean): [number, number, number, number];
    /**
     * Widget painting callback. By default does nothing. Do painting logic here
     * when extending Widget. Even if {@link dirty} is false, if this method is
     * called, then the widget must still be painted. Should be overridden.
     *
     * @param forced Was this widget force-painted? If calling a child's paint method, propagate this value
     */
    protected handlePainting(_ctx: CanvasRenderingContext2D, _forced: boolean): void;
    /**
     * Called when the Widget is dirty and the Root is being rendered. Does
     * nothing if dirty flag is not set, else, clears the background if
     * {@link needsClear} is true, calls the {@link handlePainting} method and
     * unsets the dirty flag. Automatically calls {@link dryPaint} if
     * {@link dimensionless} is true. Must not be overridden.
     *
     * @param force Force re-paint even if {@link dirty} is false
     */
    paint(ctx: CanvasRenderingContext2D, force?: boolean): void;
    /**
     * Unset this widget's dirty flag. Call this when painting a child that you
     * know will not be visible, such as if clipping and the child is out of
     * bounds. If implementing a container widget, override this so that each
     * child widget's dryPaint method is called.
     */
    dryPaint(): void;
    /**
     * Force a full theme update. An alias for {@link onThemeUpdated}(null).
     * Used by {@link Root.resolution}
     */
    forceThemeUpdate(): void;
    /**
     * Force the widget to be fully re-painted and have layout resolved. For
     * internal use only or for use by {@link Parent} widgets so that children
     * get properly marked as dirty when added to a new container after reuse.
     * Could also prove useful if you are reusing widgets after removing them
     * from the widget tree.
     */
    forceDirty(): void;
    /** Scale a given font string by a given scaling factor */
    protected scaleFont(font: string, factor: number): string;
    get containerPadding(): Padding;
    set containerPadding(value: Padding | undefined);
    get multiContainerSpacing(): number;
    set multiContainerSpacing(value: number | undefined);
    get sliderMinLength(): number;
    set sliderMinLength(value: number | undefined);
    get sliderThickness(): number;
    set sliderThickness(value: number | undefined);
    private _cachedFont_bodyTextFont;
    private _cachedLastFont_bodyTextFont;
    get bodyTextFont(): string;
    set bodyTextFont(value: string | undefined);
    get bodyTextHeight(): number | null;
    set bodyTextHeight(value: number | null | undefined);
    get bodyTextSpacing(): number | null;
    set bodyTextSpacing(value: number | null | undefined);
    get checkboxLength(): number;
    set checkboxLength(value: number | undefined);
    get checkboxInnerPadding(): number;
    set checkboxInnerPadding(value: number | undefined);
    private _cachedFont_inputTextFont;
    private _cachedLastFont_inputTextFont;
    get inputTextFont(): string;
    set inputTextFont(value: string | undefined);
    get inputTextHeight(): number | null;
    set inputTextHeight(value: number | null | undefined);
    get inputTextSpacing(): number | null;
    set inputTextSpacing(value: number | null | undefined);
    get inputTextInnerPadding(): number;
    set inputTextInnerPadding(value: number | undefined);
    get inputTextMinWidth(): number;
    set inputTextMinWidth(value: number | undefined);
    get cursorThickness(): number;
    set cursorThickness(value: number | undefined);
    get scrollBarThickness(): number;
    set scrollBarThickness(value: number | undefined);
    get scrollBarMinPixels(): number;
    set scrollBarMinPixels(value: number | undefined);
}
