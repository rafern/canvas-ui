import type { LayoutContext } from './LayoutContext';
import { Widget } from './Widget';
export declare class BoxWidget extends Widget {
    #private;
    get boxWidth(): number;
    set boxWidth(boxWidth: number);
    get boxHeight(): number;
    set boxHeight(boxHeight: number);
    handlePopulateLayout(layoutCtx: LayoutContext): void;
    handleResolveLayout(_layoutCtx: LayoutContext): void;
}
