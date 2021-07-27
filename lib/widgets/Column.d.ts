import { MultiContainer } from './MultiContainer';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
/**
 * A vertical {@link MultiContainer}.
 *
 * @category Widget
 */
export declare class Column<W extends Widget = Widget> extends MultiContainer<W> {
    /** Create a new Column. */
    constructor(themeOverride?: Theme | null);
}
