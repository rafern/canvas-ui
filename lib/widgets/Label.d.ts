import { FlexLayout } from '../mixins/FlexLayout';
import { Labelable } from '../mixins/Labelable';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
export declare type TextGetter = () => string;
declare const Label_base: import("ts-mixer/dist/types/types").Class<[themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean], FlexLayout & Labelable, {
    prototype: FlexLayout;
} & {
    prototype: Labelable;
}>;
export declare class Label extends Label_base {
    private textGetter;
    constructor(text: string | TextGetter, themeOverride?: Theme | null);
    set text(text: string | TextGetter);
    get text(): string | TextGetter;
    get currentText(): string;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, _width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
