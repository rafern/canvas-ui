import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { BoxWidget } from './BoxWidget';
import type { Widget } from './Widget';
export declare type IconCallback = () => void;
declare const Icon_base: {
    new (...args: any[]): {
        lastClickState: import("../mixins/Clickable").ClickState;
        clickState: import("../mixins/Clickable").ClickState;
        clickStateChanged: boolean;
        wasClick: boolean;
        pointerPos: [number, number] | null;
        startingPointerPos: [number, number] | null;
        getNormalInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): [number, number];
        isPointInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): boolean;
        isNormalInRect(pX: number, pY: number): boolean;
        setClickState(clickState: import("../mixins/Clickable").ClickState, inside: boolean): void;
        handleClickEvent(event: Event, root: Root, clickArea: [number, number, number, number]): void;
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
        onFocusDropped(_focusType: FocusType, _root: Root): void;
        handleEvent(event: Event, _width: number, _height: number, _root: Root): Widget | null;
        dispatchEvent(event: Event, width: number, height: number, root: Root): Widget | null;
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
} & typeof BoxWidget;
export declare class Icon extends Icon_base {
    #private;
    callback: IconCallback | null;
    viewBox: [number, number, number, number] | null;
    width: number | null;
    height: number | null;
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, callback?: IconCallback | null, themeOverride?: Theme | null);
    updateDimensions(): void;
    setImage(image: HTMLImageElement): void;
    getIconRect(x: number, y: number, width: number, height: number): [number, number, number, number];
    handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
    handlePreLayoutUpdate(_root: Root): void;
    get rotation(): number;
    set rotation(rotation: number);
    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
