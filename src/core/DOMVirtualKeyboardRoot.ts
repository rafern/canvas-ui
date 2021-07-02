import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard';
import { DOMKeyboardDriver } from '../drivers/DOMKeyboardDriver';
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

        // If the keyboard driver is a DOMKeyboardDriver, add this root to its
        // whitelist so that the root focus isn't cleared when clicking on this
        // root
        if(keyboardDriver instanceof DOMKeyboardDriver)
            keyboardDriver.whitelist.add(this.domElem);

        this.#keyboardDriver = keyboardDriver;

        // Clear the keyboard root focus when this root's DOM element loses DOM
        // focus to an element that isn't tracked by the keyboard driver
        this.domElem.addEventListener('blur', (event) => {
            if(this.#keyboardDriver instanceof DOMKeyboardDriver) {
                if(this.#keyboardDriver.shouldClearFocus(event.relatedTarget))
                    this.#keyboardDriver.clearFocus();
            }
            else
                this.#keyboardDriver.clearFocus();
        });

        // Listen for keyboard events so that you can still type if the virtual
        // keyboard's DOM element is focused
        this.domElem.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.#keyboardDriver.keyDown(event.key);
        });

        this.domElem.addEventListener('keyup', (event) => {
            event.preventDefault();
            this.#keyboardDriver.keyUp(event.key);
        });
    }

    update(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.#keyboardDriver.getFocusedRoot() !== null;

        // Update normally
        super.update();
    }
}