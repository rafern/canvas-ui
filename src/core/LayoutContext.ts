export class LayoutContext {
    maxWidth: number;
    maxHeight: number;
    vertical: boolean;

    hBasis = 0;
    vBasis = 0;
    hFlex = 0;
    vFlex = 0;
    sizeChanged = false;

    constructor(maxWidth: number, maxHeight: number, vertical: boolean) {
        this.maxWidth = maxWidth;
        this.maxHeight = maxHeight;
        this.vertical = vertical;
    }

    clone(): LayoutContext {
        const layoutCtx = new LayoutContext(this.maxWidth, this.maxHeight, this.vertical);
        layoutCtx.hBasis = this.hBasis;
        layoutCtx.vBasis = this.vBasis;
        layoutCtx.hFlex = this.hFlex;
        layoutCtx.vFlex = this.vFlex;
        return layoutCtx;
    }

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