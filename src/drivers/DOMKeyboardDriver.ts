import { KeyboardDriver } from './KeyboardDriver';

export class DOMKeyboardDriver extends KeyboardDriver {
    // Keyboard driver that listens for keyboard events in a DOM element. Supply
    // this a canvas element if using in an engine that merges everything into a
    // single canvas. If you are using DOMRoot, then use one driver per DOMRoot.
    // Note that if the domElem is unfocused in the DOM, the root focus is
    // cleared, creating issues for virtual keyboard roots. To get around this
    // issue, other DOM elements can be whitelisted. If the DOM focus is lost to
    // a whitelisted DOM element, then the root focus is not cleared.
    readonly whitelist: Set<EventTarget> = new Set();

    constructor(public readonly domElem: HTMLElement) {
        super();

        // Listen for keyboard events, filling event queue, and blur event for
        // clearing keyboard focus
        this.domElem.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.keyDown(event.key);
        });

        this.domElem.addEventListener('keyup', (event) => {
            event.preventDefault();
            this.keyUp(event.key);
        });

        this.domElem.addEventListener('blur', (event) => {
            if(this.shouldClearFocus(event.relatedTarget))
                this.clearFocus();
        });
    }

    shouldClearFocus(newTarget: EventTarget | null): boolean {
        return newTarget === null || (!this.whitelist.has(newTarget) && newTarget !== this.domElem);
    }
}
