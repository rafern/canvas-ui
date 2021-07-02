import { KeyboardDriver } from './KeyboardDriver';
export declare class DOMKeyboardDriver extends KeyboardDriver {
    readonly domElem: HTMLElement;
    readonly whitelist: Set<EventTarget>;
    constructor(domElem: HTMLElement);
    shouldClearFocus(newTarget: EventTarget | null): boolean;
}
