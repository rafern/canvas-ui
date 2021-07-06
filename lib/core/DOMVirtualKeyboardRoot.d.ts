import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import type { Theme } from '../theme/Theme';
import { DOMRoot } from './DOMRoot';
export declare class DOMVirtualKeyboardRoot extends DOMRoot {
    #private;
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate?: VirtualKeyboardTemplate | null, theme?: Theme);
    update(): void;
}