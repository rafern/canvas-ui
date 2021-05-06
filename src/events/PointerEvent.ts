import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import { Event } from './Event';

export abstract class PointerEvent extends Event {
    readonly x: number;
    readonly y: number;

    constructor(x: number, y: number, target: Widget | null = null, focusType: FocusType | null = null) {
        super(target, focusType, false);
        this.x = x;
        this.y = y;
    }

    // Create a clone of this PointerEvent and correct for new offset
    abstract correctOffset(xOffset: number, yOffset: number): PointerEvent;
}
