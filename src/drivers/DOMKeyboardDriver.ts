import { KeyboardDriver } from './KeyboardDriver';

/**
 * A {@link KeyboardDriver} which listens for key events from HTML DOM elements.
 *
 * Note that if a DOM element is unfocused in the DOM to an unbound DOM element,
 * the root focus is cleared. If this creates issues, other DOM elements can be
 * bound without listening for key events.
 *
 * @category Driver
 */
export class DOMKeyboardDriver extends KeyboardDriver {
    /** The list of HTML DOM elements bound to this keyboard driver */
    private domElems: Set<EventTarget> = new Set();

    /**
     * Bind an HTML DOM element to this keyboard driver.
     *
     * @param listenToKeys If true, event listeners will be added to listen for keys. blur event listeners are always added no matter what.
     */
    bindDOMElem(domElem: HTMLElement, listenToKeys = true): void {
        // Add to set. If it was already in set, abort
        if(this.domElems.has(domElem))
            return;

        this.domElems.add(domElem);

        // Listen for keyboard events, filling event queue, and blur event for
        // clearing keyboard focus
        if(listenToKeys) {
            domElem.addEventListener('keydown', (event) => {
                this.keyDown(event.key);
            });

            domElem.addEventListener('keyup', (event) => {
                this.keyUp(event.key);
            });
        }

        domElem.addEventListener('blur', (event) => {
            if(this.shouldClearFocus(event.relatedTarget))
                this.clearFocus();
        });

    }

    /**
     * Check if the {@link focus | root focus} should be cleared given that the
     * HTML DOM focus has been lost to another HTML DOM element
     *
     * @param newTarget The HTML DOM element to which the focus has been lost to
     */
    shouldClearFocus(newTarget: EventTarget | null): boolean {
        return newTarget === null || !this.domElems.has(newTarget);
    }
}
