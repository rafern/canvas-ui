import { FocusType } from '../core/FocusType';
import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';

export class PointerRelease extends PointerEvent {
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
