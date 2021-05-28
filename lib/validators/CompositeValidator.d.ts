export declare type UnknownValidator = (value: unknown) => [boolean, unknown];
export declare type UnknownValidatorList = ((value: unknown) => [boolean, unknown])[];
export declare function MakeCompositeValidator<U, V>(validators: UnknownValidatorList, defaultValue: V): (value: U) => [boolean, V];
