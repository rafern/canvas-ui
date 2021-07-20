import type { FilledButton } from '../../widgets/FilledButton';
import type { KeyContext } from './KeyContext';
import { Theme } from '../../theme/Theme';
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
export declare type KeyTemplateFunction = (keyContext: KeyContext, themeOverride: Theme | null) => FilledButton;
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
export declare type GlyphKeysTemplate = [string, string];
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
export declare type KeyRowTemplate = Array<GlyphKeysTemplate | KeyTemplateFunction>;
/**
 * A {@link Row} of virtual keys ({@link BasicKey}, {@link GlyphKey},
 * {@link ShiftKey}, etc...). Generates given a template. {@link Spacing} is
 * inserted between each key with a given flex ratio and basis;
 * {@link ThemeProperty.ContainerSpacing} is therefore overridden to be 0.
 *
 * @category Widget
 */
export declare class KeyRow extends Row {
    /**
     * Create a new KeyRow.
     *
     * @param rowTemplate Template for this row of virtual keys.
     * @param keyContext The {@link KeyContext} to be shared among all virtual keys in this row.
     * @param flexRatio The flexRatio to use when creating {@link Glyph | Glyphs}
     * @param mainBasis The mainBasis to use when creating {@link Glyph | Glyphs}
     * @param crossBasis The crossBasis to use when creating {@link Glyph | Glyphs}
     * @param spacingFlexRatio The flexRatio to use when creating {@link Spacing} between each key
     * @param spacingBasis The mainBasis to use when creating {@link Spacing} between each key
     * @param themeOverride The themeOverride to pass to each key widget
     */
    constructor(rowTemplate: KeyRowTemplate, keyContext: KeyContext, flexRatio?: number, mainBasis?: number, crossBasis?: number, spacingFlexRatio?: number, spacingBasis?: number, themeOverride?: Theme | null);
}
