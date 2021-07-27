import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';

/**
 * A {@link BasicVirtualKey} which emits 'Backspace' key presses.
 *
 * @category Widget
 */
export class BackspaceKey extends BasicVirtualKey {
    /** Create a new BackspaceKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 60, minHeight = 24, themeOverride: Theme | null = null) {
        super('Backspace', 'Backspace', keyContext, flex, minWidth, minHeight, themeOverride);
    }
}
