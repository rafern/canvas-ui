import { KeyboardDriver } from './KeyboardDriver';
import { FocusType } from '../core/FocusType';

const PREVENT_DEFAULT_KEYS = new Set([
    'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home',
    'PageDown', 'PageUp', 'Tab', ' ',
]);

const PREVENT_DEFAULT_CTRL_KEYS = new Set([
    'a', 'A',
]);

const PREVENT_DEFAULT_FORCE_KEYS = new Set([
    'Tab'
]);

function unpackKeyboardEvent(event: KeyboardEvent): [key: string, shift: boolean, ctrl: boolean, alt: boolean] {
    return [event.key, event.shiftKey, event.ctrlKey, event.altKey];
}

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

    /** Calls preventDefault on a keyboard event if needed. */
    maybePreventDefault(event: KeyboardEvent): void {
        if(PREVENT_DEFAULT_KEYS.has(event.key) || (PREVENT_DEFAULT_CTRL_KEYS.has(event.key) && event.ctrlKey)) {
            if(PREVENT_DEFAULT_FORCE_KEYS.has(event.key))
                event.preventDefault();
            else {
                const currentFocus = this.getFocusedRoot()?.getFocus(FocusType.Keyboard) ?? null;
                if(currentFocus !== null)
                    event.preventDefault();
            }
        }
    }

    /**
     * Bind an HTML DOM element to this keyboard driver.
     *
     * @param listenToKeys - If true, event listeners will be added to listen for keys. blur event listeners are always added no matter what.
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
                this.maybePreventDefault(event);
                this.keyDown(...unpackKeyboardEvent(event));
            });

            domElem.addEventListener('keyup', (event) => {
                this.maybePreventDefault(event);
                this.keyUp(...unpackKeyboardEvent(event));
            });
        }

        domElem.addEventListener('blur', (event) => {
            if(this.shouldClearFocus(event.relatedTarget))
                this.clearFocus();
        });
    }

    /**
     * Check if the {@link KeyboardDriver#focus | root focus} should be cleared
     * given that the HTML DOM focus has been lost to another HTML DOM element
     *
     * @param newTarget - The HTML DOM element to which the focus has been lost to
     */
    shouldClearFocus(newTarget: EventTarget | null): boolean {
        return newTarget === null || !this.domElems.has(newTarget);
    }
}
