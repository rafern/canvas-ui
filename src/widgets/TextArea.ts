import { ScrollableViewportWidget, ScrollbarMode } from "./ScrollableViewportWidget";
import type { ThemeProperties } from "../theme/ThemeProperties";
import { AxisCoupling } from "../widgets/AxisCoupling";
import { TextValidator } from "../state/Validator";
import { TextInput } from "./TextInput";

/**
 * A {@link ScrollableViewportWidget} with a {@link TextInput}. Meant to be used
 * as an analogue to the HTML textarea. Allows tab typing by default.
 *
 * Using uni-directional coupling with
 * {@link ScrollbarMode.Hidden | hidden scrollbars} (the default) is
 * recommended. However, if the scrollbars need to be visible, then
 * {@link ScrollbarMode.Layout | layout scrollbars} are recommended since
 * {@link ScrollbarMode.Overlay | overlay scrollbars} will hide text near the
 * borders.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export class TextArea<V> extends ScrollableViewportWidget<TextInput<V>> {
    constructor(validator: TextValidator<V>, inputFilter: ((input: string) => boolean) | null = null, initialValue = '', minWidth = 0, minHeight = 0, scrollbarMode = ScrollbarMode.Hidden, useViewport = false, themeProperties?: ThemeProperties) {
        super(new TextInput(validator, inputFilter, initialValue, themeProperties), minWidth, minHeight, AxisCoupling.Uni, AxisCoupling.Uni, scrollbarMode, useViewport)

        // enable tab typing by default
        this.child.typeableTab = true;
    }

    /**
     * Get the {@link TextInput} of this TextArea. Equivalent to
     * {@link TextArea#child}.
     */
    get textInput() {
        return this.child;
    }
}