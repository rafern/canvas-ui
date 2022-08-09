import type { KeyboardDriver } from '../../drivers/KeyboardDriver';
import type { VirtualKeyRowTemplate } from './VirtualKeyRow';
import type { WidgetProperties } from '../Widget';
import { Column } from '../Column';
/**
 * A template for the keys in a {@link VirtualKeyboard}. Each member of the
 * array contains the template for a row of keys, from top to bottom.
 *
 * @category Widget
 */
export declare type VirtualKeyboardTemplate = Array<VirtualKeyRowTemplate>;
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
 * Equivalent to creating a {@link Column} of {@link VirtualKeyRow} with a shared
 * {@link KeyContext}. Key rows will be created with SpaceBetween main alignment
 * and Stretch cross alignment.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class VirtualKeyboard extends Column {
    /**
     * Create a new VirtualKeyboard.
     *
     * @param keyboardTemplate - By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}.
     * @param minWidth - The minWidth to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}.
     * @param minHeight - The minHeight to use when creating {@link GlyphVirtualKey | GlyphVirtualKeys}.
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate?: VirtualKeyboardTemplate, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
