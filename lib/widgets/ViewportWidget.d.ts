import { SingleParent } from '../interfaces/SingleParent';
import { Viewport } from '../core/Viewport';
import { FlexWidget } from './FlexWidget';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { LayoutContext } from './LayoutContext';
declare const ViewportWidget_base: {
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
        onFocusDropped(_focusType: import("..").FocusType, _root: Root): void;
        handleEvent(event: Event, _width: number, _height: number, _root: Root): Widget | null;
        dispatchEvent(event: Event, width: number, height: number, root: Root): Widget | null;
        handlePreLayoutUpdate(_root: Root): void;
        preLayoutUpdate(root: Root): void;
        handlePopulateLayout(_layoutCtx: LayoutContext): void;
        handleResolveLayout(_layoutCtx: LayoutContext): void;
        populateLayout(layoutCtx: LayoutContext): void;
        resolveLayout(layoutCtx: LayoutContext): void;
        handlePostLayoutUpdate(_root: Root): void;
        postLayoutUpdate(root: Root): void;
        clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
        handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
        paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    };
} & typeof FlexWidget;
export declare class ViewportWidget extends ViewportWidget_base implements SingleParent {
    mainBasisTied: boolean;
    crossBasisTied: boolean;
    viewport: Viewport;
    _offset: [number, number];
    lastChildLayoutCtx: LayoutContext | null;
    maxDimensions: [number, number];
    lastViewportDims: [number, number];
    constructor(child: Widget, mainBasisTied?: boolean, crossBasisTied?: boolean, themeOverride?: Theme | null);
    get canvasDimensions(): [number, number];
    get offset(): [number, number];
    set offset(offset: [number, number]);
    get dimensions(): [number, number];
    getChildMainBasis(vertical: boolean): number;
    getChildCrossBasis(vertical: boolean): number;
    getMaxMainBasis(vertical: boolean): number;
    getMaxCrossBasis(vertical: boolean): number;
    handleEvent(event: Event, _width: number, _height: number, root: Root): Widget | null;
    handlePreLayoutUpdate(root: Root): void;
    handlePostLayoutUpdate(root: Root): void;
    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    getChild(): Widget;
}
export {};
