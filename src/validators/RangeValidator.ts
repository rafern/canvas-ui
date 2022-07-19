import type { Validator } from './Validator';

/**
 * Creates a {@link Validator} which checks whether an input value is within a
 * specified exclusive range (can't be an inclusive range), always returning the
 * original input value.
 *
 * @typeParam V - The type of the input (and output, since it is unchanged).
 *
 * @category Validator
 */
export function MakeRangeValidator<V>(min: V, max: V): Validator<V, V> {
    // TODO make a system for inclusive ranges
    return (value: V): [boolean, V] => {
        if(value < min)
            return [false, value];

        if(value > max)
            return [false, value];

        return [true, value];
    };
}