import { FocusType } from '../core/FocusType';
import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';

/**
 * A pointer release {@link PointerEvent} (pointer button up).
 *
 * Has a focus type of {@link FocusType.Pointer} and does not need focus.
 *
 * @category Event
 */
export class PointerRelease extends PointerEvent {
    /**
     * Create a new PointerRelease. Sets {@link x}, {@link y}, {@link target},
     * {@link focusType} to {@link FocusType.Pointer} and {@link needsFocus} to
     * false.
     */
    constructor(x: number, y: number, target: Widget | null = null) {
        super(x, y, target, FocusType.Pointer);
    }

    correctOffset(xOffset: number, yOffset: number): PointerRelease {
        return new PointerRelease(this.x - xOffset, this.y - yOffset, this.target);
    }

    cloneWithTarget(target: Widget | null): PointerRelease {
        return new PointerRelease(this.x, this.y, target);
    }
}
