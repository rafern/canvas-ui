import type { Theme } from '../theme/Theme';
import { Widget } from './Widget';
declare const ParentWidget_base: {
    new (...args: any[]): {
        readonly children: Widget[];
        updateInheritedTheme(): void;
        forceLayoutDirty(): void;
        _enabled: boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        themeOverride: Theme | null;
        _theme: Theme | null;
        inheritedTheme: Theme | null;
        resolvedWidth: number;
        resolvedHeight: number;
        updateTheme(): void;
        readonly theme: Theme;
        readonly enabled: boolean;
        enable(): void;
        disable(): void;
        setThemeOverride(theme: Theme | null): void;
        getThemeOverride(): Theme | null;
        inheritTheme(theme: Theme): void;
        getInheritedTheme(): Theme | null;
        onFocusDropped(_focusType: import("..").FocusType, _root: import("..").Root): void;
        handleEvent(event: import("..").Event, _width: number, _height: number, _root: import("..").Root): Widget | null;
        dispatchEvent(event: import("..").Event, width: number, height: number, root: import("..").Root): Widget | null;
        handlePreLayoutUpdate(_root: import("..").Root): void;
        preLayoutUpdate(root: import("..").Root): void;
        handlePopulateLayout(_layoutCtx: import("./LayoutContext").LayoutContext): void;
        handleResolveLayout(_layoutCtx: import("./LayoutContext").LayoutContext): void;
        populateLayout(layoutCtx: import("./LayoutContext").LayoutContext): void;
        resolveLayout(layoutCtx: import("./LayoutContext").LayoutContext): void;
        handlePostLayoutUpdate(_root: import("..").Root): void;
        postLayoutUpdate(root: import("..").Root): void;
        clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
        handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
        paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    };
} & typeof Widget;
export declare class ParentWidget extends ParentWidget_base {
    constructor(themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean, children: Array<Widget>);
}
export {};
