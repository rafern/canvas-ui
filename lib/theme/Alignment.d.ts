/**
 * Alignment of container contents. Used for when {@link Container} has too much
 * space.
 *
 * @category Theme
 */
export declare enum Alignment {
    /** Give the extra space to the child, potentially stretching it. */
    Stretch = 0,
    /**
     * Align the child to the start of the container, having the extra space at
     * the end.
     */
    Start = 1,
    /**
     * Align the child to the center of the container, having the extra space
     * split equally to both the start and the end.
     */
    Center = 2,
    /**
     * Align the child to the end of the container, having the extra space at
     * the start.
     */
    End = 3
}
