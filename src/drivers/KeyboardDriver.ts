import { KeyRelease } from '../events/KeyRelease';
import { KeyPress } from '../events/KeyPress';
import type { Driver } from '../core/Driver';
import type { Root } from '../core/Root';

export class KeyboardDriver implements Driver {
    private eventQueue: [string, boolean][] = [];

    constructor(listenElem: HTMLElement) {
        // Listen for keyboard events, filling event queue
        listenElem.addEventListener('keydown', (event) => {
            this.eventQueue.push([event.key, true]);
        });

        listenElem.addEventListener('keyup', (event) => {
            this.eventQueue.push([event.key, false]);
        });
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onEnable(_root: Root): void {}

    onDisable(_root: Root): void {
        this.eventQueue = [];
    }

    update(root: Root): void {
        // Parse each keyboard event
        for(const event of this.eventQueue) {
            // Dispatch event
            if(event[1])
                root.dispatchEvent(new KeyPress(event[0], null));
            else
                root.dispatchEvent(new KeyRelease(event[0], null));
        }

        // Clear event queue
        this.eventQueue = [];
    }
}
