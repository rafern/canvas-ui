import { ClickState } from "./ClickState";
/**
 * The common interface for {@link CompoundClickHelper} and
 * {@link GenericClickHelper}. All click state properties must be at least
 * gettable, and optionally settable.
 *
 * @category Helper
 */
export interface BaseClickHelper {
    /** Last click state */
    get lastClickState(): ClickState;
    /** The current click state */
    get clickState(): ClickState;
    /** Did the last click event handle result in a click state change? */
    get clickStateChanged(): boolean;
    /** Did the last click state change result in a click? */
    get wasClick(): boolean;
}
