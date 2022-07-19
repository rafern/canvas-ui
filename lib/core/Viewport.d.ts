import type { LayoutConstraints } from './LayoutConstraints';
import type { Widget } from '../widgets/Widget';
/**
 * Viewports are internally used to manage a canvas' size and painting. It is
 * used by {@link Root} and {@link ViewportWidget}.
 *
 * @category Core
 */
export declare class Viewport {
    /**
     * Layout constraints of viewport when resolving widget's layout. A 4-tuple
     * containing, respectively, minimum width, maximum width, minimum height
     * and maximum height.
     *
     * By default, has no minimum width nor height and unconstrained maximum
     * width and height.
     *
     * @decorator `@paintArrayField()`
     */
    constraints: LayoutConstraints;
    /**
     * The maximum width the {@link Viewport#canvas} can have. If the layout
     * exceeds this width, then the content will be scaled to fit the canvas
     */
    maxCanvasWidth: number;
    /**
     * The maximum height the {@link Viewport#canvas} can have. If the layout
     * exceeds this height, then the content will be scaled to fit the canvas
     */
    maxCanvasHeight: number;
    /** Have the constraints been changed? */
    private _dirty;
    /** The internal canvas. Widgets are painted to this */
    readonly canvas: HTMLCanvasElement;
    /** The internal canvas' context. Alpha is enabled. */
    readonly context: CanvasRenderingContext2D;
    /** Has the warning for dimensionless canvases been issued? */
    private static dimensionlessWarned;
    /** Has the warning for non-power of 2 dimensions been issued? */
    private static powerOf2Warned;
    /**
     * Create a new Viewport.
     *
     * Creates a new canvas with a starting width and height, setting
     * {@link Viewport#canvas} and {@link Viewport#context}. Failure to get a
     * canvas context results in an exception.
     */
    constructor(startingWidth?: number, startingHeight?: number);
    /**
     * The current dimensions of the {@link Viewport#canvas | internal canvas}
     */
    get canvasDimensions(): [number, number];
    /**
     * Resolves the given child's layout by calling
     * {@link Widget#resolveDimensions} with the current
     * {@link Viewport#constraints}, and {@link Widget#resolvePosition}.
     *
     * If the child's layout is not dirty, then nothing is done.
     *
     * Expands {@link Viewport#canvas} if the new layout is too big for the
     * current canvas. Expansion is done in powers of 2 to avoid issues with
     * external 3D libraries.
     *
     * @returns Returns true if the child was resized, else, false.
     */
    resolveChildsLayout(child: Widget): boolean;
    /**
     * Get the canvas scale that will be applied if the given widget is the
     * Viewport's child. Used for checking whether a child's dimensions exceed
     * {@link Viewport#maxCanvasWidth} or {@link Viewport#maxCanvasHeight}
     */
    getAppliedScale(child: Widget): [scaleX: number, scaleY: number];
    /**
     * Paint a given child to {@link Viewport#canvas}.
     *
     * Nothing is done if the child was not dirty.
     *
     * @param force - Force re-paint even if child.{@link Widget#dirty} is false
     * @returns Returns true if the child was dirty, else, false.
     */
    paintToCanvas(child: Widget, force: boolean): boolean;
}
