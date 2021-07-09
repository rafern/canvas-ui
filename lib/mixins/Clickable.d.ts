import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from '../widgets/Widget';
/**
 * The current state of a {@link Clickable}
 *
 * @category Mixin
 */
export declare enum ClickState {
    /** No pointer is hovering over this clickable widget */
    Released = 0,
    /** A pointer is hovering over this clickable widget */
    Hover = 1,
    /** A pointer's button is being held down over this clickable widget */
    Hold = 2
}
/**
 * A mixin class for widgets that can be clicked.
 *
 * Keeps its current click state as well as its last click state, last pointer
 * position and whether the last click state change resulted in an actual click.
 *
 * @category Mixin
 */
export declare class Clickable extends Widget {
    /** Last click state */
    protected lastClickState: ClickState;
    /** The current click state */
    protected clickState: ClickState;
    /** Did the last click event handle result in a click state change? */
    protected clickStateChanged: boolean;
    /** Did the last click state change result in a click? */
    protected wasClick: boolean;
    /**
     * Last pointer position in normalised coordinates ([0,0] to [1,1]). If
     * there is no last pointer position, such as after a leave event, this will
     * be null. If pointer position was outside box, it will be beyond the [0,0]
     * to [1,1] range.
     */
    protected pointerPos: [number, number] | null;
    /**
     * Like {@link pointerPos}, but only updated when a hold state begins.
     *
     * Useful for implementing draggable widgets.
     */
    protected startingPointerPos: [number, number] | null;
    /**
     * Normalise pointer coordinates inside a rectangle
     *
     * @param pX Pointer X coordinate, in pixels
     * @param pY Pointer Y coordinate, in pixels
     * @param rLeft Rectangle's left coordinate, in pixels
     * @param rRight Rectangle's right coordinate, in pixels
     * @param rTop Rectangle's top coordinate, in pixels
     * @param rBottom Rectangle's bottom coordinate, in pixels
     * @returns Returns normalised coordinates
     */
    protected getNormalInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): [number, number];
    /**
     * Check if a point, in pixels, is inside a rectangle.
     *
     * @param pX Pointer X coordinate, in pixels
     * @param pY Pointer Y coordinate, in pixels
     * @param rLeft Rectangle's left coordinate, in pixels
     * @param rRight Rectangle's right coordinate, in pixels
     * @param rTop Rectangle's top coordinate, in pixels
     * @param rBottom Rectangle's bottom coordinate, in pixels
     * @returns Returns true if [pX, pY] is inside the rectangle, else, false
     */
    protected isPointInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): boolean;
    /**
     * Check if a normalised point is inside a rectangle.
     *
     * Since the coordinates are normalised, you don't have to define the
     * coordinates of the rectangle, which may seem counterintuitive.
     *
     * @param pX Pointer X coordinate, normalised
     * @param pY Pointer Y coordinate, normalised
     * @returns Returns true if [pX, pY] is inside the rectangle, else, false
     */
    protected isNormalInRect(pX: number, pY: number): boolean;
    /**
     * Set {@link clickState} and update {@link lastClickState} if current one
     * differs. Updates {@link wasClick} and {@link clickStateChanged} flags.
     */
    private setClickState;
    /**
     * Updates the current {@link clickState} given an event, as well as
     * {@link _foci | focus}, {@link pointerStyle}, {@link wasClick} and
     * {@link clickStateChanged} flags.
     */
    protected handleClickEvent(event: Event, root: Root, clickArea: [number, number, number, number]): void;
}
