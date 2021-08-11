import type { ThemeProperties } from '../../theme/ThemeProperties';
import type { TextGetter } from '../../widgets/Label';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which emits key presses of a given key code.
 *
 * @category Widget
 */
export declare class BasicVirtualKey extends VirtualKey {
    /**
     * Create a new BasicVirtualKey.
     *
     * @param text The text to display in the virtual key.
     * @param keyCode The {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | key code} to emit in the keyContext's callback when the virtual key is pressed
     * @param keyContext The {@link KeyContext} shared by other virtual keyboard key widgets.
     */
    constructor(text: string | TextGetter, keyCode: string, keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeProperties?: ThemeProperties);
}
