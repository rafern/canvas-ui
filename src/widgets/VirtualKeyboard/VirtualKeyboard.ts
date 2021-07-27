import type { KeyboardDriver } from '../../drivers/KeyboardDriver';
import type { VirtualKeyRowTemplate } from './VirtualKeyRow';
import { VirtualKeyRow } from './VirtualKeyRow';
import type { KeyContext } from './KeyContext';
import type { Theme } from '../../theme/Theme';
import { BackspaceKey } from './BackspaceKey';
import { EscapeKey } from './EscapeKey';
import { EnterKey } from './EnterKey';
import { ShiftKey } from './ShiftKey';
import { SpaceKey } from './SpaceKey';
import { Column } from '../Column';

/**
 * A template for the keys in a {@link VirtualKeyboard}. Each member of the
 * array contains the template for a row of keys, from top to bottom.
 *
 * @category Widget
 */
export type VirtualKeyboardTemplate = Array<VirtualKeyRowTemplate>;

function EnterKeyTemplate(keyContext: KeyContext, themeOverride: Theme | null): EnterKey {
    return new EnterKey(
        keyContext, undefined, undefined, undefined, themeOverride,
    );
}

function ShiftKeyTemplate(keyContext: KeyContext, themeOverride: Theme | null): ShiftKey {
    return new ShiftKey(
        keyContext, undefined, undefined, undefined, themeOverride,
    );
}

function BackspaceKeyTemplate(keyContext: KeyContext, themeOverride: Theme | null): BackspaceKey {
    return new BackspaceKey(
        keyContext, undefined, undefined, undefined, themeOverride,
    );
}

function SpaceKeyTemplate(keyContext: KeyContext, themeOverride: Theme | null): SpaceKey {
    return new SpaceKey(
        keyContext, undefined, undefined, undefined, themeOverride,
    );
}

function EscapeKeyTemplate(keyContext: KeyContext, themeOverride: Theme | null): EscapeKey {
    return new EscapeKey(
        keyContext, undefined, undefined, undefined, themeOverride,
    );
}

/**
 * The default template for the keys in a {@link VirtualKeyboard}; A QWERTY
 * keyboard with US layout.
 *
 * @category Widget
 */
export const defaultVirtualKeyboardTemplate: VirtualKeyboardTemplate = [
    // First row
    [['`1234567890-=', '~!@#$%^&*()_+']],
    // Second row
    [['qwertyuiop[]\\', 'QWERTYUIOP{}|']],
    // Third row
    [['asdfghjkl;\'', 'ASDFGHJKL:"'], EnterKeyTemplate],
    // Fourth row
    [ShiftKeyTemplate, ['zxcvbnm,./', 'ZXCVBNM<>?']],
    // Fifth row
    [BackspaceKeyTemplate, SpaceKeyTemplate, EscapeKeyTemplate],
];

/**
 * A virtual keyboard widget.
 *
 * Needs a {@link KeyboardDriver} so that key events can be queued.
 *
 * Equivalent to creating a {@link Column} of {@link VirtualKeyRow} with a shared
 * {@link KeyContext}.
 *
 * @category Widget
 */
export class VirtualKeyboard extends Column {
    /**
     * Create a new VirtualKeyboard.
     *
     * @param keyboardTemplate By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}
     * @param flexRatio The flexRatio to use when creating {@link Glyph | Glyphs}
     * @param mainBasis The mainBasis to use when creating {@link Glyph | Glyphs}
     * @param crossBasis The crossBasis to use when creating {@link Glyph | Glyphs}
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate = defaultVirtualKeyboardTemplate, flexRatio = 0, mainBasis = 24, crossBasis = 24, themeOverride: Theme | null = null) {
        super(themeOverride);

        // Make context
        const keyContext = <KeyContext>{
            callback: (key: string) => {
                keyboardDriver.keyPress(key);
            },
            shift: false,
        };

        for(const rowTemplate of keyboardTemplate) {
            this.add(new VirtualKeyRow(
                rowTemplate, keyContext, flexRatio, mainBasis, crossBasis,
                themeOverride,
            ));
        }
    }
}
