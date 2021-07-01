import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
interface PointerDriverState {
    eventQueue: Array<Event>;
    lastFocus: Widget | null;
    pointer: number | null;
    pressing: boolean;
    hovering: boolean;
}
export declare class PointerDriver implements Driver {
    #private;
    _states: Map<Root, PointerDriverState>;
    registerPointer(): number;
    unregisterPointer(pointer: number): void;
    movePointer(root: Root, pointer: number, xNorm: number, yNorm: number, pressing: boolean): void;
    leavePointer(root: Root, pointer: number): void;
    onEnable(root: Root): void;
    onDisable(root: Root): void;
    update(root: Root): void;
    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void;
}
export {};
