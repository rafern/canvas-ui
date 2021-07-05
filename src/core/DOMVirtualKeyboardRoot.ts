import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { VirtualKeyboard } from '../widgets/VirtualKeyboard';
import { defaultTheme } from '../theme/DefaultTheme';
import type { Theme } from '../theme/Theme';
import { DOMRoot } from './DOMRoot';

export class DOMVirtualKeyboardRoot extends DOMRoot {
    // Like DOMRoot, but for VirtualKeyboardRoot. In this version
    // updateVisibility doesn't exist, just call update like in DOMRoot
    readonly #keyboardDriver: KeyboardDriver;

    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate | null = null, theme: Theme = defaultTheme) {
        super(new VirtualKeyboard(keyboardDriver, keyboardTemplate), theme);
        this.#keyboardDriver = keyboardDriver;
    }

    update(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.#keyboardDriver.getFocusedRoot() !== null;

        // Update normally
        super.update();
    }
}