/**
 * A {@link PointerDriver}'s pointer hint; each registered pointer has a pointer
 * hint which tracks whether the pointer is not in use, hovering a root or
 * pressing a root. Useful for styling pointers depending on if they are
 * hovering/pressing a root or not.
 *
 * @category Driver
 */
export declare enum PointerHint {
    /** The pointer is currently not hovering any root. */
    None = 0,
    /** The pointer is currently hovering a root. */
    Hovering = 1,
    /** The pointer is currently hovering and pressing a root. */
    Pressing = 2
}
