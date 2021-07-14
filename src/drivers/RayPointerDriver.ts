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
export abstract class RayPointerDriver extends PointerDriver {
    /** The sources which this is assigned to */
    protected readonly sources: Set<RayPointerSource> = new Set();

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
    handlePointerRay(pointer: number, pressing: boolean | null, origin: [number, number, number], direction: [number, number, number]): void {
        // Cast a ray and get the root that intersects with the ray and the
        // intersection coordinates
        const [root, xNorm, yNorm] = this.castRay(origin, direction);

        // Queue a leave event if no root intersected, else, queue a move event
        if(root === null)
            this.leaveAnyPointer(pointer);
        else
            this.movePointer(root, pointer, xNorm, yNorm, pressing);
    }

    /** Add a source. Assigns itself to the given source. */
    addSource(source: RayPointerSource): void {
        if(!this.sources.has(source)) {
            source.setRayPointerDriver(this);
            this.sources.add(source)
        }
    }

    protected override setPointerHint(pointer: number, hint: PointerHint): boolean {
        const changed = super.setPointerHint(pointer, hint);

        // Call onPointerHintChanged handler for each source
        for(const source of this.sources)
            source.onPointerHintChanged(pointer, hint);

        return changed;

    }
}
