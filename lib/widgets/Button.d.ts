import { Clickable } from '../mixins/Clickable';
import { BaseContainer } from './BaseContainer';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
export declare type ButtonCallback = () => void;
declare const Button_base: import("ts-mixer/dist/types/types").Class<any[], BaseContainer & Clickable, typeof BaseContainer & typeof Clickable, false>;
export declare class Button extends Button_base {
    callback: ButtonCallback | null;
    constructor(child: Widget, callback?: ButtonCallback | null, themeOverride?: Theme | null);
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
export {};
