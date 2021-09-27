import type { LayoutConstraints } from '../core/LayoutConstraints';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
/**
 * A type of container widget which is allowed to be bigger or smaller than its
 * child.
 *
 * Can be constrained to a specific type of children.
 *
 * Allows setting the offset of the child, automatically clips it if neccessary.
 * Otherwise acts like a {@link Container}. Implemented by force re-painting the
 * child and clipping it or, optionally, by using a {@link Viewport} to paint
 * the child widget to a dedicated canvas.
 *
 * @category Widget
 */
export declare class ViewportWidget<W extends Widget = Widget> extends SingleParent<W> {
    /** See {@link widthTied}. For internal use only */
    private _widthTied;
    /** See {@link heightTied}. For internal use only */
    private _heightTied;
    /**
     * The minimum width that this widget will try to expand to.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     *
     * @decorator `@layoutField`
     */
    minWidth: number;
    /**
     * The minimum height that this widget will try to expand to.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     *
     * @decorator `@layoutField`
     */
    minHeight: number;
    /** The actual viewport object, or null if the child is just clipped. */
    private viewport;
    /** See {@link offset}. For internal use only */
    private _offset;
    /**
     * Child constraints for resolving layout. May be different than
     * {@link viewport}'s constraints. By default, this is 0 minimum and
     * Infinity maximum per axis.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     */
    private _constraints;
    /** Force child re-layout? Only used when not using a Viewport */
    protected forceReLayout: boolean;
    /** Force child re-paint? Only used when not using a Viewport */
    protected forceRePaint: boolean;
    /** Create a new ViewportWidget. */
    constructor(child: W, minWidth?: number, minHeight?: number, widthTied?: boolean, heightTied?: boolean, useViewport?: boolean, themeProperties?: ThemeProperties);
    /**
     * Offset of {@link child}. Positional events will take this into account,
     * as well as rendering. Useful for implementing scrolling.
     */
    get offset(): [number, number];
    set offset(offset: [number, number]);
    /**
     * Accessor for {@link _constraints}. If using a {@link Viewport}, its
     * constraints are also updated, but may be different due to
     * {@link widthTied} or {@link heightTied}.
     */
    set constraints(constraints: LayoutConstraints);
    get constraints(): LayoutConstraints;
    /**
     * Is the width tied to the child's? If true, width constraints will be
     * ignored.
     */
    get widthTied(): boolean;
    set widthTied(widthTied: boolean);
    /**
     * Is the height tied to the child's? If true, height constraints will be
     * ignored.
     */
    get heightTied(): boolean;
    set heightTied(heightTied: boolean);
    /** {@link minWidth}, but scaled according to {@link Root.resolution} */
    get scaledMinWidth(): number;
    /** {@link minHeight}, but scaled according to {@link Root.resolution} */
    get scaledMinHeight(): number;
    /** {@link constraints}, but scaled according to {@link Root.resolution} */
    get scaledConstraints(): [number, number, number, number];
    protected onThemeUpdated(property?: string | null): void;
    protected handleEvent(event: Event, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected afterPositionResolved(): void;
    private correctChildPosition;
    protected handlePainting(ctx: CanvasRenderingContext2D, forced: boolean): void;
}
