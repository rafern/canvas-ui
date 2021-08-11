import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
/**
 * A pointer move {@link PointerEvent}.
 *
 * Has a focus type of {@link FocusType.Pointer} and does not need focus.
 *
 * @category Event
 */
export declare class PointerMove extends PointerEvent {
    /** Create a new PointerMove. */
    constructor(x: number, y: number, shift: boolean, ctrl: boolean, alt: boolean, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerMove;
    cloneWithTarget(target: Widget | null): PointerMove;
}
