import { GenericClickHelper } from './GenericClickHelper';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Bounds } from './Bounds';
/**
 * An aggregate helper class for widgets that can be clicked.
 *
 * Keeps its current click state as well as its last click state, last pointer
 * position and whether the last click state change resulted in an actual click.
 *
 * @category Helper
 */
export declare class ClickHelper extends GenericClickHelper {
    /**
     * Last pointer position in normalised coordinates ([0,0] to [1,1]). If
     * there is no last pointer position, such as after a leave event, this will
     * be null. If pointer position was outside box, it will be beyond the [0,0]
     * to [1,1] range.
     */
    pointerPos: [number, number] | null;
    /**
     * Like {@link ClickHelper#pointerPos}, but only updated when a hold state
     * begins.
     *
     * Useful for implementing draggable widgets.
     */
    startingPointerPos: [number, number] | null;
    /** Which pointer button should count as a click? Left button by default */
    pointerButton: number;
    /**
     * Normalise pointer coordinates inside a rectangle
     *
     * @param pX - Pointer X coordinate, in pixels
     * @param pY - Pointer Y coordinate, in pixels
     * @param rLeft - Rectangle's left coordinate, in pixels
     * @param rRight - Rectangle's right coordinate, in pixels
     * @param rTop - Rectangle's top coordinate, in pixels
     * @param rBottom - Rectangle's bottom coordinate, in pixels
     * @returns Returns normalised coordinates
     */
    getNormalInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): [number, number];
    /**
     * Check if a point, in pixels, is inside a rectangle.
     *
     * @param pX - Pointer X coordinate, in pixels
     * @param pY - Pointer Y coordinate, in pixels
     * @param rLeft - Rectangle's left coordinate, in pixels
     * @param rRight - Rectangle's right coordinate, in pixels
     * @param rTop - Rectangle's top coordinate, in pixels
     * @param rBottom - Rectangle's bottom coordinate, in pixels
     * @returns Returns true if [pX, pY] is inside the rectangle, else, false
     */
    isPointInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): boolean;
    /**
     * Check if a normalised point is inside a rectangle.
     *
     * Since the coordinates are normalised, you don't have to define the
     * coordinates of the rectangle, which may seem counterintuitive.
     *
     * @param pX - Pointer X coordinate, normalised
     * @param pY - Pointer Y coordinate, normalised
     * @returns Returns true if [pX, pY] is inside the rectangle, else, false
     */
    isNormalInRect(pX: number, pY: number): boolean;
    /**
     * Updates the current {@link GenericClickHelper#clickState} given an event,
     * as well as {@link Root#_foci | focus}, {@link Root#pointerStyle},
     * {@link GenericClickHelper#wasClick} and
     * {@link GenericClickHelper#clickStateChanged} flags.
     *
     * @param bounds - A 4-tuple containing, respectively, left coordinate, right coordinate, top coordinate and bottom coordinate of clickable area, in pixels
     */
    handleClickEvent(event: Event, root: Root, bounds: Bounds): void;
}
