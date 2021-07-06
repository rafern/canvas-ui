import { ThemeProperty } from '../theme/ThemeProperty';
import type { Alignment2D } from '../theme/Alignment2D';
import type { Padding } from '../theme/Padding';
import { Alignment } from '../theme/Alignment';
import { Container } from './Container';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';

// A Container with no padding and center alignment on both axis
export class Center extends Container {
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
