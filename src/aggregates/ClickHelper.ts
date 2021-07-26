import { PointerRelease } from '../events/PointerRelease';
import { PointerPress } from '../events/PointerPress';
import { PointerEvent } from '../events/PointerEvent';
import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Leave } from '../events/Leave';

/**
 * The current state of a {@link ClickHelper}
 *
 * @category Aggregate
 */
export enum ClickState {
    /** No pointer is hovering over this clickable widget */
    Released,
    /** A pointer is hovering over this clickable widget */
    Hover,
    /** A pointer's button is being held down over this clickable widget */
    Hold,
}

/**
 * An aggregate helper class for widgets that can be clicked.
 *
 * Keeps its current click state as well as its last click state, last pointer
 * position and whether the last click state change resulted in an actual click.
 *
 * @category Aggregate
 */
export class ClickHelper {
    /** Last click state */
    lastClickState: ClickState = ClickState.Released;
    /** The current click state */
    clickState: ClickState = ClickState.Released;
    /** Did the last click event handle result in a click state change? */
    clickStateChanged = false;
    /** Did the last click state change result in a click? */
    wasClick = false;
    /**
     * Last pointer position in normalised coordinates ([0,0] to [1,1]). If
     * there is no last pointer position, such as after a leave event, this will
     * be null. If pointer position was outside box, it will be beyond the [0,0]
     * to [1,1] range.
     */
    pointerPos: [number, number] | null = null;
    /**
     * Like {@link pointerPos}, but only updated when a hold state begins.
     *
     * Useful for implementing draggable widgets.
     */
    startingPointerPos: [number, number] | null = null;

    /**
     * Create a new ClickHelper
     *
     * @param widget The Widget aggregating this helper
     */
    constructor(private widget: Widget) {}

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
    getNormalInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): [number, number] {
        return [(pX - rLeft) / (rRight - rLeft), (pY - rTop) / (rBottom - rTop)];
    }

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
    isPointInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): boolean {
        return pX >= rLeft && pX < rRight && pY >= rTop && pY < rBottom;
    }

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
    isNormalInRect(pX: number, pY: number): boolean {
        return pX >= 0 && pX < 1 && pY >= 0 && pY < 1;
    }

    /**
     * Set {@link clickState} and update {@link lastClickState} if current one
     * differs. Updates {@link wasClick} and {@link clickStateChanged} flags.
     */
    private setClickState(clickState: ClickState, inside: boolean): void {
        if(this.clickState !== clickState) {
            this.lastClickState = this.clickState;
            this.clickState = clickState;

            // If last state was a hold and pointer is still inside click
            // area, this was a click
            this.wasClick = inside && this.lastClickState === ClickState.Hold;
            this.clickStateChanged = true;
        }
        else
            this.clickStateChanged = false;
    }

    /**
     * Updates the current {@link clickState} given an event, as well as
     * {@link _foci | focus}, {@link pointerStyle}, {@link wasClick} and
     * {@link clickStateChanged} flags.
     */
    handleClickEvent(event: Event, root: Root, clickArea: [number, number, number, number]): void {
        if(event instanceof Leave) {
            // Drop focus on this widget if this is a leave event
            root.dropFocus(FocusType.Pointer, this.widget);
            this.pointerPos = null;
            return this.setClickState(ClickState.Released, false);
        }
        else if(event instanceof PointerEvent) {
            // Ignore non-pointer events

            // Normalise pointer coordinates in click area
            this.pointerPos = this.getNormalInRect(event.x, event.y, ...clickArea);

            // If pointer is over the clickable rectangle, then change the
            // pointer style, else, if not targetted, drop focus
            const inside = this.isNormalInRect(...this.pointerPos);
            if(inside)
                root.pointerStyle = 'pointer';
            else if(event.target === null) {
                root.dropFocus(FocusType.Pointer, this.widget);
                return this.setClickState(ClickState.Released, false);
            }

            // If this is a press event, request focus and set starting
            // pointer coordinates
            if(event instanceof PointerPress) {
                this.startingPointerPos = this.pointerPos;
                root.requestFocus(FocusType.Pointer, this.widget);
                return this.setClickState(ClickState.Hold, inside);
            }

            // If this is a release event, drop focus
            if(event instanceof PointerRelease) {
                root.dropFocus(FocusType.Pointer, this.widget);
                if(inside)
                    return this.setClickState(ClickState.Hover, inside);
                else
                    return this.setClickState(ClickState.Released, inside);
            }

            // If event was focused, then it's a hold, else, it's a hover
            if(event.target === null)
                return this.setClickState(ClickState.Hover, inside);
            else
                return this.setClickState(ClickState.Hold, inside);
        }
        else
            this.clickStateChanged = false;
    }
}