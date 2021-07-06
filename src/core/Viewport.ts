import roundToPower2 from '../helpers/roundToPower2';
import type { Widget } from '../widgets/Widget';
import { LayoutContext } from './LayoutContext';

export class Viewport {
    // Maximum size of viewport. This is passed as a hint to children.  If an
    // axis' maximum length is 0, then there is no maximum for that axis, but it
    // also means that flex components won't expand in that axis.
    private _maxDimensions: [number, number] = [0, 0];
    // Does the viewport need to force-mark layout as dirty?
    private forceLayout = false;

    // The internal canvas
    readonly canvas: HTMLCanvasElement;
    // The internal canvas context
    readonly context: CanvasRenderingContext2D;

    // Is the layout context vertical?
    vertical = true;

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

    get canvasDimensions(): [number, number] {
        return [this.canvas.width, this.canvas.height];
    }

    set maxDimensions(maxDimensions: [number, number]) {
        if(this._maxDimensions[0] !== maxDimensions[0] ||
           this._maxDimensions[1] !== maxDimensions[1]) {
            this._maxDimensions[0] = maxDimensions[0];
            this._maxDimensions[1] = maxDimensions[1];
            this.forceLayout = true;
        }
    }

    get maxDimensions(): [number, number] {
        return [this._maxDimensions[0], this._maxDimensions[1]];
    }

    populateChildsLayout(child: Widget): LayoutContext | null {
        // Force layout resolution
        if(this.forceLayout) {
            this.forceLayout = false;
            child.forceLayoutDirty();
        }

        // If layout is not dirty, no context is returned; update not needed
        if(!child.layoutDirty)
            return null;

        // Populate layout context
        const layoutCtx = new LayoutContext(
            this._maxDimensions[0], this._maxDimensions[1], this.vertical,
        );

        child.populateLayout(layoutCtx);

        return layoutCtx;
    }

    resolveChildsLayout(child: Widget, layoutCtx: LayoutContext | null): boolean {
        if(!child.layoutDirty || layoutCtx === null)
            return false;

        // Resolve child's layout
        const [oldWidth, oldHeight] = child.dimensions;

        child.resolveLayout(layoutCtx);

        const [newWidth, newHeight] = child.dimensions;

        let childResized = false;
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

            childResized = true;
        }

        // Force-mark child as dirty if a resize occurred. A resize of
        // child components still counts as a resize, hence why this flag is
        // used instead of the conditional for comparing the old size and the
        // new size. If it didn't count, then a flex component that expands to
        // its maximum size would never trigger a redraw even if it changed size
        if(layoutCtx.sizeChanged || childResized)
            child.forceLayoutDirty();

        return childResized;
    }

    paintToCanvas(child: Widget): boolean {
        // Paint child
        const wasDirty = child.dirty;
        if(wasDirty)
            child.paint(0, 0, ...child.dimensions, this.context);

        return wasDirty;
    }
}