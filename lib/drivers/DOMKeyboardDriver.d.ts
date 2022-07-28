import { KeyboardDriver } from './KeyboardDriver';
/**
 * A container which has all the event listeners for a {@link Root} DOM bind to
 * a {@link DOMKeyboardDriver}; a link between a DOM element and an existing
 * Root.
 *
 * @category Driver
 */
export interface DOMKeyboardDriverBind {
    blurListen: ((this: HTMLElement, event: FocusEvent) => void) | null;
    keydownListen: ((this: HTMLElement, event: KeyboardEvent) => void) | null;
    keyupListen: ((this: HTMLElement, event: KeyboardEvent) => void) | null;
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
export declare class DOMKeyboardDriver extends KeyboardDriver {
    /**
     * The list of HTML DOM elements bound to this keyboard driver and their
     * event listeners
     */
    private domElems;
    /** Calls preventDefault on a keyboard event if needed. */
    maybePreventDefault(event: KeyboardEvent): void;
    /**
     * Bind an HTML DOM element to this keyboard driver.
     *
     * If the root was already bound,
     * {@link DOMKeyboardDriver#removeListeners} is called, replacing the old
     * listeners. Populates {@link DOMKeyboardDriver#domElems} with the new
     * bind.
     *
     * @param listenToKeys - If true, event listeners will be added to listen for keys. blur event listeners are always added no matter what.
     */
    bindDOMElem(domElem: HTMLElement, listenToKeys?: boolean): void;
    /**
     * Unbind an HTML DOM element from this keyboard driver. Removes all used
     * listeners.
     */
    unbindDOMElem(domElem: HTMLElement): void;
    /** Add pointer event listeners to DOM element. */
    private addListeners;
    /**
     * Remove event listeners from DOM element and unset tracked listeners in
     * bind.
     */
    private removeListeners;
    /**
     * Check if the {@link KeyboardDriver#focus | root focus} should be cleared
     * given that the HTML DOM focus has been lost to another HTML DOM element
     *
     * @param newTarget - The HTML DOM element to which the focus has been lost to
     */
    shouldClearFocus(newTarget: HTMLElement | null): boolean;
}
