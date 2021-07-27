import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';

/**
 * A {@link BasicVirtualKey} which emits 'Escape' key presses.
 *
 * @category Widget
 */
export class EscapeKey extends BasicVirtualKey {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 24, minHeight = 24, themeOverride: Theme | null = null) {
        super('Esc', 'Escape', keyContext, flex, minWidth, minHeight, themeOverride);
    }
}
