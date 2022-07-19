import { GenericClickHelper } from "./GenericClickHelper";
import { BaseClickHelper } from "./BaseClickHelper";
import { ClickState } from "./ClickState";
/**
 * A class that mixes multiple {@link GenericClickHelper} instances into one.
 * Useful if you want a widget to be both clickable by a pointer and by the
 * enter key
 *
 * @category Helper
 */
export declare class CompoundClickHelper implements BaseClickHelper {
    /** The {@link GenericClickHelper} instances being mixed */
    private clickHelpers;
    constructor(clickHelpers: GenericClickHelper[]);
    get lastClickState(): ClickState;
    get clickState(): ClickState;
    /**
     * See {@link BaseClickHelper.clickStateChanged}.
     *
     * Note that this does not check if the combined state has changed, it only
     * check if any of the states in {@link clickHelpers} has changed, meaning
     * that this can be true while {@link clickState} is equal to
     * {@link lastClickState}. To check whether the combined state changed,
     * compare the aforementioned values. This is the default behaviour so that
     * clicks aren't dropped.
     */
    get clickStateChanged(): boolean;
    /**
     * Similar to {@link BaseClickHelper.wasClick}, except that the wasClick
     * property for each click helper is only true if the
     * {@link BaseClickHelper.clickStateChanged} property is also true.
     */
    get wasClick(): boolean;
}
