import type { ButtonCallback } from './Button';
import { FilledButton } from './FilledButton';
import type { Theme } from '../theme/Theme';
import type { TextGetter } from './Label';
import { Label } from './Label';

/**
 * A {@link FilledButton} with an {@link Label}.
 *
 * @category Widget
 */
export class TextButton extends FilledButton {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback: ButtonCallback | null = null, themeOverride: Theme | null = null) {
        super(new Label(text, themeOverride), callback, themeOverride);
    }
}
