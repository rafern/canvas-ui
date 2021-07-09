import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';
/**
 * A {@link BasicKey} which emits 'Enter' key presses.
 *
 * @category Widget
 */
export declare class EnterKey extends BasicKey {
    /** Create a new EnterKey. */
    constructor(keyContext: KeyContext, themeOverride?: Theme | null);
}
