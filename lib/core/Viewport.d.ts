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
    /** Have the constraints been changed? */
    private _dirty;
    /** The internal canvas. Widgets are painted to this */
    readonly canvas: HTMLCanvasElement;
    /** The internal canvas' context. Alpha is enabled. */
    readonly context: CanvasRenderingContext2D;
    /**
     * Create a new Viewport.
     *
     * Creates a new canvas with a starting width and height, setting
     * {@link canvas} and {@link context}. Failure to get a canvas context
     * results in an exception.
     */
    constructor(startingWidth?: number, startingHeight?: number);
    /** The current dimensions of the {@link canvas | internal canvas} */
    get canvasDimensions(): [number, number];
    /**
     * Resolves the given child's layout by calling
     * {@link Widget.resolveDimensions} with the current {@link constraints},
     * and {@link Widget.resolvePosition}.
     *
     * If the child's layout is not dirty, then nothing is done.
     *
     * Expands {@link canvas} if the new layout is too big for the current
     * canvas. Expansion is done in powers of 2 to avoid issues with external 3D
     * libraries.
     *
     * @returns Returns true if the child was resized, else, false.
     */
    resolveChildsLayout(child: Widget): boolean;
    /**
     * Paint a given child to {@link canvas}.
     *
     * Nothing is done if the child was not dirty.
     *
     * @param force Force re-paint even if {@link dirty} is false
     * @returns Returns true if the child was dirty, else, false.
     */
    paintToCanvas(child: Widget, force: boolean): boolean;
}
