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
     * Get the {@link eventQueues | event queue} of a given root. If this driver
     * is not registered to the given root or the given root is disabled, making
     * it not present in eventQueues, then null is returned.
     */
    private getEventQueue;
    /**
     * Changes the current {@link focus | root focus}.
     *
     * If there was a previous root focus, that root's {@link Root.clearFocus}
     * is called with {@link FocusType.Keyboard}.
     *
     * {@link keysDown} is cleared.
     */
    protected changeFocusedRoot(root: Root | null): void;
    /**
     * Get the current {@link focus | root focus}.
     *
     * @returns Returns {@link focus}
     */
    getFocusedRoot(): Root | null;
    /**
     * Clear the current {@link focus | root focus}. Calls
     * {@link changeFocusedRoot} with null.
     */
    clearFocus(): void;
    /**
     * Push a new {@link KeyPress} event to {@link eventQueues}.
     *
     * @param key Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     * @param shift Is shift being pressed?
     * @param ctrl Is control being pressed?
     * @param alt Is alt being pressed?
     */
    keyDown(key: string, shift: boolean, ctrl: boolean, alt: boolean): void;
    /**
     * Push a new {@link KeyRelease} event to {@link eventQueues}.
     *
     * @param key Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     * @param shift Is shift being pressed?
     * @param ctrl Is control being pressed?
     * @param alt Is alt being pressed?
     */
    keyUp(key: string, shift: boolean, ctrl: boolean, alt: boolean): void;
    /**
     * Calls {@link keyDown} followed by {@link keyUp}. If the key was already
     * down before calling ({@link isKeyDown}), keyUp is not called.
     *
     * @param key Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     * @param shift Is shift being pressed?
     * @param ctrl Is control being pressed?
     * @param alt Is alt being pressed?
     */
    keyPress(key: string, shift: boolean, ctrl: boolean, alt: boolean): void;
    /**
     * Check if a key is pressed.
     *
     * @param key Must follow the {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key} Web API.
     *
     * @returns Returns true if key was in {@link keysDown}
     */
    isKeyDown(key: string): boolean;
    /**
     * Adds enabled root to {@link eventQueues}.
     */
    onEnable(root: Root): void;
    /**
     * Removes disabled root from {@link eventQueues}. If the root was the
     * {@link focus}, then {@link clearFocus | the focus is cleared }.
     */
    onDisable(root: Root): void;
    /**
     * Dispatches all {@link eventQueues | queued events } for the root and
     * clears its event queue
     */
    update(root: Root): void;
    /**
     * Does nothing if the new focus type is not a {@link FocusType.Keyboard}.
     * If the focus comes from a root which is not the
     * {@link focus | root focus}, then the root focus is
     * {@link changeFocusedRoot | changed to the new root}. If it comes from the
     * current root focus and there is no new focused widget (the root's
     * keyboard focus was cleared), then the root focus is
     * {@link clearFocus | cleared}.
     */
    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void;
    onFocusCapturerChanged(_root: Root, _focusType: FocusType, _oldCapturer: Widget | null, _newCapturer: Widget | null): void;
}
