import { VariableCallback } from '../mixins/Variable';

export type UnknownValidator = (value: unknown) => [boolean, unknown];

export type UnknownValidatorList = ((value: unknown) => [boolean, unknown])[];

export function MakeCompositeValidator<U, V>(validators: UnknownValidatorList, defaultValue: V, callback: VariableCallback<V> | null = null): (value: U) => [boolean, V] {
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