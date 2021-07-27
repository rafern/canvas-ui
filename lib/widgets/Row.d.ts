import { MultiContainer } from './MultiContainer';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
/**
 * A horizontal {@link MultiContainer}.
 *
 * @category Widget
 */
export declare class Row<W extends Widget = Widget> extends MultiContainer<W> {
    /** Create a new Row. */
    constructor(themeOverride?: Theme | null);
}
