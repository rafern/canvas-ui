import type { LayoutContext } from '../core/LayoutContext';
import { Widget } from '../widgets/Widget';
export declare class BoxLayout extends Widget {
    private _boxWidth;
    private _boxHeight;
    get boxWidth(): number;
    set boxWidth(boxWidth: number);
    get boxHeight(): number;
    set boxHeight(boxHeight: number);
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    protected handleResolveLayout(_layoutCtx: LayoutContext): void;
}
