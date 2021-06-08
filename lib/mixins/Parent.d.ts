import type { GConstructor } from './GConstructor';
import { Widget } from '../widgets/Widget';
export declare function Parent<TBase extends GConstructor<Widget>>(Base: TBase): {
    new (...args: any[]): {
        readonly children: Array<Widget>;
        updateInheritedTheme(): void;
        forceLayoutDirty(): void;
        "__#3914@#enabled": boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        "__#3914@#themeOverride": import("..").Theme | null;
        "__#3914@#theme": import("..").Theme | null;
        "__#3914@#inheritedTheme": import("..").Theme | null;
        resolvedWidth: number;
        resolvedHeight: number;
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
        handlePostLayoutUpdate(_root: import("..").Root): void;
        postLayoutUpdate(root: import("..").Root): void;
        clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
        handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
        paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    };
} & TBase;
