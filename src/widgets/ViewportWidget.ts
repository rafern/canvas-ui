import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import { Viewport } from '../core/Viewport';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';

/**
 * A type of container widget which is allowed to be bigger or smaller than its
 * child.
 *
 * Allows setting the offset of the child, automatically clips it if neccessary.
 * Otherwise acts like a {@link Container}. Implemented by using a
 * {@link Viewport}; effectively, the child widget is painted to a dedicated
 * canvas.
 *
 * @category Widget
 */
export class ViewportWidget extends SingleParent {
    /** See {@link widthTied}. For internal use only */
    private _widthTied: boolean;
    /** See {@link heightTied}. For internal use only */
    private _heightTied: boolean;
    /** See {@link minWidth}. For internal use only */
    private _minWidth = 0;
    /** See {@link minHeight}. For internal use only */
    private _minHeight = 0;
    /** The actual viewport object. */
    private viewport: Viewport;
    /** See {@link offset}. For internal use only */
    private _offset: [number, number] = [0, 0];

    /** Create a new ViewportWidget. */
    constructor(child: Widget, widthTied = false, heightTied = false, themeOverride: Theme | null = null) {
        // Viewport clears its own background, has a single child and propagates
        // events
        super(child, themeOverride, false, true);

        this.viewport = new Viewport();
        this._widthTied = widthTied;
        this._heightTied = heightTied;
    }

    /**
     * Get {@link viewport}'s
     * {@link Viewport.canvasDimensions | canvasDimensions}.
     */
    get canvasDimensions(): [number, number] {
        return this.viewport.canvasDimensions;
    }

    /**
     * Offset of {@link child}. Positional events will take this into account,
     * as well as rendering. Useful for implementing scrolling.
     */
    get offset(): [number, number] {
        return [...this._offset];
    }

    set offset(offset: [number, number]) {
        if(this._offset[0] !== offset[0] || this._offset[1] !== offset[1]) {
            this._offset[0] = offset[0];
            this._offset[1] = offset[1];
            this._dirty = true;
        }
    }

    /** The {@link Viewport.constraints | Viewport's constraints}. */
    set constraints(constraints: [number, number, number, number]) {
        this.viewport.constraints = constraints;
    }

    get constraints(): [number, number, number, number] {
        return this.viewport.constraints;
    }

    /**
     * Is the width tied to the child's? If true, width constraints will be
     * overridden.
     */
    get widthTied(): boolean {
        return this._widthTied;
    }

    set widthTied(widthTied: boolean) {
        if(this._widthTied !== widthTied) {
            this._widthTied = widthTied;
            this._layoutDirty = true;
        }
    }

    /**
     * Is the height tied to the child's? If true, height constraints will be
     * overridden.
     */
    get heightTied(): boolean {
        return this._heightTied;
    }

    set heightTied(heightTied: boolean) {
        if(this._heightTied !== heightTied) {
            this._heightTied = heightTied;
            this._layoutDirty = true;
        }
    }

    /** The minimum width that this widget will try to expand to. */
    get minWidth(): number {
        return this._minWidth;
    }

    set minWidth(minWidth: number) {
        if(this._minWidth !== minWidth) {
            this._minWidth = minWidth;
            this._layoutDirty = true;
        }
    }

    /** The minimum height that this widget will try to expand to. */
    get minHeight(): number {
        return this._minHeight;
    }

    set minHeight(minHeight: number) {
        if(this._minHeight !== minHeight) {
            this._minHeight = minHeight;
            this._layoutDirty = true;
        }
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Ignore events with no position and no target
        if(event.target === null && !(event instanceof PointerEvent))
            return null;

        // Drop event if it is a positional event with no target outside the
        // child's viewport
        const [innerWidth, innerHeight] = this.child.dimensions;
        const vpl = this.offset[0];
        const vpr = vpl + innerWidth;
        const vpt = this.offset[1];
        const vpb = vpt + innerHeight;
        if(event instanceof PointerEvent) {
            if(event.target === null) {
                if(event.x < vpl)
                    return null;
                if(event.x >= vpr)
                    return null;
                if(event.y < vpt)
                    return null;
                if(event.y >= vpb)
                    return null;
            }

            event = event.correctOffset(vpl, vpt);
        }

        // Dispatch event to child
        return this.child.dispatchEvent(event, root);
    }

    protected override handlePreLayoutUpdate(root: Root): void {
        const child = this.child;

        // Pre-layout update child
        child.preLayoutUpdate(root);

        // If child's layout is dirty set self's layout as dirty
        if(child.layoutDirty)
            this._layoutDirty = true;
    }

    protected override handlePostLayoutUpdate(root: Root): void {
        const child = this.child;

        // Post-layout update child
        child.postLayoutUpdate(root);

        // If child is dirty, set self as dirty
        if(child.dirty)
            this._dirty = true;

        // If child's layout is dirty and at least one of the axes are tied,
        // propagate layout dirtiness. Try to resolve layout if no axis is tied.
        const tied = this._widthTied || this._heightTied;
        if(child.layoutDirty && tied)
            this._layoutDirty = true;
        else if(!tied)
            this.viewport.resolveChildsLayout(child);
    }

    protected override handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        let normalWidth = true, normalHeight = true;
        const actualMinWidth = Math.min(Math.max(minWidth, this._minWidth), maxWidth);
        const actualMinHeight = Math.min(Math.max(minHeight, this._minHeight), maxHeight);

        if(this._widthTied || this._heightTied) {
            // Resolve child's layout
            const constraints = this.viewport.constraints;

            if(this._widthTied) {
                constraints[0] = minWidth;
                constraints[1] = maxWidth;
            }

            if(this._heightTied) {
                constraints[2] = minHeight;
                constraints[3] = maxHeight;
            }

            const child = this.child;
            this.viewport.constraints = constraints;
            this.viewport.resolveChildsLayout(child);

            // Tie wanted axes. Do regular layout for non-tied axes.
            if(this._widthTied) {
                this.width = child.dimensions[0];
                normalWidth = false;
            }

            if(this._heightTied) {
                this.height = child.dimensions[1];
                normalHeight = false;
            }
        }

        // Expand as much as possible if constrained, else, only expand to the
        // needed dimensions
        if(normalWidth)
            this.width = (maxWidth !== Infinity) ? maxWidth : actualMinWidth;

        if(normalHeight)
            this.height = (maxHeight !== Infinity) ? maxHeight : actualMinHeight;
    }

    protected override handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void {
        // Paint child to viewport's canvas
        this.viewport.paintToCanvas(this.child);

        // Save context
        ctx.save();

        // Clip to drawing area
        // These are rounded because clipping and filling doesn't work properly
        // with decimal points
        const drawAreaClip = new Path2D();
        drawAreaClip.rect(Math.trunc(x), Math.trunc(y), Math.ceil(this.width), Math.ceil(this.height));
        ctx.clip(drawAreaClip);

        // Clear background
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = this.theme.getFill(ThemeProperty.CanvasFill);
        ctx.fill(drawAreaClip);

        // Draw canvas with offset in passed context
        const [innerWidth, innerHeight] = this.child.dimensions;
        const [xOffset, yOffset] = this.offset;
        const xDst = x + xOffset;
        const yDst = y + yOffset;
        const offsetClip = new Path2D();
        offsetClip.rect(Math.trunc(xDst), Math.trunc(yDst), Math.ceil(innerWidth), Math.ceil(innerHeight));
        ctx.clip(offsetClip);
        ctx.drawImage(
            this.viewport.canvas,
            0,
            0,
            innerWidth,
            innerHeight,
            xDst,
            yDst,
            innerWidth,
            innerHeight,
        );

        // Restore context
        ctx.restore();
    }
}