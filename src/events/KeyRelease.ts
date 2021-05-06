import { Widget } from '../widgets/Widget';
import { KeyEvent } from './KeyEvent';

export class KeyRelease extends KeyEvent {
    cloneWithTarget(target: Widget | null): KeyRelease {
        return new KeyRelease(this.key, target);
    }
}
