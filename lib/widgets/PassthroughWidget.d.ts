import { Widget, WidgetProperties } from './Widget';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
/**
 * A {@link SingleParent} which contains a single child and does nothing,
 * passing all events through to its child. Useful for widgets that are only
 * used for logic, like {@link ThemeScope}.
 *
 * Can be constrained to a specific type of children.
 *
 * Since this does nothing on its own, it should not be used on its own.
 * Instead, extend this class if you are looking for a way to do wrapper widgets
 * that provide extra logic.
 *
 * @category Widget
 */
export declare class PassthroughWidget<W extends Widget = Widget> extends SingleParent<W> {
    /** Create a new PassthroughWidget. */
    constructor(child: W, properties?: Readonly<WidgetProperties>);
    protected handleEvent(event: Event): Widget | null;
    protected handlePreLayoutUpdate(): void;
    protected handlePostLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    resolvePosition(x: number, y: number): void;
    protected handlePainting(forced: boolean): void;
}
