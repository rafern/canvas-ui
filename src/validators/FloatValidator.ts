const floatRegex = /^-?(\.\d+|\d+(\.(\d+)?)?)(e\d+)?$/;

/**
 * A {@link Validator} which reports an input string as valid if it is a valid
 * number. If valid, then it transforms the input string into a float.
 *
 * The transformed input for invalid inputs is NaN.
 *
 * @category Validator
 */
export function FloatValidator(text: string): [boolean, number] {
    if(!floatRegex.test(text))
        return [false, NaN];

    return [true, parseFloat(text)];
}