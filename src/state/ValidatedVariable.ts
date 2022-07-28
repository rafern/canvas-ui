import type { Validator } from "./Validator";
import { Variable } from "./Variable";

export class ValidatedVariable<V, T = V> extends Variable<V> {
    /** See {@link ValidatedVariable#valid}. For internal use only */
    private _valid = true;
    /** See {@link ValidatedVariable#validValue}. For internal use only */
    private _validValue?: T;
    /**
     * The validator/transformer used for this variable's value. If null, then
     * the value will always be valid and {@link ValidatedVariable#validValue}
     * will be equal to {@link Variable#value}.
     */
    readonly validator: Validator<V, T> | null;

    constructor(initialValue: V, validator: Validator<V, T> | null = null) {
        super(initialValue);
        this.validator = validator;
    }

    /** If true, then the current value is valid. */
    get valid() {
        return this._valid;
    }

    /**
     * The last valid value. If there was never a valid value, `undefined` is
     * returned.
     */
    get validValue(): T {
        return this._validValue as T;
    }

    override setValue(value: V, notify = true): boolean {
        if(this.value === value)
            return false;

        if(this.validator) {
            const [valid, validValueCandidate] = this.validator(value);
            // XXX _valid is set in two stages so the type system knows whether
            // valid is true or false
            this._valid = valid;

            if(valid)
                this._validValue = validValueCandidate;
        }

        return super.setValue(value, notify);
    }
}
