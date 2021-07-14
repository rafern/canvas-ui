import type { LayoutContext } from '../core/LayoutContext';
import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

// XXX This class is abstract, but marking it abstract breaks mixins. Instead,
//     abstract methods are not marked astract and instead are implemented to
//     immediately throw an exception
/**
 * A generic widget. All widgets extend this class.
 *
 * @category Widget
 */
export class Widget {
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
     */
    private _enabled = true;
    /** Widget will only be painted if dirty is true. */
    protected _dirty = true;
    /** Widget will only have the layout resolved if layoutDirty is true. */
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
    /** The wanted width after layout resolution. */
    protected resolvedWidth = 0;
    /** The wanted height after layout resolution. */
    protected resolvedHeight = 0;

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
            throw 'Widget theme is not ready';

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
     * {@link resolvedWidth} and {@link resolvedHeight}.
     */
    get dimensions(): [number, number] {
        return [this.resolvedWidth, this.resolvedHeight];
    }

    /** Check if the widget is dirty. Returns {@link _dirty}. */
    get dirty(): boolean {
        return this._dirty;
    }

    /** Check if the widget's layout is dirty. Returns {@link _layoutDirty}. */
    get layoutDirty(): boolean {
        return this._layoutDirty;
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
     * {@link PointerEvent}. Should be overridden.
     *
     * If overriding, return the widget that has captured the event (could be
     * this, for example, or a child widget if implementing a container), or
     * null if no widget captured the event.
     */
    protected handleEvent(event: Event, _width: number, _height: number, _root: Root): Widget | null {
        if(event.target === this ||
           ((event instanceof PointerEvent) && (event.target === null)))
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
    dispatchEvent(event: Event, width: number, height: number, root: Root): Widget | null {
        if(!this._enabled)
            return null;

        if(event.target === null) {
            if(event instanceof PointerEvent) {
                if(event.x < 0 || event.y < 0 || event.x >= width || event.y >= height)
                    return null;
            }
        }
        else if(event.target !== this && !this.propagatesEvents)
            return null;

        return this.handleEvent(event, width, height, root);
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
     * The first Widget layout resolution callback. Populates a given
     * {@link LayoutContext} with the wanted basis and flex ratio. Must be
     * implemented. If called and not implemented, an exception is thrown.
     */
    protected handlePopulateLayout(_layoutCtx: LayoutContext): void {
        throw 'Widget.handlePopulateLayout must be implemented';
    }

    /**
     * The second Widget layout resolution callback. Resolves the layout of this
     * widget (sets {@link resolvedWidth} and {@link resolvedHeight}).Must be
     * implemented. If called and not implemented, an exception is thrown.
     */
    protected handleResolveLayout(_layoutCtx: LayoutContext): void {
        throw 'Widget.handleResolveLayout must be implemented';
    }

    /**
     * Wrapper for {@link handlePopulateLayout}. Does nothing if
     * {@link _enabled} is false. Must not be overridden.
     */
    populateLayout(layoutCtx: LayoutContext): void {
        if(!this._enabled)
            return;

        this.handlePopulateLayout(layoutCtx);
    }

    /**
     * Wrapper for {@link handleResolveLayout}. Does nothing if
     * {@link _enabled} is false or {@link _layoutDirty} is false. If the
     * resolved dimensions change, {@link _dirty} is set to true.
     * {@link _layoutDirty} is set to false. Must not be overridden.
     */
    resolveLayout(layoutCtx: LayoutContext): void {
        if(!this._enabled) {
            this.resolvedWidth = 0;
            this.resolvedHeight = 0;
            this._layoutDirty = false;
            return;
        }

        if(this._layoutDirty) {
            const oldWidth = this.resolvedWidth;
            const oldHeight = this.resolvedHeight;
            this.handleResolveLayout(layoutCtx);
            this._layoutDirty = false;

            if(oldWidth !== this.resolvedWidth || oldHeight !== this.resolvedHeight)
                this._dirty = true;

            //console.log('Resolved layout of', this.constructor.name);
        }
    }

    /**
     * Forcefully mark layout as dirty. If overridden, original must be called.
     * Call only when absolutely neccessary, such as in a resize. If
     * implementing a container widget, children should also have their layout
     * forced as dirty.
     *
     * Sets {@link _layoutDirty} and {@link _dirty} to true.
     */
    forceLayoutDirty(): void {
        this._layoutDirty = true;
        this._dirty = true;
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
     * The background fill style used is {@link ThemeProperty.CanvasFill}.
     */
    protected clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        ctx.save();
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = this.theme.getFill(ThemeProperty.CanvasFill);
        ctx.beginPath();
        // These are rounded because clipping and filling doesn't
        // work properly with decimal points
        ctx.rect(Math.trunc(x), Math.trunc(y), Math.ceil(width), Math.ceil(height));
        ctx.clip();
        ctx.fill();
        ctx.restore();
    }

    /**
     * Widget painting callback. By default does nothing. Do painting logic here
     * when extending Widget. Should be overridden.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void {}

    /**
     * Called when the Widget is dirty and the Root is being rendered. Does
     * nothing if dirty flag is not set, else, clears the background if
     * {@link needsClear} is true, calls the {@link handlePainting} method and
     * unsets the dirty flag. Must not be overridden.
     */
    paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        if(!this._dirty)
            return;

        //console.log('Painted', this.constructor.name);

        if(this._enabled) {
            if(this.needsClear)
                this.clear(x, y, width, height, ctx);

            ctx.save();
            this.handlePainting(x, y, width, height, ctx);
            ctx.restore();
        }

        this._dirty = false;
    }
}