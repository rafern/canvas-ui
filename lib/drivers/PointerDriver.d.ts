import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Root } from '../core/Root';
export declare class PointerDriver implements Driver {
    #private;
    registerPointer(): number;
    unregisterPointer(pointer: number): void;
    movePointer(root: Root, pointer: number, xNorm: number, yNorm: number, pressing: boolean): void;
    leavePointer(root: Root, pointer: number): void;
    onEnable(root: Root): void;
    onDisable(root: Root): void;
    update(root: Root): void;
    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void;
}
