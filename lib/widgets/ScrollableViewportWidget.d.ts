import { PassthroughWidget } from './PassthroughWidget';
import { ViewportWidget } from './ViewportWidget';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { ScrollBar } from './ScrollBar';
import type { Widget } from './Widget';
export declare class ScrollableViewportWidget extends PassthroughWidget {
    viewport: ViewportWidget;
    vScroll: ScrollBar;
    hScroll: ScrollBar;
    vScrollHide: boolean;
    hScrollHide: boolean;
    constructor(child: Widget, vertical: boolean, mainBasisTied?: boolean, crossBasisTied?: boolean, themeOverride?: Theme | null);
    get maxDimensions(): [number, number];
    set maxDimensions(maxDimensions: [number, number]);
    get flexRatio(): number;
    set flexRatio(flexRatio: number);
    get mainBasis(): number;
    set mainBasis(mainBasis: number);
    get crossBasis(): number;
    set crossBasis(crossBasis: number);
    get containedChild(): Widget;
    resetScroll(): void;
    handlePreLayoutUpdate(root: Root): void;
    handlePostLayoutUpdate(root: Root): void;
}
