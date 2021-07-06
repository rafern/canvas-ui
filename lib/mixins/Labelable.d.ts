import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';
export declare function Labelable<TBase extends GConstructor<Widget>>(Base: TBase): {
    new (...args: any[]): {
        _text: string;
        _font: string;
        _minLabelWidth: number;
        _minLabelAscent: number;
        _minLabelDescent: number;
        "__#2373@#labelWidth": number;
        "__#2373@#labelAscent": number;
        "__#2373@#labelDescent": number;
        "__#2373@#labelDirty": boolean;
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
        "__#2@#themeOverride": import("..").Theme | null;
        "__#2@#theme": import("..").Theme | null;
        "__#2@#inheritedTheme": import("..").Theme | null;
        resolvedWidth: number;
        resolvedHeight: number;
        updateInheritedTheme(): void;
        updateTheme(): void;
        readonly theme: import("..").Theme;
        readonly enabled: boolean;
        enable(): void;
        disable(): void;
        setThemeOverride(theme: import("..").Theme | null): void;
        getThemeOverride(): import("..").Theme | null;
        inheritTheme(theme: import("..").Theme): void;
        getInheritedTheme(): import("..").Theme | null;
        onFocusDropped(_focusType: import("..").FocusType, _root: import("..").Root): void;
        handleEvent(event: import("..").Event, _width: number, _height: number, _root: import("..").Root): Widget | null;
        dispatchEvent(event: import("..").Event, width: number, height: number, root: import("..").Root): Widget | null;
        handlePreLayoutUpdate(_root: import("..").Root): void;
        preLayoutUpdate(root: import("..").Root): void;
        handlePopulateLayout(_layoutCtx: import("..").LayoutContext): void;
        handleResolveLayout(_layoutCtx: import("..").LayoutContext): void;
        populateLayout(layoutCtx: import("..").LayoutContext): void;
        resolveLayout(layoutCtx: import("..").LayoutContext): void;
        forceLayoutDirty(): void;
        handlePostLayoutUpdate(_root: import("..").Root): void;
        postLayoutUpdate(root: import("..").Root): void;
        clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
        handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
        paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    };
} & TBase;
