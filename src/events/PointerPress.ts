import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';

/**
 * A pointer press {@link PointerEvent} (pointer button down).
 *
 * Has no focus type and does not need focus.
 *
 * @category Event
 */
export class PointerPress extends PointerEvent {
    /** Create a new PointerMove. */
    constructor(x: number, y: number, shift: boolean, ctrl: boolean, alt: boolean, target: Widget | null = null) {
        super(x, y, shift, ctrl, alt, target);
    }

    correctOffset(xOffset: number, yOffset: number): PointerPress {
        return new PointerPress(this.x - xOffset, this.y - yOffset, this.shift, this.ctrl, this.alt, this.target);
    }

    cloneWithTarget(target: Widget | null): PointerPress {
        return new PointerPress(this.x, this.y, this.shift, this.ctrl, this.alt, target);
    }
}

