import { ArtificialConstraint } from '../ArtificialConstraint';
import type { TextGetter } from '../../widgets/Label';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

/**
 * An {@link ArtificialConstraint} with a {@link TextButton} which calls a given
 * callback and displays a given text source.
 *
 * For now there's nothing special about this class; it's just a common base
 * class for virtual keyboard key widgets.
 *
 * @category Widget
 */
export class VirtualKey extends ArtificialConstraint<TextButton> {
    /**
     * Create a new VirtualKey.
     *
     * @param text The text to display in the virtual key.
     * @param callback The callback called when the button is pressed.
     */
    constructor(text: string | TextGetter, callback: () => void, flex = 0, minWidth = 24, minHeight = 24, themeOverride: Theme | null = null) {
        super(
            new TextButton(text, callback, themeOverride),
            [minWidth, Infinity, minHeight, Infinity],
            themeOverride,
        );

        this.flex = flex;
    }
}
