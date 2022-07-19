import { CompoundClickHelper } from "./CompoundClickHelper";
import { GenericClickHelper } from "./GenericClickHelper";
import type { Widget } from "../widgets/Widget";
import { FocusType } from "../core/FocusType";
import type { ClickArea } from "./ClickArea";
import type { Event } from "../events/Event";
import { ClickHelper } from "./ClickHelper";
import type { Root } from "../core/Root";
/**
 * A {@link CompoundClickHelper} specialised for {@link Button}-like widgets.
 * Handles pointer clicks and enter key-presses if the widget has a keyboard
 * focus.
 *
 * {@link GenericClickHelper} methods are still available, however, calls to the
 * new methods provided by this class are preferrable; mostly they implement
 * {@link Widget} methods.
 *
 * @category Helper
 */
export declare class ButtonClickHelper extends CompoundClickHelper {
    /** The helper for handling pointer clicks */
    protected pointerClickHelper: ClickHelper;
    /** The helper for handling enter key presses */
    protected keyboardClickHelper: GenericClickHelper;
    constructor(widget: Widget);
    /**
     * Handle focus grabbing from {@link Widget#onFocusGrabbed}. If keyboard
     * focus is gained, then the button is hovered via the
     * {@link ButtonClickHelper#keyboardClickHelper} click helper
     *
     * @param focusType - The focus type from {@link Widget#onFocusGrabbed}
     * @returns Returns true if the focus type was the keyboard focus (and therefore the button probably needs to be re-painted)
     */
    onFocusGrabbed(focusType: FocusType): boolean;
    /**
     * Handle focus dropping from {@link Widget#onFocusDropped}. If keyboard
     * focus is dropped, then the button is released via the
     * {@link ButtonClickHelper#keyboardClickHelper} click helper
     *
     * @param focusType - The focus type from {@link Widget#onFocusDropped}
     * @returns Returns true if the focus type was the keyboard focus (and therefore the button probably needs to be re-painted)
     */
    onFocusDropped(focusType: FocusType): boolean;
    /**
     * Handle event from {@link Widget#handleEvent}. Does most of the button
     * logic.
     *
     * @param event - The event from {@link Widget#handleEvent}
     * @param root - The root from {@link Widget#handleEvent}
     * @param enabled - Is the button being clicked enabled? If not, then the click state will remain unchanged, but the event will be captured
     * @param clickArea - The bounding box to be used for detecting pointer clicks
     * @returns Returns a 2-tuple containing, respective, whether a click occurred, and whether the event should be captured
     */
    handleEvent(event: Event, root: Root, enabled: boolean, clickArea: ClickArea): [wasClick: boolean, capture: boolean];
}
