import type { ThemeProperties } from '../theme/ThemeProperties';
import { FillStyle } from '../theme/FillStyle';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
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
    /** Does the background need to be cleared? */
    protected backgroundDirty: boolean;
    /** Create a new BaseContainer. */
    constructor(child: W, propagateEvents: boolean, themeProperties?: ThemeProperties);
    protected onThemeUpdated(property?: string | null): void;
    protected handleEvent(event: Event): Widget | null;
    protected handlePreLayoutUpdate(): void;
    protected handlePostFinalizeBounds(): void;
    protected handlePostLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected afterPositionResolved(): void;
    /**
     * Implementation of handlePainting; separate from handlePainting so that
     * the fillStyle for the background clear can be overridden.
     */
    protected handleBaseContainerPainting(forced: boolean, fillStyle?: FillStyle | null): void;
    protected handlePainting(forced: boolean): void;
    dryPaint(): void;
    forceDirty(): void;
}
