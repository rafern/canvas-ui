import { LayoutContext } from '../core/LayoutContext';
import { MultiParent } from '../mixins/MultiParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A {@link MultiParent} which automatically paints children, adds spacing,
 * propagates events and handles layout.
 *
 * Note that there is no padding. Put this inside a {@link Margin} if padding is
 * needed.
 *
 * @category Widget
 */
export declare class MultiContainer extends MultiParent {
    /** Is the container's whole background dirty (including spacing)? */
    private backgroundDirty;
    /** Is this container vertical? */
    private vertical;
    /** Temporary layout context for layout resolution. */
    private innerContext;
    /** Create a MultiContainer. */
    constructor(vertical: boolean, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    forceLayoutDirty(): void;
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    protected handleResolveLayout(layoutCtx: LayoutContext): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
