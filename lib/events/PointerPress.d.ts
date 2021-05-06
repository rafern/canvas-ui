import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
export declare class PointerPress extends PointerEvent {
    constructor(x: number, y: number, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerPress;
    cloneWithTarget(target: Widget | null): PointerPress;
}
