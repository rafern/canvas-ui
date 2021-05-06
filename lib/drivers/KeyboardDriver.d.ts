import type { Driver } from '../core/Driver';
import type { Root } from '../core/Root';
export declare class KeyboardDriver implements Driver {
    private eventQueue;
    constructor(listenElem: HTMLElement);
    onEnable(_root: Root): void;
    onDisable(_root: Root): void;
    update(root: Root): void;
}
