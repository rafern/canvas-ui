import type { ThemeProperties } from '../../theme/ThemeProperties';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';

/**
 * A {@link VirtualKey} which acts as an alt key; toggles
 * {@link KeyContext#alt} on click.
 *
 * @category Widget
 * @category Alias Widget
 */
export class AltKey extends VirtualKey {
    /** Create a new AltKey. */
    constructor(keyContext: KeyContext, flex = 0, minWidth = 42, minHeight = 24, themeProperties?: ThemeProperties) {
        super(
            'Alt',
            () => {
                keyContext.alt = !keyContext.alt;
                this.child.forced = keyContext.alt;
                keyContext.callback('Alt');
            },
            flex,
            minWidth,
            minHeight,
            themeProperties,
        );

        this.child.forced = keyContext.alt;
    }
}
