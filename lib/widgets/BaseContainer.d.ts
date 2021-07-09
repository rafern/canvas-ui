import { SingleParent } from '../mixins/SingleParent';
import { LayoutContext } from '../core/LayoutContext';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A {@link SingleParent} which contains a single child and automatically paints
 * the child, adds padding, propagates events (if enabled) and handles layout.
 *
 * @category Widget
 */
export declare class BaseContainer extends SingleParent {
    /** Is the container's whole background dirty (including padding)? */
    protected _backgroundDirty: boolean;
    /** Create a new BaseContainer. */
    constructor(child: Widget, propagateEvents: boolean, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    forceLayoutDirty(): void;
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    protected handleResolveLayout(layoutCtx: LayoutContext): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    /**
     * Calculate the "viewport" of the child. Here, viewport refers to the
     * rectangle where the child will be painted and has no connection to
     * {@link Viewport}.
     *
     * Separated into this method because it takes padding and alignment into
     * account, and is used in multiple methods.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's
     * offset, the right edge's offset, the top edge's offset and the bottom
     * edge's offset.
     */
    private calcChildViewport;
}
