import { TextInput, TextValidator } from "../widgets/TextInput";
import { VariableCallback } from '../mixins/Variable';
import type { Theme } from "../theme/Theme";
export declare function DefaultTextValidator(text: string): [boolean, string];
export declare function MakeDefaultTextValidatorWithCallback(callback?: VariableCallback<string> | null): TextValidator<string>;
export declare function BasicTextInput(callback?: VariableCallback<string> | null, initialValue?: string, themeOverride?: Theme | null): TextInput<string>;
