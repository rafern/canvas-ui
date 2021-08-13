import type { Widget } from '../widgets/Widget';
import { PointerEvent } from './PointerEvent';
import { FocusType } from '../core/FocusType';
/**
 * A {@link PointerEvent} for button presses/releases, containing helpers for
 * checking whether it was the left/primary button, right/secondary button or
 * middle/tertiary button. Always take the button ID into account when handling
 * this event as you get a pair of {@link PointerPress} and
 * {@link PointerRelease} events per button ID.
 *
 * Has a focus type decided by the child classes and does not need focus.
 *
 * @category Event
 */
export declare abstract class PointerButtonEvent extends PointerEvent {
    /**
     * The ID of the button affected.
     *
     * 0: left/primary button.
     * 1: right/secondary button.
     * 2: middle/tertiary button.
     * etc...
     */
    readonly button: number;
    /** Create a new PointerButtonEvent. */
    constructor(x: number, y: number, button: number, shift: boolean, ctrl: boolean, alt: boolean, target?: Widget | null, focusType?: FocusType | null);
    /** Is the button affected the left/primary button? */
    get isLeft(): boolean;
    /** Alias for {@link isLeft} */
    get isPrimary(): boolean;
    /** Is the button affected the right/secondary button? */
    get isRight(): boolean;
    /** Alias for {@link isRight} */
    get isSecondary(): boolean;
    /** Is the button affected the middle/tertiary button? */
    get isMiddle(): boolean;
    /** Alias for {@link isMiddle} */
    get isTertiary(): boolean;
}
