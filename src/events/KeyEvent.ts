import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import { Event } from './Event';

/**
 * A keyboard {@link Event}. This is an abstract class and is implemented in the
 * child classes {@link KeyPress} and {@link KeyRelease}.
 *
 * Has a focus type of {@link FocusType.Keyboard} and needs focus.
 *
 * @category Event
 */
export abstract class KeyEvent extends Event {
    /**
     * This event's key. Uses the same values as the
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | KeyboardEvent.key}
     * Web API.
     */
    readonly key: string;

    /**
     * Create a new KeyEvent. Sets {@link key}, {@link target},
     * {@link focusType} to {@link FocusType.Keyboard} and {@link needsFocus} to
     * true.
     */
    constructor(key: string, target: Widget | null) {
        super(target, FocusType.Keyboard, true);
        this.key = key;
    }
}
