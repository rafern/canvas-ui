import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

/**
 * A {@link TextButton} which emits key presses for a given glyph (character),
 * handling alternative versions of the glyph when shift is held down, such as
 * uppercase variants, or exclamation marks for ones.
 *
 * For other specific keys, see {@link BasicKey}.
 *
 * @category Widget
 */
export class GlyphKey extends TextButton {
    /**
     * Create a new GlyphKey.
     *
     * @param glyph The glyph to emit/show when shift is not held.
     * @param altGlyph The alternative glyph to emit/show when shift is held.
     * @param keyContext The {@link KeyContext} shared by other keys to tell when shift is being held in a virtual keyboard.
     */
    constructor(glyph: string, altGlyph: string | null = null, keyContext: KeyContext, themeOverride: Theme | null = null) {
        if(altGlyph === null)
            altGlyph = glyph;

        function getGlyph() {
            if(keyContext.shift) {
                if(altGlyph === null)
                    return glyph;
                else
                    return altGlyph;
            }
            else
                return glyph;
        }

        super(
            getGlyph,
            () => keyContext.callback(getGlyph()),
            themeOverride,
        );
    }
}
