import { ThemeProperty } from '../theme/ThemeProperty';
import type { Alignment2D } from '../theme/Alignment2D';
import { Container } from '../widgets/Container';
import type { Padding } from '../theme/Padding';
import type { Widget } from '../widgets/Widget';
import { Alignment } from '../theme/Alignment';
import { Theme } from '../theme/Theme';

// Template for Container with no padding and center alignment on both axis
export function Center(child: Widget): Container {
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

    return new Container(child, themeOverride);
}
