import type { ThemeProperties } from '../../theme/ThemeProperties';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';

/**
 * A {@link VirtualKey} which acts as a shift key; toggles
 * {@link KeyContext.shift} on click.
 *
 * @category Widget
 */
export class ShiftKey extends VirtualKey {
    /** Create a new ShiftKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 84, minHeight = 24, themeProperties?: ThemeProperties) {
        super(
            'Shift',
            () => {
                keyContext.shift = !keyContext.shift;
                this.child.forced = keyContext.shift;
                keyContext.callback('Shift');
            },
            flex,
            minWidth,
            minHeight,
            themeProperties,
        );

        this.child.forced = keyContext.shift;
    }
}
