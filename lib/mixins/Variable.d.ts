import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';
export declare type VariableCallback<V> = (value: V) => void;
export declare function Variable<V, TBase extends GConstructor<Widget>>(Base: TBase, defaultValue: V): {
    new (...args: any[]): {
        callback: VariableCallback<V> | null;
        "__#6364@#value": V;
        value: V;
        setValue(value: V, doCallback?: boolean): void;
        "__#4450@#enabled": boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        "__#4450@#themeOverride": import("..").Theme | null;
        "__#4450@#theme": import("..").Theme | null;
        "__#4450@#inheritedTheme": import("..").Theme | null;
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
