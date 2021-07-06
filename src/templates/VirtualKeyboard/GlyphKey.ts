import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';

// Template for TextButton that calls callback with glyph or alternative glyph
// depending on key context on click
export function GlyphKey(glyph: string, altGlyph: string | null = null, keyContext: KeyContext, themeOverride: Theme | null = null): FilledButton {
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

    return TextButton(
        getGlyph,
        () => keyContext.callback(getGlyph()),
        themeOverride,
    );
}
