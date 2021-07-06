import type { Alignment2D } from '../theme/Alignment2D';
import { ThemeProperty } from '../theme/ThemeProperty';
import { Alignment } from '../theme/Alignment';
import { Container } from './Container';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';

// A Container like Center, but with default padding which acts as a margin for
// the child widget
export class Margin extends Container {
    constructor(child: Widget) {
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
