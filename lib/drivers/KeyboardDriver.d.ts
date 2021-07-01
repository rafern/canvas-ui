import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Root } from '../core/Root';
export declare class KeyboardDriver implements Driver {
    private eventQueues;
    private keysDown;
    private focus;
    private getEventQueue;
    _changeFocusedRoot(root: Root | null): void;
    getFocusedRoot(): Root | null;
    keyDown(key: string): void;
    keyUp(key: string): void;
    keyPress(key: string): void;
    isKeyDown(key: string): boolean;
    onEnable(root: Root): void;
    onDisable(root: Root): void;
    update(root: Root): void;
    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void;
}
