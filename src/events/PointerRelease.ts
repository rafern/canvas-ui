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
    /** Create a new PointerRelease. */
    constructor(x: number, y: number, shift: boolean, ctrl: boolean, alt: boolean, target: Widget | null = null) {
        super(x, y, shift, ctrl, alt, target, FocusType.Pointer);
    }

    correctOffset(xOffset: number, yOffset: number): PointerRelease {
        return new PointerRelease(this.x - xOffset, this.y - yOffset, this.shift, this.ctrl, this.alt, this.target);
    }

    cloneWithTarget(target: Widget | null): PointerRelease {
        return new PointerRelease(this.x, this.y, this.shift, this.ctrl, this.alt, target);
    }
}
