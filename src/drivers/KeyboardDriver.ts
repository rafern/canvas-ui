import type { KeyEvent } from '../events/KeyEvent';
import { KeyRelease } from '../events/KeyRelease';
import type { Widget } from '../widgets/Widget';
import { KeyPress } from '../events/KeyPress';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Root } from '../core/Root';

export class KeyboardDriver implements Driver {
    // The list of key down/up events that haven't been dispatched yet. Call
    // keyDown/keyUp/keyPress to push to this queue. Key IDs must follow the
    // KeyboardEvent.key API convention:
    // https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
    private eventQueues: Map<Root, Array<KeyEvent>> = new Map();
    // A set containing the keys currently down. If the root grabbing the
    // keyboard is disabled, all the keys are released. Calling keyDown or
    // keyPress on an already pressed key will have no effect. Calling keyUp on
    // a key that is not pressed will have no effect
    private keysDown: Set<string> = new Set();
    // The currently focused root
    private focus: Root | null = null;

    private getEventQueue(root: Root | null): Array<KeyEvent> | null {
        if(root === null)
            return null;

        const eventQueue = this.eventQueues.get(root);
        if(typeof eventQueue === 'undefined')
            return null;

        return eventQueue;
    }

    _changeFocusedRoot(root: Root | null): void { // XXX protected
        if(this.focus !== null)
            this.focus.clearFocus(FocusType.Keyboard);

        this.focus = root;

        if(root !== null) {
            for(const key of this.keysDown) {
                const eventQueue = this.getEventQueue(this.focus);
                if(eventQueue !== null)
                    eventQueue.push(new KeyPress(key, null));
            }
        }
    }

    getFocusedRoot(): Root | null {
        return this.focus;
    }

    keyDown(key: string): void {
        if(!this.keysDown.has(key)) {
            this.keysDown.add(key);
            const eventQueue = this.getEventQueue(this.focus);
            if(eventQueue !== null)
                eventQueue.push(new KeyPress(key, null));
        }
    }

    keyUp(key: string): void {
        if(this.keysDown.delete(key)) {
            const eventQueue = this.getEventQueue(this.focus);
            if(eventQueue !== null)
                eventQueue.push(new KeyRelease(key, null));
        }
    }

    keyPress(key: string): void {
        this.keyDown(key);
        this.keyUp(key);
    }

    isKeyDown(key: string): boolean {
        return this.keysDown.has(key);
    }

    onEnable(root: Root): void {
        if(!this.eventQueues.has(root))
            this.eventQueues.set(root, []);
    }

    onDisable(root: Root): void {
        if(this.eventQueues.has(root)) {
            this.eventQueues.delete(root);
            if(root === this.focus)
                this._changeFocusedRoot(null);
        }
    }

    update(root: Root): void {
        const eventQueue = this.getEventQueue(this.focus);
        if(eventQueue === null)
            return;

        // Dispatch queued keyboard events
        for(const event of eventQueue)
            root.dispatchEvent(event);

        // Clear event queue
        eventQueue.length = 0;
    }

    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void {
        if(focusType !== FocusType.Keyboard)
            return;

        if(root == this.focus) {
            if(newFocus === null)
                this._changeFocusedRoot(null);
        }
        else {
            if(newFocus !== null)
                this._changeFocusedRoot(root);
        }
    }
}
