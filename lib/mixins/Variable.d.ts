import { Widget } from '../widgets/Widget';
export declare type VariableCallback<V> = (value: V) => void;
export declare class Variable<V> extends Widget {
    callback: VariableCallback<V> | null;
    private _value;
    get value(): V;
    set value(value: V);
    setValue(value: V, doCallback?: boolean): void;
}
