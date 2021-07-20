import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';

/**
 * A {@link BasicKey} which emits 'Escape' key presses.
 *
 * @category Widget
 */
export class EscapeKey extends BasicKey {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, flexRatio = 0, mainBasis = 24, crossBasis = 24, themeOverride: Theme | null = null) {
        super('Esc', 'Escape', keyContext, flexRatio, mainBasis, crossBasis, themeOverride);
    }
}
