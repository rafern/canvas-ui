import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
/**
 * A {@link BasicVirtualKey} which emits 'Enter' key presses.
 *
 * @category Widget
 */
export declare class EnterKey extends BasicVirtualKey {
    /** Create a new EnterKey. */
    constructor(keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeOverride?: Theme | null);
}
