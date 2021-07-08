import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { GlyphKey } from './GlyphKey';
import { Row } from '../Row';

/**
 * A template for a single virtual keyboard key. A function that, when called
 * given a {@link KeyContext} and theme override, returns a {@link FilledButton}
 * which can be used as a virtual keyboard key widget.
 *
 * Example:
 * const template: KeyTemplateFunction = (keyContext, themeOverride) => new BackspaceKey(keyContext, themeOverride);
 *
 * @category Widget
 */
export type KeyTemplateFunction = (keyContext: KeyContext, themeOverride: Theme | null) => FilledButton;

/**
 * A template for multiple {@link GlyphKey} virtual keyboard keys. A 2-tuple of
 * strings, where each string has the same length. Each character of the string
 * represents a glyph to add to a keyboard row. The first string of the tuple
 * has the regular glyphs, while the second string string of the tuple has the
 * alternative glyphs.
 *
 * Example:
 * ```typescript
 * const template: GlyphKeysTemplate = ['qwertyuiop', 'QWERTYUIOP'];
 * ```
 *
 * @category Widget
 */
export type GlyphKeysTemplate = [string, string];

/**
 * A template for a single row of virtual keyboard keys. An array of
 * {@link GlyphKeysTemplate} and {@link KeyTemplateFunction}.
 *
 * Example:
 * const backspaceTemplate: KeyTemplateFunction = (keyContext, themeOverride) => new BackspaceKey(keyContext, themeOverride);
 * const rowTemplate: KeyRowTemplate = [['`1234567890-=', '~!@#$%^&*()_+'], backspaceTemplate];
 *
 * @category Widget
 */
export type KeyRowTemplate = Array<GlyphKeysTemplate | KeyTemplateFunction>;

/**
 * A {@link Row} of virtual keys ({@link BasicKey}, {@link GlyphKey},
 * {@link ShiftKey}, etc...). Generates given a template.
 *
 * @category Widget
 */
export class KeyRow extends Row {
    /**
     * Create a new KeyRow.
     *
     * @param rowTemplate Template for this row of virtual keys.
     * @param keyContext The {@link KeyContext} to be shared among all virtual
     * keys in this row.
     */
    constructor(rowTemplate: KeyRowTemplate, keyContext: KeyContext, themeOverride: Theme | null = null) {
        super(themeOverride);

        for(const entry of rowTemplate) {
            if(typeof entry === 'function') {
                // Entry is in template function format
                const templateFunction = entry;
                this.add(templateFunction(keyContext, themeOverride));
            }
            else if(typeof entry[0] === 'string' && typeof entry[1] === 'string') {
                // Entry is in multiple glyphs format
                const glyphs = entry[0];
                const altGlyphs = entry[1];
                for(let i = 0; i < glyphs.length; i++) {
                    let altGlyph = null;
                    if(i < altGlyphs.length)
                        altGlyph = altGlyphs[i];

                    this.add(new GlyphKey(glyphs[i], altGlyph, keyContext, themeOverride));
                }
            }
            else {
                throw new Error(`Unknown virtual key row template format for entry: ${entry}`);
            }
        }
    }
}