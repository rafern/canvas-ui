import { PointerRelease } from '../events/PointerRelease';
import { PointerPress } from '../events/PointerPress';
import { PointerMove } from '../events/PointerMove';
import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Leave } from '../events/Leave';

interface PointerDriverState {
    eventQueue: Array<Event>;
    lastFocus: Widget | null;
    pointer: number | null;
    pressing: boolean;
    hovering: boolean;
}

export class PointerDriver implements Driver {
    _states: Map<Root, PointerDriverState> = new Map(); // XXX protected
    #nextPointerID: number = 0;

    registerPointer(): number {
        return this.#nextPointerID++;
    }

    unregisterPointer(pointer: number) {
        for(const state of this._states.values()) {
            // Queue leave event if unregistered pointer was assigned to root
            if(state.pointer === pointer) {
                state.pointer = null;
                if(state.hovering) {
                    state.eventQueue.push(
                        new Leave(state.lastFocus)
                    );
                }
                state.hovering = false;
                state.pressing = false;
            }
        }
    }

    movePointer(root: Root, pointer: number, xNorm: number, yNorm: number, pressing: boolean): void {
        const state = this._states.get(root);
        if(typeof state === 'undefined')
            return;

        // If there is no pointer assigned, assign this one
        if(state.pointer === null)
            state.pointer = pointer;

        // Ignore if pointer is not the assigned one and not pressing or being
        // pressed by the assigned pointer
        const pointerMatches = state.pointer === pointer;
        if(!pointerMatches && (!pressing || state.pressing))
            return;

        // Translate to canvas coordinates
        const [width, height] = root.dimensions;
        const x = xNorm * width;
        const y = yNorm * height;

        // Get event type
        let e;
        if(pressing !== state.pressing) {
            if(pressing)
                e = new PointerPress(x, y);
            else
                e = new PointerRelease(x, y);

            state.pressing = pressing;

            if(pressing) {
                if(state.pointer !== pointer) {
                    state.eventQueue.push(
                        new Leave(state.lastFocus)
                    );
                    state.pointer = pointer;
                }
            }
        }
        else
            e = new PointerMove(x, y);

        // Queue event and update hovering flag
        state.eventQueue.push(e);
        state.hovering = true;
    }

    leavePointer(root: Root, pointer: number) {
        const state = this._states.get(root);
        if(typeof state === 'undefined')
            return;

        // Queue leave event if this is the assigned pointer and if hovering
        if(state.hovering && state.pointer == pointer) {
            state.hovering = false;
            state.eventQueue.push(
                new Leave(state.lastFocus)
            );
        }
    }

    onEnable(root: Root): void {
        // Create new state for UI that just got enabled
        this._states.set(root, <PointerDriverState>{
            eventQueue: [],
            lastFocus: null,
            pointer: null,
            pressing: false,
            hovering: false,
        });
    }

    onDisable(root: Root): void {
        // Dispatch leave event
        root.dispatchEvent(new Leave());

        // Delete state for UI thats about to get disabled
        this._states.delete(root);
    }

    update(root: Root): void {
        const state = this._states.get(root);
        if(typeof state === 'undefined')
            return;

        // Dispatch all queued events for this root
        for(const event of state.eventQueue)
            root.dispatchEvent(event);

        // Clear queue
        state.eventQueue.length = 0;
    }

    onFocusChanged(root: Root, focusType: FocusType, newFocus: Widget | null): void {
        const state = this._states.get(root);
        if(typeof state === 'undefined')
            return;

        // Special case: when the pointer focus capturer changes, dispatch a
        // leave event to the last capturer
        // XXX is this really neccessary?
        if(focusType === FocusType.Pointer) {
            if(state.lastFocus !== null)
                root.dispatchEvent(new Leave(state.lastFocus));

            state.lastFocus = newFocus;
        }
    }
}
