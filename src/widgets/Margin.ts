import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Alignment2D } from '../theme/Alignment2D';
import { Alignment } from '../theme/Alignment';
import { Container } from './Container';
import type { Widget } from './Widget';

/**
 * A {@link Container} with center alignment on both axes and default padding,
 * similar to {@link Center}.
 *
 * Can be constrained to a specific type of children.
 *
 * Alignment settings are applied via theme properties; if you pass this
 * property, it will be ignored in a clone of the theme properties. If you want
 * to override this theme property property, then use {@link Container} instead.
 *
 * @category Widget
 */
export class Margin<W extends Widget = Widget> extends Container<W> {
    /** Create a new Margin. */
    constructor(child: W, themeProperties?: ThemeProperties) {
        const themePropertiesClone: ThemeProperties = {...themeProperties};

        themePropertiesClone.containerAlignment = <Alignment2D>{
            horizontal: Alignment.Center, vertical: Alignment.Center,
        };

        super(child, themePropertiesClone);
    }
}
