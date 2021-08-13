import type { VariableCallback } from '../helpers/Variable';
import type { TextValidator } from './Validator';
/**
 * A {@link TextValidator} which does nothing. Always reports a string as valid
 * and returns the input as the transformed input.
 *
 * @category Validator
 */
export declare function DefaultTextValidator(text: string): [boolean, string];
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
export declare function MakeDefaultTextValidatorWithCallback(callback?: VariableCallback<string> | null): TextValidator<string>;
