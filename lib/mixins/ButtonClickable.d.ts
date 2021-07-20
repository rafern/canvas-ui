import type { Widget } from '../widgets/Widget';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Clickable } from './Clickable';
/**
 * A widget which can be {@link Clickable | clicked} as a button. When clicked,
 * a callback is called if set. If no callback is set it acts as a disabled
 * button.
 *
 * @category Mixin
 */
export declare class ButtonClickable extends Clickable {
    /**
     * The callback for clicking this button. If null, the button is not
     * clickable but will still absorb events.
     */
    protected callback: (() => void) | null;
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
