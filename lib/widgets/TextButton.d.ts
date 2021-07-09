import type { ButtonCallback } from './Button';
import { FilledButton } from './FilledButton';
import type { Theme } from '../theme/Theme';
import type { TextGetter } from './Label';
/**
 * A {@link FilledButton} with an {@link Label}.
 *
 * @category Widget
 */
export declare class TextButton extends FilledButton {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback?: ButtonCallback | null, themeOverride?: Theme | null);
}
