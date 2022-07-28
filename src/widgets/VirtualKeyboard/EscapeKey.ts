import type { ThemeProperties } from '../../theme/ThemeProperties';
import { BasicVirtualKey } from './BasicVirtualKey';
import type { KeyContext } from './KeyContext';

/**
 * A {@link BasicVirtualKey} which emits 'Escape' key presses.
 *
 * @category Widget
 * @category Alias Widget
 */
export class EscapeKey extends BasicVirtualKey {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 24, minHeight = 24, themeProperties?: ThemeProperties) {
        super('Esc', 'Escape', keyContext, flex, minWidth, minHeight, themeProperties);
    }
}
