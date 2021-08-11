import type { ThemeProperties } from '../../theme/ThemeProperties';
import { ArtificialConstraint } from '../ArtificialConstraint';
import type { TextGetter } from '../../widgets/Label';
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
export declare class VirtualKey extends ArtificialConstraint<TextButton> {
    /**
     * Create a new VirtualKey.
     *
     * @param text The text to display in the virtual key.
     * @param callback The callback called when the button is pressed.
     */
    constructor(text: string | TextGetter, callback: () => void, flex?: number, minWidth?: number, minHeight?: number, themeProperties?: ThemeProperties);
}
