import type { Widget } from '../widgets/Widget';
import { Event } from './Event';
/**
 * An event which contains text pasted by the clipboard.
 *
 * Has a focus type of {@link FocusType.Keyboard} and does not need focus.
 *
 * @category Event
 */
export declare class TextPasteEvent extends Event {
    /** The pasted text */
    readonly text: string;
    /** Create a new Event. */
    constructor(text: string, target?: Widget | null);
    cloneWithTarget(target: Widget | null): TextPasteEvent;
}
