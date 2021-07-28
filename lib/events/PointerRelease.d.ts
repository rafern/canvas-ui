import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
/**
 * A pointer release {@link PointerEvent} (pointer button up).
 *
 * Has a focus type of {@link FocusType.Pointer} and does not need focus.
 *
 * @category Event
 */
export declare class PointerRelease extends PointerEvent {
    /**
     * Create a new PointerRelease. Sets {@link x}, {@link y}, {@link target},
     * {@link focusType} to {@link FocusType.Pointer} and {@link needsFocus} to
     * false.
     */
    constructor(x: number, y: number, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerRelease;
    cloneWithTarget(target: Widget | null): PointerRelease;
}
