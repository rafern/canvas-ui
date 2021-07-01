import { VariableCallback } from '../mixins/Variable';
import { ClickState } from '../mixins/Clickable';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import { FlexWidget } from './FlexWidget';
import type { Root } from '../core/Root';
declare const ScrollBar_base: {
    new (...args: any[]): {
        lastClickState: ClickState;
        clickState: ClickState;
        clickStateChanged: boolean;
        wasClick: boolean;
        pointerPos: [number, number] | null;
        startingPointerPos: [number, number] | null;
        getNormalInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): [number, number];
        isPointInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): boolean;
        isNormalInRect(pX: number, pY: number): boolean;
        setClickState(clickState: ClickState, inside: boolean): void;
        handleClickEvent(event: Event, root: Root, clickArea: [number, number, number, number]): void;
        "__#3994@#enabled": boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        "__#3994@#themeOverride": Theme | null;
        "__#3994@#theme": Theme | null;
        "__#3994@#inheritedTheme": Theme | null;
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
        handleEvent(event: Event, _width: number, _height: number, _root: Root): import("./Widget").Widget | null;
        dispatchEvent(event: Event, width: number, height: number, root: Root): import("./Widget").Widget | null;
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
} & {
    new (...args: any[]): {
        callback: VariableCallback<number> | null;
        "__#6042@#value": number;
        value: number;
        setValue(value: number, doCallback?: boolean): void;
        "__#3994@#enabled": boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        "__#3994@#themeOverride": Theme | null;
        "__#3994@#theme": Theme | null;
        "__#3994@#inheritedTheme": Theme | null;
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
        handleEvent(event: Event, _width: number, _height: number, _root: Root): import("./Widget").Widget | null;
        dispatchEvent(event: Event, width: number, height: number, root: Root): import("./Widget").Widget | null;
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
export declare class ScrollBar extends ScrollBar_base {
    #private;
    constructor(callback?: VariableCallback<number> | null, end?: number, barLength?: number, initialValue?: number, themeOverride?: Theme | null);
    get end(): number;
    set end(end: number);
    get barLength(): number;
    set barLength(barLength: number);
    setValue(value: number, doCallback?: boolean): void;
    getBarRect(x: number, y: number, width: number, height: number): [number, number, number, number];
    handleEvent(event: Event, width: number, height: number, root: Root): this;
    handlePreLayoutUpdate(_root: Root): void;
    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
