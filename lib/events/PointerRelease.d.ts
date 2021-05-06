import { PointerEvent } from './PointerEvent';
import { Widget } from '../widgets/Widget';
export declare class PointerRelease extends PointerEvent {
    constructor(x: number, y: number, target?: Widget | null);
    correctOffset(xOffset: number, yOffset: number): PointerRelease;
    cloneWithTarget(target: Widget | null): PointerRelease;
}
