import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

/**
 * A {@link BasicKey} which emits 'Backspace' key presses.
 *
 * @category Widget
 */
export class BackspaceKey extends BasicKey {
    /** Create a new BackspaceKey. */
    constructor(keyContext: KeyContext, flexRatio = 0, mainBasis = 60, crossBasis = 24, themeOverride: Theme | null = null) {
        super('Backspace', 'Backspace', keyContext, flexRatio, mainBasis, crossBasis, themeOverride);
    }
}
