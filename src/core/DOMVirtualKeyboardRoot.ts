import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import { VirtualKeyboard } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { defaultTheme } from '../theme/defaultTheme';
import type { Theme } from '../theme/Theme';
import { DOMRoot } from './DOMRoot';

export class DOMVirtualKeyboardRoot extends DOMRoot {
    // Like DOMRoot, but for VirtualKeyboardRoot. In this version
    // updateVisibility doesn't exist, just call update like in DOMRoot
    private readonly keyboardDriver: KeyboardDriver;

    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate | null = null, theme: Theme = defaultTheme) {
        super(new VirtualKeyboard(keyboardDriver, keyboardTemplate), theme);
        this.keyboardDriver = keyboardDriver;
    }

    override update(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.keyboardDriver.getFocusedRoot() !== null;

        // Update normally
        super.update();
    }
}