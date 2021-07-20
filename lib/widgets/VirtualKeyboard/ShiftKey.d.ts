import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';
/**
 * A {@link TextButton} which acts as a virtual keyboard shift key; toggles
 * {@link KeyContext.shift} on click.
 *
 * @category Widget
 */
export declare class ShiftKey extends TextButton {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, flexRatio?: number, mainBasis?: number, crossBasis?: number, themeOverride?: Theme | null);
}
