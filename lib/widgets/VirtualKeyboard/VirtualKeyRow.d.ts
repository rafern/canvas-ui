import type { KeyContext } from './KeyContext';
import type { VirtualKey } from './VirtualKey';
import { Theme } from '../../theme/Theme';
import { Row } from '../Row';
/**
 * A template for a single virtual keyboard key. A function that, when called
 * given a {@link KeyContext} and theme override, returns a {@link VirtualKey}
 * which can be used as a virtual keyboard key widget.
 *
 * Example:
 * const template: VirtualKeyTemplate = (keyContext, themeOverride) => new BackspaceKey(keyContext, themeOverride);
 *
 * @category Widget
 */
export declare type VirtualKeyTemplate = (keyContext: KeyContext, themeOverride: Theme | null) => VirtualKey;
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
export declare type GlyphVirtualKeysTemplate = [string, string];
/**
 * A template for a single row of virtual keyboard keys. An array of
 * {@link GlyphVirtualKeysTemplate} and {@link VirtualKeyTemplate}.
 *
 * Example:
 * const backspaceTemplate: VirtualKeyTemplate = (keyContext, themeOverride) => new BackspaceKey(keyContext, themeOverride);
 * const rowTemplate: VirtualKeyRowTemplate = [['`1234567890-=', '~!@#$%^&*()_+'], backspaceTemplate];
 *
 * @category Widget
 */
export declare type VirtualKeyRowTemplate = Array<GlyphVirtualKeysTemplate | VirtualKeyTemplate>;
/**
 * A {@link Row} of {@link VirtualKey | virtual keys}. Generates given a
 * template.
 *
 * @category Widget
 */
export declare class VirtualKeyRow extends Row<VirtualKey> {
    /**
     * Create a new VirtualKeyRow.
     *
     * @param rowTemplate Template for this row of virtual keys.
     * @param keyContext The {@link KeyContext} to be shared among all virtual keys in this row.
     * @param flex The flex to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}
     * @param minWidth The minWidth to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}
     * @param minHeight The minHeight to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}
     * @param themeOverride The themeOverride to pass to each key widget
     */
    constructor(rowTemplate: VirtualKeyRowTemplate, keyContext: KeyContext, flex?: number, minWidth?: number, minHeight?: number, themeOverride?: Theme | null);
}
