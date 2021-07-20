import { SingleParent } from '../mixins/SingleParent';
import { LayoutContext } from '../core/LayoutContext';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
declare const FlexContainer_base: import("ts-mixer/dist/types/types").Class<[child: Widget, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean], FlexLayout & SingleParent, {
    prototype: FlexLayout;
} & {
    prototype: SingleParent;
}>;
/**
 * A {@link SingleParent} which contains a single child and automatically paints
 * the child, propagates events (if enabled) and handles layout. Like
 * {@link BaseContainer}, but with a {@link FlexLayout | flexbox layout} and no
 * padding or alignment; child is always stretched. If you want padding and/or
 * alignemnt, use a {@link Container} inside this widget. If children of this
 * container have flex-box layout, maxWidth and maxHeight is set to this
 * container's resolved dimensions.
 *
 * @category Widget
 */
export declare class FlexContainer extends FlexContainer_base {
    /** Last layout context used for child */
    protected _lastLayoutCtx: LayoutContext | null;
    /** Create a new FlexContainer. */
    constructor(child: Widget, propagateEvents: boolean, flexRatio?: number, mainBasis?: number, crossBasis?: number, vertical?: boolean | null, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    protected handleResolveLayout(layoutCtx: LayoutContext): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
