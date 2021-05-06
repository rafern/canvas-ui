import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import { Event } from './Event';
export declare abstract class PointerEvent extends Event {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number, target?: Widget | null, focusType?: FocusType | null);
    abstract correctOffset(xOffset: number, yOffset: number): PointerEvent;
}
