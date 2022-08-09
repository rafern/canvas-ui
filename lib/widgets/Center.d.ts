import type { Widget, WidgetProperties } from './Widget';
import { Container } from './Container';
/**
 * A {@link Container} with center alignment on both axes and no padding by
 * default.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class Center<W extends Widget = Widget> extends Container<W> {
    /** Create a new Center. */
    constructor(child: W, properties?: Readonly<WidgetProperties>);
}
