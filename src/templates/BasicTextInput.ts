import { TextInput, TextValidator } from "../widgets/TextInput";
import { VariableCallback } from '../mixins/Variable';
import type { Theme } from "../theme/Theme";

export function DefaultTextValidator(text: string): [boolean, string] {
    return [true, text];
}

export function MakeDefaultTextValidatorWithCallback(callback: VariableCallback<string> | null = null): TextValidator<string> {
    if(callback === null)
        return DefaultTextValidator;

    return (text: string): [boolean, string] => {
        callback(text);
        return [true, text];
    }
}

export function BasicTextInput(callback: VariableCallback<string> | null = null, initialValue = '', themeOverride: Theme | null = null) {
    const validator = MakeDefaultTextValidatorWithCallback(callback);
    return new TextInput(validator, initialValue, themeOverride);
}
