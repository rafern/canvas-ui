import type { LayoutContext } from '../core/LayoutContext';
import { Widget } from '../widgets/Widget';

/**
 * A mixin class which provides flexbox-like layout resolution.
 *
 * Flex layout has verticality, a main basis, cross basis and flex ratio.
 *
 * The main basis corresponds to the vertical basis if the layout is vertical,
 * else, it corresponds to the horizontal basis.
 *
 * The cross basis corresponds to the horizontal basis if the layout is
 * vertical, else, it corresponds to the vertical basis.
 *
 * Flex ratio always corresponds to the main axis; flex layout can only expand
 * flexibly in one direction. The flex ratio corresponds to the vertical flex
 * ratio if the layout is vertical, else, it corresponds to the horizontal flex
 * ratio.
 *
 * If there are, for example, two flex widgets, one with a flex ratio of 3 and
 * another with a flex ratio of 5, then the layout will expand to the widgets'
 * basis and then the remaining space will be split among the 2 widgets
 * depending on their flex ratio. In this case, the first widget will get 3/8
 * (3/(3+5)) of the remaining space, while the second widget will get 5/8
 * (5/(3+5)) of the remaining space.
 *
 * An alternative to {@link mainBasis} is {@link internalMainBasis}. mainBasis
 * is meant to be set by the user, while internalMainBasis is meant to be set by
 * the widget every frame. These will be combined into the
 * {@link _effectiveMainBasis} which is the maximum of the two. A counterpart
 * for cross basis also exists.
 *
 * @category Mixin
 */
export class FlexLayout extends Widget {
    /** The current flex ratio of the flexbox */
    private _flexRatio = 1;
    /** The current basis added along the main axis */
    private _mainBasis = 0;
    /** The current basis added along the cross axis */
    private _crossBasis = 0;
    /** The current internal basis added along the main axis */
    private _internalMainBasis = 0;
    /** The current internal basis added along the cross axis */
    private _internalCrossBasis = 0;
    /** The current effective basis added along the main axis */
    private _effectiveMainBasis = 0;
    /** The current effective basis added along the cross axis */
    private _effectiveCrossBasis = 0;
    /** Does this flex layout grow vertically? If null, it inherits */
    private _vertical: boolean | null = null;
    /**
     * Was the last layout vertical or not? Never null. Use this to tell if a
     * widget is vertical or not when painting.
     */
    lastVertical = true;

    /** The flex ratio of the flexbox */
    get flexRatio(): number {
        return this._flexRatio;
    }

    set flexRatio(flexRatio: number) {
        if(this._flexRatio !== flexRatio) {
            this._flexRatio = flexRatio;
            this._layoutDirty = true;
        }
    }

    /**
     * Does this flex layout grow vertically? If null, it inherits the
     * verticality of the layout context when populating/resolving layout.
     */
    get vertical(): boolean | null {
        return this._vertical;
    }

    set vertical(vertical: boolean | null) {
        if(this._vertical !== vertical) {
            this._vertical = vertical;
            this._layoutDirty = true;
        }
    }

    /** The basis added along the main axis */
    get mainBasis(): number {
        return this._mainBasis;
    }

    set mainBasis(mainBasis: number) {
        if(this._mainBasis !== mainBasis) {
            this._mainBasis = mainBasis;
            this.updateEffectiveMainBasis();
        }
    }

    /** The basis added along the cross axis */
    get crossBasis(): number {
        return this._crossBasis;
    }

    set crossBasis(crossBasis: number) {
        if(this._crossBasis !== crossBasis) {
            this._crossBasis = crossBasis;
            this.updateEffectiveCrossBasis();
        }
    }

    /** The internal basis added along the main axis */
    get internalMainBasis(): number {
        return this._internalMainBasis;
    }

    set internalMainBasis(internalMainBasis: number) {
        if(this._internalMainBasis !== internalMainBasis) {
            this._internalMainBasis = internalMainBasis;
            this.updateEffectiveMainBasis();
        }
    }

    /** The internal basis added along the cross axis */
    get internalCrossBasis(): number {
        return this._internalCrossBasis;
    }

    set internalCrossBasis(internalCrossBasis: number) {
        if(this._internalCrossBasis !== internalCrossBasis) {
            this._internalCrossBasis = internalCrossBasis;
            this.updateEffectiveCrossBasis();
        }
    }

    /**
     * Update {@link _effectiveMainBasis}.
     *
     * Sets it to the maximum of {@link _mainBasis} and
     * {@link _internalMainBasis}. If the effective main basis changes,
     * {@link _layoutDirty} is set to true.
     */
    private updateEffectiveMainBasis(): void {
        const effectiveMainBasis = Math.max(this._mainBasis, this._internalMainBasis);
        if(this._effectiveMainBasis !== effectiveMainBasis) {
            this._effectiveMainBasis = effectiveMainBasis;
            this._layoutDirty = true;
        }
    }

    /**
     * Update {@link _effectiveCrossBasis}.
     *
     * Sets it to the maximum of {@link _crossBasis} and
     * {@link _internalCrossBasis}. If the effective main basis changes,
     * {@link _layoutDirty} is set to true.
     */
    private updateEffectiveCrossBasis(): void {
        const effectiveCrossBasis = Math.max(this._crossBasis, this._internalCrossBasis);
        if(this._effectiveCrossBasis !== effectiveCrossBasis) {
            this._effectiveCrossBasis = effectiveCrossBasis;
            this._layoutDirty = true;
        }
    }

    /**
     * Handles layout population by adding the effective basis and flex ratio to
     * the {@link LayoutContext}. Also populates {@link lastVertical}.
     */
    protected override handlePopulateLayout(layoutCtx: LayoutContext): void {
        // Add basis and flex ratio to context
        const vertical = this.vertical ?? layoutCtx.vertical;
        this.lastVertical = vertical;
        if(layoutCtx.vertical === vertical) {
            if(vertical) {
                if(this._flexRatio > 0)
                    layoutCtx.vFlex += this._flexRatio;

                layoutCtx.vBasis += this._effectiveMainBasis;

                if(this._effectiveCrossBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this._effectiveCrossBasis;
            }
            else {
                if(this._flexRatio > 0)
                    layoutCtx.hFlex += this._flexRatio;

                layoutCtx.hBasis += this._effectiveMainBasis;

                if(this._effectiveCrossBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this._effectiveCrossBasis;
            }
        }
        else {
            if(vertical) {
                layoutCtx.hBasis += this._effectiveCrossBasis;

                if(this._effectiveMainBasis > layoutCtx.vBasis)
                    layoutCtx.vBasis = this._effectiveMainBasis;
            }
            else {
                layoutCtx.vBasis += this._effectiveCrossBasis;

                if(this._effectiveMainBasis > layoutCtx.hBasis)
                    layoutCtx.hBasis = this._effectiveMainBasis;
            }
        }
    }

    /**
     * Handles layout resolution by setting the length to the effective basis
     * plus this widget's share of the free space, which is dependent on the
     * flex ratio.
     */
    protected override handleResolveLayout(layoutCtx: LayoutContext): void {
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
                length = this._effectiveMainBasis;
        }
        else {
            if(this._flexRatio > 0) {
                if(vertical)
                    length = (layoutCtx.maxHeight - layoutCtx.vBasis) * this._flexRatio / layoutCtx.vFlex;
                else
                    length = (layoutCtx.maxWidth - layoutCtx.hBasis) * this._flexRatio / layoutCtx.hFlex;

                length = this._effectiveMainBasis + Math.max(0, length);
            }
            else
                length = this._effectiveMainBasis;
        }

        if(vertical) {
            this.resolvedWidth = this._effectiveCrossBasis;
            this.resolvedHeight = length;
        }
        else {
            this.resolvedWidth = length;
            this.resolvedHeight = this._effectiveCrossBasis;
        }
    }
}