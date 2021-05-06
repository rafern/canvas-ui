import { Widget } from '../widgets/Widget';
import { KeyEvent } from './KeyEvent';
export declare class KeyRelease extends KeyEvent {
    cloneWithTarget(target: Widget | null): KeyRelease;
}
