/**
 * A callback used for when a {@link Variable} has its value changed.
 *
 * @category State Management
 */
export type VariableCallback<V> = (value?: V, variable?: Variable<V>) => void;

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
export class Variable<V, C extends CallableFunction = VariableCallback<V>> {
    /** The current value, for internal use. */
    private _value: V;
    /** The function callbacks called when the value is changed */
    private callbacks: Set<C> = new Set();

    /**
     * Create a new Variable.
     *
     * @param initialValue - The initial value of this variable. Sets {@link Variable#_value}.
     * @param callback - A callback for when the variable changes. Equivalent to calling {@link Variable#watch} after creating the variable, but allows for variables to created inline.
     */
    constructor(initialValue: V, callback?: C) {
        this._value = initialValue;

        if(callback)
            this.watch(callback);
    }

    /**
     * The current value.
     *
     * If setting, {@link Variable#setValue} is called.
     */
    get value(): V {
        return this._value;
    }

    set value(value: V) {
        this.setValue(value);
    }

    /** Check if a callback is registered to this variable. */
    hasCallback(callback: C): boolean {
        return this.callbacks.has(callback);
    }

    /**
     * Register a callback to this variable. When the value is changed, the
     * callback will be called.
     */
    watch(callback: C): boolean {
        if(this.hasCallback(callback))
            return false;

        this.callbacks.add(callback);
        return true;
    }

    /** Unregister a previously registered callback from this variable. */
    unwatch(callback: C): boolean {
        return this.callbacks.delete(callback);
    }

    /**
     * Sets {@link Variable#_value}. Does nothing if the value is already the
     * one specified.
     *
     * @param notify - If true, then {@link Variable#_dirty} is set to true if the value changes.
     * @returns Returns true if the value was changed, false if not
     */
    setValue(value: V, notify = true): boolean {
        if(this._value === value)
            return false;

        this._value = value;

        if(notify) {
            for(const callback of this.callbacks) {
                try {
                    callback(value, this);
                }
                catch(e) {
                    console.error('Exception in Variable callback:', e);
                }
            }
        }

        return true;
    }
}
