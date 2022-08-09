import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which emits key presses for a given glyph (character),
 * handling alternative versions of the glyph when shift is held down, such as
 * uppercase variants, or exclamation marks for ones.
 *
 * For other specific keys, see {@link BasicVirtualKey}.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export declare class GlyphVirtualKey extends VirtualKey {
    readonly glyph: string;
    readonly altGlyph: string;
    readonly keyContext: Readonly<KeyContext>;
    /**
     * Create a new GlyphVirtualKey.
     *
     * @param glyph - The glyph to emit/show when shift is not held.
     * @param altGlyph - The alternative glyph to emit/show when shift is held. Will be equal to glyph if set to null.
     * @param keyContext - The {@link KeyContext} shared by other keys to tell when shift is being held in a virtual keyboard.
     */
    constructor(glyph: string, altGlyph: string | null, keyContext: Readonly<KeyContext>, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
    handlePreLayoutUpdate(): void;
    get currentGlyph(): string;
}
