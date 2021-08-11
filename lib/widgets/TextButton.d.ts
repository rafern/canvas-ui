import type { ThemeProperties } from '../theme/ThemeProperties';
import { FilledButton } from './FilledButton';
import type { TextGetter } from './Label';
import { Label } from './Label';
/**
 * A {@link FilledButton} with a {@link Label}. Alignment is forced to be
 * horizontally centered and vertically stretching like in {@link TextMargin}.
 *
 * @category Widget
 */
export declare class TextButton extends FilledButton<Label> {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback?: (() => void) | null, themeProperties?: ThemeProperties);
}
