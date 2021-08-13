import { Widget } from '../widgets/Widget';
import { KeyEvent } from './KeyEvent';
/**
 * A key press {@link KeyEvent} (key down). Also dispatched on key repeats.
 *
 * Has a focus type of {@link FocusType.Keyboard} and needs focus.
 *
 * @category Event
 */
export declare class KeyPress extends KeyEvent {
    cloneWithTarget(target: Widget | null): KeyPress;
}
