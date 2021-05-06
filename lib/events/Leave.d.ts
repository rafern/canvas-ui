import { Widget } from '../widgets/Widget';
import { Event } from './Event';
export declare class Leave extends Event {
    constructor(target?: Widget | null);
    cloneWithTarget(target: Widget | null): Leave;
}
