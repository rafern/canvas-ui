import { ScrollableViewportWidget, ScrollbarMode } from "./ScrollableViewportWidget";
import type { ThemeProperties } from "../theme/ThemeProperties";
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
export declare class TextArea<V> extends ScrollableViewportWidget<TextInput<V>> {
    constructor(validator: TextValidator<V>, inputFilter?: ((input: string) => boolean) | null, initialValue?: string, minWidth?: number, minHeight?: number, scrollbarMode?: ScrollbarMode, useViewport?: boolean, themeProperties?: ThemeProperties);
    /**
     * Get the {@link TextInput} of this TextArea. Equivalent to
     * {@link TextArea#child}.
     */
    get textInput(): TextInput<V>;
}
