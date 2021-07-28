import { Container } from './Container';
import type { Widget } from './Widget';
/**
 * A {@link Container} with center alignment on both axes and no padding.
 *
 * Can be constrained to a specific type of children.
 *
 * Padding and alignment settings are applied via theme overrides, so no theme
 * override can be passed to this widget. If you want to override additional
 * theme properties other than the ones overridden here, then use
 * {@link Container} instead.
 *
 * @category Widget
 */
export declare class Center<W extends Widget = Widget> extends Container<W> {
    /** Create a new Center. */
    constructor(child: W);
}
