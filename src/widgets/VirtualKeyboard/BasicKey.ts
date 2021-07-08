import type { TextGetter } from '../../widgets/Label';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

/**
 * A {@link TextButton} which emits 'Backspace' key presses.
 *
 * @category Widget
 */
export class BasicKey extends TextButton {
    /**
     * Create a new BasicKey.
     *
     * @param text The text to display in the virtual key.
     * @param keyCode The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | key code}
     * to emit in the keyContext's callback when the virtual key is pressed
     * @param keyContext The {@link KeyContext} shared by other virtual keyboard
     * key widgets.
     */
    constructor(text: string | TextGetter, keyCode: string, keyContext: KeyContext, themeOverride: Theme | null = null) {
        super(text, () => keyContext.callback(keyCode), themeOverride);
    }
}
