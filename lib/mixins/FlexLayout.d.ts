import type { LayoutContext } from '../core/LayoutContext';
import { Widget } from '../widgets/Widget';
export declare class FlexLayout extends Widget {
    private _flexRatio;
    private _mainBasis;
    private _crossBasis;
    private _internalMainBasis;
    private _internalCrossBasis;
    private _effectiveMainBasis;
    private _effectiveCrossBasis;
    private _vertical;
    lastVertical: boolean;
    get flexRatio(): number;
    set flexRatio(flexRatio: number);
    get vertical(): boolean | null;
    set vertical(vertical: boolean | null);
    get mainBasis(): number;
    set mainBasis(mainBasis: number);
    get crossBasis(): number;
    set crossBasis(crossBasis: number);
    get internalMainBasis(): number;
    set internalMainBasis(internalMainBasis: number);
    get internalCrossBasis(): number;
    set internalCrossBasis(internalCrossBasis: number);
    private updateEffectiveMainBasis;
    private updateEffectiveCrossBasis;
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    protected handleResolveLayout(layoutCtx: LayoutContext): void;
}
