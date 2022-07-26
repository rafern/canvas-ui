import { ScrollableViewportWidget, ScrollbarMode } from "./ScrollableViewportWidget";
import type { ThemeProperties } from "../theme/ThemeProperties";
import { TextValidator } from "../validators/Validator";
import { TextInput } from "./TextInput";


export class TextArea<V> extends ScrollableViewportWidget<TextInput<V>> {
    constructor(validator: TextValidator<V>, inputFilter: ((input: string) => boolean) | null = null, initialValue = '', minWidth = 0, minHeight = 0, scrollbarMode = ScrollbarMode.Hidden, useViewport = false, themeProperties?: ThemeProperties) {
        super(new TextInput(validator, inputFilter, initialValue, themeProperties), minWidth, minHeight, false, false, scrollbarMode, useViewport)

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