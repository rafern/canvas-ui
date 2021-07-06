import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import { VirtualKeyboard } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { PointerStyleHandler } from './PointerStyleHandler';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { defaultTheme } from '../theme/defaultTheme';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';

export class VirtualKeyboardRoot extends Root {
    // A VirtualKeyboard Widget, but in the form of a Root. Automatically
    // disables itself if not needed, but updateVisibility must be called every
    // frame for this behaviour to occur

    private readonly keyboardDriver: KeyboardDriver;

    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate | null = null, pointerStyleHandler: PointerStyleHandler | null = null, theme: Theme = defaultTheme) {
        super(new VirtualKeyboard(keyboardDriver, keyboardTemplate), pointerStyleHandler, theme);
        this.keyboardDriver = keyboardDriver;
    }

    updateVisibility(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.keyboardDriver.getFocusedRoot() !== null;
    }
}