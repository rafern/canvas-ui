import type { KeyTemplateFunction } from '../templates/VirtualKeyboard/KeyRow';
import type { KeyContext } from '../templates/VirtualKeyboard/KeyContext';
import { BackspaceKey } from '../templates/VirtualKeyboard/BackspaceKey';
import { EscapeKey } from '../templates/VirtualKeyboard/EscapeKey';
import { EnterKey } from '../templates/VirtualKeyboard/EnterKey';
import { ShiftKey } from '../templates/VirtualKeyboard/ShiftKey';
import { SpaceKey } from '../templates/VirtualKeyboard/SpaceKey';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { KeyRow } from '../templates/VirtualKeyboard/KeyRow';
import { MultiContainer } from './/MultiContainer';
import type { Theme } from '../theme/Theme';

const defaultVirtualKeyboardTemplate = [
    // First row
    [['`1234567890-=', '~!@#$%^&*()_+']],
    // Second row
    [['qwertyuiop[]\\', 'QWERTYUIOP{}|']],
    // Third row
    [['asdfghjkl;\'', 'ASDFGHJKL:"'], EnterKey],
    // Fourth row
    [ShiftKey, ['zxcvbnm,./', 'ZXCVBNM<>?']],
    // Fifth row
    [BackspaceKey, SpaceKey, EscapeKey],
];

export type VirtualKeyboardTemplate = Array<Array<string[] | KeyTemplateFunction>>;

// A virtual keyboard widget, which is a Column of KeyRows sharing a key
// context. If no keyboard template is given, the default QUERTY one is used.
// Needs a keyboard driver supllied so that key presses can be dispatched
export class VirtualKeyboard extends MultiContainer {
    #keyContext: KeyContext;

    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate | null = null, themeOverride: Theme | null = null) {
        super(true, themeOverride);

        // Make context
        this.#keyContext = <KeyContext>{
            callback: (key: string) => {
                keyboardDriver.keyPress(key);
            },
            shift: false,
        };

        // Use default template if none supplied
        if(keyboardTemplate === null)
            keyboardTemplate = defaultVirtualKeyboardTemplate;

        for(const rowTemplate of keyboardTemplate)
            this.add(KeyRow(rowTemplate, this.#keyContext, themeOverride));
    }
}
