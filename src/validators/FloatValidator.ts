const floatRegex = /^-?(\.\d+|\d+(\.(\d+)?)?)(e\d+)?$/;

export function FloatValidator(text: string): [boolean, number] {
    if(!floatRegex.test(text))
        return [false, NaN];

    return [true, parseFloat(text)];
}