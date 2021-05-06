import { FocusType} from '../core/FocusType';
import { Widget } from '../widgets/Widget';
import { Event } from './Event';

export class Leave extends Event {
    constructor(target: Widget | null = null) {
        super(target, FocusType.Pointer, true);
    }

    cloneWithTarget(target: Widget | null): Leave {
        return new Leave(target);
    }
}
