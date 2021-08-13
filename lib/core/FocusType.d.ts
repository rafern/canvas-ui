/**
 * The focus type of an {@link Event}. Used to categorise events when focusing
 * {@link Widget | widgets} in {@link Root | roots}.
 *
 * @category Core
 */
export declare enum FocusType {
    /** Used for widgets that need pointer input, such as {@link Button} */
    Pointer = 0,
    /** Used for widgets that need text input, such as {@link TextInput} */
    Keyboard = 1
}
