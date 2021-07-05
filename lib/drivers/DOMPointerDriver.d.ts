import { PointerDriver } from './PointerDriver';
import type { Root } from '../core/Root';
export declare class DOMPointerDriver extends PointerDriver {
    #private;
    constructor();
    bindDOMElem(root: Root, domElem: HTMLElement): void;
    private addListeners;
    private removeListeners;
    onEnable(root: Root): void;
    onDisable(root: Root): void;
}
