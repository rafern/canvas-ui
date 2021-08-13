import type { ThemeProperties } from '../../theme/ThemeProperties';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which acts as a control key; toggles
 * {@link KeyContext.ctrl} on click.
 *
 * @category Widget
 */
export declare class ControlKey extends VirtualKey {
    /** Create a new ControlKey. */
    constructor(keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeProperties?: ThemeProperties);
}
