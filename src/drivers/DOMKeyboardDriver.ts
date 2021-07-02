import { KeyboardDriver } from './KeyboardDriver';

export class DOMKeyboardDriver extends KeyboardDriver {
    // Keyboard driver that listens for keyboard events in a DOM element. Supply
    // this a canvas element if using in an engine that merges everything into a
    // single canvas. If you are using DOMRoot, then use one driver per DOMRoot
    constructor(domElem: HTMLElement) {
        super();

        // Listen for keyboard events, filling event queue, and blur event for
        // clearing keyboard focus
        domElem.addEventListener('keydown', (event) => {
            event.preventDefault();
            this.keyDown(event.key);
        });

        domElem.addEventListener('keyup', (event) => {
            event.preventDefault();
            this.keyUp(event.key);
        });

        domElem.addEventListener('blur', (_event) => {
            this.clearFocus();
        });
    }
}
