import type { LayoutConstraints } from "./LayoutConstraints";
import { paintArrayField } from "../decorators/FlagFields";
import type { Widget } from "../widgets/Widget";
import type { Event } from "../events/Event";
import type { Rect } from "../helpers/Rect";
import type { Viewport } from "./Viewport";
import { PointerEvent } from "../events/PointerEvent";

export abstract class BaseViewport implements Viewport {
    readonly child: Widget;
    abstract readonly context: CanvasRenderingContext2D;
    @paintArrayField()
    constraints: LayoutConstraints = [0, Infinity, 0, Infinity];
    rect: Rect = [0, 0, 0, 0];
    abstract get effectiveScale(): [scaleX: number, scaleY: number];
    parent: Viewport | null = null;

    /** Have the constraints been changed? */
    protected _dirty = true;

    /** Has the warning for dimensionless canvases been issued? */
    protected static dimensionlessWarned = false;
    /** Has the warning for non-power of 2 dimensions been issued? */
    protected static powerOf2Warned = false;
    /**
     * The maximum retries allowed for
     * {@link Viewport#resolveLayout | resolving the layout}. The first attempt
     * is not counted. Only retries that exceed this limit are discarded; if
     * maxRelayout is 4, then the 5th retry will be discarded.
     */
    protected static maxRelayout = 4;

    constructor(child: Widget) {
        this.child = child;
    }

    abstract resolveLayout(): boolean
    abstract paint(force: boolean): boolean;

    dispatchEvent(event: Event): Widget | null {
        // Drop event if it is a positional event with no target outside the
        // child's viewport
        if(event instanceof PointerEvent) {
            const [cl, ct, cw, ch] = this.rect;
            const cr = cl + cw;
            const cb = ct + ch;

            if(event.target === null) {
                if(event.x < cl)
                    return null;
                if(event.x >= cr)
                    return null;
                if(event.y < ct)
                    return null;
                if(event.y >= cb)
                    return null;
            }
        }

        // Dispatch event to child
        return this.child.dispatchEvent(event);
    }
}