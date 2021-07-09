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
export declare class FlexLayout extends Widget {
    /** The current flex ratio of the flexbox */
    private _flexRatio;
    /** The current basis added along the main axis */
    private _mainBasis;
    /** The current basis added along the cross axis */
    private _crossBasis;
    /** The current internal basis added along the main axis */
    private _internalMainBasis;
    /** The current internal basis added along the cross axis */
    private _internalCrossBasis;
    /** The current effective basis added along the main axis */
    private _effectiveMainBasis;
    /** The current effective basis added along the cross axis */
    private _effectiveCrossBasis;
    /** Does this flex layout grow vertically? If null, it inherits */
    private _vertical;
    /**
     * Was the last layout vertical or not? Never null. Use this to tell if a
     * widget is vertical or not when painting.
     */
    lastVertical: boolean;
    /** The flex ratio of the flexbox */
    get flexRatio(): number;
    set flexRatio(flexRatio: number);
    /**
     * Does this flex layout grow vertically? If null, it inherits the
     * verticality of the layout context when populating/resolving layout.
     */
    get vertical(): boolean | null;
    set vertical(vertical: boolean | null);
    /** The basis added along the main axis */
    get mainBasis(): number;
    set mainBasis(mainBasis: number);
    /** The basis added along the cross axis */
    get crossBasis(): number;
    set crossBasis(crossBasis: number);
    /** The internal basis added along the main axis */
    get internalMainBasis(): number;
    set internalMainBasis(internalMainBasis: number);
    /** The internal basis added along the cross axis */
    get internalCrossBasis(): number;
    set internalCrossBasis(internalCrossBasis: number);
    /**
     * Update {@link _effectiveMainBasis}.
     *
     * Sets it to the maximum of {@link _mainBasis} and
     * {@link _internalMainBasis}. If the effective main basis changes,
     * {@link _layoutDirty} is set to true.
     */
    private updateEffectiveMainBasis;
    /**
     * Update {@link _effectiveCrossBasis}.
     *
     * Sets it to the maximum of {@link _crossBasis} and
     * {@link _internalCrossBasis}. If the effective main basis changes,
     * {@link _layoutDirty} is set to true.
     */
    private updateEffectiveCrossBasis;
    /**
     * Handles layout population by adding the effective basis and flex ratio to
     * the {@link LayoutContext}. Also populates {@link lastVertical}.
     */
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    /**
     * Handles layout resolution by setting the length to the effective basis
     * plus this widget's share of the free space, which is dependent on the
     * flex ratio.
     */
    protected handleResolveLayout(layoutCtx: LayoutContext): void;
}
