import type { FillStyle } from '../theme/FillStyle';
import type { Widget } from '../widgets/Widget';
import { BaseViewport } from './BaseViewport';
/**
 * A {@link Viewport} with an internal canvas, where the rendering context used
 * for the Viewport is the internal canvas' context instead of an inherited
 * context from a parent Viewport.
 *
 * Mostly used as the top-most Viewport, such as the Viewport in a {@link Root}.
 *
 * Coordinates are relative to the internal canvas, instead of absolute. Because
 * of this, viewport contents may be blurred if the position of the viewport is
 * fractional.
 *
 * @category Core
 */
export declare class CanvasViewport extends BaseViewport {
    readonly context: CanvasRenderingContext2D;
    /** The internal canvas. Widgets are painted to this */
    readonly canvas: HTMLCanvasElement;
    /**
     * The maximum width the {@link CanvasViewport#canvas} can have. If the
     * layout exceeds this width, then the content will be scaled to fit the
     * canvas
     */
    maxCanvasWidth: number;
    /**
     * The maximum height the {@link CanvasViewport#canvas} can have. If the
     * layout exceeds this height, then the content will be scaled to fit the
     * canvas
     */
    maxCanvasHeight: number;
    /**
     * The resolution of the canvas. If possible, the canvas will be scaled by
     * this amount.
     */
    resolution: number;
    /** Does the canvas size need to be updated? For internal use only. */
    protected _forceResize: boolean;
    /** Previous horizontal effective scale. For internal use only. */
    private _prevESX;
    /** Previous vertical effective scale. For internal use only. */
    private _prevESY;
    /**
     * Create a new CanvasViewport.
     *
     * Creates a new canvas with a starting width and height, setting
     * {@link CanvasViewport#canvas} and {@link Viewport#context}. Failure to
     * get a canvas context results in an exception.
     */
    constructor(child: Widget, resolution?: number, startingWidth?: number, startingHeight?: number);
    /**
     * The current dimensions of the
     * {@link CanvasViewport#canvas | internal canvas}
     */
    get canvasDimensions(): [number, number];
    /**
     * Resolves the Viewport child's layout (including position) in one call,
     * using the previous position.
     *
     * May resize or rescale the canvas.
     *
     * Expands {@link CanvasViewport#canvas} if the new layout is too big for
     * the current canvas. Expansion is done in powers of 2 to avoid issues with
     * external 3D libraries.
     *
     * @returns Returns true if the widget or canvas were resized, or the canvas rescaled, else, false.
     */
    resolveLayout(): boolean;
    get effectiveScale(): [scaleX: number, scaleY: number];
    /**
     * Implements {@link Viewport#paint}, but only paints to the
     * {@link CanvasViewport#canvas | internal canvas}. Call this instead of
     * {@link Viewport#paint} if you are using this Viewport's canvas as the
     * output canvas (such as in the {@link Root}).
     */
    paintToInternal(force: boolean): boolean;
    paint(force: boolean, backgroundFillStyle: FillStyle): boolean;
}
