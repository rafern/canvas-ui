import type { Alignment2D } from '../theme/Alignment2D';
import { ThemeProperty } from '../theme/ThemeProperty';
import { Container } from '../widgets/Container';
import type { Widget } from '../widgets/Widget';
import { Alignment } from '../theme/Alignment';
import { Theme } from '../theme/Theme';

// Container template like Center, but with default padding
export function Padding(child: Widget): Container {
    const themeOverride = new Theme(new Map<ThemeProperty, unknown>([
        [
            ThemeProperty.ContainerAlignment,
            <Alignment2D>{
                horizontal: Alignment.Center, vertical: Alignment.Center,
            },
        ],
    ]));

    return new Container(child, themeOverride);
}
