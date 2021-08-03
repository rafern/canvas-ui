import type { ThemeProperties } from '../../theme/ThemeProperties';
import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';

/**
 * A {@link BasicVirtualKey} which emits 'Enter' key presses.
 *
 * @category Widget
 */
export class EnterKey extends BasicVirtualKey {
    /** Create a new EnterKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 72, minHeight = 24, themeProperties?: ThemeProperties) {
        super('Enter', 'Enter', keyContext, flex, minWidth, minHeight, themeProperties);
    }
}
