import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A {@link SingleParent} which contains a single child and automatically paints
 * the child, adds padding, propagates events (if enabled) and handles layout.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export declare class BaseContainer<W extends Widget = Widget> extends SingleParent<W> {
    /** Horizontal offset of child relative to container. */
    private offsetX;
    /** Vertical offset of child relative to container. */
    private offsetY;
    /** Create a new BaseContainer. */
    constructor(child: W, propagateEvents: boolean, themeOverride?: Theme | null);
    protected handleEvent(event: Event, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void;
}
