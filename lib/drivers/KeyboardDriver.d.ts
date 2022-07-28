import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Root } from '../core/Root';
/**
 * A generic keyboard {@link Driver | driver}.
 *
 * Does nothing on its own, but provides an API for sending keyboard events to
 * registered roots.
 *
 * @category Driver
 */
export declare class KeyboardDriver implements Driver {
    /** The list of key down/up events that haven't been dispatched yet. */
    private eventQueues;
    /** A set containing the keys currently down. */
    private keysDown;
    /** The currently focused root. New keyboard events will go to this root */
    private focus;
    /**
     * The last {@link Root} that had "activity"; the last Root where any focus
     * was grabbed. Used as a fallback when there is no focus. If this is null,
     * then a root from {@link KeyboardDriver#eventQueues} is picked; this
     * fallback of a fallback may result in weird behaviour if there are more
     * than 1 Roots, since eventQueues is a Map, and Map iteration is not
     * guaranteed to be in the same order
     */
    private lastActivity;
    /**
     * Get the {@link KeyboardDriver#eventQueues | event queue} of a given root.
     * If this driver is not registered to the given root or the given root is
     * disabled, making it not present in eventQueues, then null is returned.
     */
    private getEventQueue;
    /**
     * Changes the current {@link KeyboardDriver#focus | root focus}.
     *
     * If there was a previous root focus, that root's {@link Root#clearFocus}
     * is called with {@link FocusType#Keyboard}.
     *
     * {@link KeyboardDriver#keysDown} is cleared.
     */
    protected changeFocusedRoot(root: Root | null): void;
    /**
     * Get the current {@link KeyboardDriver#focus | root focus}.
     *
     * @returns Returns {@link KeyboardDriver#focus}
     */
    getFocusedRoot(): Root | null;
    /**
     * Similar to {@link KeyboardDriver#getFocusedRoot}, but can fall back to
     * {@link KeyboardDriver#lastActivity} if {@link KeyboardDriver#focus} is
     * null, or a {@link Root} in {@link KeyboardDriver#eventQueues} if
     * lastActivity is also null.
     */
    getEffectiveFocusedRoot(): Root | null;
    /**
     * Clear the current {@link KeyboardDriver#focus | root focus}. Calls
     * {@link KeyboardDriver#changeFocusedRoot} with null.
     */
    clearFocus(): void;
    /**
     * Push a new {@link KeyPress} event to {@link KeyboardDriver#eventQueues}.
     *
     * @param key - Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     * @param shift - Is shift being pressed?
     * @param ctrl - Is control being pressed?
     * @param alt - Is alt being pressed?
     */
    keyDown(key: string, shift: boolean, ctrl: boolean, alt: boolean): void;
    /**
     * Push a new {@link KeyRelease} event to {@link KeyboardDriver#eventQueues}.
     *
     * @param key - Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     * @param shift - Is shift being pressed?
     * @param ctrl - Is control being pressed?
     * @param alt - Is alt being pressed?
     */
    keyUp(key: string, shift: boolean, ctrl: boolean, alt: boolean): void;
    /**
     * Calls {@link KeyboardDriver#keyDown} followed by
     * {@link KeyboardDriver#keyUp}. If the key was already down before calling
     * ({@link KeyboardDriver#isKeyDown}), keyUp is not called.
     *
     * @param key - Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     * @param shift - Is shift being pressed?
     * @param ctrl - Is control being pressed?
     * @param alt - Is alt being pressed?
     */
    keyPress(key: string, shift: boolean, ctrl: boolean, alt: boolean): void;
    /**
     * Check if a key is pressed.
     *
     * @param key - Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     *
     * @returns Returns true if key was in {@link KeyboardDriver#keysDown}
     */
    isKeyDown(key: string): boolean;
    /**
     * Adds enabled root to {@link KeyboardDriver#eventQueues}.
     */
    onEnable(root: Root): void;
    /**
     * Removes disabled root from {@link KeyboardDriver#eventQueues}. If the
     * root was the {@link KeyboardDriver#focus}, then
     * {@link KeyboardDriver#clearFocus | the focus is cleared }.
     */
    onDisable(root: Root): void;
    /**
     * Dispatches all {@link KeyboardDriver#eventQueues | queued events } for
     * the root and clears its event queue
     */
    update(root: Root): void;
    /**
     * Does nothing if the new focus type is not a {@link FocusType.Keyboard}.
     * If the focus comes from a root which is not the
     * {@link KeyboardDriver#focus | root focus}, then the root focus is
     * {@link KeyboardDriver#changeFocusedRoot | changed to the new root}. If
     * there is no new focused widget (the root's keyboard focus was cleared),
     * then nothing happens.
     *
     * This behaviour is confusing, however, it's required so that the keyboard
     * focus "lingers" for future tab key presses; this way, pressing tab can do
     * tab selection even when there is no widget that wants keyboard input.
     * When a focus is lingering, then it means that key events are still being
     * dispatched to the last focused root, but they don't have a target. This
     * way, most events get dropped, but tab key events are used for tab
     * selection.
     */
    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void;
    onFocusCapturerChanged(_root: Root, _focusType: FocusType, _oldCapturer: Widget | null, _newCapturer: Widget | null): void;
    /**
     * Check if the currently focused root needs keyboard input. Virtual
     * keyboard should query this property to know when to show themselves.
     */
    get needsInput(): boolean;
}
