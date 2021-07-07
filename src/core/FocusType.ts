/**
 * The focus type of an {@link Event}. Used to categorise events when focusing
 * {@link Widget | widgets} in {@link Root | roots}.
 */
export enum FocusType {
    /**
     * Used by {@link Leave}, {@link PointerMove}, {@link PointerPress} and
     * {@link PointerRelease}
     */
    Pointer = 0,
    /** Used by {@link KeyPress} and {@link KeyRelease} */
    Keyboard = 1,
}
