import { Widget, WidgetProperties } from './Widget';
import type { Event } from '../events/Event';
import { MultiParent } from './MultiParent';
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
    constructor(vertical: boolean, properties?: Readonly<WidgetProperties>);
    protected onThemeUpdated(property?: string | null): void;
    protected handleEvent(event: Event): Widget | null;
    protected handlePreLayoutUpdate(): void;
    protected handlePostLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    resolvePosition(x: number, y: number): void;
    protected handlePainting(forced: boolean): void;
    dryPaint(): void;
    forceDirty(markLayout?: boolean): void;
}
