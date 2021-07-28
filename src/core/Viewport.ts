import { roundToPower2 } from '../helpers/roundToPower2';
import type { Widget } from '../widgets/Widget';

/**
 * Viewports are internally used to manage a canvas' size and painting. It is
 * used by {@link Root} and {@link ViewportWidget}.
 *
 * @category Core
 */
export class Viewport {
    /**
     * Constraints of viewport. For internal use only.
     *
     * By default, has no minimum width nor height and unconstrained maximum
     * width and height.
     *
     * See {@link constraints}.
     */
    private _constraints: [number, number, number, number] = [0, Infinity, 0, Infinity];
    /** Have the constraints been changed? */
    private dirty = true;

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

    /** The current dimensions of the {@link canvas | internal canvas} */
    get canvasDimensions(): [number, number] {
        return [this.canvas.width, this.canvas.height];
    }

    /**
     * Layout constraints of viewport when resolving widget's layout. A 4-tuple
     * containing, respectively, minimum width, maximum width, minimum height
     * and maximum height.
     *
     * See {@link _constraints}.
     */
    set constraints(constraints: [number, number, number, number]) {
        if(this._constraints[0] !== constraints[0] ||
           this._constraints[1] !== constraints[1] ||
           this._constraints[2] !== constraints[2] ||
           this._constraints[3] !== constraints[3]) {
            this._constraints[0] = constraints[0];
            this._constraints[1] = constraints[1];
            this._constraints[2] = constraints[2];
            this._constraints[3] = constraints[3];
            this.dirty = true;
        }
    }

    get constraints(): [number, number, number, number] {
        return [...this._constraints];
    }

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
    resolveChildsLayout(child: Widget): boolean {
        if(!child.layoutDirty && !this.dirty)
            return false;

        // Remove constraints' dirty flag
        this.dirty = false;

        // Resolve child's layout
        const [oldWidth, oldHeight] = child.dimensions;

        child.resolveDimensions(...this.constraints);

        // Resolve dimensions again, now with maximum constraints. This is so
        // that widgets that depend on max constraints, such as containers that
        // handle flexbox layout, work properly. Only do this if constraints
        // don't already have maximum dimensions.
        if(this._constraints[1] === Infinity || this._constraints[3] === Infinity) {
            const [minWidth, maxWidth, minHeight, maxHeight] = this._constraints;
            const [width, height] = child.dimensions;
            child.resolveDimensions(
                minWidth,
                maxWidth === Infinity ? width : maxWidth,
                minHeight,
                maxHeight === Infinity ? height : maxHeight,
            );
        }

        child.resolvePosition(0, 0);

        const [newWidth, newHeight] = child.dimensions;

        if(newWidth !== oldWidth || newHeight !== oldHeight) {
            // Re-scale canvas if neccessary.
            // Canvas dimensions are rounded to the nearest power of 2, favoring
            // bigger powers. This is to avoid issues with mipmapping, which
            // requires texture sizes to be powers of 2.
            const newCanvasWidth = Math.max(roundToPower2(newWidth), this.canvas.width);
            const newCanvasHeight = Math.max(roundToPower2(newHeight), this.canvas.height);

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
                    const copyCtx = copyCanvas.getContext('2d');
                    if(copyCtx === null)
                        throw new Error('Failed to get context of temporary canvas for resizing original canvas');

                    copyCtx.globalCompositeOperation = 'copy';
                    copyCtx.drawImage(
                        this.canvas,
                        0, 0, newWidth, newHeight,
                        0, 0, newWidth, newHeight,
                    );
                }

                this.canvas.width = newCanvasWidth;
                this.canvas.height = newCanvasHeight;

                if(copyCanvas !== null) {
                    this.context.globalCompositeOperation = 'copy';
                    this.context.drawImage(
                        copyCanvas,
                        0, 0, newWidth, newHeight,
                        0, 0, newWidth, newHeight,
                    );
                    this.context.globalCompositeOperation = 'source-over';
                }
            }

            return true;
        }
        else
            return false;
    }

    /**
     * Paint a given child to {@link canvas}.
     *
     * Nothing is done if the child was not dirty.
     *
     * @returns Returns true if the child was dirty, else, false.
     */
    paintToCanvas(child: Widget): boolean {
        // Paint child
        const wasDirty = child.dirty;
        if(wasDirty)
            child.paint(this.context);

        return wasDirty;
    }
}