import type { ThemeProperties } from '../../theme/ThemeProperties';
import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';

/**
 * A {@link BasicVirtualKey} which emits 'Backspace' key presses.
 *
 * @category Widget
 * @category Alias Widget
 */
export class BackspaceKey extends BasicVirtualKey {
    /** Create a new BackspaceKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 60, minHeight = 24, themeProperties?: ThemeProperties) {
        super('Backspace', 'Backspace', keyContext, flex, minWidth, minHeight, themeProperties);
    }
}
