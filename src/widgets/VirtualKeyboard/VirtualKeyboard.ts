import type { KeyboardDriver } from '../../drivers/KeyboardDriver';
import type { KeyTemplateFunction } from './KeyRow';
import { MultiContainer } from '../MultiContainer';
import type { Theme } from '../../theme/Theme';
import type { KeyContext } from './KeyContext';
import { BackspaceKey } from './BackspaceKey';
import { EscapeKey } from './EscapeKey';
import { EnterKey } from './EnterKey';
import { ShiftKey } from './ShiftKey';
import { SpaceKey } from './SpaceKey';
import { KeyRow } from './KeyRow';

export type VirtualKeyboardTemplate = Array<Array<string[] | KeyTemplateFunction>>;

const defaultVirtualKeyboardTemplate = <VirtualKeyboardTemplate>[
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
            this.add(new KeyRow(rowTemplate, this.#keyContext, themeOverride));
    }
}
