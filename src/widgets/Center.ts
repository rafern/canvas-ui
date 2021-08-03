import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Alignment2D } from '../theme/Alignment2D';
import type { Padding } from '../theme/Padding';
import { Alignment } from '../theme/Alignment';
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
export class Center<W extends Widget = Widget> extends Container<W> {
    /** Create a new Center. */
    constructor(child: W, themeProperties?: ThemeProperties) {
        const themePropertiesClone: ThemeProperties = {...themeProperties};

        themePropertiesClone.containerAlignment = <Alignment2D>{
            horizontal: Alignment.Center, vertical: Alignment.Center,
        };
        themePropertiesClone.containerPadding = <Padding>{
            left: 0, right: 0, top: 0, bottom: 0,
        };

        super(child, themePropertiesClone);
    }
}
