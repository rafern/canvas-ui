import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import type { LayoutContext } from './LayoutContext';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

// XXX This class is abstract, but marking it abstract breaks mixins. Instead,
//     abstract methods are marked astract and TS errors are ignored
export class Widget {
    // Is this widget enabled? If it isn't, it will act as if it didn't exist
    private _enabled = true;
    // Widget will only be drawed if dirty is true
    protected dirty = true;
    // Widget will only have the layout resolved if layoutDirty is true
    protected layoutDirty = true;
    // Widget will have its background cleared on draw if needsClear is true
    readonly needsClear: boolean;
    // Widget will get targetted events even if the target is not itself if it
    // propagates events
    readonly propagatesEvents: boolean;
    // The theme override used by the Widget. If this is null, the Widget's
    // theme will be the inherited theme, else, it will be the theme override
    // with the inherited theme as the fallback. The fallback of the theme
    // override will be ignored and replaced
    private _themeOverride: Theme | null;
    // The current theme in use by the Widget
    private _theme: Theme | null = null;
    // The inherited theme
    private _inheritedTheme: Theme | null = null;
    // The resolved width and height
    protected resolvedWidth = 0;
    protected resolvedHeight = 0;

    // Constructor
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean) {
        this.needsClear = needsClear;
        this.propagatesEvents = propagatesEvents;
        this._themeOverride = themeOverride;
    }

    // Called when the inherited theme of this Widget is updated. Can be
    // overridden. Does nothing by default
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected updateInheritedTheme(): void {}

    // Update this widget's current theme, with theme override set up. Must not
    // be overridden
    private updateTheme(): void {
        if(this._themeOverride === null)
            this._theme = this._inheritedTheme;
        else {
            this._themeOverride.fallback = this._inheritedTheme;
            this._theme = this._themeOverride;
        }
    }

    // The current theme in use by the Widget. If there is no theme, throws an
    // exception
    get theme(): Theme {
        if(this._theme === null)
            throw 'Widget theme is not ready';

        return this._theme;
    }

    // Is this widget enabled?
    get enabled(): boolean {
        return this._enabled;
    }

    // Enable or disable this widget
    set enabled(enabled: boolean) {
        if(enabled === this._enabled)
            return;

        this._enabled = enabled;
        this.dirty = enabled;
        this.layoutDirty = true;
    }

    // Set the theme override of this widget. Should not be overridden, but can
    // be. If overridden, the original method should still be called.
    protected setThemeOverride(theme: Theme | null): void {
        // Abort if theme hasn't changed
        if(this._themeOverride === theme)
            return;

        this._themeOverride = theme;
        this.updateTheme();

        if(this._enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }

    // Set the theme override of this widget. Calls setThemeOverride
    set themeOverride(theme: Theme | null) {
        this.setThemeOverride(theme);
    }

    // Get the theme override of this widget
    get themeOverride(): Theme | null {
        return this._themeOverride;
    }

    // Set the inherited theme of this Widget. Should not be overridden, but can
    // be. If overridden, the original method should still be called.
    protected inheritTheme(theme: Theme | null): void {
        // Abort if theme hasn't changed
        if(this._inheritedTheme === theme)
            return;

        this._inheritedTheme = theme;
        this.updateInheritedTheme();
        this.updateTheme();

        if(this._enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }

    // Set the theme override of this widget. Calls inheritTheme
    set inheritedTheme(theme: Theme | null) {
        this.inheritTheme(theme);
    }

    // Get the theme override of this widget
    get inheritedTheme(): Theme | null {
        return this._inheritedTheme;
    }

    // Called when a focus type owned by this Widget has been dropped. Does
    // nothing by default. Can be overridden
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFocusDropped(_focusType: FocusType, _root: Root): void {}

    // Widget event handling callback. If the event is to be captured, the
    // capturer is returned, else, null. By default, this will do nothing and
    // capture the event if it is targetted at itself or is a PointerEvent.
    // Should be overridden
    protected handleEvent(event: Event, _width: number, _height: number, _root: Root): Widget | null {
        if(event.target === this ||
           ((event instanceof PointerEvent) && (event.target === null)))
            return this;
        else
            return null;
    }

    // Called when an event is passed to the Widget. Checks if the target
    // matches the Widget, unless the Widget propagates events, or if the event
    // is a PointerEvent and is in the bounds of the Widget. If neither of the
    // conditions are true, the event is not captured (null is returned), else,
    // the handleEvent method is called and its result is returned. Must not be
    // overridden
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

    // Does nothing by default. Should be implemented
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePreLayoutUpdate(_root: Root): void {}

    // Called before the layout is resolved. Calls its handler if widget is
    // enabled. Must not be implemented
    preLayoutUpdate(root: Root): void {
        if(this._enabled)
            this.handlePreLayoutUpdate(root);
    }

    // Widget layout resolution callbacks. handlePopulateLayout is called on the
    // first stage, which fills the layout context with what the Widget wants in
    // terms of layout, while handleResolveLayout is called on the second stage,
    // where the final width and height are resolved. Must be implemented
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: "Abstract methods can only appear within an abstract class"
    abstract protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: "Abstract methods can only appear within an abstract class"
    abstract protected handleResolveLayout(layoutCtx: LayoutContext): void;

    // Wrappers for handlePopulateLayout and handleResolveLayout. Only call
    // callbacks when the layout is dirty, except when populating. If the layout
    // was dirty and is resolved, the dirty flag is also set (used for
    // painting). Must not be overridden
    populateLayout(layoutCtx: LayoutContext): void {
        if(!this._enabled)
            return;

        this.handlePopulateLayout(layoutCtx);
    }

    resolveLayout(layoutCtx: LayoutContext): void {
        if(!this._enabled) {
            this.resolvedWidth = 0;
            this.resolvedHeight = 0;
            this.layoutDirty = false;
            return;
        }

        if(this.layoutDirty) {
            const oldWidth = this.resolvedWidth;
            const oldHeight = this.resolvedHeight;
            this.handleResolveLayout(layoutCtx);
            this.layoutDirty = false;

            if(oldWidth !== this.resolvedWidth || oldHeight !== this.resolvedHeight)
                this.dirty = true;

            //console.log('Resolved layout of', this.constructor.name);
        }
    }

    // Forcefully mark layout as dirty. If overridden, original must be called.
    // Call only when absolutely neccessary, such as in a resize
    forceLayoutDirty(): void {
        if(this._enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }

    // Does nothing by default. Should be implemented
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePostLayoutUpdate(_root: Root): void {}

    // Called after the layout is resolved. Calls its handler if widget is
    // enabled. Must not be overridden
    postLayoutUpdate(root: Root): void {
        if(this._enabled)
            this.handlePostLayoutUpdate(root);
    }

    // Paiting utility: clears background of widget. Should not be overridden
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

    // Widget painting callback. By default does nothing. Do painting logic here
    // when extending Widget. Should be overridden
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void {}

    // Called when the Widget is dirty and the Root is being rendered. Does
    // nothing if dirty flag is not set, else, clears the background if
    // needsClear is true, calls the handlePainting method and unsets the dirty
    // flag. Must not be overridden
    paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        if(!this.dirty)
            return;

        //console.log('Painted', this.constructor.name);

        if(this._enabled) {
            if(this.needsClear)
                this.clear(x, y, width, height, ctx);

            ctx.save();
            this.handlePainting(x, y, width, height, ctx);
            ctx.restore();
        }

        this.dirty = false;
    }
}