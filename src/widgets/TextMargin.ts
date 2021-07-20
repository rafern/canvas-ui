import type { Alignment2D } from '../theme/Alignment2D';
import { ThemeProperty } from '../theme/ThemeProperty';
import { Alignment } from '../theme/Alignment';
import { Container } from './Container';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';

/**
 * A {@link Margin} which stretches on the vertical axis. Useful for
 * horizontally centering labels without making them look weird if they are in
 * a row, such as in a {@link KeyRow}.
 *
 * @category Widget
 */
export class TextMargin extends Container {
    /** Create a new TextMargin. */
    constructor(child: Widget) {
        const themeOverride = new Theme(new Map<ThemeProperty, unknown>([
            [
                ThemeProperty.ContainerAlignment,
                <Alignment2D>{
                    horizontal: Alignment.Center, vertical: Alignment.Stretch,
                },
            ],
        ]));

        super(child, themeOverride);
    }
}
