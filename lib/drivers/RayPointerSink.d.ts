/**
 * A sink of rays for {@link RayPointerSource | RayPointerSources}. Handles
 * pointer rays from multiple sources. {@link RayPointerDriver} implements this.
 * For 3D engines where a UI root is in world space.
 *
 * @category Driver
 */
export interface RayPointerSink {
    /**
     * Receive a ray from a {@link RayPointerSource}. When implementing this,
     * cast a ray starting from the given origin and with the given direction.
     * If the ray intersects with a UI's mesh in the world, queue up a pointer
     * event accordingly.
     *
     * @param pointer The source's pointer ID, given when setting the source's sink
     * @param pressing Is the pointer being pressed? If null, the previous pressing state is used
     * @param origin The world position where the ray is starting
     * @param direction A normalised vector representing the ray's direction. Not a euler rotation nor a quaternion
     */
    handlePointerRay(pointer: number, pressing: boolean | null, origin: [number, number, number], direction: [number, number, number]): void;
}
