import type { Widget, WidgetProperties } from './Widget';
import { MultiContainer } from './MultiContainer';
/**
 * A vertical {@link MultiContainer}.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class Column<W extends Widget = Widget> extends MultiContainer<W> {
    /** Create a new Column. */
    constructor(properties?: Readonly<WidgetProperties>);
}
