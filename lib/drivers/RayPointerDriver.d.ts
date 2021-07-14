import type { RayPointerSource } from './RayPointerSource';
import type { PointerHint } from './PointerHint';
import { PointerDriver } from './PointerDriver';
import { Root } from '../core/Root';
/**
 * A {@link PointerDriver} which gets pointer events from raycasts in a 3D
 * engine's world. This is an abstract class and must be implemented. For an
 * example, see
 * [canvas-ui-three](https://github.com/playkostudios/canvas-ui-three)'s
 * ThreeRayPointerDriver implementation.
 *
 * @category Driver
 */
export declare abstract class RayPointerDriver extends PointerDriver {
    /** The sources which this is assigned to */
    protected readonly sources: Set<RayPointerSource>;
    /**
     * Cast a ray in the world and get which root was intersected and where.
     *
     * @param origin The world position where the ray is starting
     * @param direction A normalised vector representing the ray's direction. Not a euler rotation nor a quaternion
     * @returns Returns a 3-tuple containing, in this order, the intersected root or null if none intersected, the normalised x axis of the intersection and the normalised y axis of the intersection. If no root was intersected, use bogus values for x and y
     */
    protected abstract castRay(origin: [number, number, number], direction: [number, number, number]): [Root | null, number, number];
    /**
     * Receive a ray from a {@link RayPointerSource}.
     *
     * @param pointer The source's pointer ID, given when setting the source's sink
     * @param pressing Is the pointer being pressed? If null, the previous pressing state is used
     * @param origin The world position where the ray is starting
     * @param direction A normalised vector representing the ray's direction. Not a euler rotation nor a quaternion
     */
    handlePointerRay(pointer: number, pressing: boolean | null, origin: [number, number, number], direction: [number, number, number]): void;
    /** Add a source. Assigns itself to the given source. */
    addSource(source: RayPointerSource): void;
    protected setPointerHint(pointer: number, hint: PointerHint): boolean;
}
