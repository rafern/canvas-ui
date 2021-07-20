import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

/**
 * A {@link BasicKey} which emits ' ' key presses.
 *
 * @category Widget
 */
export class SpaceKey extends BasicKey {
    /** Create a new SpaceKey. */
    constructor(keyContext: KeyContext, flexRatio = 1, mainBasis = 84, crossBasis = 24, themeOverride: Theme | null = null) {
        super('Space', ' ', keyContext, flexRatio, mainBasis, crossBasis, themeOverride);
    }
}
