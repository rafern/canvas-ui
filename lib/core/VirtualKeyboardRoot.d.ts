import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { PointerStyleHandler } from './PointerStyleHandler';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';
export declare class VirtualKeyboardRoot extends Root {
    private readonly keyboardDriver;
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate?: VirtualKeyboardTemplate | null, pointerStyleHandler?: PointerStyleHandler | null, theme?: Theme);
    updateVisibility(): void;
}
