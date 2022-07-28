import type { LayoutConstraints } from '../core/LayoutConstraints';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { AxisCoupling } from '../widgets/AxisCoupling';
import type { Bounds } from '../helpers/Bounds';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import { Viewport } from '../core/Viewport';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
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
    /** See {@link ViewportWidget#widthCoupling}. For internal use only */
    private _widthCoupling;
    /** See {@link ViewportWidget#heightCoupling}. For internal use only */
    private _heightCoupling;
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
    private internalViewport;
    /** See {@link ViewportWidget#offset}. For internal use only */
    private _offset;
    /**
     * Child constraints for resolving layout. May be different than
     * {@link ViewportWidget#internalViewport}'s constraints. By default, this
     * is 0 minimum and Infinity maximum per axis.
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
    constructor(child: W, minWidth?: number, minHeight?: number, widthCoupling?: AxisCoupling, heightCoupling?: AxisCoupling, useViewport?: boolean, themeProperties?: ThemeProperties);
    /**
     * Does this viewport widget use a Viewport, or does it just clip the child
     * instead (default)?
     *
     * @returns Returns true if a {@link Viewport} is used; if {@link ViewportWidget#internalViewport} is not null
     */
    get usesViewport(): boolean;
    /**
     * Offset of {@link SingleParent#child}. Positional events will take this
     * into account, as well as rendering. Useful for implementing scrolling.
     */
    get offset(): [number, number];
    set offset(offset: [number, number]);
    /**
     * Accessor for {@link ViewportWidget#_constraints}. If using a
     * {@link ViewportWidget#internalViewport | Viewport}, its constraints are
     * also updated, but may be different due to
     * {@link ViewportWidget#widthCoupling} or
     * {@link ViewportWidget#heightCoupling}.
     */
    set constraints(constraints: LayoutConstraints);
    get constraints(): LayoutConstraints;
    /**
     * Is the width coupled to the child's? If not {@link AxisCoupling.None},
     * width constraints will be ignored or augmented.
     */
    get widthCoupling(): AxisCoupling;
    set widthCoupling(widthCoupling: AxisCoupling);
    /**
     * Is the height coupled to the child's? If not {@link AxisCoupling.None},
     * height constraints will be ignored or augmented.
     */
    get heightCoupling(): AxisCoupling;
    set heightCoupling(heightCoupling: AxisCoupling);
    /**
     * {@link ViewportWidget#minWidth}, but scaled according to
     * {@link Root#resolution}
     */
    get scaledMinWidth(): number;
    /**
     * {@link ViewportWidget#minHeight}, but scaled according to
     * {@link Root#resolution}
     */
    get scaledMinHeight(): number;
    /**
     * {@link ViewportWidget#constraints}, but scaled according to
     * {@link Root#resolution}
     */
    get scaledConstraints(): [number, number, number, number];
    protected onThemeUpdated(property?: string | null): void;
    protected getBoundsOf(widget: Widget): Bounds;
    protected handleEvent(event: Event): Widget | null;
    protected handlePreLayoutUpdate(): void;
    protected handlePostFinalizeBounds(): void;
    protected handlePostLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected afterPositionResolved(): void;
    finalizeBounds(): void;
    activate(root: Root, viewport: Viewport, parent: Widget | null): void;
    private correctChildPosition;
    protected handlePainting(forced: boolean): void;
}
