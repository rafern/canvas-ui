import type { LayoutConstraints } from "./LayoutConstraints";
import { watchArrayField } from "../decorators/FlagFields";
import { PointerEvent } from "../events/PointerEvent";
import type { FillStyle } from "../theme/FillStyle";
import type { Widget } from "../widgets/Widget";
import type { Event } from "../events/Event";
import type { Rect } from "../helpers/Rect";
import type { Viewport } from "./Viewport";

export abstract class BaseViewport implements Viewport {
    readonly relativeCoordinates: boolean;
    readonly child: Widget;
    abstract readonly context: CanvasRenderingContext2D;
    @watchArrayField(BaseViewport.prototype.forceLayoutDirty)
    constraints: LayoutConstraints;
    @watchArrayField(BaseViewport.prototype.updateEverything)
    rect: Rect;
    abstract get effectiveScale(): [scaleX: number, scaleY: number];
    parent: Viewport | null = null;
    @watchArrayField(BaseViewport.prototype.updateChildPos)
    offset: [x: number, y: number];

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

    protected constructor(child: Widget, relativeCoordinates: boolean) {
        this.child = child;
        this.relativeCoordinates = relativeCoordinates;
        this.constraints = [0, Infinity, 0, Infinity];
        this.rect = [0, 0, 0, 0];
        this.offset = [0, 0];
    }

    private updateEverything() {
        this.child.forceDirty();
        this.updateChildPos();
    }

    private forceLayoutDirty() {
        this.child.forceDirty();
    }

    private updateChildPos() {
        if(!this.relativeCoordinates && this.child.active) {
            const [l, t, _w, _h] = this.rect;
            const [ox, oy] = this.offset;
            const newX = l + ox;
            const newY = t + oy;
            const [oldX, oldY] = this.child.position;

            if(newX !== oldX || newY !== oldY) {
                this.child.resolvePosition(newX, newY);
                this.child.finalizeBounds();
            }
        }
    }

    /**
     * Resolves the given child's layout by calling
     * {@link Widget#resolveDimensionsAsTop} with the current
     * {@link Viewport#constraints}, {@link Widget#resolvePosition} and
     * {@link Widget#finalizeBounds}.
     *
     * Expands {@link Viewport#canvas} if the new layout is too big for the
     * current canvas. Expansion is done in powers of 2 to avoid issues with
     * external 3D libraries.
     *
     * Handles both relative and absolute coordinates. The previous position is
     * used.
     *
     * @returns Returns true if the child was resized, else, false.
     */
    resolveLayout(): boolean {
        if(!this.child.layoutDirty)
            return false;

        // Resolve child's layout
        const [oldWidth, oldHeight] = this.child.dimensions;

        this.child.resolveDimensionsAsTop(...this.constraints);

        if(this.relativeCoordinates)
            this.child.resolvePosition(0, 0);
        else
            this.child.resolvePosition(...this.child.idealPosition);

        this.child.finalizeBounds();

        const [newWidth, newHeight] = this.child.dimensions;
        return newWidth !== oldWidth || newHeight !== oldHeight;
    }

    abstract paint(force: boolean, backgroundFillStyle: FillStyle): boolean;

    /**
     * Extra stage before dispatching actual event to child so derivate class
     * can modify the event being dispatched.
     */
    protected beforeDispatch(event: Event): Widget | null {
        // Dispatch event to child
        return this.child.dispatchEvent(event);
    }

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

        return this.beforeDispatch(event);
    }

    protected getClippedViewport(): [vpX: number, vpY: number, vpW: number, vpH: number, origXDst: number, origYDst: number, xDst: number, yDst: number, wClipped: number, hClipped: number] {
        // Calculate child's source and destination
        const [vpX, vpY, vpW, vpH] = this.rect;
        const [innerWidth, innerHeight] = this.child.dimensions;
        const [xOffset, yOffset] = this.offset;

        // viewport right and bottom
        const vpR = vpX + vpW;
        const vpB = vpY + vpH;

        // original child destination left and top
        const origXDst = vpX + xOffset;
        const origYDst = vpY + yOffset;

        // clipped child destination left, top, width and height
        const xDst = Math.min(Math.max(origXDst, vpX), vpR);
        const yDst = Math.min(Math.max(origYDst, vpY), vpB);
        const wClipped = Math.min(Math.max(origXDst + innerWidth, vpX), vpR) - xDst;
        const hClipped = Math.min(Math.max(origYDst + innerHeight, vpY), vpB) - yDst;

        return [vpX, vpY, vpW, vpH, origXDst, origYDst, xDst, yDst, wClipped, hClipped];
    }
}