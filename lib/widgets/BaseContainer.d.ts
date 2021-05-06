import { SingleParentWidget } from '../widgets/SingleParentWidget';
import { LayoutContext } from './LayoutContext';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
export declare class BaseContainer extends SingleParentWidget {
    backgroundDirty: boolean;
    constructor(child: Widget, propagateEvents: boolean, themeOverride?: Theme | null);
    handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    handlePreLayoutUpdate(root: Root): void;
    handlePostLayoutUpdate(root: Root): void;
    forceLayoutDirty(): void;
    handlePopulateLayout(layoutCtx: LayoutContext): void;
    handleResolveLayout(layoutCtx: LayoutContext): void;
    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    calcChildViewport(x: number, y: number, width: number, height: number): [number, number, number, number];
}
