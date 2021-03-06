import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Alignment2D } from '../theme/Alignment2D';
import { Alignment } from '../theme/Alignment';
import { FilledButton } from './FilledButton';
import type { TextGetter } from './Label';
import { Label } from './Label';

/**
 * A {@link FilledButton} with a {@link Label}. Alignment is forced to be
 * horizontally centered and vertically stretching like in {@link TextMargin}.
 * Text-wrapping is disabled so that text is centered properly.
 *
 * @category Widget
 */
export class TextButton extends FilledButton<Label> {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback: (() => void) | null = null, themeProperties?: ThemeProperties) {
        const themePropertiesClone: ThemeProperties = {...themeProperties};

        themePropertiesClone.containerAlignment = <Alignment2D>{
            horizontal: Alignment.Center, vertical: Alignment.Stretch,
        };

        const label = new Label(text, themeProperties);
        label.wrapText = false;
        super(label, callback, themePropertiesClone);
    }
}
