/**
 * An input validator. A function which checks whether an input is valid and
 * transforms that input.
 *
 * @returns Returns a tuple containing whether the input is valid and the transformed input. Note that if the input is not valid, then the transformed input will be a bogus value.
 * @typeParam U - The type of the input.
 * @typeParam V - The type of the output (the transformed input).
 *
 * @category Validator
 */
export type Validator<U, V> = (value: U) => [boolean, V];

/**
 * A {@link Validator} which has a string input.
 *
 * @typeParam V - The type of the output (the transformed input).
 *
 * @category Validator
 */
export type TextValidator<V> = Validator<string, V>;

/**
 * A {@link Validator} which has unknown input and output types.
 *
 * @category Validator
 */
export type UnknownValidator = Validator<unknown, unknown>;