import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { TextButton } from '../TextButton';
export declare class GlyphKey extends TextButton {
    constructor(glyph: string, altGlyph: string | null | undefined, keyContext: KeyContext, themeOverride?: Theme | null);
}
