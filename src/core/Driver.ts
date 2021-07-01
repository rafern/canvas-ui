import type { Widget } from '../widgets/Widget';
import type { FocusType } from './FocusType';
import type { Root } from './Root';

export interface Driver {
    update(root: Root): void;
    onEnable(root: Root): void;
    onDisable(root: Root): void;
    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void;
}