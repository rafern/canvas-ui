import { Variable, VariableCallback } from '../mixins/Variable';
import { Clickable } from '../mixins/Clickable';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
declare class NumberVariable extends Variable<number> {
}
declare const ScrollBar_base: import("ts-mixer/dist/types/types").Class<[themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean], FlexLayout & Clickable & NumberVariable, {
    prototype: FlexLayout;
} & {
    prototype: Clickable;
} & {
    prototype: NumberVariable;
}>;
export declare class ScrollBar extends ScrollBar_base {
    private _end;
    private _barLength;
    private dragValue;
    constructor(callback?: VariableCallback<number> | null, end?: number, barLength?: number, initialValue?: number, themeOverride?: Theme | null);
    get end(): number;
    set end(end: number);
    get barLength(): number;
    set barLength(barLength: number);
    setValue(value: number, doCallback?: boolean): void;
    private getBarRect;
    protected handleEvent(event: Event, width: number, height: number, root: Root): this;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
