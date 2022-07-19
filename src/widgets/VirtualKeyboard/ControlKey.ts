import type { ThemeProperties } from '../../theme/ThemeProperties';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';

/**
 * A {@link VirtualKey} which acts as a control key; toggles
 * {@link KeyContext#ctrl} on click.
 *
 * @category Widget
 */
export class ControlKey extends VirtualKey {
    /** Create a new ControlKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 42, minHeight = 24, themeProperties?: ThemeProperties) {
        super(
            'Ctrl',
            () => {
                keyContext.ctrl = !keyContext.ctrl;
                this.child.forced = keyContext.ctrl;
                keyContext.callback('Control');
            },
            flex,
            minWidth,
            minHeight,
            themeProperties,
        );

        this.child.forced = keyContext.ctrl;
    }
}
