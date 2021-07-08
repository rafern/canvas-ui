import type { VariableCallback } from '../mixins/Variable';
import type { TextValidator } from './Validator';

/**
 * A {@link TextValidator} which does nothing. Always reports a string as valid
 * and returns the input as the transformed input.
 *
 * @category Validator
 */
export function DefaultTextValidator(text: string): [boolean, string] {
    return [true, text];
}

/**
 * Create a new {@link TextValidator} which calls a given callback. Always
 * reports a string as valid and returns the input as the transformed input,
 * like {@link DefaultTextValidator}.
 *
 * Note that this is only useful if a callback is supplied. If null is given as
 * the callback, then this will simply return {@link DefaultTextValidator}.
 *
 * @category Validator
 */
export function MakeDefaultTextValidatorWithCallback(callback: VariableCallback<string> | null = null): TextValidator<string> {
    if(callback === null)
        return DefaultTextValidator;

    return (text: string): [boolean, string] => {
        callback(text);
        return [true, text];
    }
}