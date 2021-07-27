import { BaseContainer } from './BaseContainer';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
/**
 * A {@link BaseContainer} which always propagates events. Use this widget if
 * you are not sure what that means.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export declare class Container<W extends Widget = Widget> extends BaseContainer<W> {
    /** Create a new Container. */
    constructor(child: W, themeOverride?: Theme | null);
}
