import type { FocusType } from '../core/FocusType';
import type { Widget } from '../widgets/Widget';

export abstract class Event {
    readonly target: Widget | null;
    readonly focusType: FocusType | null;
    readonly needsFocus: boolean;

    constructor(target: Widget | null, focusType: FocusType | null, needsFocus: boolean) {
        this.target = target;
        this.focusType = focusType;
        this.needsFocus = needsFocus;
    }

    abstract cloneWithTarget(target: Widget | null): Event;
}