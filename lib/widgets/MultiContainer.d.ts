import { MultiParentWidget } from '../widgets/MultiParentWidget';
import { LayoutContext } from './LayoutContext';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
export declare class MultiContainer extends MultiParentWidget {
    #private;
    constructor(vertical: boolean, themeOverride?: Theme | null);
    handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    handlePreLayoutUpdate(root: Root): void;
    handlePostLayoutUpdate(root: Root): void;
    forceLayoutDirty(): void;
    handlePopulateLayout(layoutCtx: LayoutContext): void;
    handleResolveLayout(layoutCtx: LayoutContext): void;
    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
