import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

/**
 * A {@link TextButton} which acts as a virtual keyboard shift key; toggles
 * {@link KeyContext.shift} on click.
 *
 * @category Widget
 */
export class ShiftKey extends TextButton {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, themeOverride: Theme | null = null) {
        super(
            'Shift',
            () => {
                keyContext.shift = !keyContext.shift;
                this.forced = keyContext.shift;
                keyContext.callback('Shift');
            },
            themeOverride,
        );

        this.forced = keyContext.shift;
    }
}
