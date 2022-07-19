import type { ThemeProperties } from '../../theme/ThemeProperties';
import type { KeyboardDriver } from '../../drivers/KeyboardDriver';
import type { FlexAlignment2D } from '../../theme/FlexAlignment2D';
import type { VirtualKeyRowTemplate } from './VirtualKeyRow';
import { FlexAlignment } from '../../theme/FlexAlignment';
import { Alignment } from '../../theme/Alignment';
import { VirtualKeyRow } from './VirtualKeyRow';
import type { KeyContext } from './KeyContext';
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

function EnterKeyTemplate(keyContext: KeyContext, themeProperties?: ThemeProperties): EnterKey {
    return new EnterKey(
        keyContext, undefined, undefined, undefined, themeProperties,
    );
}

function ShiftKeyTemplate(keyContext: KeyContext, themeProperties?: ThemeProperties): ShiftKey {
    return new ShiftKey(
        keyContext, undefined, undefined, undefined, themeProperties,
    );
}

function BackspaceKeyTemplate(keyContext: KeyContext, themeProperties?: ThemeProperties): BackspaceKey {
    return new BackspaceKey(
        keyContext, undefined, undefined, undefined, themeProperties,
    );
}

function SpaceKeyTemplate(keyContext: KeyContext, themeProperties?: ThemeProperties): SpaceKey {
    return new SpaceKey(
        keyContext, undefined, undefined, undefined, themeProperties,
    );
}

function EscapeKeyTemplate(keyContext: KeyContext, themeProperties?: ThemeProperties): EscapeKey {
    return new EscapeKey(
        keyContext, undefined, undefined, undefined, themeProperties,
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
 * {@link KeyContext}. Key rows will be created with SpaceBetween main alignment
 * and Stretch cross alignment.
 *
 * @category Widget
 */
export class VirtualKeyboard extends Column {
    /**
     * Create a new VirtualKeyboard.
     *
     * @param keyboardTemplate - By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}
     * @param flexRatio - The flexRatio to use when creating {@link GlyphVirtualKey | glyphs keys}
     * @param mainBasis - The mainBasis to use when creating {@link GlyphVirtualKey | glyphs keys}
     * @param crossBasis - The crossBasis to use when creating {@link GlyphVirtualKey | glyphs keys}
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate = defaultVirtualKeyboardTemplate, flexRatio = 0, mainBasis = 24, crossBasis = 24, themeProperties?: ThemeProperties) {
        const themePropertiesClone: ThemeProperties = {...themeProperties};

        themePropertiesClone.multiContainerAlignment = <FlexAlignment2D>{
            main: FlexAlignment.SpaceBetween, cross: Alignment.Stretch,
        };

        super(themePropertiesClone);

        // Make context
        const keyContext = <KeyContext>{
            callback: (key: string) => {
                keyboardDriver.keyPress(
                    key,
                    keyContext.shift,
                    keyContext.ctrl,
                    keyContext.alt,
                );
            },
            shift: false,
            ctrl: false,
            alt: false,
        };

        for(const rowTemplate of keyboardTemplate) {
            this.add(new VirtualKeyRow(
                rowTemplate, keyContext, flexRatio, mainBasis, crossBasis,
                themePropertiesClone,
            ));
        }
    }
}
