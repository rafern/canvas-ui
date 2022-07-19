import { Widget } from '../widgets/Widget';
import { Event } from './Event';
/**
 * A leave {@link Event}. Dispatched when the pointer leaves the root or the
 * focus capturer changes to another widget.
 *
 * Has a focus type of {@link FocusType.Pointer} and needs focus.
 *
 * @category Event
 */
export declare class Leave extends Event {
    /**
     * Create a new KeyEvent. Sets {@link Event#target}, {@link Event#focusType}
     * to {@link FocusType.Pointer} and {@link Event#needsFocus} to true.
     */
    constructor(target?: Widget | null);
    cloneWithTarget(target: Widget | null): Leave;
}
