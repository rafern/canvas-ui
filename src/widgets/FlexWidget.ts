import type { LayoutContext } from './LayoutContext';
import { Widget } from './Widget';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FXIME I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
export class FlexWidget extends Widget {
    // A widget with flexbox layout resolution

    // The flex ratio of the flexbox
    #flexRatio = 1;
    // The minimum main-axis and cross-axis lengths
    #mainBasis = 0;
    #crossBasis = 0;
    // Like mainBasis and crossBasis, but meant to be updated per frame. The
    // biggest of the two sets will be used
    #internalMainBasis = 0;
    #internalCrossBasis = 0;
    // The last effective mainBasis and crossBasis, aka, the last used maximum
    // between the internal and normal set of basis
    #effectiveMainBasis = 0;
    #effectiveCrossBasis = 0;
    // Growth direction of flexbox. Is it vertical? If null, it will inherit the
    // verticality of the layout context
    #vertical: boolean | null = null;
    // Was the last layout vertical or not? Never null
    lastVertical = true;

    get flexRatio(): number {
        return this.#flexRatio;
    }

    set flexRatio(flexRatio: number) {
        if(this.#flexRatio !== flexRatio) {
            this.#flexRatio = flexRatio;
            this.layoutDirty = true;
        }
    }

    get vertical(): boolean | null {
        return this.#vertical;
    }

    set vertical(vertical: boolean | null) {
        if(this.#vertical !== vertical) {
            this.#vertical = vertical;
            this.layoutDirty = true;
        }
    }

    get mainBasis(): number {
        return this.#mainBasis;
    }

    set mainBasis(mainBasis: number) {
        if(this.#mainBasis !== mainBasis) {
            this.#mainBasis = mainBasis;
            this.updateEffectiveMainBasis();
        }
    }

    get crossBasis(): number {
        return this.#crossBasis;
    }

    set crossBasis(crossBasis: number) {
        if(this.#crossBasis !== crossBasis) {
            this.#crossBasis = crossBasis;
            this.updateEffectiveCrossBasis();
        }
    }

    get internalMainBasis(): number {
        return this.#internalMainBasis;
    }

    set internalMainBasis(internalMainBasis: number) {
        if(this.#internalMainBasis !== internalMainBasis) {
            this.#internalMainBasis = internalMainBasis;
            this.updateEffectiveMainBasis();
        }
    }

    get internalCrossBasis(): number {
        return this.#internalCrossBasis;
    }

    set internalCrossBasis(internalCrossBasis: number) {
        if(this.#internalCrossBasis !== internalCrossBasis) {
            this.#internalCrossBasis = internalCrossBasis;
            this.updateEffectiveCrossBasis();
        }
    }

    updateEffectiveMainBasis(): void { // XXX private
        const effectiveMainBasis = Math.max(this.#mainBasis, this.#internalMainBasis);
        if(this.#effectiveMainBasis !== effectiveMainBasis) {
            this.#effectiveMainBasis = effectiveMainBasis;
            this.layoutDirty = true;
        }
    }

    updateEffectiveCrossBasis(): void { // XXX private
        const effectiveCrossBasis = Math.max(this.#crossBasis, this.#internalCrossBasis);
        if(this.#effectiveCrossBasis !== effectiveCrossBasis) {
            this.#effectiveCrossBasis = effectiveCrossBasis;
            this.layoutDirty = true;
        }
    }

    override handlePopulateLayout(layoutCtx: LayoutContext): void {
        // Add basis and flex ratio to context
        const vertical = this.vertical ?? layoutCtx.vertical;
        this.lastVertical = vertical;
        if(layoutCtx.vertical === vertical) {
            if(vertical) {
                if(this.#flexRatio > 0)
                    layoutCtx.vFlex += this.#flexRatio;

                layoutCtx.vBasis += this.#effectiveMainBasis;

                if(this.#effectiveCrossBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this.#effectiveCrossBasis;
            }
            else {
                if(this.#flexRatio > 0)
                    layoutCtx.hFlex += this.#flexRatio;

                layoutCtx.hBasis += this.#effectiveMainBasis;

                if(this.#effectiveCrossBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this.#effectiveCrossBasis;
            }
        }
        else {
            if(vertical) {
                layoutCtx.hBasis += this.#effectiveCrossBasis;

                if(this.#effectiveMainBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this.#effectiveMainBasis;
            }
            else {
                layoutCtx.vBasis += this.#effectiveCrossBasis;

                if(this.#effectiveMainBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this.#effectiveMainBasis;
            }
        }
    }

    override handleResolveLayout(layoutCtx: LayoutContext): void {
        // Length is flex ratio of available space plus minimum length.
        // If the context's verticality is different, expand fully, unless the
        // flex ratio is not set.
        let length;

        const vertical = this.vertical ?? layoutCtx.vertical;
        if(layoutCtx.vertical !== vertical) {
            if(this.#flexRatio > 0) {
                if(vertical)
                    length = layoutCtx.maxHeight;
                else
                    length = layoutCtx.maxWidth;
            }
            else
                length = this.#effectiveMainBasis;
        }
        else {
            if(this.#flexRatio > 0) {
                if(vertical)
                    length = (layoutCtx.maxHeight - layoutCtx.vBasis) * this.#flexRatio / layoutCtx.vFlex;
                else
                    length = (layoutCtx.maxWidth - layoutCtx.hBasis) * this.#flexRatio / layoutCtx.hFlex;

                length = this.#effectiveMainBasis + Math.max(0, length);
            }
            else
                length = this.#effectiveMainBasis;
        }

        if(vertical) {
            this.resolvedWidth = this.#effectiveCrossBasis;
            this.resolvedHeight = length;
        }
        else {
            this.resolvedWidth = length;
            this.resolvedHeight = this.#effectiveCrossBasis;
        }
    }
}