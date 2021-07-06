import type { Widget } from '../widgets/Widget';
import { LayoutContext } from './LayoutContext';
export declare class Viewport {
    private _maxDimensions;
    private forceLayout;
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    vertical: boolean;
    constructor(startingWidth?: number, startingHeight?: number);
    get canvasDimensions(): [number, number];
    set maxDimensions(maxDimensions: [number, number]);
    get maxDimensions(): [number, number];
    populateChildsLayout(child: Widget): LayoutContext | null;
    resolveChildsLayout(child: Widget, layoutCtx: LayoutContext | null): boolean;
    paintToCanvas(child: Widget): boolean;
}
