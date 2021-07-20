import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BasicKey } from './BasicKey';
/**
 * A {@link BasicKey} which emits 'Escape' key presses.
 *
 * @category Widget
 */
export declare class EscapeKey extends BasicKey {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, flexRatio?: number, mainBasis?: number, crossBasis?: number, themeOverride?: Theme | null);
}
