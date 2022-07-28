/**
 * An aggregate helper class for widgets that contain a variable with a
 * specified type which is intended to be controlled by the user.
 *
 * Useful for implementing widgets such as sliders, checkboxes, text input,
 * etc...
 *
 * @typeParam V - The type of {@link Variable#value}.
 *
 * @category Helper
 */
export declare class Variable<V> {
    /** The current value, for internal use. */
    private _value;
    /** Has the value changed? */
    private _dirty;
    /**
     * Create a new Variable.
     *
     * @param initialValue - The initial value of this variable. Sets {@link Variable#_value}.
     */
    constructor(initialValue: V);
    /**
     * The current value.
     *
     * If setting, {@link Variable#setValue} is called.
     */
    get value(): V;
    set value(value: V);
    /** Has the value changed? Resets {@link Variable#_dirty} to false */
    get dirty(): boolean;
    /**
     * Sets {@link Variable#_value}. Does nothing if the value is already the
     * one specified.
     *
     * @param notify - If true, then {@link Variable#_dirty} is set to true if the value changes.
     * @returns Returns true if the value was changed, false if not
     */
    setValue(value: V, notify?: boolean): boolean;
}
