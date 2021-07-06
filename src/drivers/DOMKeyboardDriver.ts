import { KeyboardDriver } from './KeyboardDriver';

export class DOMKeyboardDriver extends KeyboardDriver {
    // Keyboard driver that listens for keyboard events in one or more DOM
    // elements. Note that if a DOM element is unfocused in the DOM to an
    // unbound DOM element, the root focus is cleared. If this creates issues,
    // other DOM elements can be bound without creating keyboard event listeners
    private domElems: Set<EventTarget> = new Set();

    bindDOMElem(domElem: HTMLElement, listenToKeys = true): void {
        // Add to set. If it was already in set, abort
        if(this.domElems.has(domElem))
            return;

        this.domElems.add(domElem);

        // Listen for keyboard events, filling event queue, and blur event for
        // clearing keyboard focus
        if(listenToKeys) {
            domElem.addEventListener('keydown', (event) => {
                event.preventDefault();
                this.keyDown(event.key);
            });

            domElem.addEventListener('keyup', (event) => {
                event.preventDefault();
                this.keyUp(event.key);
            });
        }

        domElem.addEventListener('blur', (event) => {
            if(this.shouldClearFocus(event.relatedTarget))
                this.clearFocus();
        });

    }

    shouldClearFocus(newTarget: EventTarget | null): boolean {
        return newTarget === null || !this.domElems.has(newTarget);
    }
}
