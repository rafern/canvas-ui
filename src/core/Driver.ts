import type { Root } from './Root';

export interface Driver {
    update(root: Root): void;
    onEnable(root: Root): void;
    onDisable(root: Root): void;
}