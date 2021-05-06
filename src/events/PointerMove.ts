import { FocusType } from '../core/FocusType';
import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';

export class PointerMove extends PointerEvent {
    constructor(x: number, y: number, target: Widget | null = null) {
        super(x, y, target, FocusType.Pointer);
    }

    correctOffset(xOffset: number, yOffset: number): PointerMove {
        return new PointerMove(this.x - xOffset, this.y - yOffset, this.target);
    }

    cloneWithTarget(target: Widget | null): PointerMove {
        return new PointerMove(this.x, this.y, target);
    }
}
