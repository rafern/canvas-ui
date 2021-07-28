/**
 * A callback function which takes a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values | key code}
 * as an input. Used by virtual keyboard key widgets and stored in a
 * {@link KeyContext}.
 *
 * @category Widget
 */
export declare type KeyContextCallback = (key: string) => void;
/**
 * An object shared by virtual keyboard key widgets to tell whether shift is
 * being held down and to store the callback for when a key is pressed.
 *
 * @category Widget
 */
export interface KeyContext {
    callback: KeyContextCallback;
    shift: boolean;
}
