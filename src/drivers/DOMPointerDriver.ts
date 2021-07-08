import { PointerDriver } from './PointerDriver';
import type { Root } from '../core/Root';

function getEventPos(event: PointerEvent, domElem: HTMLElement): [number, number] {
    const rect = domElem.getBoundingClientRect();
    return [
        (event.clientX - rect.left) / rect.width,
        (event.clientY - rect.top) / rect.height,
    ];
}

interface RootDOMBind {
    domElem: HTMLElement,
    pointermoveListen: ((this: HTMLElement, event: PointerEvent) => void) | null,
    pointerdownListen: ((this: HTMLElement, event: PointerEvent) => void) | null,
    pointerupListen: ((this: HTMLElement, event: PointerEvent) => void) | null,
    pointerleaveListen: ((this: HTMLElement, event: PointerEvent) => void) | null,
}

/**
 * A {@link PointerDriver} which listens for pointer events from HTML DOM
 * elements. Each HTML DOM element is bound to a specific root, which synergizes
 * well with DOMRoot.
 *
 * @category Driver
 */
export class DOMPointerDriver extends PointerDriver {
    /** The HTML DOM element and listeners that each root is bound to */
    // XXX using weakmap so it auto-unbinds once a root stops existing
    private domElems: WeakMap<Root, RootDOMBind> = new WeakMap();
    /** The pointer ID of the mouse. Registered in constructor */
    private mousePointerID: number; // TODO support multiple "mouse" pointers for multitouch

    /**
     * Create a new DOMPointerDriver.
     *
     * Automatically registers a pointer to be used by the mouse.
     */
    constructor() {
        super();

        this.mousePointerID = this.registerPointer();
    }

    /**
     * Bind an HTML DOM element to a specific root.
     *
     * If the root was already registered, {@link removeListeners} is called.
     * Populates {@link domElems} with the new bind. Calls {@link addListeners}
     * if root is enabled.
     */
    bindDOMElem(root: Root, domElem: HTMLElement): void {
        let rootBind = this.domElems.get(root);
        if(typeof rootBind !== 'undefined')
            this.removeListeners(rootBind);
        else {
            rootBind = <RootDOMBind>{
                domElem,
                pointermoveListen: null,
                pointerdownListen: null,
                pointerupListen: null,
                pointerleaveListen: null,
            };
            this.domElems.set(root, rootBind);
        }

        if(root.enabled)
            this.addListeners(root, rootBind);
    }

    /**
     * Add pointer event listeners to root's DOM element.
     */
    private addListeners(root: Root, rootBind: RootDOMBind) {
        // Make listeners for mouse events, queueing events. Add them to the
        // root DOM bind so they can be removed later when needed
        const domElem = rootBind.domElem;
        rootBind.pointermoveListen = (event: PointerEvent) => {
            if(event.isPrimary)
                this.movePointer(root, this.mousePointerID, ...getEventPos(event, domElem));
        }
        rootBind.pointerdownListen = (event: PointerEvent) => {
            if(event.isPrimary)
                this.movePointer(root, this.mousePointerID, ...getEventPos(event, domElem), true);
        }
        rootBind.pointerupListen = (event: PointerEvent) => {
            if(event.isPrimary)
                this.movePointer(root, this.mousePointerID, ...getEventPos(event, domElem), false);
        }
        rootBind.pointerleaveListen = (event: PointerEvent) => {
            if(event.isPrimary)
                this.leavePointer(root, this.mousePointerID);
        }

        // Add listeners to DOM element
        domElem.addEventListener('pointermove', rootBind.pointermoveListen);
        domElem.addEventListener('pointerdown', rootBind.pointerdownListen);
        domElem.addEventListener('pointerup', rootBind.pointerupListen);
        domElem.addEventListener('pointerleave', rootBind.pointerleaveListen);
    }

    /**
     * Remove pointer event listeners from root's DOM element and unset tracked
     * listeners in root's bind.
     */
    private removeListeners(rootBind: RootDOMBind) {
        if(rootBind.pointermoveListen !== null) {
            rootBind.domElem.removeEventListener('pointermove', rootBind.pointermoveListen);
            rootBind.pointermoveListen = null;
        }
        if(rootBind.pointerdownListen !== null) {
            rootBind.domElem.removeEventListener('pointerdown', rootBind.pointerdownListen);
            rootBind.pointerdownListen = null;
        }
        if(rootBind.pointerupListen !== null) {
            rootBind.domElem.removeEventListener('pointerup', rootBind.pointerupListen);
            rootBind.pointerupListen = null;
        }
        if(rootBind.pointerleaveListen !== null) {
            rootBind.domElem.removeEventListener('pointerleave', rootBind.pointerleaveListen);
            rootBind.pointerleaveListen = null;
        }
    }

    /**
     * Calls {@link PointerDriver.onEnable} and {@link addListeners} to each
     * bound root.
     */
    override onEnable(root: Root): void {
        super.onEnable(root);

        // Add event listeners for pointer when root is enabled, if the root is
        // bound to a DOM element
        const rootBind = this.domElems.get(root);
        if(typeof rootBind !== 'undefined')
            this.addListeners(root, rootBind);
    }

    /**
     * Calls {@link PointerDriver.onDisable} and {@link removeListeners} to each
     * bound root.
     */
    override onDisable(root: Root): void {
        super.onDisable(root);

        // Remove event listeners for pointer when root is disabled, if the root
        // is bound to a DOM element
        const rootBind = this.domElems.get(root);
        if(typeof rootBind !== 'undefined')
            this.removeListeners(rootBind);
    }
}