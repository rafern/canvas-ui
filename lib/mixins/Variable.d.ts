import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';
export declare type VariableCallback<V> = (value: V) => void;
export declare function Variable<V, TBase extends GConstructor<Widget>>(Base: TBase): {
    new (...args: any[]): {
        callback: VariableCallback<V | null> | null;
        _value: V | null;
        value: V | null;
        setValue(value: V | null, doCallback?: boolean): void;
        _enabled: boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        themeOverride: import("../theme").Theme | null;
        _theme: import("../theme").Theme | null;
        inheritedTheme: import("../theme").Theme | null;
        resolvedWidth: number;
        resolvedHeight: number;
        updateInheritedTheme(): void;
        updateTheme(): void;
        readonly theme: import("../theme").Theme;
        readonly enabled: boolean;
        enable(): void;
        disable(): void;
        setThemeOverride(theme: import("../theme").Theme | null): void;
        getThemeOverride(): import("../theme").Theme | null;
        inheritTheme(theme: import("../theme").Theme): void;
        getInheritedTheme(): import("../theme").Theme | null;
        onFocusDropped(_focusType: import("../core").FocusType, _root: import("../core").Root): void;
        handleEvent(event: import("../events").Event, _width: number, _height: number, _root: import("../core").Root): Widget | null;
        dispatchEvent(event: import("../events").Event, width: number, height: number, root: import("../core").Root): Widget | null;
        handlePreLayoutUpdate(_root: import("../core").Root): void;
        preLayoutUpdate(root: import("../core").Root): void;
        handlePopulateLayout(_layoutCtx: import("../widgets").LayoutContext): void;
        handleResolveLayout(_layoutCtx: import("../widgets").LayoutContext): void;
        populateLayout(layoutCtx: import("../widgets").LayoutContext): void;
        resolveLayout(layoutCtx: import("../widgets").LayoutContext): void;
        forceLayoutDirty(): void;
        handlePostLayoutUpdate(_root: import("../core").Root): void;
        postLayoutUpdate(root: import("../core").Root): void;
        clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
        handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
        paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    };
} & TBase;
