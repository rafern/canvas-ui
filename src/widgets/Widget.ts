import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { PointerWheel } from '../events/PointerWheel';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

/**
 * A generic widget. All widgets extend this class.
 *
 * @category Widget
 */
export abstract class Widget {
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
     * {@link ThemeProperty.CanvasFill}.
     */
    readonly needsClear: boolean;
    /**
     * Widget will get targetted events even if the target is not itself if it
     * this is true. Useful for implementing container widgets.
     */
    readonly propagatesEvents: boolean;
    /**
     * The theme override used by the Widget. If this is null, the Widget's
     * theme will be the inherited theme, else, it will be the theme override
     * with the inherited theme as the fallback. The fallback of the theme
     * override will be ignored and replaced.
     */
    private _themeOverride: Theme | null;
    /** The current theme in use by the Widget. */
    private _theme: Theme | null = null;
    /** The inherited theme. */
    private _inheritedTheme: Theme | null = null;
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
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean) {
        this.needsClear = needsClear;
        this.propagatesEvents = propagatesEvents;
        this._themeOverride = themeOverride;
    }

    /**
     * Called when the inherited theme of this Widget is updated. Can be
     * overridden. Does nothing by default.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected updateInheritedTheme(): void {}

    /** Update this widget's current theme, with theme override set up. */
    private updateTheme(): void {
        if(this._themeOverride === null)
            this._theme = this._inheritedTheme;
        else {
            this._themeOverride.fallback = this._inheritedTheme;
            this._theme = this._themeOverride;
        }
    }

    /**
     * The current theme in use by the Widget. If there is no theme, throws an
     * exception.
     */
    get theme(): Theme {
        if(this._theme === null)
            throw new Error('Widget theme is not ready');

        return this._theme;
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

    /**
     * Set the theme override of this widget. Should not be overridden, but can
     * be. If overridden, the original method should still be called.
     *
     * Calls {@link updateTheme} and sets {@link _layoutDirty} and
     * {@link _dirty} to true if widget is enabled.
     */
    protected setThemeOverride(theme: Theme | null): void {
        // Abort if theme hasn't changed
        if(this._themeOverride === theme)
            return;

        this._themeOverride = theme;
        this.updateTheme();

        if(this._enabled) {
            this._layoutDirty = true;
            this._dirty = true;
        }
    }

    /**
     * The theme override used by the Widget. If this is null, the Widget's
     * theme will be the inherited theme, else, it will be the theme override
     * with the inherited theme as the fallback. The fallback of the theme
     * override will be ignored and replaced.
     *
     * If setting, calls {@link setThemeOverride}.
     *
     * If getting, returns {@link _themeOverride}.
     */
    set themeOverride(theme: Theme | null) {
        this.setThemeOverride(theme);
    }

    get themeOverride(): Theme | null {
        return this._themeOverride;
    }

    /**
     * Set the inherited theme of this widget. Should not be overridden, but can
     * be. If overridden, the original method should still be called.
     *
     * Theme override has priority over inherited theme. Inherited theme should
     * be propagated to children so they also have a theme.
     *
     * Calls {@link updateInheritedTheme} and {@link updateTheme} and sets
     * {@link _layoutDirty} and {@link _dirty} to true if widget is enabled.
     */
    protected inheritTheme(theme: Theme | null): void {
        // Abort if theme hasn't changed
        if(this._inheritedTheme === theme)
            return;

        this._inheritedTheme = theme;
        this.updateInheritedTheme();
        this.updateTheme();

        if(this._enabled) {
            this._layoutDirty = true;
            this._dirty = true;
        }
    }

    /**
     * The inherited theme of this widget.
     *
     * If setting, calls {@link inheritTheme}.
     *
     * If getting, returns {@link _inheritedTheme}.
     */
    set inheritedTheme(theme: Theme | null) {
        this.inheritTheme(theme);
    }

    get inheritedTheme(): Theme | null {
        return this._inheritedTheme;
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
     * {@link dimensionless} is not true.
     */
    get dirty(): boolean {
        return this._dirty && !this.dimensionless;
    }

    /** Check if the widget's layout is dirty. Returns {@link _layoutDirty}. */
    get layoutDirty(): boolean {
        return this._layoutDirty;
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
     * capturer is returned, else, null. By default, this will do nothing and
     * capture the event if it is targetted at itself or is a
     * {@link PointerEvent}, but not a {@link PointerWheel}. Should be
     * overridden.
     *
     * If overriding, return the widget that has captured the event (could be
     * this, for example, or a child widget if implementing a container), or
     * null if no widget captured the event.
     */
    protected handleEvent(event: Event, _root: Root): Widget | null {
        if(event.target === this ||
           ((event instanceof PointerEvent) &&
            (event.target === null) &&
            !(event instanceof PointerWheel)))
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
        if(minWidth > maxWidth)
            throw new Error(`minWidth (${minWidth}) must not be greater than maxWidth ${maxWidth}`);
        if(minWidth < 0)
            throw new Error(`minWidth (${minWidth}) must not be lesser than 0`);
        if(minHeight == Infinity)
            throw new Error('minHeight must not be infinite');
        if(minHeight > maxHeight)
            throw new Error(`minHeight (${minHeight}) must not be greater than maxHeight ${maxHeight}`);
        if(minHeight < 0)
            throw new Error(`minHeight (${minHeight}) must not be lesser than 0`);

        // Keep track of old dimensions to compare later
        const oldWidth = this.width;
        const oldHeight = this.height;

        // Resolve dimensions
        this.handleResolveDimensions(minWidth, maxWidth, minHeight, maxHeight);

        // Validate resolved dimensions, handling overflows, underflows and
        // invalid dimensions
        if(this.width < minWidth) {
            this.width = minWidth;
            console.warn('Horizontal underflow in widget');
            console.trace();
        }
        else if(this.width > maxWidth) {
            this.width = maxWidth;
            console.warn('Horizontal overflow in widget');
            console.trace();
        }

        if(this.width < 0 || !isFinite(this.width) || isNaN(this.width))
            throw new Error(`Disallowed width (${this.width}) in widget`);

        if(this.height < minHeight) {
            this.height = minHeight;
            console.warn('Vertical underflow in widget');
            console.trace();
        }
        else if(this.height > maxHeight) {
            this.height = maxHeight;
            console.warn('Vertical overflow in widget');
            console.trace();
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
     * @param fillStyle The fill style to use for clearing. If null (default), then the value of {@link ThemeProperty.CanvasFill} is used
     */
    protected clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D, fillStyle: string | CanvasGradient | CanvasPattern | null = null): void {
        if(fillStyle === null)
            fillStyle = this.theme.getFill(ThemeProperty.CanvasFill);

        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        // These are rounded because clipping and filling doesn't
        // work properly with decimal points
        ctx.rect(Math.trunc(x), Math.trunc(y), Math.ceil(width), Math.ceil(height));
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
     * @param fillStyle The fill style to use for clearing. If null (default), then the value of {@link ThemeProperty.CanvasFill} is used
     */
    protected clearStart(ctx: CanvasRenderingContext2D, fillStyle: string | CanvasGradient | CanvasPattern | null = null): void {
        if(fillStyle === null)
            fillStyle = this.theme.getFill(ThemeProperty.CanvasFill);

        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
    }

    /**
     * Paiting utility: end a clear operation (from {@link clearStart}). Should
     * not be overridden.
     *
     * The background fill style used is {@link ThemeProperty.CanvasFill}.
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
     * when extending Widget. Should be overridden.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePainting(_ctx: CanvasRenderingContext2D): void {}

    /**
     * Called when the Widget is dirty and the Root is being rendered. Does
     * nothing if dirty flag is not set, else, clears the background if
     * {@link needsClear} is true, calls the {@link handlePainting} method and
     * unsets the dirty flag. Does nothing if {@link dimensionless} is true.
     * Must not be overridden.
     */
    paint(ctx: CanvasRenderingContext2D): void {
        if(this.dimensionless || !this._dirty)
            return;

        //console.log('Painted', this.constructor.name);

        if(this._enabled) {
            if(this.needsClear)
                this.clear(this.x, this.y, this.width, this.height, ctx);

            ctx.save();
            this.handlePainting(ctx);
            ctx.restore();
        }

        this._dirty = false;
    }
}