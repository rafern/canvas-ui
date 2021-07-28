import { Widget } from '../widgets/Widget';
import { KeyEvent } from './KeyEvent';
/**
 * A key release {@link KeyEvent} (key up).
 *
 * Has a focus type of {@link FocusType.Keyboard} and needs focus.
 *
 * @category Event
 */
export declare class KeyRelease extends KeyEvent {
    cloneWithTarget(target: Widget | null): KeyRelease;
}
