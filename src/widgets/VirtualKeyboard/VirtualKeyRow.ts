import type { ThemeProperties } from '../../theme/ThemeProperties';
import { GlyphVirtualKey } from './GlyphVirtualKey';
import type { KeyContext } from './KeyContext';
import type { VirtualKey } from './VirtualKey';
import { Row } from '../Row';

/**
 * A template for a single virtual keyboard key. A function that, when called
 * given a {@link KeyContext} and theme override, returns a {@link VirtualKey}
 * which can be used as a virtual keyboard key widget.
 *
 * Example:
 * ```typescript
 * const template: VirtualKeyTemplate = (keyContext, themeProperties) => new BackspaceKey(keyContext, themeProperties);
 * ```
 *
 * @category Widget
 */
export type VirtualKeyTemplate = (keyContext: KeyContext, themeProperties?: ThemeProperties) => VirtualKey;

/**
 * A template for multiple {@link GlyphVirtualKey} virtual keyboard keys. A
 * 2-tuple of strings, where each string has the same length. Each character of
 * the string represents a glyph to add to a keyboard row. The first string of
 * the tuple has the regular glyphs, while the second string string of the tuple
 * has the alternative glyphs.
 *
 * Example:
 * ```typescript
 * const template: GlyphVirtualKeysTemplate = ['qwertyuiop', 'QWERTYUIOP'];
 * ```
 *
 * @category Widget
 */
export type GlyphVirtualKeysTemplate = [string, string];

/**
 * A template for a single row of virtual keyboard keys. An array of
 * {@link GlyphVirtualKeysTemplate} and {@link VirtualKeyTemplate}.
 *
 * Example:
 * ```typescript
 * const backspaceTemplate: VirtualKeyTemplate = (keyContext, themeProperties) => new BackspaceKey(keyContext, themeProperties);
 * const rowTemplate: VirtualKeyRowTemplate = [['`1234567890-=', '~!@#$%^&*()_+'], backspaceTemplate];
 * ```
 *
 * @category Widget
 */
export type VirtualKeyRowTemplate = Array<GlyphVirtualKeysTemplate | VirtualKeyTemplate>;

/**
 * A {@link Row} of {@link VirtualKey | virtual keys}. Generates given a
 * template.
 *
 * @category Widget
 */
export class VirtualKeyRow extends Row<VirtualKey> {
    /**
     * Create a new VirtualKeyRow.
     *
     * @param rowTemplate Template for this row of virtual keys.
     * @param keyContext The {@link KeyContext} to be shared among all virtual keys in this row.
     * @param flex The flex to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}
     * @param minWidth The minWidth to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}
     * @param minHeight The minHeight to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}
     * @param themeProperties The themeProperties to pass to each key widget and this row
     */
    constructor(rowTemplate: VirtualKeyRowTemplate, keyContext: KeyContext, flex = 0, minWidth = 24, minHeight = 24, themeProperties?: ThemeProperties) {
        super(themeProperties);

        for(const entry of rowTemplate) {
            if(typeof entry === 'function') {
                // Entry is in template function format
                const templateFunction = entry;
                this.add(templateFunction(keyContext, themeProperties));
            }
            else if(typeof entry[0] === 'string' && typeof entry[1] === 'string') {
                // Entry is in multiple glyphs format
                const glyphs = entry[0];
                const altGlyphs = entry[1];
                for(let i = 0; i < glyphs.length; i++) {
                    let altGlyph = null;
                    if(i < altGlyphs.length)
                        altGlyph = altGlyphs[i];

                    this.add(new GlyphVirtualKey(
                        glyphs[i],
                        altGlyph,
                        keyContext,
                        flex,
                        minWidth,
                        minHeight,
                        themeProperties,
                    ));
                }
            }
            else {
                throw new Error(`Unknown virtual key row template format for entry: ${entry}`);
            }
        }
    }
}