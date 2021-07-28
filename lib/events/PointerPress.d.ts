import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
/**
 * A pointer press {@link PointerEvent} (pointer button down).
 *
 * Has no focus type and does not need focus.
 *
 * @category Event
 */
export declare class PointerPress extends PointerEvent {
    /**
     * Create a new PointerMove. Sets {@link x}, {@link y}, {@link target},
     * {@link focusType} to null and {@link needsFocus} to false.
     */
    constructor(x: number, y: number, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerPress;
    cloneWithTarget(target: Widget | null): PointerPress;
}
