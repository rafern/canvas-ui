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
export class Variable<V> {
    /** The current value, for internal use. */
    private _value: V;
    /** The function callbacks called when the value is changed */
    private callbacks: Set<() => void> = new Set();

    /**
     * Create a new Variable.
     *
     * @param initialValue - The initial value of this variable. Sets {@link Variable#_value}.
     */
    constructor(initialValue: V) {
        this._value = initialValue;
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
    hasCallback(callback: () => void): boolean {
        return this.callbacks.has(callback);
    }

    /**
     * Register a callback to this variable. When the value is changed, the
     * callback will be called.
     */
    watch(callback: () => void): boolean {
        if(this.hasCallback(callback))
            return false;

        this.callbacks.add(callback);
        return true;
    }

    /** Unregister a previously registered callback from this variable. */
    unwatch(callback: () => void): boolean {
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
                    callback();
                }
                catch(e) {
                    console.error('Exception in Variable callback', e);
                }
            }
        }

        return true;
    }
}
