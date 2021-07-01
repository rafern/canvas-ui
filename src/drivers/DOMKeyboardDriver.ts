import { KeyboardDriver } from './KeyboardDriver';

export class DOMKeyboardDriver extends KeyboardDriver {
    constructor(domElem: HTMLElement) {
        super();

        // Listen for keyboard events, filling event queue
        domElem.addEventListener('keydown', (event) => {
            this.keyDown(event.key);
        });

        domElem.addEventListener('keyup', (event) => {
            this.keyUp(event.key);
        });
    }
}
