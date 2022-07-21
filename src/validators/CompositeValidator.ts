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
export function MakeCompositeValidator<U, V>(validators: Array<UnknownValidator>, defaultValue: V, callback: VariableCallback<V> | null = null): Validator<U, V> {
    // TODO there must be a better way to do this which preserves type checking.
    // maybe make Validator a class which can be chained with other validators?
    return (value: U): [boolean, V] => {
        let valid = true;
        let nextValue: unknown = value;

        for(const validator of validators) {
            [valid, nextValue] = validator(nextValue);
            if(!valid)
                return [false, defaultValue];
        }

        if(callback !== null) {
            try {
                callback(nextValue as V);
            }
            catch(e) {
                console.warn('Exception in CompositeValidator callback:', e);
            }
        }

        return [true, nextValue as V];
    };
}