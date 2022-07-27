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
    /** The Viewport's child. Painting and layout will be relative to this. */
    readonly child: Widget;
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
     * The maximum retries allowed for
     * {@link Viewport#resolveChildsLayout | resolving the layout}. The first
     * attempt is not counted. Only retries that exceed this limit are
     * discarded; if maxRelayout is 4, then the 5th retry will be discarded.
     */
    private static maxRelayout = 4;

    /**
     * Create a new Viewport.
     *
     * Creates a new canvas with a starting width and height, setting
     * {@link Viewport#canvas} and {@link Viewport#context}. Failure to get a
     * canvas context results in an exception.
     */
    constructor(child: Widget, startingWidth = 64, startingHeight = 64) {
        this.child = child;

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
     * {@link Widget#resolveDimensionsAsTop} with the current
     * {@link Viewport#constraints}, {@link Widget#resolvePosition} and
     * {@link Widget#finalizeBounds}. After calling finalizeBounds,
     * {@link Widget#handlePostFinalizeBounds} is called. Note that if the
     * layout is marked as dirty while resolving the layout, then a re-layout
     * will occur until either the layout is no longer marked as dirty or the
     * {@link Viewport.maxRelayout | maximum retries} are reached.
     *
     * If the child's layout is not dirty, then only handlePostFinalizeBounds is
     * called. Note that this may still trigger a re-layout.
     *
     * Expands {@link Viewport#canvas} if the new layout is too big for the
     * current canvas. Expansion is done in powers of 2 to avoid issues with
     * external 3D libraries.
     *
     * @returns Returns true if the child was resized, else, false.
     */
    resolveChildsLayout(): boolean {
        let relayouts = 0;
        if(!this.child.layoutDirty && !this._dirty) {
            // even if a layout resolution is not needed, the hook still needs
            // to be called at least once per frame
            this.child.postFinalizeBounds();
            relayouts++;

            if(!this.child.layoutDirty)
                return false;
        }

        // Remove constraints' dirty flag
        this._dirty = false;

        // Resolve child's layout
        const [oldWidth, oldHeight] = this.child.dimensions;
        let newWidth = oldWidth;
        let newHeight = oldHeight;
        let wasResized = false;

        while(this.child.layoutDirty) {
            if(relayouts > Viewport.maxRelayout) {
                console.warn('Maximum re-layouts exceeded. Is there a Widget type that is immediately marking the layout as dirty after resolving it?')
                break;
            }
            const [minWidth, maxWidth, minHeight, maxHeight] = this.constraints;

            this.child.resolveDimensionsAsTop(minWidth, maxWidth, minHeight, maxHeight);
            this.child.resolvePosition(0, 0);

            [newWidth, newHeight] = this.child.idealDimensions;
            const [newScaleX, newScaleY] = this.getAppliedScaleFrom(newWidth, newHeight);
            newWidth = Math.round(newWidth * newScaleX) / newScaleX;
            newHeight = Math.round(newHeight * newScaleY) / newScaleY;
            wasResized = newWidth !== oldWidth || newHeight !== oldHeight;

            this.child.finalizeBounds();
            this.child.postFinalizeBounds();

            relayouts++;
        }

        if(relayouts > 1)
            console.warn(`The last frame required ${relayouts - 1} re-layouts. Make sure to only mark a layout as dirty while resolving the layout unless absolutely necessary`);

        // Re-scale canvas if neccessary.
        if(wasResized) {
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
                const oldCanvasWidth = this.canvas.width;
                const oldCanvasHeight = this.canvas.height;

                let copyCanvas = null;
                if(oldCanvasWidth !== 0 && oldCanvasHeight !== 0) {
                    copyCanvas = document.createElement('canvas');
                    copyCanvas.width = oldCanvasWidth;
                    copyCanvas.height = oldCanvasHeight;

                    const copyCtx = copyCanvas.getContext('2d');
                    if(copyCtx === null)
                        throw new Error('Failed to get context of temporary canvas for resizing original canvas');

                    copyCtx.globalCompositeOperation = 'copy';
                    copyCtx.drawImage(
                        this.canvas,
                        0, 0, oldCanvasWidth, oldCanvasHeight,
                        0, 0, oldCanvasWidth, oldCanvasHeight,
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
     * Get the canvas scale that will be applied to the Viewport's child. Used
     * for checking whether a child's dimensions exceed
     * {@link Viewport#maxCanvasWidth} or {@link Viewport#maxCanvasHeight}
     */
    get effectiveScale(): [scaleX: number, scaleY: number] {
        return this.getAppliedScaleFrom(...this.child.dimensions);
    }

    /**
     * Paint a given child to {@link Viewport#canvas}.
     *
     * Nothing is done if the child was not dirty.
     *
     * @param force - Force re-paint even if child.{@link Widget#dirty} is false
     * @returns Returns true if the child was dirty, else, false.
     */
    paintToCanvas(force: boolean): boolean {
        // Paint child
        const wasDirty = this.child.dirty;

        // scale canvas if child dimensions exceed maximum canvas dimensions
        const [scaleX, scaleY] = this.effectiveScale;
        const needsSquish = scaleX !== 1 || scaleY !== 1;
        if(needsSquish) {
            this.context.save();
            this.context.scale(scaleX, scaleY);
        }

        this.child.paint(force);

        if(needsSquish)
            this.context.restore();

        return wasDirty;
    }
}