import type { ThemeProperties } from '../theme/ThemeProperties';
import { MultiContainer } from './MultiContainer';
import type { Widget } from './Widget';
/**
 * A horizontal {@link MultiContainer}.
 *
 * @category Widget
 */
export declare class Row<W extends Widget = Widget> extends MultiContainer<W> {
    /** Create a new Row. */
    constructor(themeProperties?: ThemeProperties);
}
