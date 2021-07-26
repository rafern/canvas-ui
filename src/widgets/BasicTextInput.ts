import { MakeDefaultTextValidatorWithCallback } from '../validators/DefaultTextValidator';
import type { VariableCallback } from '../aggregates/Variable';
import type { Theme } from "../theme/Theme";
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
     * created by {@link MakeDefaultTextValidatorWithCallback}.
     *
     * @param callback An optional callback called when the text changes. If null, then no callback is called.
     */
    constructor(callback: VariableCallback<string> | null = null, initialValue = '', themeOverride: Theme | null = null) {
        const validator = MakeDefaultTextValidatorWithCallback(callback);
        super(validator, initialValue, themeOverride);
    }
}
