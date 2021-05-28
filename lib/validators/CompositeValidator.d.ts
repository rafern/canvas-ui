import { VariableCallback } from '../mixins/Variable';
export declare type UnknownValidator = (value: unknown) => [boolean, unknown];
export declare type UnknownValidatorList = ((value: unknown) => [boolean, unknown])[];
export declare function MakeCompositeValidator<U, V>(validators: UnknownValidatorList, defaultValue: V, callback?: VariableCallback<V> | null): (value: U) => [boolean, V];
