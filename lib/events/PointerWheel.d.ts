import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
/**
 * A pointer wheel {@link PointerEvent}.
 *
 * Has a focus type of {@link FocusType.Pointer} and does not need focus.
 *
 * @category Event
 */
export declare class PointerWheel extends PointerEvent {
    /** Wheel event horizontal scroll amount in pixels. Not an integer. */
    readonly deltaX: number;
    /** Wheel event vertical scroll amount in pixels. Not an integer. */
    readonly deltaY: number;
    /** Was this wheel event created from a pointer drag? */
    readonly fromDrag: boolean;
    /** Create a new PointerWheel. */
    constructor(x: number, y: number, deltaX: number, deltaY: number, fromDrag: boolean, shift: boolean, ctrl: boolean, alt: boolean, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerWheel;
    cloneWithTarget(target: Widget | null): PointerWheel;
}
