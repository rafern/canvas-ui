import { BaseClickHelper } from './BaseClickHelper';
import { Widget } from '../widgets/Widget';
import { ClickState } from './ClickState';
/**
 * An aggregate helper class for widgets that can be clicked, in the general
 * sense that the widget is/has a button or is clickable. This does not mean
 * that the widget is only clickable with a pointer; it could also be "clicked"
 * with a keyboard.
 *
 * Keeps its current click state as well as its last click state, and whether
 * the last click state change resulted in an actual click.
 *
 * @category Helper
 */
export declare class GenericClickHelper implements BaseClickHelper {
    lastClickState: ClickState;
    clickState: ClickState;
    clickStateChanged: boolean;
    wasClick: boolean;
    protected widget: Widget;
    /**
     * Create a new GenericClickHelper
     *
     * @param widget - The Widget aggregating this helper
     */
    constructor(widget: Widget);
    /**
     * Set {@link GenericClickHelper#clickState} and update
     * {@link GenericClickHelper#lastClickState} if current one differs. Updates
     * {@link GenericClickHelper#wasClick} and
     * {@link GenericClickHelper#clickStateChanged} flags.
     */
    setClickState(clickState: ClickState, inside: boolean): void;
    reset(): void;
}
