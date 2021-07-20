import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';
/**
 * A {@link BasicKey} which emits ' ' key presses.
 *
 * @category Widget
 */
export declare class SpaceKey extends BasicKey {
    /** Create a new SpaceKey. */
    constructor(keyContext: KeyContext, flexRatio?: number, mainBasis?: number, crossBasis?: number, themeOverride?: Theme | null);
}
