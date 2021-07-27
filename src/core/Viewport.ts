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
            throw 'Failed to get canvas context';

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
     * Resolves the given child's layout by calling {@link Widget.resolveLayout}
     * with the current {@link constraints}.
     *
     * If the child's layout is not dirty, then resolveLayout is not called.
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

        child.resolveLayout(...this.constraints);

        const [newWidth, newHeight] = child.dimensions;

        if(newWidth !== oldWidth || newHeight !== oldHeight) {
            // Re-scale canvas if neccessary.
            // Canvas dimensions are rounded to the nearest power of 2, favoring
            // bigger powers. This is to avoid issues with mipmapping, which
            // requires texture sizes to be powers of 2.
            const potentialCWidth = roundToPower2(newWidth);
            if(potentialCWidth > this.canvas.width)
                this.canvas.width = potentialCWidth;

            const potentialCHeight = roundToPower2(newHeight);
            if(potentialCHeight > this.canvas.height)
                this.canvas.height = potentialCHeight;

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
            child.paint(0, 0, this.context);

        return wasDirty;
    }
}