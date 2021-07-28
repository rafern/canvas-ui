import { PointerDriver } from './PointerDriver';
import type { Root } from '../core/Root';
/**
 * A {@link PointerDriver} which listens for pointer events from HTML DOM
 * elements. Each HTML DOM element is bound to a specific root, which synergizes
 * well with DOMRoot.
 *
 * @category Driver
 */
export declare class DOMPointerDriver extends PointerDriver {
    /** The HTML DOM element and listeners that each root is bound to */
    private domElems;
    /** The pointer ID of the mouse. Registered in constructor */
    private mousePointerID;
    /**
     * Create a new DOMPointerDriver.
     *
     * Automatically registers a pointer to be used by the mouse.
     */
    constructor();
    /**
     * Bind an HTML DOM element to a specific root.
     *
     * If the root was already registered, {@link removeListeners} is called.
     * Populates {@link domElems} with the new bind. Calls {@link addListeners}
     * if root is enabled.
     */
    bindDOMElem(root: Root, domElem: HTMLElement): void;
    /**
     * Add pointer event listeners to root's DOM element.
     */
    private addListeners;
    /**
     * Remove pointer event listeners from root's DOM element and unset tracked
     * listeners in root's bind.
     */
    private removeListeners;
    /**
     * Calls {@link PointerDriver.onEnable} and {@link addListeners} to each
     * bound root.
     */
    onEnable(root: Root): void;
    /**
     * Calls {@link PointerDriver.onDisable} and {@link removeListeners} to each
     * bound root.
     */
    onDisable(root: Root): void;
}
