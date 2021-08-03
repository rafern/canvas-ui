import type { ThemeProperties } from '../theme/ThemeProperties';
import { MultiContainer } from './MultiContainer';
import type { Widget } from './Widget';

/**
 * A vertical {@link MultiContainer}.
 *
 * @category Widget
 */
export class Column<W extends Widget = Widget> extends MultiContainer<W> {
    /** Create a new Column. */
    constructor(themeProperties?: ThemeProperties) {
        super(true, themeProperties);
    }
}
