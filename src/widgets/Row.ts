import { MultiContainer } from './MultiContainer';
import type { Theme } from '../theme/Theme';

/**
 * A horizontal {@link MultiContainer}.
 *
 * @category Widget
 */
export class Row extends MultiContainer {
    /** Create a new Row. */
    constructor(themeOverride: Theme | null = null) {
        super(false, themeOverride);
    }
}
