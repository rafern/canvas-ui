import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which acts as a shift key; toggles
 * {@link KeyContext.shift} on click.
 *
 * @category Widget
 */
export declare class ShiftKey extends VirtualKey {
    /** Create a new ShiftKey. */
    constructor(keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeOverride?: Theme | null);
}
