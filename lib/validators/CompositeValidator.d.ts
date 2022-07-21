import type { VariableCallback } from '../helpers/VariableCallback';
import type { Validator, UnknownValidator } from './Validator';
/**
 * Creates a new {@link Validator} which is a list of validators merged into
 * one.
 *
 * @param validators - The list of validators to be merged. The validators will be run in the order of the array.
 * @param defaultValue - The bogus value that will be returned if the input is invalid
 * @param callback - A callback which is called if validation succeeds. If null, no such callback will be called.
 * @typeParam U - The type of the input.
 * @typeParam V - The type of the output (the transformed input).
 *
 * @category Validator
 */
export declare function MakeCompositeValidator<U, V>(validators: Array<UnknownValidator>, defaultValue: V, callback?: VariableCallback<V> | null): Validator<U, V>;
