import type { ThemeProperties } from '../../theme/ThemeProperties';
import { ArtificialConstraint } from '../ArtificialConstraint';
import type { KeyContext } from './KeyContext';
import { TextButton } from '../TextButton';
/**
 * A {@link VirtualKey} which emits key presses for a given glyph (character),
 * handling alternative versions of the glyph when shift is held down, such as
 * uppercase variants, or exclamation marks for ones.
 *
 * For other specific keys, see {@link BasicVirtualKey}.
 *
 * @category Widget
 */
export declare class GlyphVirtualKey extends ArtificialConstraint<TextButton> {
    /**
     * Create a new GlyphVirtualKey.
     *
     * @param glyph The glyph to emit/show when shift is not held.
     * @param altGlyph The alternative glyph to emit/show when shift is held.
     * @param keyContext The {@link KeyContext} shared by other keys to tell when shift is being held in a virtual keyboard.
     */
    constructor(glyph: string, altGlyph: string | null | undefined, keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeProperties?: ThemeProperties);
}
