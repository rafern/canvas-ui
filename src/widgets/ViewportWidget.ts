import type { LayoutConstraints } from '../core/LayoutConstraints';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { layoutField } from '../decorators/FlagFields';
import { PointerEvent } from '../events/PointerEvent';
import type { Bounds } from '../helpers/Bounds';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import { Viewport } from '../core/Viewport';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A type of container widget which is allowed to be bigger or smaller than its
 * child.
 *
 * Can be constrained to a specific type of children.
 *
 * Allows setting the offset of the child, automatically clips it if neccessary.
 * Otherwise acts like a {@link Container}. Implemented by force re-painting the
 * child and clipping it or, optionally, by using a {@link Viewport} to paint
 * the child widget to a dedicated canvas.
 *
 * @category Widget
 */
export class ViewportWidget<W extends Widget = Widget> extends SingleParent<W> {
    /** See {@link ViewportWidget#widthTied}. For internal use only */
    private _widthTied: boolean;
    /** See {@link ViewportWidget#heightTied}. For internal use only */
    private _heightTied: boolean;
    /**
     * The minimum width that this widget will try to expand to.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     *
     * @decorator `@layoutField`
     */
    @layoutField
    minWidth: number;
    /**
     * The minimum height that this widget will try to expand to.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     *
     * @decorator `@layoutField`
     */
    @layoutField
    minHeight: number;
    /** The actual viewport object, or null if the child is just clipped. */
    private internalViewport: Viewport | null;
    /** See {@link ViewportWidget#offset}. For internal use only */
    private _offset: [number, number] = [0, 0];
    /**
     * Child constraints for resolving layout. May be different than
     * {@link ViewportWidget#internalViewport}'s constraints. By default, this
     * is 0 minimum and Infinity maximum per axis.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     */
    private _constraints: LayoutConstraints = [0, Infinity, 0, Infinity];
    /** Force child re-layout? Only used when not using a Viewport */
    protected forceReLayout = true;
    /** Force child re-paint? Only used when not using a Viewport */
    protected forceRePaint = true;

    /** Create a new ViewportWidget. */
    constructor(child: W, minWidth = 0, minHeight = 0, widthTied = false, heightTied = false, useViewport = false, themeProperties?: ThemeProperties) {
        // Viewport clears its own background, has a single child and propagates
        // events
        super(child, false, true, themeProperties);

        this.internalViewport = useViewport ? new Viewport(child) : null;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
        this._widthTied = widthTied;
        this._heightTied = heightTied;
        this._constraints = [0, Infinity, 0, Infinity];
    }

    /**
     * Does this viewport widget use a Viewport, or does it just clip the child
     * instead (default)?
     *
     * @returns Returns true if a {@link Viewport} is used; if {@link internalViewport} is not null
     */
    get usesViewport(): boolean {
        return this.internalViewport !== null;
    }

    /**
     * Offset of {@link SingleParent#child}. Positional events will take this
     * into account, as well as rendering. Useful for implementing scrolling.
     */
    get offset(): [number, number] {
        return [...this._offset];
    }

    set offset(offset: [number, number]) {
        // Not using @paintArrayField so that accessor can be overridden

        // round offset so that there are no subpixel artifacts
        // TODO remove this
        // const newOffsetX = Math.round(offset[0]);
        // const newOffsetY = Math.round(offset[1]);

        if(this._offset[0] !== offset[0] || this._offset[1] !== offset[1]) {
            this._offset[0] = offset[0];
            this._offset[1] = offset[1];
            this._dirty = true;
            this.correctChildPosition();
        }
    }

    /**
     * Accessor for {@link ViewportWidget#_constraints}. If using a
     * {@link ViewportWidget#internalViewport | Viewport}, its constraints are
     * also updated, but may be different due to
     * {@link ViewportWidget#widthTied} or {@link ViewportWidget#heightTied}.
     */
    set constraints(constraints: LayoutConstraints) {
        // Not using @flagArrayField because this also needs to set the
        // viewport's constraints if set, although @watchArrayField could be
        // used (TODO?)
        if (constraints[0] !== this._constraints[0] ||
            constraints[1] !== this._constraints[1] ||
            constraints[2] !== this._constraints[2] ||
            constraints[3] !== this._constraints[3])
        {
            // Update own constraints
            this._constraints[0] = constraints[0];
            this._constraints[1] = constraints[1];
            this._constraints[2] = constraints[2];
            this._constraints[3] = constraints[3];

            // Update viewport's constaints or flag force layout
            if(this.internalViewport === null)
                this.forceReLayout = true;
            else
                this.internalViewport.constraints = constraints;
        }
    }

    get constraints(): LayoutConstraints {
        return [...this._constraints];
    }

    /**
     * Is the width tied to the child's? If true, width constraints will be
     * ignored.
     */
    get widthTied(): boolean {
        return this._widthTied;
    }

    set widthTied(widthTied: boolean) {
        // Not using @paintArrayField so that accessor can be overridden
        if(this._widthTied !== widthTied) {
            this._widthTied = widthTied;
            this._layoutDirty = true;
            this.forceReLayout = true;
        }
    }

    /**
     * Is the height tied to the child's? If true, height constraints will be
     * ignored.
     */
    get heightTied(): boolean {
        return this._heightTied;
    }

    set heightTied(heightTied: boolean) {
        // Not using @paintArrayField so that accessor can be overridden
        if(this._heightTied !== heightTied) {
            this._heightTied = heightTied;
            this._layoutDirty = true;
            this.forceReLayout = true;
        }
    }

    /**
     * {@link ViewportWidget#minWidth}, but scaled according to
     * {@link Root#resolution}
     */
    get scaledMinWidth(): number {
        return this.minWidth * (this.root?.resolution ?? 1);
    }

    /**
     * {@link ViewportWidget#minHeight}, but scaled according to
     * {@link Root#resolution}
     */
    get scaledMinHeight(): number {
        return this.minHeight * (this.root?.resolution ?? 1);
    }

    /**
     * {@link ViewportWidget#constraints}, but scaled according to
     * {@link Root#resolution}
     */
    get scaledConstraints(): [number, number, number, number] {
        const res = this.root?.resolution ?? 1;
        return [
            this._constraints[0] * res,
            this._constraints[1] * res,
            this._constraints[2] * res,
            this._constraints[3] * res,
        ];
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'canvasFill')
            this._dirty = true;
    }

    protected getBoundsOf(widget: Widget): Bounds {
        const [width, height] = widget.idealDimensions;
        const [x, y] = widget.idealPosition;
        const [childX, childY] = this.child.idealPosition;
        const left = this.idealX + this.offset[0] + x - childX;
        const top = this.idealY + this.offset[1] + y - childY;
        return [ left, left + width, top, top + height ];
    }

    protected override handleEvent(event: Event): Widget | null {
        // Drop event if it is a positional event with no target outside the
        // child's viewport. Only correct position if using a Viewport
        if(event instanceof PointerEvent) {
            const [cl, cr, ct, cb] = this.getBoundsOf(this.child);

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

            if(this.internalViewport !== null)
                event = event.correctOffset(cl, ct);
        }

        // Dispatch event to child
        return this.child.dispatchEvent(event);
    }

    protected override handlePreLayoutUpdate(): void {
        const child = this.child;

        // Pre-layout update child
        child.preLayoutUpdate();

        // If child's layout is dirty and at least one of the axes are tied,
        // propagate layout dirtiness. Try to resolve layout if no axis is tied.
        const tied = this._widthTied || this._heightTied;
        if(!tied) {
            if(this.internalViewport !== null) {
                this.internalViewport.constraints = this.scaledConstraints;
                this.internalViewport.resolveChildsLayout();
            }
            else if(child.layoutDirty || this.forceReLayout) {
                // TODO make this do a proper re-layout loop, and call
                // postFinalizeBounds maybe reuse code from
                // internalViewport.resolvechildslayout and make it separate
                child.resolveDimensionsAsTop(...this.scaledConstraints);
                this.correctChildPosition();
            }
        }
        else if(child.layoutDirty)
            this._layoutDirty = true;
    }

    protected override handlePostFinalizeBounds(): void {
        // postFinalizeBounds only needs to be called if a viewport is not being
        // used. if it is being used, then it's called automatically by the
        // {@link Viewport#resolveChildsLayout} method
        if(this.internalViewport === null) {
            for(const child of this.children)
                child.postFinalizeBounds();
        }
    }

    protected override handlePostLayoutUpdate(): void {
        const child = this.child;
        this.forceReLayout = false;

        // Post-layout update child
        child.postLayoutUpdate();

        // If child is dirty, set self as dirty
        if(child.dirty)
            this._dirty = true;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        let normalWidth = true, normalHeight = true;
        const effectiveMinWidth = Math.min(Math.max(minWidth, this.scaledMinWidth), maxWidth);
        const effectiveMinHeight = Math.min(Math.max(minHeight, this.scaledMinHeight), maxHeight);

        if(this._widthTied || this._heightTied) {
            // Resolve child's layout
            const constraints: LayoutConstraints = this.scaledConstraints;

            if(this._widthTied) {
                constraints[0] = effectiveMinWidth;
                constraints[1] = maxWidth;
            }

            if(this._heightTied) {
                constraints[2] = effectiveMinHeight;
                constraints[3] = maxHeight;
            }

            const child = this.child;
            if(this.internalViewport === null) {
                child.resolveDimensionsAsTop(...constraints);
                this.correctChildPosition();
            }
            else {
                this.internalViewport.constraints = constraints;
                this.internalViewport.resolveChildsLayout();
            }

            // Tie wanted axes. Do regular layout for non-tied axes.
            if(this._widthTied) {
                this.idealWidth = child.idealDimensions[0];
                normalWidth = false;
            }

            if(this._heightTied) {
                this.idealHeight = child.idealDimensions[1];
                normalHeight = false;
            }
        }

        // Expand to the needed dimensions
        if(normalWidth)
            this.idealWidth = Math.min(effectiveMinWidth, maxWidth);

        if(normalHeight)
            this.idealHeight = Math.min(effectiveMinHeight, maxHeight);

        if(this.idealWidth === 0 && this.minWidth === 0 && !this._widthTied)
            console.warn('ViewportWidget has no minimum width and width isn\'t tied, therefore, it may be dimensionless. Set a minimum width and/or tie the width');
        if(this.idealHeight === 0 && this.minHeight === 0 && !this._heightTied)
            console.warn('ViewportWidget has no minimum height and height isn\'t tied, therefore, it may be dimensionless. Set a minimum height and/or tie the height');
    }

    protected override afterPositionResolved(): void {
        this.correctChildPosition();

        // If the viewport widget changes position, but the child doesn't, then
        // previously clipped parts may become visible, so force repaint if not
        // using a viewport
        if(this.internalViewport === null)
            this.forceRePaint = true;
    }

    override finalizeBounds(): void {
        // HACK instead of letting the Parent class finalize the bounds of child
        // widgets, finalize the viewport's own bounds and then only finalize
        // the children's bounds if not using a viewport. this is done for
        // optimisation purposes, otherwise, finalization is done twice when
        // using a viewport
        Widget.prototype.finalizeBounds.call(this);

        if(this.internalViewport === null) {
            for(const child of this.children)
                child.finalizeBounds();
        }
    }

    override activate(root: Root, viewport: Viewport, parent: Widget | null): void {
        // HACK Parent#activate activates child widgets with this._viewport, but
        // we want to use this.internalViewport
        Widget.prototype.activate.call(this, root, viewport, parent);

        const childViewport = this.internalViewport === null ? viewport : this.internalViewport;
        for(const child of this.children)
            child.activate(root, childViewport, parent);
    }

    private correctChildPosition(): void {
        if(this.internalViewport !== null)
            return;

        // Correct child's position only if not using a Viewport
        const [xOffset, yOffset] = this.offset;
        this.child.resolvePosition(this.idealX + xOffset, this.idealY + yOffset);
        this.child.finalizeBounds();
    }

    protected override handlePainting(forced: boolean): void {
        // Paint child to viewport's canvas
        if(this.internalViewport !== null)
            this.internalViewport.paintToCanvas(forced);

        // Calculate child's source and destination
        const [vpX, vpY, vpW, vpH] = this.rect;
        const [innerWidth, innerHeight] = this.child.dimensions;
        const [xOffset, yOffset] = this.offset;

        // viewport right and bottom
        const vpR = vpX + vpW;
        const vpB = vpY + vpH;

        // original child destination left and top
        const origXDst = this.x + xOffset;
        const origYDst = this.y + yOffset;

        // clipped child destination left, top, width and height
        const xDst = Math.min(Math.max(origXDst, vpX), vpR);
        const yDst = Math.min(Math.max(origYDst, vpY), vpB);
        const wClipped = Math.min(Math.max(origXDst + innerWidth, vpX), vpR) - xDst;
        const hClipped = Math.min(Math.max(origYDst + innerHeight, vpY), vpB) - yDst;

        // Abort if outside of bounds
        if(wClipped === 0 || hClipped === 0) {
            if(this.internalViewport === null)
                this.child.dryPaint();

            this.forceRePaint = false;
            return;
        }

        // Clear background and paint canvas
        const ctx = this.viewport.context;
        this.clearStart();
        ctx.rect(vpX, vpY, vpW, vpH);
        ctx.clip();

        if(this.internalViewport !== null) {
            ctx.drawImage(
                this.internalViewport.canvas,
                xDst - origXDst,
                yDst - origYDst,
                wClipped,
                hClipped,
                xDst,
                yDst,
                wClipped,
                hClipped,
            );
        }

        ctx.rect(xDst, yDst, wClipped, hClipped);
        this.clearEnd('evenodd');

        if(this.internalViewport === null) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(xDst, yDst, wClipped, hClipped);
            ctx.clip();
            this.child.paint(forced || this.forceRePaint);
            ctx.restore();
        }

        this.forceRePaint = false;
    }
}