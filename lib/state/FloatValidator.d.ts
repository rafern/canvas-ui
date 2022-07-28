/**
 * A {@link Validator} which reports an input string as valid if it is a valid
 * number. If valid, then it transforms the input string into a float.
 *
 * The transformed input for invalid inputs is NaN.
 *
 * @category Validator
 */
export declare function FloatValidator(text: string): [boolean, number];
