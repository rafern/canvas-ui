import { FilledButton } from './FilledButton';
import type { Theme } from '../theme/Theme';
import type { TextGetter } from './Label';
import { TextMargin } from './TextMargin';
import { Label } from './Label';
/**
 * A {@link FilledButton} with a {@link Label} inside a {@link TextMargin}.
 *
 * @category Widget
 */
export declare class TextButton extends FilledButton<TextMargin<Label>> {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback?: (() => void) | null, themeOverride?: Theme | null);
    /** This button's Label widget */
    get label(): Label;
}
