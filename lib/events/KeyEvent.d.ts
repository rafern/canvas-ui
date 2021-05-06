import type { Widget } from '../widgets/Widget';
import { Event } from './Event';
export declare abstract class KeyEvent extends Event {
    readonly key: string;
    constructor(key: string, target: Widget | null);
}
