import { PointerRelease } from '../events/PointerRelease';
import { PointerPress } from '../events/PointerPress';
import { PointerMove } from '../events/PointerMove';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Leave } from '../events/Leave';

interface PointerDriverState {
    eventQueue: Array<Event>;
    pointer: number | null;
    pressing: boolean;
    hovering: boolean;
}

export class PointerDriver implements Driver {
    #states: Map<Root, PointerDriverState> = new Map();
    #nextPointerID: number = 0;

    registerPointer(): number {
        return this.#nextPointerID++;
    }

    unregisterPointer(pointer: number) {
        for(const [root, state] of this.#states) {
            // Queue leave event if unregistered pointer was assigned to root
            if(state.pointer === pointer) {
                state.pointer = null;
                if(state.hovering) {
                    state.eventQueue.push(
                        new Leave(root.lastFociCapturers.get(FocusType.Pointer))
                    );
                }
                state.hovering = false;
                state.pressing = false;
            }
        }
    }

    movePointer(root: Root, pointer: number, xNorm: number, yNorm: number, pressing: boolean): void {
        const state = this.#states.get(root);
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
                        new Leave(root.lastFociCapturers.get(FocusType.Pointer))
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
        const state = this.#states.get(root);
        if(typeof state === 'undefined')
            return;

        // Queue leave event if this is the assigned pointer and if hovering
        if(state.hovering && state.pointer == pointer) {
            state.hovering = false;
            state.eventQueue.push(
                new Leave(root.lastFociCapturers.get(FocusType.Pointer))
            );
        }
    }

    onEnable(root: Root): void {
        // Create new state for UI that just got enabled
        this.#states.set(root, <PointerDriverState>{
            eventQueue: [],
            pointer: null,
            pressing: false,
            hovering: false,
        });
    }

    onDisable(root: Root): void {
        // Dispatch leave event
        root.dispatchEvent(new Leave());

        // Delete state for UI thats about to get disabled
        this.#states.delete(root);
    }

    update(root: Root): void {
        const state = this.#states.get(root);
        if(typeof state === 'undefined')
            return;

        // Dispatch all queued events for this root
        for(const event of state.eventQueue)
            root.dispatchEvent(event);

        // Clear queue
        state.eventQueue.length = 0;
    }
}
