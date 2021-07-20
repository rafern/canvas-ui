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
export class TextButton extends FilledButton {
    /** Create a new TextButton. */
    constructor(text: string | TextGetter, callback: (() => void) | null = null, flexRatio = 1, mainBasis = 0, crossBasis = 0, vertical: boolean | null = false, themeOverride: Theme | null = null) {
        super(
            new TextMargin(
                new Label(text, themeOverride),
            ),
            callback, flexRatio, mainBasis, crossBasis, vertical, themeOverride
        );
    }
}
