import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
/**
 * A {@link BasicVirtualKey} which emits ' ' key presses.
 *
 * @category Widget
 */
export declare class SpaceKey extends BasicVirtualKey {
    /** Create a new SpaceKey. */
    constructor(keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeOverride?: Theme | null);
}
