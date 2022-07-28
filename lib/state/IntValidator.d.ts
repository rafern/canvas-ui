/**
 * A {@link Validator} which reports an input string as valid if it is a valid
 * integer. If valid, then it transforms the input string into an integer.
 *
 * The transformed input for invalid inputs is NaN.
 *
 * @category Validator
 */
export declare function IntValidator(text: string): [boolean, number];
