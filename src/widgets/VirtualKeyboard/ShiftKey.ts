import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { VirtualKey } from './VirtualKey';

/**
 * A {@link VirtualKey} which acts as a shift key; toggles
 * {@link KeyContext.shift} on click.
 *
 * @category Widget
 */
export class ShiftKey extends VirtualKey {
    /** Create a new ShiftKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 84, minHeight = 24, themeOverride: Theme | null = null) {
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
            themeOverride,
        );

        this.child.forced = keyContext.shift;
    }
}
