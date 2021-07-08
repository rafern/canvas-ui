import type { KeyEvent } from '../events/KeyEvent';
import { KeyRelease } from '../events/KeyRelease';
import type { Widget } from '../widgets/Widget';
import { KeyPress } from '../events/KeyPress';
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
export class KeyboardDriver implements Driver {
    /** The list of key down/up events that haven't been dispatched yet. */
    private eventQueues: Map<Root, Array<KeyEvent>> = new Map();
    /** A set containing the keys currently down. */
    private keysDown: Set<string> = new Set();
    /** The currently focused root. New keyboard events will go to this root */
    private focus: Root | null = null;

    /**
     * Get the {@link eventQueues | event queue} of a given root. If this driver
     * is not registered to the given root or the given root is disabled, making
     * it not present in eventQueues, then null is returned.
     */
    private getEventQueue(root: Root | null): Array<KeyEvent> | null {
        if(root === null)
            return null;

        const eventQueue = this.eventQueues.get(root);
        if(typeof eventQueue === 'undefined')
            return null;

        return eventQueue;
    }

    /**
     * Changes the current {@link focus | root focus}.
     *
     * If there was a previous root focus, that root's {@link Root.clearFocus}
     * is called with {@link FocusType.Keyboard}.
     *
     * {@link keysDown} is cleared.
     */
    protected changeFocusedRoot(root: Root | null): void {
        if(this.focus !== null)
            this.focus.clearFocus(FocusType.Keyboard);

        this.focus = root;
        this.keysDown.clear();
    }

    /**
     * Get the current {@link focus | root focus}.
     *
     * @returns Returns {@link focus}
     */
    getFocusedRoot(): Root | null {
        return this.focus;
    }

    /**
     * Clear the current {@link focus | root focus}. Calls
     * {@link changeFocusedRoot} with null.
     */
    clearFocus(): void {
        this.changeFocusedRoot(null);
    }

    /**
     * Push a new {@link KeyPress} event to {@link eventQueues}.
     *
     * @param key Must follow the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key}
     * Web API.
     */
    keyDown(key: string): void {
        this.keysDown.add(key);
        const eventQueue = this.getEventQueue(this.focus);
        if(eventQueue !== null)
            eventQueue.push(new KeyPress(key, null));
    }

    /**
     * Push a new {@link KeyRelease} event to {@link eventQueues}.
     *
     * @param key Must follow the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key}
     * Web API.
     */
    keyUp(key: string): void {
        if(this.keysDown.delete(key)) {
            const eventQueue = this.getEventQueue(this.focus);
            if(eventQueue !== null)
                eventQueue.push(new KeyRelease(key, null));
        }
    }

    /**
     * Calls {@link keyDown} followed by {@link keyUp}. If the key was already
     * down before calling ({@link isKeyDown}), keyUp is not called.
     *
     * @param key Must follow the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key}
     * Web API.
     */
    keyPress(key: string): void {
        const wasDown = this.isKeyDown(key);
        this.keyDown(key);
        if(!wasDown)
            this.keyUp(key);
    }

    /**
     * Check if a key is pressed.
     *
     * @param key Must follow the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key}
     * Web API.
     *
     * @returns Returns true if key was in {@link keysDown}
     */
    isKeyDown(key: string): boolean {
        return this.keysDown.has(key);
    }

    /**
     * Adds enabled root to {@link eventQueues}.
     */
    onEnable(root: Root): void {
        if(!this.eventQueues.has(root))
            this.eventQueues.set(root, []);
    }

    /**
     * Removes disabled root from {@link eventQueues}. If the root was the
     * {@link focus}, then {@link clearFocus | the focus is cleared }.
     */
    onDisable(root: Root): void {
        if(this.eventQueues.has(root)) {
            this.eventQueues.delete(root);
            if(root === this.focus)
                this.clearFocus();
        }
    }

    /**
     * Dispatches all {@link eventQueue | queued events } for the root and
     * clears its event queue
     */
    update(root: Root): void {
        const eventQueue = this.getEventQueue(root);
        if(eventQueue === null)
            return;

        // Dispatch queued keyboard events
        for(const event of eventQueue)
            root.dispatchEvent(event);

        // Clear event queue
        eventQueue.length = 0;
    }

    /**
     * Does nothing if the new focus type is not a {@link FocusType.Keyboard}.
     * If the focus comes from a root which is not the
     * {@link focus | root focus}, then the root focus is
     * {@link changeFocusedRoot | changed to the new root}. If it comes from the
     * current root focus and there is no new focused widget (the root's
     * keyboard focus was cleared), then the root focus is
     * {@link clearFocus | cleared}.
     */
    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void {
        if(focusType !== FocusType.Keyboard)
            return;

        if(root == this.focus) {
            if(newFocus === null)
                this.clearFocus();
        }
        else if(newFocus !== null)
            this.changeFocusedRoot(root);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFocusCapturerChanged(_root: Root, _focusType: FocusType, _oldCapturer: Widget | null, _newCapturer: Widget | null): void {}
}
