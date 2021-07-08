import { ThemeProperty } from '../theme/ThemeProperty';
import type { Alignment2D } from '../theme/Alignment2D';
import type { Padding } from '../theme/Padding';
import { Alignment } from '../theme/Alignment';
import { Container } from './Container';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';

/**
 * A {@link Container} with center alignment on both axes and no padding.
 *
 * Padding and alignment settings are applied via theme overrides, so no theme
 * override can be passed to this widget. If you want to override additional
 * theme properties other than the ones overridden here, then use
 * {@link Container} instead.
 *
 * @category Widget
 */
export class Center extends Container {
    /** Create a new Center. */
    constructor(child: Widget) {
        const themeOverride = new Theme(new Map<ThemeProperty, unknown>([
            [
                ThemeProperty.ContainerAlignment,
                <Alignment2D>{
                    horizontal: Alignment.Center, vertical: Alignment.Center,
                },
            ],
            [
                ThemeProperty.ContainerPadding,
                <Padding>{
                    left: 0, right: 0, top: 0, bottom: 0,
                },
            ],
        ]));

        super(child, themeOverride);
    }
}
