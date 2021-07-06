import { Variable, VariableCallback } from '../mixins/Variable';
import { Clickable } from '../mixins/Clickable';
import { BoxLayout } from '../mixins/BoxLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
declare class BooleanVariable extends Variable<boolean> {
}
declare const Checkbox_base: import("ts-mixer/dist/types/types").Class<[themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean], BoxLayout & Clickable & BooleanVariable, {
    prototype: BoxLayout;
} & {
    prototype: Clickable;
} & {
    prototype: BooleanVariable;
}>;
export declare class Checkbox extends Checkbox_base {
    constructor(callback?: VariableCallback<boolean> | null, initialValue?: boolean, themeOverride?: Theme | null);
    private getBoxRect;
    protected handleEvent(event: Event, width: number, height: number, root: Root): this;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
