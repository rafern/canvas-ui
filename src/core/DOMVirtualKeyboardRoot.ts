import { VirtualKeyboard, defaultVirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { Margin } from '../widgets/Margin';
import { Theme } from '../theme/Theme';
import { DOMRoot } from './DOMRoot';

/**
 * A {@link DOMRoot} with similar functionality to {@link VirtualKeyboardRoot}.
 * In this version
 * {@link VirtualKeyboardRoot.updateVisibility | updateVisibility} doesn't
 * exist. Instead, just call {@link update} like in DOMRoot.
 *
 * @category Core
 */
export class DOMVirtualKeyboardRoot extends DOMRoot {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver: KeyboardDriver;

    /**
     * Creates a new VirtualKeyboardRoot.
     *
     * Sets {@link child} to a new {@link Margin} containing a
     * {@link VirtualKeyboard} with the given keyboard and
     * {@link VirtualKeyboardTemplate | keyboard template} and {@link child}'s
     * {@link Widget.inheritedTheme | inherited theme}. Also sets up a
     * {@link pointerStyleHandler} which simply sets the CSS cursor style of
     * {@link domElem}. Creates {@link domElem} and {@link domCanvasContext}.
     *
     * @param keyboardTemplate By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}
     * @param theme If none supplied, then the default theme found in {@link Theme.constructor} is used
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate = defaultVirtualKeyboardTemplate, theme: Theme = new Theme()) {
        super(
            new Margin(
                new VirtualKeyboard(keyboardDriver, keyboardTemplate),
            ),
            theme,
        );
        this.keyboardDriver = keyboardDriver;
    }

    /**
     * Update DOMRoot.
     *
     * If root is disabled, {@link domElem}'s display style is set to 'none',
     * hiding it.
     *
     * Calls {@link preLayoutUpdate}, {@link resolveLayout},
     * {@link postLayoutUpdate} and {@link paint}.
     *
     * Also updates the visibility of this root; if the keyboard driver has no
     * focused root, then the root is disabled, else, it is enabled.
     */
    override update(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.keyboardDriver.getFocusedRoot() !== null;

        // Update normally
        super.update();
    }
}