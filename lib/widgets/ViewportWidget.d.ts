import type { LayoutConstraints } from '../core/LayoutConstraints';
import { AxisCoupling } from '../widgets/AxisCoupling';
import { Widget, WidgetProperties } from './Widget';
import type { Viewport } from '../core/Viewport';
import type { Bounds } from '../helpers/Bounds';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
/**
 * Optional ViewportWidget constructor properties.
 *
 * @category Widget
 */
export interface ViewportWidgetProperties extends WidgetProperties {
    /** Sets {@link ViewportWidget#widthCoupling}. */
    widthCoupling?: AxisCoupling;
    /** Sets {@link ViewportWidget#heightCoupling}. */
    heightCoupling?: AxisCoupling;
    /** Sets {@link ViewportWidget#minWidth}. */
    minWidth?: number;
    /** Sets {@link ViewportWidget#minHeight}. */
    minHeight?: number;
    /**
     * If true, then the {@link ViewportWidget} will use a
     * {@link CanvasViewport} instead of a {@link ClippedViewport}.
     */
    useCanvas?: boolean;
    /** Sets {@link ViewportWidget#offset}. */
    offset?: [number, number];
    /** Sets {@link ViewportWidget#constraints}. */
    constraints?: LayoutConstraints;
}
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
    /**
     * The actual viewport object. Can be a {@link ClippedViewport} or a
     * {@link CanvasViewport}.
     */
    protected readonly internalViewport: Viewport;
    /**
     * Is the internal viewport a {@link CanvasViewport} instance? If true, then
     * the resolution of the {@link Root} will be inherited automatically.
     */
    readonly useCanvas: boolean;
    /**
     * Child constraints for resolving layout. May be different than
     * {@link ViewportWidget#internalViewport}'s constraints. By default, this
     * is 0 minimum and Infinity maximum per axis.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     */
    private _constraints;
    /** Force child re-paint? Only used when not using a Viewport */
    protected forceRePaint: boolean;
    /**
     * The amount of horizontal space to reserve. By default, no space is
     * reserved. Useful for situations where additional parts are needed around
     * the viewport, such as scrollbars in {@link ScrollableViewportWidget}.
     *
     * Note that if scaling is being used, then these values are expected to
     * already be scaled.
     *
     * Should be set before {@link ViewportWidget#handleResolveDimensions} is
     * called.
     */
    protected reservedX: number;
    /** Similar to {@link ViewportWidget#reservedX}, but vertical. */
    protected reservedY: number;
    /** Create a new ViewportWidget. */
    constructor(child: W, properties?: Readonly<ViewportWidgetProperties>);
    /**
     * Offset of {@link SingleParent#child}. Positional events will take this
     * into account, as well as rendering. Useful for implementing scrolling.
     */
    get offset(): [number, number];
    set offset(offset: [number, number]);
    /**
     * Accessor for {@link ViewportWidget#_constraints}. Will also update the
     * constraints of the {@link ViewportWidget#internalViewport | Viewport},
     * but may be different due to {@link ViewportWidget#widthCoupling} or
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
    protected onThemeUpdated(property?: string | null): void;
    protected getBoundsOf(widget: Widget): Bounds;
    protected handleEvent(event: Event): Widget | null;
    protected handlePreLayoutUpdate(): void;
    protected handlePostLayoutUpdate(): void;
    /**
     * Resolve the dimensions of the viewport widget, taking coupling modes and
     * reserved space into account. Note that if space is reserved, then the
     * resulting {@link ViewportWidget#idealWidth} and
     * {@link ViewportWidget#idealHeight} will not include the reserved space.
     * Child classes are expected to add the reserved space to the final
     * dimensions themselves so that they can also be aware of the final
     * non-reserved space.
     */
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    attach(root: Root, viewport: Viewport, parent: Widget | null): void;
    detach(): void;
    protected handlePainting(forced: boolean): void;
}
