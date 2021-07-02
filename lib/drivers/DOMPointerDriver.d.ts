import { PointerDriver } from './PointerDriver';
import type { Root } from '../core/Root';
interface RootDOMBind {
    domElem: HTMLElement;
    pointermoveListen: ((this: HTMLElement, event: PointerEvent) => any) | null;
    pointerdownListen: ((this: HTMLElement, event: PointerEvent) => any) | null;
    pointerupListen: ((this: HTMLElement, event: PointerEvent) => any) | null;
    pointerleaveListen: ((this: HTMLElement, event: PointerEvent) => any) | null;
}
export declare class DOMPointerDriver extends PointerDriver {
    #private;
    domElems: WeakMap<Root, RootDOMBind>;
    constructor();
    bindDOMElem(root: Root, domElem: HTMLElement): void;
    private addListeners;
    private removeListeners;
    onEnable(root: Root): void;
    onDisable(root: Root): void;
}
export {};
