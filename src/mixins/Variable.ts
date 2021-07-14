import { Widget } from '../widgets/Widget';

/**
 * A callback for when the value of a {@link Variable} changes.
 *
 * @category Mixin
 */
export type VariableCallback<V> = (value: V) => void;

/**
 * A mixin class for widgets that contain a single value of a specified type
 * which is intended to be controlled by the user.
 *
 * Useful for implementing widgets such as sliders, checkboxes, text input,
 * etc...
 *
 * Note that using Variable with a template directly with Mixin(...) results in
 * a compile error since generics can't be used with Mixin(...). Instead, extend
 * this class to a specific type. This has already been done for a few types,
 * such as {@link BooleanVariable}, {@link NumberVariable} and
 * {@link StringVariable}.
 *
 * @template V The type of {@link value}.
 *
 * @category Mixin
 */
export class Variable<V> extends Widget {
    /** The callback for when the value is changed. */
    protected callback: VariableCallback<V> | null = null;
    /**
     * The current value, for internal use.
     *
     * Initially undefined; make sure to set an initial value when initialising
     * a widget that uses this mixin.
     */
    private _value: V | undefined;

    /**
     * The current value.
     *
     * If getting, throws an exception if {@link _value} is undefined.
     *
     * If setting, {@link setValue} is called.
     */
    get value(): V {
        if(typeof this._value == 'undefined')
            throw 'Value has not been set yet';

        return this._value;
    }

    set value(value: V) {
        this.setValue(value);
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

/**
 * A {@link Variable} for boolean values. Not a type alias so that it can be
 * used with Mixin(...).
 *
 * @category Mixin
 */
export class BooleanVariable extends Variable<boolean> {}

/**
 * A {@link Variable} for number values. Not a type alias so that it can be used
 * with Mixin(...).
 *
 * @category Mixin
 */
export class NumberVariable extends Variable<number> {}

/**
 * A {@link Variable} for string values. Not a type alias so that it can be used
 * with Mixin(...).
 *
 * @category Mixin
 */
export class StringVariable extends Variable<string> {}
