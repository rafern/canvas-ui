import type { LayoutContext } from './LayoutContext';
import { Widget } from './Widget';

// XXX I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
export class FlexWidget extends Widget {
    // A widget with flexbox layout resolution

    // The flex ratio of the flexbox
    private _flexRatio = 1;
    // The minimum main-axis and cross-axis lengths
    private _mainBasis = 0;
    private _crossBasis = 0;
    // Like mainBasis and crossBasis, but meant to be updated per frame. The
    // biggest of the two sets will be used
    private _internalMainBasis = 0;
    private _internalCrossBasis = 0;
    // The last effective mainBasis and crossBasis, aka, the last used maximum
    // between the internal and normal set of basis
    private effectiveMainBasis = 0;
    private effectiveCrossBasis = 0;
    // Growth direction of flexbox. Is it vertical? If null, it will inherit the
    // verticality of the layout context
    private _vertical: boolean | null = null;
    // Was the last layout vertical or not? Never null
    lastVertical = true;

    get flexRatio(): number {
        return this._flexRatio;
    }

    set flexRatio(flexRatio: number) {
        if(this._flexRatio !== flexRatio) {
            this._flexRatio = flexRatio;
            this.layoutDirty = true;
        }
    }

    get vertical(): boolean | null {
        return this._vertical;
    }

    set vertical(vertical: boolean | null) {
        if(this._vertical !== vertical) {
            this._vertical = vertical;
            this.layoutDirty = true;
        }
    }

    get mainBasis(): number {
        return this._mainBasis;
    }

    set mainBasis(mainBasis: number) {
        if(this._mainBasis !== mainBasis) {
            this._mainBasis = mainBasis;
            this.updateEffectiveMainBasis();
        }
    }

    get crossBasis(): number {
        return this._crossBasis;
    }

    set crossBasis(crossBasis: number) {
        if(this._crossBasis !== crossBasis) {
            this._crossBasis = crossBasis;
            this.updateEffectiveCrossBasis();
        }
    }

    get internalMainBasis(): number {
        return this._internalMainBasis;
    }

    set internalMainBasis(internalMainBasis: number) {
        if(this._internalMainBasis !== internalMainBasis) {
            this._internalMainBasis = internalMainBasis;
            this.updateEffectiveMainBasis();
        }
    }

    get internalCrossBasis(): number {
        return this._internalCrossBasis;
    }

    set internalCrossBasis(internalCrossBasis: number) {
        if(this._internalCrossBasis !== internalCrossBasis) {
            this._internalCrossBasis = internalCrossBasis;
            this.updateEffectiveCrossBasis();
        }
    }

    private updateEffectiveMainBasis(): void {
        const effectiveMainBasis = Math.max(this._mainBasis, this._internalMainBasis);
        if(this.effectiveMainBasis !== effectiveMainBasis) {
            this.effectiveMainBasis = effectiveMainBasis;
            this.layoutDirty = true;
        }
    }

    private updateEffectiveCrossBasis(): void {
        const effectiveCrossBasis = Math.max(this._crossBasis, this._internalCrossBasis);
        if(this.effectiveCrossBasis !== effectiveCrossBasis) {
            this.effectiveCrossBasis = effectiveCrossBasis;
            this.layoutDirty = true;
        }
    }

    handlePopulateLayout(layoutCtx: LayoutContext): void {
        // Add basis and flex ratio to context
        const vertical = this.vertical ?? layoutCtx.vertical;
        this.lastVertical = vertical;
        if(layoutCtx.vertical === vertical) {
            if(vertical) {
                if(this._flexRatio > 0)
                    layoutCtx.vFlex += this._flexRatio;

                layoutCtx.vBasis += this.effectiveMainBasis;

                if(this.effectiveCrossBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this.effectiveCrossBasis;
            }
            else {
                if(this._flexRatio > 0)
                    layoutCtx.hFlex += this._flexRatio;

                layoutCtx.hBasis += this.effectiveMainBasis;

                if(this.effectiveCrossBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this.effectiveCrossBasis;
            }
        }
        else {
            if(vertical) {
                layoutCtx.hBasis += this.effectiveCrossBasis;

                if(this.effectiveMainBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this.effectiveMainBasis;
            }
            else {
                layoutCtx.vBasis += this.effectiveCrossBasis;

                if(this.effectiveMainBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this.effectiveMainBasis;
            }
        }
    }

    handleResolveLayout(layoutCtx: LayoutContext): void {
        // Length is flex ratio of available space plus minimum length.
        // If the context's verticality is different, expand fully, unless the
        // flex ratio is not set.
        let length;

        const vertical = this.vertical ?? layoutCtx.vertical;
        if(layoutCtx.vertical !== vertical) {
            if(this._flexRatio > 0) {
                if(vertical)
                    length = layoutCtx.maxHeight;
                else
                    length = layoutCtx.maxWidth;
            }
            else
                length = this.effectiveMainBasis;
        }
        else {
            if(this._flexRatio > 0) {
                if(vertical)
                    length = (layoutCtx.maxHeight - layoutCtx.vBasis) * this._flexRatio / layoutCtx.vFlex;
                else
                    length = (layoutCtx.maxWidth - layoutCtx.hBasis) * this._flexRatio / layoutCtx.hFlex;

                length = this.effectiveMainBasis + Math.max(0, length);
            }
            else
                length = this.effectiveMainBasis;
        }

        if(vertical) {
            this.resolvedWidth = this.effectiveCrossBasis;
            this.resolvedHeight = length;
        }
        else {
            this.resolvedWidth = length;
            this.resolvedHeight = this.effectiveCrossBasis;
        }
    }
}