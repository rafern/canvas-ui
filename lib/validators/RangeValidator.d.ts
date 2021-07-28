import type { Validator } from './Validator';
/**
 * Creates a {@link Validator} which checks whether an input value is within a
 * specified exclusive range (can't be an inclusive range), always returning the
 * original input value.
 *
 * @template V The type of the input (and output, since it is unchanged).
 *
 * @category Validator
 */
export declare function MakeRangeValidator<V>(min: V, max: V): Validator<V, V>;
