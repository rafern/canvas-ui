import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';
/**
 * A {@link BasicKey} which emits 'Backspace' key presses.
 *
 * @category Widget
 */
export declare class BackspaceKey extends BasicKey {
    /** Create a new BackspaceKey. */
    constructor(keyContext: KeyContext, themeOverride?: Theme | null);
}
