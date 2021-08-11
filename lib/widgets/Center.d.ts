import type { ThemeProperties } from '../theme/ThemeProperties';
import { Container } from './Container';
import type { Widget } from './Widget';
/**
 * A {@link Container} with center alignment on both axes and no padding.
 *
 * Can be constrained to a specific type of children.
 *
 * Padding and alignment settings are applied via theme properties; if you pass
 * these two properties, they will be ignored in a clone of the theme
 * properties. If you want to override these two theme properties, then use
 * {@link Container} instead.
 *
 * @category Widget
 */
export declare class Center<W extends Widget = Widget> extends Container<W> {
    /** Create a new Center. */
    constructor(child: W, themeProperties?: ThemeProperties);
}
