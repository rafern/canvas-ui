import type { Theme } from '../theme/Theme';
import { FlexWidget } from './FlexWidget';
import type { Root } from '../core/Root';
export declare type TextGetter = () => string;
declare const Label_base: {
    new (...args: any[]): {
        _text: string;
        _font: string;
        _minLabelWidth: number;
        _minLabelAscent: number;
        _minLabelDescent: number;
        "__#33@#labelWidth": number;
        "__#33@#labelAscent": number;
        "__#33@#labelDescent": number;
        "__#33@#labelDirty": boolean;
        updateTextDims(): void;
        findOffsetFromIndex(index: number): number;
        findIndexOffsetFromOffset(offset: number): [number, number];
        setLabelDirty(): void;
        readonly labelWidth: number;
        readonly labelAscent: number;
        readonly labelDescent: number;
        readonly labelHeight: number;
        setText(text: string): void;
        setFont(font: string): void;
        setMinLabelWidth(minLabelWidth: number): void;
        setMinLabelAscent(minLabelAscent: number): void;
        setMinLabelDescent(minLabelDescent: number): void;
        "__#2@#enabled": boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        "__#2@#themeOverride": Theme | null;
        "__#2@#theme": Theme | null;
        "__#2@#inheritedTheme": Theme | null;
        resolvedWidth: number;
        resolvedHeight: number;
        updateInheritedTheme(): void;
        updateTheme(): void;
        readonly theme: Theme;
        readonly enabled: boolean;
        enable(): void;
        disable(): void;
        setThemeOverride(theme: Theme | null): void;
        getThemeOverride(): Theme | null;
        inheritTheme(theme: Theme): void;
        getInheritedTheme(): Theme | null;
        onFocusDropped(_focusType: import("..").FocusType, _root: Root): void;
        handleEvent(event: import("..").Event, _width: number, _height: number, _root: Root): import("./Widget").Widget | null;
        dispatchEvent(event: import("..").Event, width: number, height: number, root: Root): import("./Widget").Widget | null;
        handlePreLayoutUpdate(_root: Root): void;
        preLayoutUpdate(root: Root): void;
        handlePopulateLayout(_layoutCtx: import("./LayoutContext").LayoutContext): void;
        handleResolveLayout(_layoutCtx: import("./LayoutContext").LayoutContext): void;
        populateLayout(layoutCtx: import("./LayoutContext").LayoutContext): void;
        resolveLayout(layoutCtx: import("./LayoutContext").LayoutContext): void;
        forceLayoutDirty(): void;
        handlePostLayoutUpdate(_root: Root): void;
        postLayoutUpdate(root: Root): void;
        clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
        handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
        paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    };
} & typeof FlexWidget;
export declare class Label extends Label_base {
    #private;
    constructor(text: string | TextGetter, themeOverride?: Theme | null);
    set text(text: string | TextGetter);
    get text(): string | TextGetter;
    get currentText(): string;
    handlePreLayoutUpdate(_root: Root): void;
    handlePainting(x: number, y: number, _width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
