import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

// A TextButton that calls a callback with a glyph or an alternative glyph
// depending on the key context on click
export class GlyphKey extends TextButton {
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
