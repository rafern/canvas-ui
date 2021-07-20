import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

/**
 * A {@link BasicKey} which emits 'Enter' key presses.
 *
 * @category Widget
 */
export class EnterKey extends BasicKey {
    /** Create a new EnterKey. */
    constructor(keyContext: KeyContext, flexRatio = 0, mainBasis = 72, crossBasis = 24, themeOverride: Theme | null = null) {
        super('Enter', 'Enter', keyContext, flexRatio, mainBasis, crossBasis, themeOverride);
    }
}
