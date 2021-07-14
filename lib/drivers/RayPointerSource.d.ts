import type { RayPointerSink } from './RayPointerSink';
/**
 * A source of rays for a single {@link RayPointerSink}, such as
 * {@link RayPointerDriver}. Used so that different kinds of ray sources (such
 * as a raycasting mouse or raycasting XR controllers) can be used in the same
 * driver without having to extend the driver for each type of source.
 *
 * @category Driver
 */
export interface RayPointerSource {
    /**
     * Assign a sink to this source. Rays will be sent to this sink.
     *
     * @param sink The new sink
     * @param pointer The pointer ID to use when sending rays. Keep track of this
     */
    setSink(sink: RayPointerSink, pointer: number): void;
    /** Clear assigned sink. Rays will no longer be sent. */
    clearSink(): void;
}
