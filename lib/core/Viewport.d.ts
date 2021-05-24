import { LayoutContext } from '../widgets/LayoutContext';
import type { Widget } from '../widgets/Widget';
export declare class Viewport {
    _maxDimensions: [number, number];
    vertical: boolean;
    forceLayout: boolean;
    readonly canvas: HTMLCanvasElement;
    readonly context: CanvasRenderingContext2D;
    constructor(startingWidth?: number, startingHeight?: number);
    get canvasDimensions(): [number, number];
    set maxDimensions(maxDimensions: [number, number]);
    get maxDimensions(): [number, number];
    populateChildsLayout(child: Widget): LayoutContext | null;
    resolveChildsLayout(child: Widget, layoutCtx: LayoutContext | null): boolean;
    paintToCanvas(child: Widget): boolean;
}
