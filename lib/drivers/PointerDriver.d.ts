import type { Widget } from '../widgets/Widget';
import { FocusType } from '../core/FocusType';
import type { Driver } from '../core/Driver';
import type { Event } from '../events/Event';
import { PointerHint } from './PointerHint';
import type { Root } from '../core/Root';
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
export declare class PointerDriver implements Driver {
    /**
     * The current state for each registered and enabled root. Contains whether
     * each root is pressing, hovering, which pointer is bound to it and its
     * event queue
     */
    protected states: Map<Root, PointerDriverState>;
    /** The next available pointer ID. See {@link registerPointer} */
    private nextPointerID;
    /**
     * The {@link PointerHint | hints} for each pointer. The keys are pointer
     * IDs, while the values are that pointer's hint.
     *
     * See {@link getPointerHint}
     */
    protected hints: Map<number, PointerHint>;
    /** Unassign a pointer from a given root and its state. */
    private unassignPointer;
    /**
     * Register a new pointer.
     *
     * @returns Returns {@link nextPointerID} and increments it
     */
    registerPointer(): number;
    /**
     * Unregister a pointer.
     *
     * If a root has this pointer bound to it, the pointer is unbound from the
     * root, a Leave event is queued to the root and the hovering and pressing
     * state of the root is set to false.
     */
    unregisterPointer(pointer: number): void;
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
    movePointer(root: Root, pointer: number, xNorm: number, yNorm: number, pressing?: boolean | null): void;
    /**
     * Queue up a {@link Leave} event to a given root. Event will only be queued
     * if the root was being hovered.
     *
     * @param pointer The registered pointer ID
     */
    leavePointer(root: Root, pointer: number): void;
    /**
     * Queue up a {@link Leave} event to any root with the given pointer
     * assigned. Event will only be queued if the root was being hovered.
     * Pointer will also be unassigned from root.
     *
     * @param pointer The registered pointer ID
     */
    leaveAnyPointer(pointer: number): void;
    /**
     * Get a pointer's {@link PointerHint | hint}.
     *
     * @param pointer The registered pointer ID
     *
     * @returns Returns the given pointer ID's hint. If the pointer ID is not registered, {@link PointerHint.None} is returned.
     */
    getPointerHint(pointer: number): PointerHint;
    /**
     * Creates a state for the enabled root in {@link states}.
     */
    onEnable(root: Root): void;
    /**
     * Dispatches a leave event for the disabled root and deletes the state of
     * the disabled root from {@link states}.
     */
    onDisable(root: Root): void;
    /**
     * Dispatches all queued events (found in {@link states}) for the root and
     * clears its event queue
     */
    update(root: Root): void;
    onFocusChanged(_root: Root, _focusType: FocusType, _newFocus: Widget | null): void;
    onFocusCapturerChanged(_root: Root, _focusType: FocusType, _oldCapturer: Widget | null, _newCapturer: Widget | null): void;
}
export {};
