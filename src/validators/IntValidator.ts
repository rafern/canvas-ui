const intRegex = /^-?\d+$/;

export function IntValidator(text: string): [boolean, number] {
    if(!intRegex.test(text))
        return [false, NaN];

    return [true, parseInt(text)];
}