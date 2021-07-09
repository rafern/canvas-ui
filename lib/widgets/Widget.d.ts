import type { LayoutContext } from '../core/LayoutContext';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
/**
 * A generic widget. All widgets extend this class.
 *
 * @category Widget
 */
export declare class Widget {
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
     */
    private _enabled;
    /** Widget will only be painted if dirty is true. */
    protected _dirty: boolean;
    /** Widget will only have the layout resolved if layoutDirty is true. */
    protected _layoutDirty: boolean;
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
    private _themeOverride;
    /** The current theme in use by the Widget. */
    private _theme;
    /** The inherited theme. */
    private _inheritedTheme;
    /** The wanted width after layout resolution. */
    protected resolvedWidth: number;
    /** The wanted height after layout resolution. */
    protected resolvedHeight: number;
    /** Create a new Widget. */
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean);
    /**
     * Called when the inherited theme of this Widget is updated. Can be
     * overridden. Does nothing by default.
     */
    protected updateInheritedTheme(): void;
    /** Update this widget's current theme, with theme override set up. */
    private updateTheme;
    /**
     * The current theme in use by the Widget. If there is no theme, throws an
     * exception.
     */
    get theme(): Theme;
    /**
     * Is this widget enabled? If it isn't, it will act as if it doesn't exist.
     *
     * If changed, {@link _enabled} is set, {@link _layoutDirty} is set to true
     * and {@link _dirty} is set to true if enabled or false if not enabled.
     *
     * If getting, {@link _enabled} is returned.
     */
    set enabled(enabled: boolean);
    get enabled(): boolean;
    /**
     * Set the theme override of this widget. Should not be overridden, but can
     * be. If overridden, the original method should still be called.
     *
     * Calls {@link updateTheme} and sets {@link _layoutDirty} and
     * {@link _dirty} to true if widget is enabled.
     */
    protected setThemeOverride(theme: Theme | null): void;
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
    set themeOverride(theme: Theme | null);
    get themeOverride(): Theme | null;
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
    protected inheritTheme(theme: Theme | null): void;
    /**
     * The inherited theme of this widget.
     *
     * If setting, calls {@link inheritTheme}.
     *
     * If getting, returns {@link _inheritedTheme}.
     */
    set inheritedTheme(theme: Theme | null);
    get inheritedTheme(): Theme | null;
    /**
     * Get the resolved dimensions. Returns a 2-tuple containing
     * {@link resolvedWidth} and {@link resolvedHeight}.
     */
    get dimensions(): [number, number];
    /** Check if the widget is dirty. Returns {@link _dirty}. */
    get dirty(): boolean;
    /** Check if the widget's layout is dirty. Returns {@link _layoutDirty}. */
    get layoutDirty(): boolean;
    /**
     * Called when a focus type owned by this Widget has been dropped. Does
     * nothing by default. Can be overridden.
     */
    onFocusDropped(_focusType: FocusType, _root: Root): void;
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
    protected handleEvent(event: Event, _width: number, _height: number, _root: Root): Widget | null;
    /**
     * Called when an event is passed to the Widget. Checks if the target
     * matches the Widget, unless the Widget propagates events, or if the event
     * is a {@link PointerEvent} and is in the bounds of the Widget. If neither
     * of the conditions are true, the event is not captured (null is returned),
     * else, the {@link handleEvent} method is called and its result is
     * returned. Must not be overridden.
     *
     * @returns Returns the widget that captured the event or null if none
     * captured the event.
     */
    dispatchEvent(event: Event, width: number, height: number, root: Root): Widget | null;
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
     * The first Widget layout resolution callback. Populates a given
     * {@link LayoutContext} with the wanted basis and flex ratio. Must be
     * implemented. If called and not implemented, an exception is thrown.
     */
    protected handlePopulateLayout(_layoutCtx: LayoutContext): void;
    /**
     * The second Widget layout resolution callback. Resolves the layout of this
     * widget (sets {@link resolvedWidth} and {@link resolvedHeight}).Must be
     * implemented. If called and not implemented, an exception is thrown.
     */
    protected handleResolveLayout(_layoutCtx: LayoutContext): void;
    /**
     * Wrapper for {@link handlePopulateLayout}. Does nothing if
     * {@link _enabled} is false. Must not be overridden.
     */
    populateLayout(layoutCtx: LayoutContext): void;
    /**
     * Wrapper for {@link handleResolveLayout}. Does nothing if
     * {@link _enabled} is false or {@link _layoutDirty} is false. If the
     * resolved dimensions change, {@link _dirty} is set to true.
     * {@link _layoutDirty} is set to false. Must not be overridden.
     */
    resolveLayout(layoutCtx: LayoutContext): void;
    /**
     * Forcefully mark layout as dirty. If overridden, original must be called.
     * Call only when absolutely neccessary, such as in a resize. If
     * implementing a container widget, children should also have their layout
     * forced as dirty.
     *
     * Sets {@link _layoutDirty} and {@link _dirty} to true.
     */
    forceLayoutDirty(): void;
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
     * The background fill style used is {@link ThemeProperty.CanvasFill}.
     */
    protected clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    /**
     * Widget painting callback. By default does nothing. Do painting logic here
     * when extending Widget. Should be overridden.
     */
    protected handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
    /**
     * Called when the Widget is dirty and the Root is being rendered. Does
     * nothing if dirty flag is not set, else, clears the background if
     * {@link needsClear} is true, calls the {@link handlePainting} method and
     * unsets the dirty flag. Must not be overridden.
     */
    paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
