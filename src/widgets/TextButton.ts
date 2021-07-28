import type { Alignment2D } from '../theme/Alignment2D';
import { ThemeProperty } from '../theme/ThemeProperty';
import { Alignment } from '../theme/Alignment';
import { FilledButton } from './FilledButton';
import type { TextGetter } from './Label';
import { Theme } from '../theme/Theme';
import { Label } from './Label';

/**
 * A {@link FilledButton} with a {@link Label}. Alignment is forced to be
 * horizontally centered and vertically stretching like in {@link TextMargin}.
 *
 * @category Widget
 */
export class TextButton extends FilledButton<Label> {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback: (() => void) | null = null, themeOverride: Theme | null = null) {
        const containerProperties = new Map(themeOverride?.properties ?? []);
        containerProperties.set(
            ThemeProperty.ContainerAlignment,
            <Alignment2D>{
                horizontal: Alignment.Center, vertical: Alignment.Stretch,
            },
        );
        const containerThemeOverride = new Theme(containerProperties);

        super(new Label(text, themeOverride), callback, containerThemeOverride);
    }
}
