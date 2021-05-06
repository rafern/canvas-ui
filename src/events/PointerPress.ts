import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';

export class PointerPress extends PointerEvent {
    constructor(x: number, y: number, target: Widget | null = null) {
        super(x, y, target);
    }

    correctOffset(xOffset: number, yOffset: number): PointerPress {
        return new PointerPress(this.x - xOffset, this.y - yOffset, this.target);
    }

    cloneWithTarget(target: Widget | null): PointerPress {
        return new PointerPress(this.x, this.y, target);
    }
}

