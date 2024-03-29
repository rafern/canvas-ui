import { Widget } from '../widgets/Widget';
import { Event } from './Event';
/**
 * A tab selection {@link Event}. Dispatched when tab is pressed and either the
 * keyboard-focused widget doesn't capture the event, or when manually
 * dispatched.
 *
 * Has no focus type and does not need focus. Cannot be targetted.
 *
 * For internal use only. Do not use this event unless you know what you're
 * doing.
 *
 * @category Event
 */
export declare class TabSelect extends Event {
    /** The widget that the tab selected will be done relative to. */
    readonly relativeTo: Widget | null;
    /**
     * A working value; has the widget that this event is relative to been
     * reached?
     *
     * If false, then the {@link Root} should be searched until
     * {@link TabSelect#relativeTo} is reached, then, set this to true. If true,
     * then the next visited widget that has a {@link Widget#tabFocusable} value
     * of true will be focused.
     *
     * Note that if {@link TabSelect#relativeTo} is null, then this will be true by
     * default.
     */
    reachedRelative: boolean;
    /**  Create a new TabSelect. */
    constructor(relativeTo: Widget | null, reversed: boolean);
    cloneWithTarget(target: Widget | null): TabSelect;
    static targetWarned: boolean;
}
