import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';

export type VariableCallback<V> = (value: V) => void;

// A Variable is a Widget that contains a value of a specified type
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Variable<V, TBase extends GConstructor<Widget>>(Base: TBase, defaultValue: V) {
    return class Variable extends Base {
        // The callback for when the value is changed
        callback: VariableCallback<V> | null = null; // XXX protected
        // The current value
        #value: V = defaultValue;

        get value() {
            return this.#value;
        }

        set value(value: V) {
            this.setValue(value);
        }

        setValue(value: V, doCallback = true): void {
            if(this.#value === value)
                return;

            this.#value = value;
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