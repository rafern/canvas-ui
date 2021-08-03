import type { ThemeProperties } from '../../theme/ThemeProperties';
import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';

/**
 * A {@link BasicVirtualKey} which emits ' ' key presses.
 *
 * @category Widget
 */
export class SpaceKey extends BasicVirtualKey {
    /** Create a new SpaceKey. */
    constructor(keyContext: KeyContext, flex = 1, minWidth = 84, minHeight = 24, themeProperties?: ThemeProperties) {
        super('Space', ' ', keyContext, flex, minWidth, minHeight, themeProperties);
    }
}
