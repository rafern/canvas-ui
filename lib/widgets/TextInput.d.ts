import { FlexLayout } from '../mixins/FlexLayout';
import { Labelable } from '../mixins/Labelable';
import { Variable } from '../mixins/Variable';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
export declare type TextValidator<V> = (text: string) => [boolean, V];
declare class StringVariable extends Variable<string> {
}
declare const TextInput_base: import("ts-mixer/dist/types/types").Class<any[], FlexLayout & Labelable & StringVariable, typeof FlexLayout & typeof Labelable & typeof StringVariable, false>;
export declare class TextInput<V> extends TextInput_base {
    private blinkStart;
    private blinkWasOn;
    private cursorPos;
    private cursorOffset;
    private cursorOffsetDirty;
    private _editingEnabled;
    private _hideText;
    private _valid;
    private _validValue;
    constructor(validator: TextValidator<V>, initialValue?: string, themeOverride?: Theme | null);
    get blinkOn(): boolean | null;
    get editingEnabled(): boolean;
    set editingEnabled(editingEnabled: boolean);
    get hideText(): boolean;
    set hideText(hideText: boolean);
    get text(): string;
    get valid(): boolean;
    get validValue(): V;
    moveCursorTo(index: number): void;
    moveCursor(delta: number): void;
    insertText(str: string): void;
    deleteText(delta: number): void;
    onFocusDropped(focusType: FocusType, _root: Root): void;
    protected handleEvent(event: Event, _width: number, _height: number, root: Root): this;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
