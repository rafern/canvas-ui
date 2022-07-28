import { VariableCallback } from "./VariableCallback";
import { Variable } from "./Variable";
export declare class WatchableVariable<V> extends Variable<V> {
    /** The function callbacks called when the value is changed */
    private callbacks;
    hasCallback(callback: VariableCallback<V>): boolean;
    watch(callback: VariableCallback<V>): boolean;
    unwatch(callback: VariableCallback<V>): boolean;
    setValue(value: V, notify?: boolean): boolean;
}
