import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';

export type VariableCallback<V> = (value: V) => void;

// A Variable is a Widget that contains a value of a specified type
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Variable<V, TBase extends GConstructor<Widget>>(Base: TBase) {
    return class Variable extends Base {
        // The callback for when the value is changed
        callback: VariableCallback<V | null> | null = null;
        // The current value
        _value: V | null = null; // XXX protected

        get value() {
            return this._value;
        }

        set value(value: V | null) {
            this.setValue(value);
        }

        setValue(value: V | null, doCallback = true): void {
            if(this._value === value)
                return;

            this._value = value;
            this.dirty = true;
            if(doCallback && this.callback !== null) {
                try {
                    this.callback(value);
                }
                catch(e) {
                    console.error('Exception in Variable callback', e);
                }
            }
        }
    };
}