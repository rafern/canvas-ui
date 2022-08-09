import type { ThemeProperties } from '../theme/ThemeProperties';
import { Container } from './Container';
import type { Widget } from './Widget';
/**
 * A {@link Container} with center alignment on both axes and default padding,
 * similar to {@link Center}.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class Margin<W extends Widget = Widget> extends Container<W> {
    /** Create a new Margin. */
    constructor(child: W, properties?: Readonly<ThemeProperties>);
}
