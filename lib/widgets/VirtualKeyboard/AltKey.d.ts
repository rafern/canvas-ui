import type { ThemeProperties } from '../../theme/ThemeProperties';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which acts as an alt key; toggles
 * {@link KeyContext.alt} on click.
 *
 * @category Widget
 */
export declare class AltKey extends VirtualKey {
    /** Create a new AltKey. */
    constructor(keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeProperties?: ThemeProperties);
}
