import type { LayoutContext } from './LayoutContext';
import { Widget } from './Widget';
export declare class FlexWidget extends Widget {
    _flexRatio: number;
    _mainBasis: number;
    _crossBasis: number;
    _internalMainBasis: number;
    _internalCrossBasis: number;
    effectiveMainBasis: number;
    effectiveCrossBasis: number;
    _vertical: boolean | null;
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
    updateEffectiveMainBasis(): void;
    updateEffectiveCrossBasis(): void;
    handlePopulateLayout(layoutCtx: LayoutContext): void;
    handleResolveLayout(layoutCtx: LayoutContext): void;
}
