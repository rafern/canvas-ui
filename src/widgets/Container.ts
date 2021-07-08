import { BaseContainer } from './BaseContainer';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';

/**
 * A {@link BaseContainer} which always propagates events. Use this widget if
 * you are not sure what that means.
 *
 * @category Widget
 */
export class Container extends BaseContainer {
    /** Create a new Container. */
    constructor(child: Widget, themeOverride: Theme | null = null) {
        super(child, true, themeOverride);
    }
}
