import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';

/**
 * A {@link BasicVirtualKey} which emits ' ' key presses.
 *
 * @category Widget
 */
export class SpaceKey extends BasicVirtualKey {
    /** Create a new SpaceKey. */
    constructor(keyContext: KeyContext, flex = 1, minWidth = 84, minHeight = 24, themeOverride: Theme | null = null) {
        super('Space', ' ', keyContext, flex, minWidth, minHeight, themeOverride);
    }
}
