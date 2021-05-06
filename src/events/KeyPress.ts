import { Widget } from '../widgets/Widget';
import { KeyEvent } from './KeyEvent';

export class KeyPress extends KeyEvent {
    cloneWithTarget(target: Widget | null): KeyPress {
        return new KeyPress(this.key, target);
    }
}
