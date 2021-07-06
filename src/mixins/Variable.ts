import { Widget } from '../widgets/Widget';

export type VariableCallback<V> = (value: V) => void;

// A Variable is a Widget that contains a value of a specified type
export class Variable<V> extends Widget {
    // The callback for when the value is changed
    callback: VariableCallback<V> | null = null; // XXX protected
    // The current value
    private _value: V | undefined;

    get value(): V {
        if(typeof this._value == 'undefined')
            throw 'Value has not been set yet';

        return this._value;
    }

    set value(value: V) {
        this.setValue(value);
    }

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