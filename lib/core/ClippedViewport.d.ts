import type { FillStyle } from '../theme/FillStyle';
import type { Widget } from "../widgets/Widget";
import { BaseViewport } from "./BaseViewport";
/**
 * A {@link Viewport} which inherits a rendering context from the closest parent
 * Viewport and paints {@link Widget | Widgets} by clipping them to the
 * Viewport's rectangle.
 *
 * @category Core
 */
export declare class ClippedViewport extends BaseViewport {
    get context(): CanvasRenderingContext2D;
    get effectiveScale(): [scaleX: number, scaleY: number];
    constructor(child: Widget);
    paint(force: boolean, backgroundFillStyle: FillStyle): boolean;
}
