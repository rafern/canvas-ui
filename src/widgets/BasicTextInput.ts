import { MakeDefaultTextValidatorWithCallback } from '../validators/DefaultTextValidator';
import type { VariableCallback } from '../helpers/VariableCallback';
import type { ThemeProperties } from "../theme/ThemeProperties";
import { TextInput } from "./TextInput";

/**
 * A {@link TextInput} with an optional callback and no validation.
 *
 * @category Widget
 */
export class BasicTextInput extends TextInput<string> {
    /**
     * Create a new BasicTextInput.
     *
     * Equivalent to creating a new {@link TextInput} instance with a validator
     * created by {@link MakeDefaultTextValidatorWithCallback} and no input
     * filter.
     *
     * @param callback - An optional callback called when the text changes. If null, then no callback is called.
     */
    constructor(callback: VariableCallback<string> | null = null, initialValue = '', themeProperties?: ThemeProperties) {
        const validator = MakeDefaultTextValidatorWithCallback(callback);
        super(validator, null, initialValue, themeProperties);
    }
}
