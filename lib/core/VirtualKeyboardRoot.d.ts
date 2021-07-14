import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { PointerStyleHandler } from './PointerStyleHandler';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import type { Theme } from '../theme/Theme';
import { Root } from './Root';
/**
 * A {@link Root} containing a single {@link VirtualKeyboard} widget.
 * Automatically disables itself if not needed, but {@link updateVisibility}
 * must be called every frame for this behaviour to occur.
 *
 * @category Core
 */
export declare class VirtualKeyboardRoot extends Root {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver;
    /**
     * Creates a new VirtualKeyboardRoot.
     *
     * Sets {@link child} to a new {@link VirtualKeyboard} with the given
     * keyboard and {@link VirtualKeyboardTemplate | keyboard template},
     * {@link pointerStyleHandler} and {@link child}'s
     * {@link Widget.inheritedTheme | inherited theme}.
     *
     * @param keyboardTemplate By default, the virtual keyboard template is {@link defaultVirtualKeyboardTemplate}
     * @param theme By default, the theme is {@link defaultTheme}
     */
    constructor(keyboardDriver: KeyboardDriver, keyboardTemplate?: VirtualKeyboardTemplate, pointerStyleHandler?: PointerStyleHandler | null, theme?: Theme);
    /**
     * Update the visibility of this root; if the keyboard driver has no focused
     * root, then the root is disabled, else, it is enabled. Call this method
     * on every frame to automatically enable/disable the root if needed
     */
    updateVisibility(): void;
}
