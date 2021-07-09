import type { LayoutContext } from '../core/LayoutContext';
import { SingleParent } from '../mixins/SingleParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A {@link SingleParent} which contains a single child and does nothing,
 * passing all events through to its child. Useful for widgets that are only
 * used for logic, like {@link ThemeScope}.
 *
 * Since this does nothing on its own, it should not be used on its own.
 * Instead, extend this class if you are looking for a way to do wrapper widgets
 * that provide extra logic.
 *
 * @category Widget
 */
export declare class PassthroughWidget extends SingleParent {
    /** Create a new PassthroughWidget. */
    constructor(child: Widget, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    protected handleResolveLayout(layoutCtx: LayoutContext): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
