/**
 * A callback for when the value of a {@link Variable} changes.
 *
 * @category Aggregate
 */
export type VariableCallback<V> = (value: V) => void;

/**
 * An aggregate helper class for widgets that contain a variable with a
 * specified type which is intended to be controlled by the user.
 *
 * Useful for implementing widgets such as sliders, checkboxes, text input,
 * etc...
 *
 * @template V The type of {@link value}.
 *
 * @category Aggregate
 */
export class Variable<V> {
    /** The current value, for internal use. */
    private _value: V;
    /** Has the value changed? */
    private _dirty = false;

    /**
     * Create a new Variable.
     *
     * @param initialValue The initial value of this variable. Sets {@link _value}.
     * @param callback The callback for when the value is changed.
     */
    constructor(initialValue: V, private callback: VariableCallback<V> | null = null) {
        this._value = initialValue;
    }

    /**
     * The current value.
     *
     * If setting, {@link setValue} is called.
     */
    get value(): V {
        return this._value;
    }

    set value(value: V) {
        this.setValue(value);
    }

    /** Has the value changed? Resets {@link _dirty} to false */
    get dirty(): boolean {
        const wasDirty = this._dirty;
        this._dirty = false;
        return wasDirty;
    }

    /**
     * Sets {@link _value}. Does nothing if the value is already the one
     * specified.
     *
     * {@link _dirty} is set to true if the value has changed.
     *
     * @param doCallback If true, then {@link callback} is called if the value has changed.
     */
    setValue(value: V, doCallback = true): void {
        if(this._value === value)
            return;

        this._value = value;
        this._dirty = true;
        if(doCallback && this.callback !== null) {
            try {
                this.callback(value);
            }
            catch(e) {
                console.error('Exception in Variable callback', e);
            }
        }
    }
}
