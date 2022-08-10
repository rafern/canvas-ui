import type { VirtualKeyboardTemplate } from '../widgets/VirtualKeyboard/VirtualKeyboard';
import type { KeyboardDriver } from '../drivers/KeyboardDriver';
import { Root, RootProperties } from './Root';
/**
 * Optional VirtualKeyboardRoot constructor properties.
 *
 * @category Core
 */
export interface VirtualKeyboardRootProperties extends RootProperties {
    /**
     * The keyboard template to use for the {@link VirtualKeyboard} Widget in a
     * {@link VirtualKeyboardRoot}.
     */
    keyboardTemplate?: VirtualKeyboardTemplate;
}
/**
 * A {@link Root} containing a single {@link VirtualKeyboard} widget inside a
 * {@link Margin}. Automatically disables itself if not needed, but
 * {@link VirtualKeyboardRoot#updateVisibility} must be called every frame for
 * this behaviour to occur.
 *
 * @category Core
 */
export declare class VirtualKeyboardRoot extends Root {
    /** The {@link KeyboardDriver} used by this root's virtual keyboard. */
    private readonly keyboardDriver;
    /**
     * Creates a new VirtualKeyboardRoot.
     *
     * Sets {@link VirtualKeyboardRoot#child} to a new {@link Margin} containing
     * a {@link VirtualKeyboard} with the given keyboard and
     * {@link VirtualKeyboardTemplate | keyboard template},
     * {@link VirtualKeyboardRoot#pointerStyleHandler} and
     * {@link VirtualKeyboardRoot#child}'s
     * {@link Widget#inheritedTheme | inherited theme}.
     */
    constructor(keyboardDriver: KeyboardDriver, properties?: VirtualKeyboardRootProperties);
    /**
     * Update the visibility of this root; if the keyboard driver has no focused
     * root, then the root is disabled, else, it is enabled. Call this method
     * on every frame to automatically enable/disable the root if needed
     */
    updateVisibility(): void;
}
