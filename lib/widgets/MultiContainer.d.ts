import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Event } from '../events/Event';
import { MultiParent } from './MultiParent';
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
    /** Is the container's background dirty? */
    private backgroundDirty;
    /** Is this container vertical? */
    private vertical;
    /** The unused space along the main axis after resolving dimensions */
    private unusedSpace;
    /** The number of enabled children in this container */
    private enabledChildCount;
    /** Create a MultiContainer. */
    constructor(vertical: boolean, themeProperties?: ThemeProperties);
    protected onThemeUpdated(property?: string | null): void;
    protected handleEvent(event: Event, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected afterPositionResolved(): void;
    protected handlePainting(ctx: CanvasRenderingContext2D, forced: boolean): void;
    dryPaint(): void;
    forceDirty(): void;
}
