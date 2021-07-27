import type { Alignment2D } from '../theme/Alignment2D';
import { ThemeProperty } from '../theme/ThemeProperty';
import { Alignment } from '../theme/Alignment';
import { Container } from './Container';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';

/**
 * A {@link Container} with center alignment on both axes and default padding,
 * similar to {@link Center}.
 *
 * Can be constrained to a specific type of children.
 *
 * Alignment settings are applied via theme overrides, so no theme override can
 * be passed to this widget. If you want to override additional theme properties
 * other than the one overridden here, then use {@link Container} instead.
 *
 * @category Widget
 */
export class Margin<W extends Widget = Widget> extends Container<W> {
    /** Create a new Margin. */
    constructor(child: W) {
        const themeOverride = new Theme(new Map<ThemeProperty, unknown>([
            [
                ThemeProperty.ContainerAlignment,
                <Alignment2D>{
                    horizontal: Alignment.Center, vertical: Alignment.Center,
                },
            ],
        ]));

        super(child, themeOverride);
    }
}
