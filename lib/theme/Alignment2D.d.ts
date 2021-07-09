import type { Alignment } from './Alignment';
/**
 * Like {@link Alignment}, but for both the horizontal and vertical axes.
 *
 * @category Theme
 */
export interface Alignment2D {
    /** The alignment of the horizontal axis */
    horizontal: Alignment;
    /** The alignment of the vertical axis */
    vertical: Alignment;
}
