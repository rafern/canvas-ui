import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import { Event } from './Event';

/**
 * A pointer {@link Event}. This is an abstract class and is implemented in the
 * child classes {@link PointerMove}, {@link PointerPress} and
 * {@link PointerRelease}.
 *
 * Has a focus type of decided by the child classes and does not need focus.
 *
 * @category Event
 */
export abstract class PointerEvent extends Event {
    /** Pointer event position's X coordinate in pixels. Not an integer. */
    readonly x: number;
    /** Pointer event position's Y coordinate in pixels. Not an integer. */
    readonly y: number;

    /**
     * Create a new PointerEvent. Sets {@link x}, {@link y}, {@link target},
     * {@link focusType} and {@link needsFocus} to false.
     */
    constructor(x: number, y: number, target: Widget | null = null, focusType: FocusType | null = null) {
        super(target, focusType, false);
        this.x = x;
        this.y = y;
    }

    /**
     * Create a new PointerEvent event with the same properties as this, except
     * with new {@link x} and {@link y} values corrected for a given offset.
     */
    abstract correctOffset(xOffset: number, yOffset: number): PointerEvent;
}
