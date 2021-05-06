import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import { Event } from './Event';

export abstract class KeyEvent extends Event {
    readonly key: string;

    constructor(key: string, target: Widget | null) {
        super(target, FocusType.Keyboard, true);
        this.key = key;
    }
}
