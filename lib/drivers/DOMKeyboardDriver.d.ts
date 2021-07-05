import { KeyboardDriver } from './KeyboardDriver';
export declare class DOMKeyboardDriver extends KeyboardDriver {
    #private;
    bindDOMElem(domElem: HTMLElement, listenToKeys?: boolean): void;
    shouldClearFocus(newTarget: EventTarget | null): boolean;
}
