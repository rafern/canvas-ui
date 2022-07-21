import { paintField, paintArrayField } from '../decorators/FlagFields';
import type { LayoutConstraints } from './LayoutConstraints';
import { roundToPower2 } from '../helpers/roundToPower2';
import type { Widget } from '../widgets/Widget';
import { isPower2 } from '../helpers/isPower2';

/**
 * Viewports are internally used to manage a canvas' size and painting. It is
 * used by {@link Root} and {@link ViewportWidget}.
 *
 * @category Core
 */
export class Viewport {
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
    @paintArrayField()
    constraints: LayoutConstraints = [0, Infinity, 0, Infinity];
    /**
     * The maximum width the {@link Viewport#canvas} can have. If the layout
     * exceeds this width, then the content will be scaled to fit the canvas
     */
    @paintField
    maxCanvasWidth = Infinity;
    /**
     * The maximum height the {@link Viewport#canvas} can have. If the layout
     * exceeds this height, then the content will be scaled to fit the canvas
     */
    @paintField
    maxCanvasHeight = Infinity;
    /** Have the constraints been changed? */
    private _dirty = true;

    /** The internal canvas. Widgets are painted to this */
    readonly canvas: HTMLCanvasElement;
    /** The internal canvas' context. Alpha is enabled. */
    readonly context: CanvasRenderingContext2D;

    /** Has the warning for dimensionless canvases been issued? */
    private static dimensionlessWarned = false;
    /** Has the warning for non-power of 2 dimensions been issued? */
    private static powerOf2Warned = false;

    /**
     * Create a new Viewport.
     *
     * Creates a new canvas with a starting width and height, setting
     * {@link Viewport#canvas} and {@link Viewport#context}. Failure to get a
     * canvas context results in an exception.
     */
    constructor(startingWidth = 64, startingHeight = 64) {
        // Create internal canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = startingWidth;
        this.canvas.height = startingHeight;

        // Get context out of canvas
        const context = this.canvas.getContext('2d', { alpha: true });
        if(context === null)
            throw new Error('Failed to get canvas context');

        this.context = context;
    }

    /**
     * The current dimensions of the {@link Viewport#canvas | internal canvas}
     */
    get canvasDimensions(): [number, number] {
        return [this.canvas.width, this.canvas.height];
    }

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
    resolveChildsLayout(child: Widget): boolean {
        if(!child.layoutDirty && !this._dirty)
            return false;

        // Remove constraints' dirty flag
        this._dirty = false;

        // Resolve child's layout
        const [oldWidth, oldHeight] = child.dimensions;
        const [minWidth, maxWidth, minHeight, maxHeight] = this.constraints;

        child.resolveDimensionsAsTop(minWidth, maxWidth, minHeight, maxHeight);
        child.resolvePosition(0, 0);

        let [newWidth, newHeight] = child.idealDimensions;
        const [newScaleX, newScaleY] = this.getAppliedScaleFrom(newWidth, newHeight);
        newWidth = Math.round(newWidth * newScaleX) / newScaleX;
        newHeight = Math.round(newHeight * newScaleY) / newScaleY;
        const wasResized = newWidth !== oldWidth || newHeight !== oldHeight;

        if(wasResized) {
            // Re-scale canvas if neccessary.
            // Canvas dimensions are rounded to the nearest power of 2, favoring
            // bigger powers. This is to avoid issues with mipmapping, which
            // requires texture sizes to be powers of 2. Make sure that the
            // maximum canvas dimensions aren't exceeded
            const newCanvasWidth = Math.min(Math.max(roundToPower2(newWidth), this.canvas.width), this.maxCanvasWidth);
            const newCanvasHeight = Math.min(Math.max(roundToPower2(newHeight), this.canvas.height), this.maxCanvasHeight);

            if(newCanvasWidth === 0 || newCanvasHeight === 0) {
                if(!Viewport.dimensionlessWarned) {
                    Viewport.dimensionlessWarned = true;
                    console.warn('Canvas has 0 width or height. Are you using an empty Root?');
                }
            }
            else if(!isPower2(newCanvasWidth) || !isPower2(newCanvasHeight)) {
                if(!Viewport.powerOf2Warned) {
                    Viewport.powerOf2Warned = true;
                    console.warn('Canvas has a width or height that is not a power of 2, which may create mipmapping issues. Make sure to use power of 2 starting and maximum canvas dimensions.');
                }
            }

            if(newCanvasWidth !== this.canvas.width || newCanvasHeight !== this.canvas.height) {
                // Resizing a canvas clears its contents. To mitigate this, copy
                // the canvas contents to a new canvas, resize the canvas and
                // copy the contents back. To avoid unnecessary copying, the
                // canvas will not be copied if the old dimensions of the child
                // were 0x0
                // TODO resizing is kinda expensive. maybe find a better way?

                let copyCanvas = null;
                if(oldWidth !== 0 && oldHeight !== 0) {
                    copyCanvas = document.createElement('canvas');
                    copyCanvas.width = oldWidth;
                    copyCanvas.height = oldHeight;

                    const copyCtx = copyCanvas.getContext('2d');
                    if(copyCtx === null)
                        throw new Error('Failed to get context of temporary canvas for resizing original canvas');

                    copyCtx.globalCompositeOperation = 'copy';
                    copyCtx.drawImage(
                        this.canvas,
                        0, 0, oldWidth, oldHeight,
                        0, 0, oldWidth, oldHeight,
                    );
                }

                this.canvas.width = newCanvasWidth;
                this.canvas.height = newCanvasHeight;

                if(copyCanvas !== null) {
                    this.context.globalCompositeOperation = 'copy';
                    this.context.drawImage(
                        copyCanvas,
                        0, 0, copyCanvas.width, copyCanvas.height,
                        0, 0, Math.min(copyCanvas.width, this.maxCanvasWidth), Math.min(copyCanvas.height, this.maxCanvasHeight),
                    );
                    this.context.globalCompositeOperation = 'source-over';
                }
            }
        }

        child.finalizeBounds();

        return wasResized;
    }

    /** Get the canvas scale that will be applied given a width and height */
    private getAppliedScaleFrom(width: number, height: number): [scaleX: number, scaleY: number] {
        let scaleX = 1, scaleY = 1;
        if(width > this.maxCanvasWidth)
            scaleX = this.maxCanvasWidth / width;
        if(height > this.maxCanvasHeight)
            scaleY = this.maxCanvasHeight / height;

        return [scaleX, scaleY];
    }

    /**
     * Get the canvas scale that will be applied if the given widget is the
     * Viewport's child. Used for checking whether a child's dimensions exceed
     * {@link Viewport#maxCanvasWidth} or {@link Viewport#maxCanvasHeight}
     */
    getAppliedScale(child: Widget): [scaleX: number, scaleY: number] {
        return this.getAppliedScaleFrom(...child.dimensions);
    }

    /**
     * Paint a given child to {@link Viewport#canvas}.
     *
     * Nothing is done if the child was not dirty.
     *
     * @param force - Force re-paint even if child.{@link Widget#dirty} is false
     * @returns Returns true if the child was dirty, else, false.
     */
    paintToCanvas(child: Widget, force: boolean): boolean {
        // Paint child
        const wasDirty = child.dirty;

        // scale canvas if child dimensions exceed maximum canvas dimensions
        const [scaleX, scaleY] = this.getAppliedScale(child);
        const needsSquish = scaleX !== 1 || scaleY !== 1;
        if(needsSquish) {
            this.context.save();
            this.context.scale(scaleX, scaleY);
        }

        child.paint(this.context, force);

        if(needsSquish)
            this.context.restore();

        return wasDirty;
    }
}