import type { LayoutConstraints } from "./LayoutConstraints";
import type { FillStyle } from "../theme/FillStyle";
import type { Widget } from "../widgets/Widget";
import type { Event } from "../events/Event";
import type { Rect } from "../helpers/Rect";
import type { Viewport } from "./Viewport";
/**
 * The base implementation of the {@link Viewport} interface. See
 * {@link CanvasViewport} and {@link ClippedViewport}.
 *
 * @category Core
 */
export declare abstract class BaseViewport implements Viewport {
    readonly relativeCoordinates: boolean;
    readonly child: Widget;
    abstract readonly context: CanvasRenderingContext2D;
    constraints: LayoutConstraints;
    rect: Rect;
    abstract get effectiveScale(): [scaleX: number, scaleY: number];
    parent: Viewport | null;
    offset: [x: number, y: number];
    /** Has the warning for dimensionless canvases been issued? */
    protected static dimensionlessWarned: boolean;
    /** Has the warning for non-power of 2 dimensions been issued? */
    protected static powerOf2Warned: boolean;
    /**
     * The maximum retries allowed for
     * {@link Viewport#resolveLayout | resolving the layout}. The first attempt
     * is not counted. Only retries that exceed this limit are discarded; if
     * maxRelayout is 4, then the 5th retry will be discarded.
     */
    protected static maxRelayout: number;
    protected constructor(child: Widget, relativeCoordinates: boolean);
    /**
     * Force-marks all flags as dirty in {@link BaseViewport#child} and calls
     * {@link BaseViewport#updateChildPos}. Used as a callback for the
     * {@link BaseViewport#rect} field watcher.
     */
    private updateEverything;
    /**
     * Force-marks all flags as dirty in {@link BaseViewport#child}. Used as a
     * callback for the {@link BaseViewport#constraints} field watcher.
     */
    private forceLayoutDirty;
    /**
     * Resolves the position of the child and finalizes its bounds. This
     * effectively updates the position of the child in an out-of-order fashion
     * (doesn't wait for the proper stage of the layout resolution). Used as a
     * callback for the {@link BaseViewport#offset} field watcher.
     */
    private updateChildPos;
    /**
     * Resolves the given child's layout by calling
     * {@link Widget#resolveDimensionsAsTop} with the current
     * {@link Viewport#constraints}, {@link Widget#resolvePosition} and
     * {@link Widget#finalizeBounds}.
     *
     * Handles both relative and absolute coordinates. The previous position is
     * used.
     *
     * @returns Returns true if the child was resized, else, false.
     */
    resolveLayout(): boolean;
    abstract paint(force: boolean, backgroundFillStyle: FillStyle): boolean;
    dispatchEvent(event: Event): Widget | null;
    /**
     * Get the rect of the child alongside more extra information,
     * clipped/clamped to the bounds of the viewport. For internal use only.
     */
    protected getClippedViewport(): [vpX: number, vpY: number, vpW: number, vpH: number, origXDst: number, origYDst: number, xDst: number, yDst: number, wClipped: number, hClipped: number];
}
