import { SingleParent } from '../mixins/SingleParent';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
declare const ViewportWidget_base: import("ts-mixer/dist/types/types").Class<any[], SingleParent & FlexLayout, typeof SingleParent & typeof FlexLayout, false>;
export declare class ViewportWidget extends ViewportWidget_base {
    mainBasisTied: boolean;
    crossBasisTied: boolean;
    private viewport;
    private _offset;
    private lastChildLayoutCtx;
    maxDimensions: [number, number];
    lastViewportDims: [number, number];
    constructor(child: Widget, mainBasisTied?: boolean, crossBasisTied?: boolean, themeOverride?: Theme | null);
    get canvasDimensions(): [number, number];
    get offset(): [number, number];
    set offset(offset: [number, number]);
    private getChildMainBasis;
    private getChildCrossBasis;
    private getMaxMainBasis;
    private getMaxCrossBasis;
    protected handleEvent(event: Event, _width: number, _height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
