import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
export declare class PointerMove extends PointerEvent {
    constructor(x: number, y: number, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerMove;
    cloneWithTarget(target: Widget | null): PointerMove;
}
