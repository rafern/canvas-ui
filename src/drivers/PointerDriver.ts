import { PointerRelease } from '../events/PointerRelease';
import { PointerPress } from '../events/PointerPress';
import { PointerMove } from '../events/PointerMove';
import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Event } from '../events/Event';
import { PointerHint } from './PointerHint';
import type { Root } from '../core/Root';
import { Leave } from '../events/Leave';

interface PointerDriverState {
    eventQueue: Array<Event>;
    pointer: number | null;
    pressing: boolean;
    hovering: boolean;
}

/**
 * A generic pointer {@link Driver | driver}.
 *
 * Does nothing on its own, but provides an API for sending pointer events to
 * registered roots and (un)registering pointers.
 *
 * @category Driver
 */
export class PointerDriver implements Driver {
    /**
     * The current state for each registered and enabled root. Contains whether
     * each root is pressing, hovering, which pointer is bound to it and its
     * event queue
     */
    protected states: Map<Root, PointerDriverState> = new Map();
    /** The next available pointer ID. See {@link registerPointer} */
    private nextPointerID = 0;
    /**
     * The {@link PointerHint | hints} for each pointer. The keys are pointer
     * IDs, while the values are that pointer's hint.
     *
     * See {@link getPointerHint}
     */
    protected hints: Map<number, PointerHint> = new Map();

    /** Unassign a pointer from a given root and its state. */
    private unassignPointer(root: Root, state: PointerDriverState) {
        // Clear pointer state
        if(state.pointer !== null)
            this.hints.set(state.pointer, PointerHint.None);

        // Clear state
        state.pointer = null;
        if(state.hovering) {
            // Queue up Leave event if hovering
            state.eventQueue.push(
                new Leave(root.getFocusCapturer(FocusType.Pointer))
            );
        }
        state.hovering = false;
        state.pressing = false;
    }

    /**
     * Register a new pointer.
     *
     * @returns Returns {@link nextPointerID} and increments it
     */
    registerPointer(): number {
        const newID = this.nextPointerID++;
        this.hints.set(newID, PointerHint.None);
        return newID;
    }

    /**
     * Unregister a pointer.
     *
     * If a root has this pointer bound to it, the pointer is unbound from the
     * root, a Leave event is queued to the root and the hovering and pressing
     * state of the root is set to false.
     */
    unregisterPointer(pointer: number): void {
        for(const [root, state] of this.states) {
            // Unassign pointer if unregistered pointer was assigned to root
            if(state.pointer === pointer)
                this.unassignPointer(root, state);
        }

        this.hints.delete(pointer);
    }

    /**
     * Queue up a pointer event to a given root. The type of
     * {@link PointerEvent} is decided automatically based on the root's state
     * and whether its pressing or not.
     *
     * @param pointer The registered pointer ID
     * @param xNorm The normalised (non-integer range from 0 to 1) X coordinate of the pointer event. 0 is the left edge of the root, while 1 is the right edge of the root.
     * @param yNorm The normalised (non-integer range from 0 to 1) Y coordinate of the pointer event. 0 is the top edge of the root, while 1 is the bottom edge of the root.
     * @param pressing Is the pointer pressed?
     *
     * If null, the last pressing state is used, meaning that the pressing state
     * has not changed. Useful if getting pointer movement in an event based
     * environment where you only know when a pointer press occurs, but not if
     * the pointer is pressed or not
     */
    movePointer(root: Root, pointer: number, xNorm: number, yNorm: number, pressing: boolean | null = null): void {
        const state = this.states.get(root);
        if(typeof state === 'undefined')
            return;

        // If there is no pointer assigned, assign this one
        const firstAssign = state.pointer === null;
        if(firstAssign)
            state.pointer = pointer;

        // If press state was not supplied, then it hasn't changed. Use the last
        // state
        if(pressing === null)
            pressing = state.pressing;

        // If pointer is entering this root for the first time, then find which
        // root the pointer was assigned to and queue a leave event
        const pointerMatches = state.pointer === pointer;
        if(!pointerMatches || firstAssign) {
            for(const [otherRoot, otherState] of this.states) {
                // Ignore if its this root
                if(otherRoot === root)
                    continue;

                // If other root has this pointer assigned, unassign it
                if(otherState.pointer === pointer)
                    this.unassignPointer(root, state);
            }
        }

        // Ignore if pointer is not the assigned one and not pressing or being
        // pressed by the assigned pointer
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
                // Replace assigned pointer and clear old assigned pointer's
                // hint
                if(state.pointer !== pointer && state.pointer !== null) {
                    state.eventQueue.push(
                        new Leave(root.getFocusCapturer(FocusType.Pointer))
                    );
                    this.hints.set(state.pointer, PointerHint.None);
                    state.pointer = pointer;
                }
            }
        }
        else
            e = new PointerMove(x, y);

        // Queue event and update hovering flag
        state.eventQueue.push(e);
        state.hovering = true;

        // Update pointer's hint
        if(state.pressing)
            this.hints.set(pointer, PointerHint.Pressing);
        else
            this.hints.set(pointer, PointerHint.Hovering);
    }

    /**
     * Queue up a {@link Leave} event to a given root. Event will only be queued
     * if the root was being hovered.
     *
     * @param pointer The registered pointer ID
     */
    leavePointer(root: Root, pointer: number): void {
        const state = this.states.get(root);
        if(typeof state === 'undefined')
            return;

        // Queue leave event if this is the assigned pointer and if hovering
        if(state.hovering && state.pointer == pointer) {
            state.hovering = false;
            state.pressing = false;
            state.eventQueue.push(
                new Leave(root.getFocusCapturer(FocusType.Pointer))
            );
            this.hints.set(pointer, PointerHint.None);
        }
    }

    /**
     * Queue up a {@link Leave} event to any root with the given pointer
     * assigned. Event will only be queued if the root was being hovered.
     * Pointer will also be unassigned from root.
     *
     * @param pointer The registered pointer ID
     */
    leaveAnyPointer(pointer: number): void {
        for(const root of this.states.keys())
            this.leavePointer(root, pointer);
    }

    /**
     * Get a pointer's {@link PointerHint | hint}.
     *
     * @param pointer The registered pointer ID
     *
     * @returns Returns the given pointer ID's hint. If the pointer ID is not registered, {@link PointerHint.None} is returned.
     */
    getPointerHint(pointer: number): PointerHint {
        return this.hints.get(pointer) ?? PointerHint.None;
    }

    /**
     * Creates a state for the enabled root in {@link states}.
     */
    onEnable(root: Root): void {
        // Create new state for UI that just got enabled
        this.states.set(root, <PointerDriverState>{
            eventQueue: [],
            pointer: null,
            pressing: false,
            hovering: false,
        });
    }

    /**
     * Dispatches a leave event for the disabled root and deletes the state of
     * the disabled root from {@link states}.
     */
    onDisable(root: Root): void {
        // Dispatch leave event
        root.dispatchEvent(new Leave());

        // Reset hint for assigned pointer
        const state = this.states.get(root);
        if(typeof state !== 'undefined' && state.pointer !== null)
            this.hints.set(state.pointer, PointerHint.None);


        // Delete state for UI thats about to get disabled
        this.states.delete(root);
    }

    /**
     * Dispatches all queued events (found in {@link states}) for the root and
     * clears its event queue
     */
    update(root: Root): void {
        const state = this.states.get(root);
        if(typeof state === 'undefined')
            return;

        // Dispatch all queued events for this root
        for(const event of state.eventQueue)
            root.dispatchEvent(event);

        // Clear queue
        state.eventQueue.length = 0;
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFocusChanged(_root: Root, _focusType: FocusType, _newFocus: Widget | null): void {}

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onFocusCapturerChanged(_root: Root, _focusType: FocusType, _oldCapturer: Widget | null, _newCapturer: Widget | null): void {}
}
