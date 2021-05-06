import { ThemeProperty } from '../theme/ThemeProperty';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';
import { Button } from './Button';
export declare class FilledButton extends Button {
    backgroundProperty: ThemeProperty;
    _forced: boolean;
    updateBackground(): void;
    set forced(forced: boolean);
    get forced(): boolean;
    setThemeOverride(theme: Theme | null): void;
    inheritTheme(theme: Theme): void;
    handlePostLayoutUpdate(root: Root): void;
    handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
