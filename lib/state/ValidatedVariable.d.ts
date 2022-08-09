import { Variable } from "./Variable";
/**
 * An input validator. A function which checks whether an input is valid and
 * transforms that input.
 *
 * @returns Returns a tuple containing whether the input is valid and the transformed input. Note that if the input is not valid, then the transformed input will be a bogus value.
 * @typeParam U - The type of the input.
 * @typeParam V - The type of the output (the transformed input).
 *
 * @category State Management
 */
export declare type Validator<U, V> = (value: U) => [true, V] | [false, unknown];
/**
 * A callback used for when a {@link ValidatedVariable} has its value changed.
 * Functionally equivalent to {@link VariableCallback}; only used for type
 * correctness.
 *
 * @category State Management
 */
export declare type ValidatedVariableCallback<V, T> = (value?: V, variable?: ValidatedVariable<V, T>) => void;
/**
 * Similar to {@link Variable}, except the variable's value can optionally be
 * validated by a {@link Validator | validator function}.
 *
 * @typeParam V - The type of {@link Variable#value}.
 * @typeParam T - The transformed type of a {@link ValidatedVariable#validValue | valid value}.
 *
 * @category State Management
 */
export declare class ValidatedVariable<V, T = V, C extends CallableFunction = ValidatedVariableCallback<V, T>> extends Variable<V, C> {
    /** See {@link ValidatedVariable#valid}. For internal use only */
    private _valid;
    /** See {@link ValidatedVariable#validValue}. For internal use only */
    private _validValue?;
    /**
     * The validator/transformer used for this variable's value. If null, then
     * the value will always be valid and {@link ValidatedVariable#validValue}
     * will be equal to {@link Variable#value}.
     */
    readonly validator: Validator<V, T> | null;
    constructor(initialValue: V, validator?: Validator<V, T> | null, callback?: C, callNow?: boolean);
    /** If true, then the current value is valid. */
    get valid(): boolean;
    /**
     * The last valid value. If there was never a valid value, `undefined` is
     * returned.
     */
    get validValue(): T;
    setValue(value: V, notify?: boolean): boolean;
    private validate;
}
