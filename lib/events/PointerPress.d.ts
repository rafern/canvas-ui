import { PointerButtonEvent } from './PointerButtonEvent';
import { Widget } from '../widgets/Widget';
/**
 * A pointer press {@link PointerButtonEvent} (pointer button down).
 *
 * Has no focus type and does not need focus.
 *
 * @category Event
 */
export declare class PointerPress extends PointerButtonEvent {
    /** Create a new PointerPress. */
    constructor(x: number, y: number, button: number, shift: boolean, ctrl: boolean, alt: boolean, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerPress;
    cloneWithTarget(target: Widget | null): PointerPress;
}
