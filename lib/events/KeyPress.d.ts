import { Widget } from '../widgets/Widget';
import { KeyEvent } from './KeyEvent';
export declare class KeyPress extends KeyEvent {
    cloneWithTarget(target: Widget | null): KeyPress;
}
