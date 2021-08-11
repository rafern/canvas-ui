import { PointerButtonEvent } from './PointerButtonEvent';
import { Widget } from '../widgets/Widget';
/**
 * A pointer release {@link PointerButtonEvent} (pointer button up).
 *
 * Has a focus type of {@link FocusType.Pointer} and does not need focus.
 *
 * @category Event
 */
export declare class PointerRelease extends PointerButtonEvent {
    /** Create a new PointerRelease. */
    constructor(x: number, y: number, button: number, shift: boolean, ctrl: boolean, alt: boolean, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerRelease;
    cloneWithTarget(target: Widget | null): PointerRelease;
}
