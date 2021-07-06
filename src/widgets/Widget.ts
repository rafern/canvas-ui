import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import type { LayoutContext } from './LayoutContext';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
export class Widget {
    // Is this widget enabled? If it isn't, it will act as if it didn't exist
    #enabled = true;
    // Widget will only be drawed if dirty is true
    dirty = true;
    // Widget will only have the layout resolved if layoutDirty is true
    layoutDirty = true;
    // Widget will have its background cleared on draw if needsClear is true
    readonly needsClear: boolean;
    // Widget will get targetted events even if the target is not itself if it
    // propagates events
    readonly propagatesEvents: boolean;
    // The theme override used by the Widget. If this is null, the Widget's
    // theme will be the inherited theme, else, it will be the theme override
    // with the inherited theme as the fallback. The fallback of the theme
    // override will be ignored and replaced
    #themeOverride: Theme | null;
    // The current theme in use by the Widget
    #theme: Theme | null = null;
    // The inherited theme
    #inheritedTheme: Theme | null = null;
    // The resolved width and height
    resolvedWidth = 0;
    resolvedHeight = 0;

    // Constructor
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean) {
        this.needsClear = needsClear;
        this.propagatesEvents = propagatesEvents;
        this.#themeOverride = themeOverride;
    }

    // Called when the inherited theme of this Widget is updated. Can be
    // overridden. Does nothing by default
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    updateInheritedTheme(): void {} // XXX protected

    // Update this widget's current theme, with theme override set up. Must not
    // be overridden
    updateTheme(): void { // XXX private
        if(this.#themeOverride === null)
            this.#theme = this.#inheritedTheme;
        else {
            this.#themeOverride.fallback = this.#inheritedTheme;
            this.#theme = this.#themeOverride;
        }
    }

    // The current theme in use by the Widget. If there is no theme, throws an
    // exception
    get theme(): Theme {
        if(this.#theme === null)
            throw 'Widget theme is not ready';

        return this.#theme;
    }

    // Is this widget enabled?
    get enabled(): boolean {
        return this.#enabled;
    }

    // Enable this widget
    enable(): void {
        if(!this.#enabled) {
            this.#enabled = true;
            this.layoutDirty = true;
            this.dirty = true;
        }
    }

    // Disable this widget
    disable(): void {
        if(this.#enabled) {
            this.#enabled = false;
            this.layoutDirty = true;
            this.dirty = false;
        }
    }

    // Set the theme override of this widget. Should not be overridden, but can
    // be. If overridden, the original method should still be called.
    setThemeOverride(theme: Theme | null): void {
        // Abort if theme hasn't changed
        if(this.#themeOverride === theme)
            return;

        this.#themeOverride = theme;
        this.updateTheme();

        if(this.#enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }

    // Get the theme override of this widget. Must not be overridden
    getThemeOverride(): Theme | null {
        return this.#themeOverride;
    }

    // Set the inherited theme of this Widget. Should not be overridden, but can
    // be. If overridden, the original method should still be called.
    inheritTheme(theme: Theme): void {
        // Abort if theme hasn't changed
        if(this.#inheritedTheme === theme)
            return;

        this.#inheritedTheme = theme;
        this.updateInheritedTheme();
        this.updateTheme();

        if(this.#enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }

    // Get the inherited theme of this widget. Must not be overridden
    getInheritedTheme(): Theme | null {
        return this.#inheritedTheme;
    }

    // Called when a focus type owned by this Widget has been dropped. Does
    // nothing by default. Can be overridden
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFocusDropped(_focusType: FocusType, _root: Root): void {}

    // Widget event handling callback. If the event is to be captured, the
    // capturer is returned, else, null. By default, this will do nothing and
    // capture the event if it is targetted at itself or is a PointerEvent.
    // Should be overridden
    handleEvent(event: Event, _width: number, _height: number, _root: Root): Widget | null { // XXX protected
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
        if(!this.#enabled)
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
    handlePreLayoutUpdate(_root: Root): void {}

    // Called before the layout is resolved. Calls its handler if widget is
    // enabled. Must not be implemented
    preLayoutUpdate(root: Root): void {
        if(this.#enabled)
            this.handlePreLayoutUpdate(root);
    }

    // Widget layout resolution callbacks. handlePopulateLayout is called on the
    // first stage, which fills the layout context with what the Widget wants in
    // terms of layout, while handleResolveLayout is called on the second stage,
    // where the final width and height are resolved. Must be implemented
    // XXX I would make these abstract, but Typescript has a bug that prevents
    // Mixins from being constrained to abstract classes, so this would prevent
    // Mixins like Clickable from existing. See issue #29653:
    // https://github.com/microsoft/TypeScript/issues/29653
    handlePopulateLayout(_layoutCtx: LayoutContext): void { // XXX protected
        throw new Error('Widget.handlePopulateLayout not implemented');
    }

    handleResolveLayout(_layoutCtx: LayoutContext): void { // XXX protected
        throw new Error('Widget.handleResolveLayout not implemented');
    }

    // Wrappers for handlePopulateLayout and handleResolveLayout. Only call
    // callbacks when the layout is dirty, except when populating. If the layout
    // was dirty and is resolved, the dirty flag is also set (used for
    // painting). Must not be overridden
    populateLayout(layoutCtx: LayoutContext): void {
        if(!this.#enabled)
            return;

        this.handlePopulateLayout(layoutCtx);
    }

    resolveLayout(layoutCtx: LayoutContext): void {
        if(!this.#enabled) {
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
        if(this.#enabled) {
            this.layoutDirty = true;
            this.dirty = true;
        }
    }

    // Does nothing by default. Should be implemented
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handlePostLayoutUpdate(_root: Root): void {}

    // Called after the layout is resolved. Calls its handler if widget is
    // enabled. Must not be implemented
    postLayoutUpdate(root: Root): void {
        if(this.#enabled)
            this.handlePostLayoutUpdate(root);
    }

    // Paiting utility: clears background of widget. Should not be overridden
    clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
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
    handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void {} // XXX protected

    // Called when the Widget is dirty and the Root is being rendered. Does
    // nothing if dirty flag is not set, else, clears the background if
    // needsClear is true, calls the handlePainting method and unsets the dirty
    // flag. Must not be overridden
    paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        if(!this.dirty)
            return;

        //console.log('Painted', this.constructor.name);

        if(this.#enabled) {
            if(this.needsClear)
                this.clear(x, y, width, height, ctx);

            ctx.save();
            this.handlePainting(x, y, width, height, ctx);
            ctx.restore();
        }

        this.dirty = false;
    }
}