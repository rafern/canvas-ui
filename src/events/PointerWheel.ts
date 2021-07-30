import { FocusType } from '../core/FocusType';
import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';

/**
 * A pointer wheel {@link PointerEvent}.
 *
 * Has a focus type of {@link FocusType.Pointer} and does not need focus.
 *
 * @category Event
 */
export class PointerWheel extends PointerEvent {
    /** Wheel event horizontal scroll amount in pixels. Not an integer. */
    readonly deltaX: number;
    /** Wheel event vertical scroll amount in pixels. Not an integer. */
    readonly deltaY: number;
    /** Was this wheel event created from a pointer drag? */
    readonly fromDrag: boolean;

    /**
     * Create a new PointerWheel. Sets {@link x}, {@link y}, {@link deltaX},
     * {@link deltaY}, {@link fromDrag}, {@link target}, {@link focusType} to
     * {@link FocusType.Pointer} and {@link needsFocus} to false.
     */
    constructor(x: number, y: number, deltaX: number, deltaY: number, fromDrag: boolean, target: Widget | null = null) {
        super(x, y, target, FocusType.Pointer);
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.fromDrag = fromDrag;
    }

    correctOffset(xOffset: number, yOffset: number): PointerWheel {
        return new PointerWheel(this.x - xOffset, this.y - yOffset, this.deltaX, this.deltaY, this.fromDrag, this.target);
    }

    cloneWithTarget(target: Widget | null): PointerWheel {
        return new PointerWheel(this.x, this.y, this.deltaX, this.deltaY, this.fromDrag, target);
    }
}
