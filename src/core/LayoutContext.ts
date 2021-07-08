/**
 * A layout context is an object used to keep track of how much flex ratio and
 * basis each {@link Widget} wants when resolving layout. It also keeps track of
 * the maximum width and height flexbox-like layouts can expand to and the
 * verticality of the layout.
 *
 * @category Core
 */
export class LayoutContext {
    /** The maximum width a flexbox-like layout can expand to */
    maxWidth: number;
    /** The maximum height a flexbox-like layout can expand to */
    maxHeight: number;
    /** Is this layout vertical (grows down)? If not, grows right */
    vertical: boolean;

    /** The currently wanted horizontal basis */
    hBasis = 0;
    /** The currently wanted vertical basis */
    vBasis = 0;
    /** The current sum of all wanted horizontal flex ratios */
    hFlex = 0;
    /** The current sum of all wanted vertical flex ratios */
    vFlex = 0;
    /** Has the size changed? */
    sizeChanged = false;

    /**
     * Create a new LayoutContext. Sets {@link maxWidth}, {@link maxHeight} and
     * {@link vertical}.
     */
    constructor(maxWidth: number, maxHeight: number, vertical: boolean) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.vertical = vertical;
    }

    /**
     * Create a new LayoutContext with the exact same properties as this layout
     * context, except sizeChanged which will be false.
     */
    clone(): LayoutContext {
        const layoutCtx = new LayoutContext(this.maxWidth, this.maxHeight, this.vertical);
        layoutCtx.hBasis = this.hBasis;
        layoutCtx.vBasis = this.vBasis;
        layoutCtx.hFlex = this.hFlex;
        layoutCtx.vFlex = this.vFlex;
        // XXX shouldn't sizeChanged also be set?
        return layoutCtx;
    }

    /**
     * Add basis to this layout context.
     *
     * If this is a vertical layout, vertical basis will be added to
     * {@link vBasis} while horizontal basis will be set to the maximum of the
     * new horizontal basis and {@link hBasis}.
     *
     * If this is not a vertical layout, horizontal basis will be added to
     * {@link hBasis} while vertical basis will be set to the maximum of the new
     * vertical basis and {@link vBasis}.
     */
    addBasis(hBasis: number, vBasis: number): void {
        // Add length to main-axis basis and update biggest cross-axis basis
        if(this.vertical) {
            this.vBasis += vBasis;

            if(hBasis > this.hBasis)
                this.hBasis = hBasis;
        }
        else {
            this.hBasis += hBasis;

            if(vBasis > this.vBasis)
                this.vBasis = vBasis;
        }
    }
}