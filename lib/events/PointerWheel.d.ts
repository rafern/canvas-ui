import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
/**
 * The scrolling mode that determines how the {@link PointerWheel#deltaX},
 * {@link PointerWheel#deltaY} and {@link PointerWheel#deltaZ} values are
 * interpreted.
 */
export declare enum PointerWheelMode {
    /** In this mode, delta values are measured in pixels. */
    Pixel = 0,
    /**
     * In this mode, delta values are measured in line heights. The height of a
     * line is supplied as an argument to the
     * {@link PointerWheel#getDeltaPixels} method.
     */
    Line = 1,
    /**
     * In this mode, delta values are measured in {@link Widget} dimensions,
     * minus {@link PointerWheel.PageLinesError | a few lines} or
     * {@link PointerWheel.PagePercentError | a percentage of the dimensions},
     * whichever is smaller. Both line height and dimensions are supplied as
     * arguments to the {@link PointerWheel#getDeltaPixels} method.
     */
    Page = 2
}
/**
 * Convert DOM WheelEvent.deltaMode to {@link PointerWheelMode}, or null if the
 * DOM delta mode is unknown.
 */
export declare function parseDOMDeltaMode(domDeltaMode: number): PointerWheelMode | null;
/**
 * A pointer wheel {@link PointerEvent}.
 *
 * Has a focus type of {@link FocusType.Pointer} and does not need focus.
 *
 * @category Event
 */
export declare class PointerWheel extends PointerEvent {
    /**
     * Wheel event horizontal scroll amount. Not an integer. The value's
     * interpretation depends on {@link PointerWheel#deltaMode}.
     */
    readonly deltaX: number;
    /**
     * Wheel event vertical scroll amount. Not an integer. The value's
     * interpretation depends on {@link PointerWheel#deltaMode}.
     */
    readonly deltaY: number;
    /**
     * Wheel event depth scroll amount. Not an integer. The value's
     * interpretation depends on {@link PointerWheel#deltaMode}.
     */
    readonly deltaZ: number;
    /**
     * The mode of the delta values; how the delta values should be
     * interpreted. See {@link PointerWheelMode}
     */
    readonly deltaMode: PointerWheelMode;
    /** Was this wheel event created from a pointer drag? */
    readonly fromDrag: boolean;
    /** The amount of lines to remove from a page scroll */
    static readonly PageLinesError = 3;
    /** The percentage of a page to remove from a page scroll */
    static readonly PagePercentError = 0.1;
    /** Create a new PointerWheel. */
    constructor(x: number, y: number, deltaX: number, deltaY: number, deltaZ: number, deltaMode: PointerWheelMode, fromDrag: boolean, shift: boolean, ctrl: boolean, alt: boolean, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerWheel;
    cloneWithTarget(target: Widget | null): PointerWheel;
    /**
     * Get the scroll delta in pixels, even if the
     * {@link PointerWheel#deltaMode} is not {@link PointerWheelMode.Pixel}.
     *
     * @param forceLimit - Should the delta be limited by {@link PointerWheel.PageLinesError} and {@link PointerWheel.PagePercentError}, if {@link PointerWheel#deltaMode} is not {@link PointerWheelMode.Page}?
     * @param lineHeight - The full height (line height with spacing) of a line, used for page {@link PointerWheel#deltaMode}, or for limiting the delta
     * @param containerWidth - The width of the container, used for page {@link PointerWheel#deltaMode}, or for limiting the delta
     * @param containerHeight - The height of the container, used for page {@link PointerWheel#deltaMode}, or for limiting the delta
     * @param containerDepth - The depth of the container, used for page {@link PointerWheel#deltaMode}, or for limiting the delta. Only used for custom containers/widgets with a Z-axis
     * @returns Returns a 3-tuple containing the x, y and z components, repectively, of the wheel event in pixels.
     */
    getDeltaPixels(forceLimit: boolean, lineHeight: number, containerWidth: number, containerHeight: number, containerDepth?: number): [x: number, y: number, z: number];
}
