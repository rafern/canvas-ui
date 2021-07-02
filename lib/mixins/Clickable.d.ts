import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
export declare enum ClickState {
    Released = 0,
    Hover = 1,
    Hold = 2
}
export declare function Clickable<TBase extends GConstructor<Widget>>(Base: TBase): {
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
        "__#4152@#enabled": boolean;
        dirty: boolean;
        layoutDirty: boolean;
        readonly needsClear: boolean;
        readonly propagatesEvents: boolean;
        "__#4152@#themeOverride": import("..").Theme | null;
        "__#4152@#theme": import("..").Theme | null;
        "__#4152@#inheritedTheme": import("..").Theme | null;
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
        onFocusDropped(_focusType: FocusType, _root: Root): void;
        handleEvent(event: Event, _width: number, _height: number, _root: Root): Widget | null;
        dispatchEvent(event: Event, width: number, height: number, root: Root): Widget | null;
        handlePreLayoutUpdate(_root: Root): void;
        preLayoutUpdate(root: Root): void;
        handlePopulateLayout(_layoutCtx: import("..").LayoutContext): void;
        handleResolveLayout(_layoutCtx: import("..").LayoutContext): void;
        populateLayout(layoutCtx: import("..").LayoutContext): void;
        resolveLayout(layoutCtx: import("..").LayoutContext): void;
        forceLayoutDirty(): void;
        handlePostLayoutUpdate(_root: Root): void;
        postLayoutUpdate(root: Root): void;
        clear(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
        handlePainting(_x: number, _y: number, _width: number, _height: number, _ctx: CanvasRenderingContext2D): void;
        paint(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
    };
} & TBase;
