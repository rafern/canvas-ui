/**
 * A callback for when the value of a {@link Variable} changes.
 *
 * @category Helper
 */
export declare type VariableCallback<V> = (value: V) => void;
/**
 * An aggregate helper class for widgets that contain a variable with a
 * specified type which is intended to be controlled by the user.
 *
 * Useful for implementing widgets such as sliders, checkboxes, text input,
 * etc...
 *
 * @template V The type of {@link value}.
 *
 * @category Helper
 */
export declare class Variable<V> {
    /** The current value, for internal use. */
    private _value;
    /** Has the value changed? */
    private _dirty;
    /** The callback function called when the value is changed */
    private callback;
    /**
     * Create a new Variable.
     *
     * @param initialValue The initial value of this variable. Sets {@link _value}.
     * @param callback The callback for when the value is changed.
     */
    constructor(initialValue: V, callback?: VariableCallback<V> | null);
    /**
     * The current value.
     *
     * If setting, {@link setValue} is called.
     */
    get value(): V;
    set value(value: V);
    /** Has the value changed? Resets {@link _dirty} to false */
    get dirty(): boolean;
    /**
     * Sets {@link _value}. Does nothing if the value is already the one
     * specified.
     *
     * {@link _dirty} is set to true if the value has changed.
     *
     * @param doCallback If true, then {@link callback} is called if the value has changed.
     */
    setValue(value: V, doCallback?: boolean): void;
}
