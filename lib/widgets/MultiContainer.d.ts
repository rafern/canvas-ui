import type { Event } from '../events/Event';
import { MultiParent } from './MultiParent';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A {@link MultiParent} which automatically paints children, adds spacing,
 * propagates events and handles layout.
 *
 * Can be constrained to a specific type of children.
 *
 * Note that there is no padding. Put this inside a {@link Margin} if padding is
 * needed.
 *
 * @category Widget
 */
export declare class MultiContainer<W extends Widget = Widget> extends MultiParent<W> {
    /** Is the container's whole background dirty (including spacing)? */
    private backgroundDirty;
    /** Is this container vertical? */
    private vertical;
    /** Create a MultiContainer. */
    constructor(vertical: boolean, themeOverride?: Theme | null);
    protected handleEvent(event: Event, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void;
}
