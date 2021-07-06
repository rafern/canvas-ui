import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';
import { Button } from './Button';
export declare class FilledButton extends Button {
    private backgroundProperty;
    private _forced;
    private updateBackground;
    set forced(forced: boolean);
    get forced(): boolean;
    protected setThemeOverride(theme: Theme | null): void;
    protected inheritTheme(theme: Theme): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
