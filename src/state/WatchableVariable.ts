import { VariableCallback } from "./VariableCallback";
import { Variable } from "./Variable";

export class WatchableVariable<V> extends Variable<V> {
    /** The function callbacks called when the value is changed */
    private callbacks: Set<VariableCallback<V>> = new Set();

    hasCallback(callback: VariableCallback<V>): boolean {
        return this.callbacks.has(callback);
    }

    watch(callback: VariableCallback<V>): boolean {
        if(this.hasCallback(callback))
            return false;

        this.callbacks.add(callback);
        return true;
    }

    unwatch(callback: VariableCallback<V>): boolean {
        return this.callbacks.delete(callback);
    }

    override setValue(value: V, notify = true): boolean {
        const changed = super.setValue(value, notify);

        if(changed && notify) {
            for(const callback of this.callbacks) {
                try {
                    callback(value);
                }
                catch(e) {
                    console.error('Exception in Variable callback', e);
                }
            }
        }

        return changed;
    }
}