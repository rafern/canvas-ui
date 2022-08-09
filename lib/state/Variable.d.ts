/**
 * A callback used for when a {@link Variable} has its value changed.
 *
 * @category State Management
 */
export declare type VariableCallback<V> = (value?: V, variable?: Variable<V>) => void;
/**
 * An aggregate helper class for widgets that contain a variable with a
 * specified type which is intended to be controlled by the user.
 *
 * Useful for implementing widgets such as sliders, checkboxes, text input,
 * etc...
 *
 * @typeParam V - The type of {@link Variable#value}.
 * @typeParam C - The type of a callback function. Should not be passed manually.
 *
 * @category State Management
 */
export declare class Variable<V, C extends CallableFunction = VariableCallback<V>> {
    /** The current value, for internal use. */
    private _value;
    /** The function callbacks called when the value is changed */
    private callbacks;
    /**
     * Create a new Variable.
     *
     * @param initialValue - The initial value of this variable. Sets {@link Variable#_value}.
     * @param callback - A callback for when the variable changes. Equivalent to calling {@link Variable#watch} after creating the variable, but allows for variables to created inline.
     * @param callNow - If true, the callback will be called once immediately after it's registered, unless the callback is already registered. Doesn't apply if no callback was passed.
     */
    constructor(initialValue: V, callback?: C, callNow?: boolean);
    /**
     * The current value.
     *
     * If setting, {@link Variable#setValue} is called.
     */
    get value(): V;
    set value(value: V);
    /** Check if a callback is registered to this variable. */
    hasCallback(callback: C): boolean;
    /**
     * Register a callback to this variable. When the value is changed, the
     * callback will be called.
     *
     * @param callNow - If true, the callback will be called once immediately after it's registered, unless the callback is already registered.
     */
    watch(callback: C, callNow?: boolean): boolean;
    /** Unregister a previously registered callback from this variable. */
    unwatch(callback: C): boolean;
    /**
     * Sets {@link Variable#_value}. Does nothing if the value is already the
     * one specified.
     *
     * @param notify - If true, then the {@link Variable#callbacks} are called.
     * @returns Returns true if the value was changed, false if not
     */
    setValue(value: V, notify?: boolean): boolean;
    protected doCallback(callback: C): void;
}
