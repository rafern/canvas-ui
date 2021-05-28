export type UnknownValidator = (value: unknown) => [boolean, unknown];

export type UnknownValidatorList = ((value: unknown) => [boolean, unknown])[];

export function MakeCompositeValidator<U, V>(validators: UnknownValidatorList, defaultValue: V): (value: U) => [boolean, V] {
    return (value: U): [boolean, V] => {
        let valid = true;
        let nextValue: unknown = value;

        for(const validator of validators) {
            [valid, nextValue] = validator(nextValue);
            if(!valid)
                return [false, defaultValue];
        }

        return [true, nextValue as V];
    };
}