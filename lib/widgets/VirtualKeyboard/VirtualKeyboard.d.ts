import type { KeyboardDriver } from '../../drivers/KeyboardDriver';
import type { KeyRowTemplate } from './KeyRow';
import type { Theme } from '../../theme/Theme';
import { Column } from '../Column';
/**
 * A template for the keys in a {@link VirtualKeyboard}. Each member of the
 * array contains the template for a row of keys, from top to bottom.
 *
 * @category Widget
 */
export declare type VirtualKeyboardTemplate = Array<KeyRowTemplate>;
/**
 * The default template for the keys in a {@link VirtualKeyboard}; A QWERTY
 * keyboard with US layout.
 *
 * @category Widget
 */
export declare const defaultVirtualKeyboardTemplate: VirtualKeyboardTemplate;
/**
 * A virtual keyboard widget.
 *
 * Needs a {@link KeyboardDriver} so that key events can be queued.
 *
 * Equivalent to creating a {@link Column} of {@link KeyRow} with a shared
 * {@link KeyContext}.
 *
 * @category Widget
 */
export declare class VirtualKeyboard extends Column {
    /**
     * Create a new VirtualKeyboard.
     *
     * @param keyboardTemplate By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}
     * @param flexRatio The flexRatio to use when creating {@link Glyph | Glyphs}
     * @param mainBasis The mainBasis to use when creating {@link Glyph | Glyphs}
     * @param crossBasis The crossBasis to use when creating {@link Glyph | Glyphs}
     * @param spacingFlexRatio The flexRatio to use when creating {@link Spacing} between each key, in a row
     * @param spacingBasis The mainBasis to use when creating {@link Spacing} between each key, in a row
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate?: VirtualKeyboardTemplate, flexRatio?: number, mainBasis?: number, crossBasis?: number, spacingFlexRatio?: number, spacingBasis?: number, themeOverride?: Theme | null);
}
