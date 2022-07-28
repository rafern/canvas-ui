import { VirtualKeyboard, defaultVirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { PointerStyleHandler } from './PointerStyleHandler';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { Margin } from '../widgets/Margin';
import { Theme } from '../theme/Theme';
import { Root } from './Root';

/**
 * A {@link Root} containing a single {@link VirtualKeyboard} widget inside a
 * {@link Margin}. Automatically disables itself if not needed, but
 * {@link VirtualKeyboardRoot#updateVisibility} must be called every frame for
 * this behaviour to occur.
 *
 * @category Core
 */
export class VirtualKeyboardRoot extends Root {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver: KeyboardDriver;

    /**
     * Creates a new VirtualKeyboardRoot.
     *
     * Sets {@link VirtualKeyboardRoot#child} to a new {@link Margin} containing
     * a {@link VirtualKeyboard} with the given keyboard and
     * {@link VirtualKeyboardTemplate | keyboard template},
     * {@link VirtualKeyboardRoot#pointerStyleHandler} and
     * {@link VirtualKeyboardRoot#child}'s
     * {@link Widget#inheritedTheme | inherited theme}.
     *
     * @param keyboardTemplate - By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}
     * @param theme - If none supplied, then the default theme found in {@link (Theme:constructor)} is used
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate: VirtualKeyboardTemplate = defaultVirtualKeyboardTemplate, pointerStyleHandler: PointerStyleHandler | null = null, theme: Theme = new Theme()) {
        super(
            new Margin(
                new VirtualKeyboard(keyboardDriver, keyboardTemplate),
            ),
            pointerStyleHandler, theme,
        );
        this.keyboardDriver = keyboardDriver;
    }

    /**
     * Update the visibility of this root; if the keyboard driver has no focused
     * root, then the root is disabled, else, it is enabled. Call this method
     * on every frame to automatically enable/disable the root if needed
     */
    updateVisibility(): void {
        // Update visibility of root by enabling/disabling it
        this.enabled = this.keyboardDriver.needsInput;
    }
}