import { roundToPower2 } from '../helpers/roundToPower2';
import { paintField } from '../decorators/FlagFields';
import type { Widget } from '../widgets/Widget';
import { isPower2 } from '../helpers/isPower2';
import { BaseViewport } from './BaseViewport';
import { DynMsg, Msg } from './Strings';
import { PointerEvent } from '../events/PointerEvent';
import { Event } from '../events/Event';

/**
 * Viewports are internally used to manage a canvas' size and painting. It is
 * used by {@link Root} and {@link ViewportWidget}.
 *
 * @category Core
 */
export class CanvasViewport extends BaseViewport {
    readonly context: CanvasRenderingContext2D;
    /** The internal canvas. Widgets are painted to this */
    readonly canvas: HTMLCanvasElement;
    /**
     * The maximum width the {@link CanvasViewport#canvas} can have. If the
     * layout exceeds this width, then the content will be scaled to fit the
     * canvas
     */
    @paintField
    maxCanvasWidth = 16384;
    /**
     * The maximum height the {@link CanvasViewport#canvas} can have. If the
     * layout exceeds this height, then the content will be scaled to fit the
     * canvas
     */
    @paintField
    maxCanvasHeight = 16384;

    /**
     * Create a new CanvasViewport.
     *
     * Creates a new canvas with a starting width and height, setting
     * {@link CanvasViewport#canvas} and {@link Viewport#context}. Failure to
     * get a canvas context results in an exception.
     */
    constructor(child: Widget, startingWidth = 64, startingHeight = 64) {
        super(child);

        // Create internal canvas
        this.canvas = document.createElement('canvas');
        this.canvas.width = startingWidth;
        this.canvas.height = startingHeight;

        // Get context out of canvas
        const context = this.canvas.getContext('2d', { alpha: true });
        if(context === null)
            throw new Error(Msg.CANVAS_CONTEXT);

        this.context = context;
    }

    /**
     * The current dimensions of the
     * {@link CanvasViewport#canvas | internal canvas}
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
    resolveLayout(): boolean {
        let relayouts = 0;
        if(!(this.child.layoutDirty || this._dirty)) {
            // even if a layout resolution is not needed, the hook still needs
            // to be called at least once per frame
            this.child.postFinalizeBounds();
            relayouts++;

            if(!this.child.layoutDirty)
                return false;
        }

        // Resolve child's layout
        const [oldWidth, oldHeight] = this.child.dimensions;
        let newWidth = oldWidth;
        let newHeight = oldHeight;
        let wasResized = false;

        while(this.child.layoutDirty || this._dirty) {
            if(relayouts > BaseViewport.maxRelayout) {
                console.warn(Msg.MAX_RELAYOUTS);
                break;
            }

            this._dirty = false;
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
            console.warn(DynMsg.RELAYOUTS(relayouts));

        // Re-scale canvas if neccessary.
        if(wasResized) {
            // Canvas dimensions are rounded to the nearest power of 2, favoring
            // bigger powers. This is to avoid issues with mipmapping, which
            // requires texture sizes to be powers of 2. Make sure that the
            // maximum canvas dimensions aren't exceeded
            const newCanvasWidth = Math.min(Math.max(roundToPower2(newWidth), this.canvas.width), this.maxCanvasWidth);
            const newCanvasHeight = Math.min(Math.max(roundToPower2(newHeight), this.canvas.height), this.maxCanvasHeight);

            if(newCanvasWidth === 0 || newCanvasHeight === 0) {
                if(!BaseViewport.dimensionlessWarned) {
                    BaseViewport.dimensionlessWarned = true;
                    console.warn(Msg.DIMENSIONLESS_CANVAS);
                }
            }
            else if(!isPower2(newCanvasWidth) || !isPower2(newCanvasHeight)) {
                if(!BaseViewport.powerOf2Warned) {
                    BaseViewport.powerOf2Warned = true;
                    console.warn(Msg.NON_POW2_CANVAS);
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
                        throw new Error(Msg.CANVAS_CONTEXT);

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

    get effectiveScale(): [scaleX: number, scaleY: number] {
        return this.getAppliedScaleFrom(...this.child.dimensions);
    }

    /**
     * Implements {@link Viewport#paint}, but only paints to the
     * {@link CanvasViewport#canvas | internal canvas}.
     */
    paintToInternal(force: boolean): boolean {
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

    paint(force: boolean): boolean {
        const wasDirty = this.paintToInternal(force);

        // Paint to parent viewport, if any
        if(this.parent !== null) {
            // TODO how will offsets be handler
            this.parent.context.drawImage(
                this.canvas,
                xDst - origXDst,
                yDst - origYDst,
                wClipped,
                hClipped,
                xDst,
                yDst,
                wClipped,
                hClipped,
            );
        }

        return wasDirty;
    }

    override dispatchEvent(event: Event): Widget | null {
        // CanvasViewports have positions relative to the canvas, not the Root.
        // Correct positions of events.
        if(event instanceof PointerEvent) {
            const [cl, ct, _cw, _ch] = this.rect;

            if(cl !== 0 || ct !== 0)
                event = event.correctOffset(cl, ct);
        }

        return super.dispatchEvent(event);
    }
}