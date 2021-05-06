export declare type KeyContextCallback = (key: string) => void;
export interface KeyContext {
    callback: KeyContextCallback;
    shift: boolean;
}
