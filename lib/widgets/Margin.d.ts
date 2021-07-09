import { Container } from './Container';
import type { Widget } from './Widget';
/**
 * A {@link Container} with center alignment on both axes and default padding,
 * similar to {@link Center}.
 *
 * Alignment settings are applied via theme overrides, so no theme override can
 * be passed to this widget. If you want to override additional theme properties
 * other than the one overridden here, then use {@link Container} instead.
 *
 * @category Widget
 */
export declare class Margin extends Container {
    /** Create a new Margin. */
    constructor(child: Widget);
}
