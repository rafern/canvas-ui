import type { LayoutContext } from '../core/LayoutContext';
import { SingleParent } from '../mixins/SingleParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
export declare class PassthroughWidget extends SingleParent {
    constructor(child: Widget, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    protected handleResolveLayout(layoutCtx: LayoutContext): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
