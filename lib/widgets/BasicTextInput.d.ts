import { TextInput, TextValidator } from "./TextInput";
import { VariableCallback } from '../mixins/Variable';
import type { Theme } from "../theme/Theme";
export declare function DefaultTextValidator(text: string): [boolean, string];
export declare function MakeDefaultTextValidatorWithCallback(callback?: VariableCallback<string> | null): TextValidator<string>;
export declare class BasicTextInput extends TextInput<string> {
    constructor(callback?: VariableCallback<string> | null, initialValue?: string, themeOverride?: Theme | null);
}
