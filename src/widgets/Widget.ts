import type { ThemeProperties } from '../theme/ThemeProperties';
import { PointerEvent } from '../events/PointerEvent';
import type { FocusType } from '../core/FocusType';
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
export abstract class Widget extends BaseTheme {
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
     */
    private _enabled = true;
    /** Widget will only be painted if dirty is true. */
    protected _dirty = true;
    /**
     * If this is true, widget needs their layout resolved. If implementing a
     * container, propagate this up.
     */
    protected _layoutDirty = true;
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
    protected width = 0;
    /** Height of widget in pixels. */
    protected height = 0;
    /** Absolute horizontal offset of widget in pixels. */
    protected x = 0;
    /** Absolute vertical offset of widget in pixels. */
    protected y = 0;
    /** {@link flex} but for internal use. */
    protected _flex = 0;

    /**
     * How much this widget will expand relative to other widgets in a flexbox
     * container. If changed, sets {@link _layoutDirty} to true.
     */
    get flex(): number {
        return this._flex;
    }

    set flex(flex: number) {
        if(flex !== this._flex) {
            this._flex = flex;
            this._layoutDirty = true;
        }
    }

    /** Create a new Widget. */
    constructor(needsClear: boolean, propagatesEvents: boolean, themeProperties?: ThemeProperties) {
        super(themeProperties);

        this.needsClear = needsClear;
        this.propagatesEvents = propagatesEvents;
    }

    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
     *
     * If changed, {@link _enabled} is set, {@link _layoutDirty} is set to true
     * and {@link _dirty} is set to true if enabled or false if not enabled.
     *
     * If getting, {@link _enabled} is returned.
     */
    set enabled(enabled: boolean) {
        if(enabled === this._enabled)
            return;

        this._enabled = enabled;
        this._dirty = enabled;
        this._layoutDirty = true;
    }

    get enabled(): boolean {
        return this._enabled;
    }

    /** The inherited theme of this widget. Sets {@link fallbackTheme}. */
    set inheritedTheme(theme: Theme | undefined) {
        this.fallbackTheme = theme;
    }

    get inheritedTheme(): Theme | undefined {
        return this.fallbackTheme;
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(this.needsClear && (property === null || property === 'canvasFill'))
            this._dirty = true;
    }

    /**
     * Get the resolved dimensions. Returns a 2-tuple containing
     * {@link width} and {@link height}.
     */
    get dimensions(): [number, number] {
        return [this.width, this.height];
    }

    /**
     * Get the resolved position. Returns a 2-tuple containing {@link x} and
     * {@link y}.
     */
    get position(): [number, number] {
        return [this.x, this.y];
    }

    /**
     * Check if the widget is dirty. Returns {@link _dirty}, as long as
     * {@link dimensionless} is not true and {@link _enabled} is true.
     */
    get dirty(): boolean {
        return this._dirty && !this.dimensionless && this._enabled;
    }

    /**
     * Check if the widget's layout is dirty. Returns {@link _layoutDirty} as
     * long as {@link _enabled} is true.
     */
    get layoutDirty(): boolean {
        return this._layoutDirty && this._enabled;
    }

    /**
     * Check if the widget has zero width or height.
     *
     * If true, {@link paint} will do nothing and {@link dirty} will be false
     * even if {@link _dirty} is true.
     *
     * Usually becomes true when containers overflow.
     */
    get dimensionless(): boolean {
        return this.width == 0 || this.height == 0;
    }

    /**
     * Called when a focus type owned by this Widget has been dropped. Does
     * nothing by default. Can be overridden.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFocusDropped(_focusType: FocusType, _root: Root): void {}

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
    protected handleEvent(event: Event, _root: Root): Widget | null {
        if(event.target === this)
            return this;
        else
            return null;
    }

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
    dispatchEvent(event: Event, root: Root): Widget | null {
        if(!this._enabled)
            return null;

        if(event.target === null) {
            if(event instanceof PointerEvent) {
                if(event.x < this.x || event.y < this.y || event.x >= this.x + this.width || event.y >= this.y + this.height)
                    return null;
            }
        }
        else if(event.target !== this && !this.propagatesEvents)
            return null;

        return this.handleEvent(event, root);
    }

    /**
     * Generic update method which is called before layout is resolved. Does
     * nothing by default. Should be implemented.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePreLayoutUpdate(_root: Root): void {}

    /**
     * Generic update method which is called before layout is resolved. Calls
     * {@link handlePreLayoutUpdate} if widget is enabled. Must not be
     * overridden.
     */
    preLayoutUpdate(root: Root): void {
        if(this._enabled)
            this.handlePreLayoutUpdate(root);
    }

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
    resolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Do nothing if disabled
        if(!this._enabled) {
            this.width = 0;
            this.height = 0;
            this._layoutDirty = false;
            return;
        }

        // Validate constraints
        if(minWidth == Infinity)
            throw new Error('minWidth must not be infinite');
        if(minWidth > maxWidth) {
            // Not throwing here because floating pointer precision errors
            // sometimes trigger this due to tight constraints
            console.warn(`minWidth (${minWidth}) must not be greater than maxWidth (${maxWidth}). Set minWidth to maxWidth. This may be caused by floating pointer precision errors`);
            minWidth = maxWidth;
        }
        if(minWidth < 0) {
            console.warn(`minWidth (${minWidth}) must not be lesser than 0. Set minWidth to 0. This may be caused by floating pointer precision errors`);
            minWidth = 0;
        }

        if(minHeight == Infinity)
            throw new Error('minHeight must not be infinite');
        if(minHeight > maxHeight) {
            console.warn(`minHeight (${minHeight}) must not be greater than maxHeight (${maxHeight}). Set minHeight to maxHeight. This may be caused by floating pointer precision errors`);
            minHeight = maxHeight;
        }
        if(minHeight < 0) {
            console.warn(`minHeight (${minHeight}) must not be lesser than 0. Set minHeight to 0. This may be caused by floating pointer precision errors`);
            minHeight = 0;
        }

        // Keep track of old dimensions to compare later
        const oldWidth = this.width;
        const oldHeight = this.height;

        // Resolve dimensions
        this.handleResolveDimensions(minWidth, maxWidth, minHeight, maxHeight);

        // Validate resolved dimensions, handling overflows, underflows and
        // invalid dimensions
        if(this.width < minWidth) {
            this.width = minWidth;
            console.error('Horizontal underflow in widget');
        }
        else if(this.width > maxWidth) {
            this.width = maxWidth;
            console.error('Horizontal overflow in widget');
        }

        if(this.width < 0 || !isFinite(this.width) || isNaN(this.width))
            throw new Error(`Disallowed width (${this.width}) in widget`);

        if(this.height < minHeight) {
            this.height = minHeight;
            console.error('Vertical underflow in widget');
        }
        else if(this.height > maxHeight) {
            this.height = maxHeight;
            console.error('Vertical overflow in widget');
        }

        if(this.height < 0 || !isFinite(this.height) || isNaN(this.height))
            throw new Error(`Disallowed height (${this.height}) in widget`);

        // Clear layout dirty flag
        this._layoutDirty = false;

        // If dimensions changed (compare with tracked old dimensions), then set
        // dirty flag
        if(oldWidth !== this.width || oldHeight !== this.height)
            this._dirty = true;

        //console.log('Resolved layout of', this.constructor.name);
    }

    /**
     * Like {@link resolveDimensions} but for widgets at the top of the widget
     * tree (the child of the {@link Root}). This retries dimension resolving if
     * there is at least one unconstrained axis so that flex layout works even
     * in infinite layout.
     */
    resolveDimensionsAsTop(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        this.resolveDimensions(minWidth, maxWidth, minHeight, maxHeight);

        // Resolve dimensions again, now with maximum constraints. This is so
        // that widgets that depend on max constraints, such as containers that
        // handle flexbox layout, work properly. Only do this if constraints
        // don't already have maximum dimensions.
        if(maxWidth === Infinity || maxHeight === Infinity) {
            this.resolveDimensions(
                minWidth,
                maxWidth === Infinity ? this.width : maxWidth,
                minHeight,
                maxHeight === Infinity ? this.height : maxHeight,
            );
        }
    }

    /**
     * Called after resolving position of this widget. Should be implemented if
     * widget is a container; call resolvePosition of children. Does nothing by
     * default.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected afterPositionResolved(): void {}

    /**
     * Set the position of this widget and calls {@link afterPositionResolved}.
     * If the resolved position changes, sets {@link _dirty} to true. Does
     * nothing if {@link _enabled} is false. Must not be overridden.
     */
    resolvePosition(x: number, y: number): void {
        // Mark as dirty if position changed
        if(x !== this.x || y !== this.y)
            this._dirty = true;

        // Set position
        this.x = x;
        this.y = y;

        // Call hook
        this.afterPositionResolved();
    }

    /**
     * Generic update method which is called after layout is resolved. Does
     * nothing by default. Should be implemented.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePostLayoutUpdate(_root: Root): void {}

    /**
     * Generic update method which is called after layout is resolved. Calls
     * {@link handlePostLayoutUpdate} if widget is enabled. Must not be
     * overridden.
     */
    postLayoutUpdate(root: Root): void {
        if(this._enabled)
            this.handlePostLayoutUpdate(root);
    }

    /**
     * Paiting utility: clears background of widget. Should not be overridden.
     *
     * Rounds to nearest pixels; no subpixel clearing.
     *
     * The background fill style used is {@link ThemeProperty.CanvasFill}.
     *
     * @param fillStyle The fill style to use for clearing. If null (default), then the value of {@link canvasFill} is used
     */
    protected clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, fillStyle: string | CanvasGradient | CanvasPattern | null = null): void {
        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = fillStyle ?? this.canvasFill;
        ctx.beginPath();
        // These are rounded because clipping and filling doesn't
        // work properly with decimal points
        ctx.rect(...this.roundRect(x, y, width, height));
        ctx.clip();
        ctx.fill();
        ctx.restore();
    }

    /**
     * Paiting utility: start a clear operation with no clipping path, the user
     * has to add their own paths to the context. Should not be overridden.
     *
     * The background fill style used is {@link ThemeProperty.CanvasFill}.
     *
     * @param fillStyle The fill style to use for clearing. If null (default), then the value of {@link canvasFill} is used
     */
    protected clearStart(ctx: CanvasRenderingContext2D, fillStyle: string | CanvasGradient | CanvasPattern | null = null): void {
        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = fillStyle ?? this.canvasFill;
        ctx.beginPath();
    }

    /**
     * Paiting utility: end a clear operation (from {@link clearStart}). Should
     * not be overridden.
     *
     * @param fillRule The canvas fill rule for clipping. See the {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip#parameters | canvas clip documentation}
     */
    protected clearEnd(ctx: CanvasRenderingContext2D, fillRule: CanvasFillRule = 'nonzero'): void {
        ctx.clip(fillRule);
        ctx.fill();
        ctx.restore();
    }

    /**
     * Paiting/layout utility: rounds the bounds of a rectangle to the nearest
     * pixels.
     *
     * @param roundInwards Should the rectangle be rounded inwards (shrunk instead of expanded)? False by default
     * @returns Returns a 4-tuple containing rounded x, y, width and height respectively
     */
    protected roundRect(x: number, y: number, width: number, height: number, roundInwards = false): [number, number, number, number] {
        // Decide rounding functions
        const roundDown = roundInwards ? Math.ceil : Math.floor;
        const roundUp = roundInwards ? Math.floor : Math.ceil;

        // Round rectangle
        x = roundDown(x);
        y = roundDown(y);
        return [x, y, roundUp(x + width) - x, roundUp(y + height) - y];
    }

    /**
     * Widget painting callback. By default does nothing. Do painting logic here
     * when extending Widget. Even if {@link dirty} is false, if this method is
     * called, then the widget must still be painted. Should be overridden.
     *
     * @param forced Was this widget force-painted? If calling a child's paint method, propagate this value
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePainting(_ctx: CanvasRenderingContext2D, _forced: boolean): void {}

    /**
     * Called when the Widget is dirty and the Root is being rendered. Does
     * nothing if dirty flag is not set, else, clears the background if
     * {@link needsClear} is true, calls the {@link handlePainting} method and
     * unsets the dirty flag. Automatically calls {@link dryPaint} if
     * {@link dimensionless} is true. Must not be overridden.
     *
     * @param force Force re-paint even if {@link dirty} is false
     */
    paint(ctx: CanvasRenderingContext2D, force = false): void {
        if(this.dimensionless)
            return this.dryPaint();

        if(!this._dirty && !force)
            return;

        //console.log('Painted', this.constructor.name);

        if(this._enabled) {
            if(this.needsClear)
                this.clear(this.x, this.y, this.width, this.height, ctx);

            ctx.save();
            this.handlePainting(ctx, force);
            ctx.restore();
        }

        this._dirty = false;
    }

    /**
     * Unset this widget's dirty flag. Call this when painting a child that you
     * know will not be visible, such as if clipping and the child is out of
     * bounds. If implementing a container widget, override this so that each
     * child widget's dryPaint method is called.
     */
    dryPaint(): void {
        this._dirty = false;
    }
}