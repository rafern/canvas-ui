import type { ThemeProperties } from '../../theme/ThemeProperties';
import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';
/**
 * A {@link BasicVirtualKey} which emits 'Escape' key presses.
 *
 * @category Widget
 */
export declare class EscapeKey extends BasicVirtualKey {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeProperties?: ThemeProperties);
}
