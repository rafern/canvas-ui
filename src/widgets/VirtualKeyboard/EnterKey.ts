import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';

/**
 * A {@link BasicVirtualKey} which emits 'Enter' key presses.
 *
 * @category Widget
 */
export class EnterKey extends BasicVirtualKey {
    /** Create a new EnterKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 72, minHeight = 24, themeOverride: Theme | null = null) {
        super('Enter', 'Enter', keyContext, flex, minWidth, minHeight, themeOverride);
    }
}
