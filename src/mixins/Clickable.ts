import { PointerRelease } from '../events/PointerRelease';
import { PointerPress } from '../events/PointerPress';
import { PointerEvent } from '../events/PointerEvent';
import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Leave } from '../events/Leave';

export enum ClickState {
    Released,
    Hover,
    Hold,
}

// A Clickable is a Widget that can be clicked. It keeps its current click state
// as well as its last click state, last pointer position and whether the last
// click state change resulted in an actual click
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Clickable<TBase extends GConstructor<Widget>>(Base: TBase) {
    return class Clickable extends Base {
        // Last and current click state
        lastClickState: ClickState = ClickState.Released; // XXX protected
        clickState: ClickState = ClickState.Released; // XXX protected
        // Did the last click event handle result in a click state change?
        clickStateChanged = false; // XXX protected
        // Did the last click state change result in a click?
        wasClick = false; // XXX protected
        // Last pointer position in normalised coordinates ([0,0] to [1,1]). If
        // there is no last pointer position, such as after a leave event, this
        // will be null. If pointer position was outside box, it will be beyond
        // the [0,0] to [1,1] range
        pointerPos: [number, number] | null = null; // XXX protected
        // Like pointer position, but only updated when a hold state begins.
        // Useful for implementing draggable widgets
        startingPointerPos: [number, number] | null = null; // XXX protected

        // Normalise pointer coordinates inside a rectangle
        getNormalInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): [number, number] { // XXX protected
            return [(pX - rLeft) / (rRight - rLeft), (pY - rTop) / (rBottom - rTop)];
        }

        // Check if a point is inside a rectangle
        isPointInRect(pX: number, pY: number, rLeft: number, rRight: number, rTop: number, rBottom: number): boolean { // XXX protected
            return pX >= rLeft && pX < rRight && pY >= rTop && pY < rBottom;
        }

        // Check if a normalised point is inside a rectangle (1x1)
        isNormalInRect(pX: number, pY: number): boolean { // XXX protected
            return pX >= 0 && pX < 1 && pY >= 0 && pY < 1;
        }

        // Set click state and update last one if current one differs. Updates
        // wasClick and clickStateChanged flags
        setClickState(clickState: ClickState, inside: boolean): void { // XXX private
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

        // Updates the current click state given an event, as well as focus,
        // pointer style, wasClick and clickStateChanged flags
        handleClickEvent(event: Event, root: Root, clickArea: [number, number, number, number]): void { // XXX protected
            if(event instanceof Leave) {
                // Drop focus on this widget if this is a leave event
                root.dropFocus(FocusType.Pointer, this);
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
                    root.dropFocus(FocusType.Pointer, this);
                    return this.setClickState(ClickState.Released, false);
                }

                // If this is a press event, request focus and set starting
                // pointer coordinates
                if(event instanceof PointerPress) {
                    this.startingPointerPos = this.pointerPos;
                    root.requestFocus(FocusType.Pointer, this);
                    return this.setClickState(ClickState.Hold, inside);
                }

                // If this is a release event, drop focus
                if(event instanceof PointerRelease) {
                    root.dropFocus(FocusType.Pointer, this);
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
    };
}