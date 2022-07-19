import type { LayoutConstraints } from '../core/LayoutConstraints';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { layoutField } from '../decorators/FlagFields';
import { PointerEvent } from '../events/PointerEvent';
import type { ClickArea } from '../helpers/ClickArea';
import { TabSelect } from '../events/TabSelect';
import { KeyEvent } from '../events/KeyEvent';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import { Viewport } from '../core/Viewport';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';

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
    /** See {@link widthTied}. For internal use only */
    private _widthTied: boolean;
    /** See {@link heightTied}. For internal use only */
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
    private viewport: Viewport | null;
    /** See {@link offset}. For internal use only */
    private _offset: [number, number] = [0, 0];
    /**
     * Child constraints for resolving layout. May be different than
     * {@link viewport}'s constraints. By default, this is 0 minimum and
     * Infinity maximum per axis.
     *
     * Will be automatically scaled depending on the current {@link Root}'s
     * resolution.
     */
    private _constraints: LayoutConstraints = [0, Infinity, 0, Infinity];
    /** Force child re-layout? Only used when not using a Viewport */
    protected forceReLayout = true;
    /** Force child re-paint? Only used when not using a Viewport */
    protected forceRePaint = true;
    /**
     * Should the viewport be auto-scrolled when a widget is tab-selected and
     * when a widget captures keyboard input?
     */
    autoScrollSelections = true;

    /** Create a new ViewportWidget. */
    constructor(child: W, minWidth = 0, minHeight = 0, widthTied = false, heightTied = false, useViewport = false, themeProperties?: ThemeProperties) {
        // Viewport clears its own background, has a single child and propagates
        // events
        super(child, false, true, themeProperties);

        this.viewport = useViewport ? new Viewport() : null;
        this.minWidth = minWidth;
        this.minHeight = minHeight;
        this._widthTied = widthTied;
        this._heightTied = heightTied;
        this._constraints = [0, Infinity, 0, Infinity];
    }

    /**
     * Offset of {@link child}. Positional events will take this into account,
     * as well as rendering. Useful for implementing scrolling.
     */
    get offset(): [number, number] {
        return [...this._offset];
    }

    set offset(offset: [number, number]) {
        // Not using @paintArrayField so that accessor can be overridden
        if(this._offset[0] !== offset[0] || this._offset[1] !== offset[1]) {
            this._offset[0] = offset[0];
            this._offset[1] = offset[1];
            this._dirty = true;
            this.correctChildPosition();
        }
    }

    /**
     * Accessor for {@link _constraints}. If using a {@link Viewport}, its
     * constraints are also updated, but may be different due to
     * {@link widthTied} or {@link heightTied}.
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
            if(this.viewport !== null)
                this.viewport.constraints = constraints;
            else
                this.forceReLayout = true;
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

    /** {@link minWidth}, but scaled according to {@link Root.resolution} */
    get scaledMinWidth(): number {
        return this.minWidth * (this.root?.resolution ?? 1);
    }

    /** {@link minHeight}, but scaled according to {@link Root.resolution} */
    get scaledMinHeight(): number {
        return this.minHeight * (this.root?.resolution ?? 1);
    }

    /** {@link constraints}, but scaled according to {@link Root.resolution} */
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

    protected getClickAreaOf(widget: Widget): ClickArea {
        const [width, height] = widget.dimensions;
        const [x, y] = widget.position;
        const left = this.x + this.offset[0] + x;
        const top = this.y + this.offset[1] + y;
        return [ left, left + width, top, top + height ];
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Drop event if it is a positional event with no target outside the
        // child's viewport. Only correct position if using a Viewport
        if(event instanceof PointerEvent) {
            const [cl, cr, ct, cb] = this.getClickAreaOf(this.child);

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

            if(this.viewport !== null)
                event = event.correctOffset(cl, ct);
        }

        // Dispatch event to child
        const capturer = this.child.dispatchEvent(event, root);

        if(this.autoScrollSelections && capturer !== null && !(this.widthTied && this.heightTied) && (event instanceof TabSelect || event instanceof KeyEvent)) {
            const [cl, cr, ct, cb] = this.getClickAreaOf(capturer);
            const vpr = this.x + this.width;
            const vpb = this.y + this.height;
            let [offsetX, offsetY] = this.offset;

            // If a tab-selection event occurred, scroll so that widget that got
            // selected is visible. Don't scroll if viewport is smaller than
            // capturer and viewport is inside capturer. Don't scroll if
            // capturer is smaller than viewport and capturer is inside viewport
            if(!this.widthTied && !(cl >= this.x && cr < vpr) && !(this.x >= cl && vpr < cr)) {
                if(cl > this.x)
                    offsetX -= cl - this.x;
                else
                    offsetX += vpr - cr;
            }

            if(!this.heightTied && !(ct >= this.y && cb < vpb) && !(this.y >= ct && vpb < cb)) {
                if(ct > this.y)
                    offsetY -= ct - this.y;
                else
                    offsetY += vpb - cb;
            }

            this.offset = [offsetX, offsetY];
        }

        return capturer;
    }

    protected override handlePreLayoutUpdate(root: Root): void {
        const child = this.child;

        // Pre-layout update child
        child.preLayoutUpdate(root);

        // If child's layout is dirty and at least one of the axes are tied,
        // propagate layout dirtiness. Try to resolve layout if no axis is tied.
        const tied = this._widthTied || this._heightTied;
        if(!tied) {
            if(this.viewport !== null) {
                this.viewport.constraints = this.scaledConstraints;
                this.viewport.resolveChildsLayout(child);
            }
            else if(child.layoutDirty || this.forceReLayout) {
                child.resolveDimensionsAsTop(...this.scaledConstraints);
                this.correctChildPosition();
            }
        }
        else if(child.layoutDirty)
            this._layoutDirty = true;
    }

    protected override handlePostLayoutUpdate(root: Root): void {
        const child = this.child;
        this.forceReLayout = false;

        // Post-layout update child
        child.postLayoutUpdate(root);

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
            if(this.viewport === null) {
                child.resolveDimensionsAsTop(...constraints);
                this.correctChildPosition();
            }
            else {
                this.viewport.constraints = constraints;
                this.viewport.resolveChildsLayout(child);
            }

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

        // Expand to the needed dimensions
        if(normalWidth)
            this.width = Math.min(effectiveMinWidth, maxWidth);

        if(normalHeight)
            this.height = Math.min(effectiveMinHeight, maxHeight);

        if(this.width === 0 && this.minWidth === 0 && !this._widthTied)
            console.warn('ViewportWidget has no minimum width and width isn\'t tied, therefore, it may be dimensionless. Set a minimum width and/or tie the width');
        if(this.height === 0 && this.minHeight === 0 && !this._heightTied)
            console.warn('ViewportWidget has no minimum height and height isn\'t tied, therefore, it may be dimensionless. Set a minimum height and/or tie the height');
    }

    protected override afterPositionResolved(): void {
        this.correctChildPosition();

        // If the viewport widget changes position, but the child doesn't, then
        // previously clipped parts may become visible, so force repaint if not
        // using a viewport
        if(this.viewport === null)
            this.forceRePaint = true;
    }

    private correctChildPosition(): void {
        if(this.viewport !== null)
            return;

        // Correct child's position only if not using a Viewport
        const [xOffset, yOffset] = this.offset;
        this.child.resolvePosition(this.x + xOffset, this.y + yOffset);
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D, forced: boolean): void {
        // Paint child to viewport's canvas
        if(this.viewport !== null)
            this.viewport.paintToCanvas(this.child, forced);

        // Calculate child's source and destination
        const [vpX, vpY, vpW, vpH] = this.roundRect(this.x, this.y, this.width, this.height, true);
        const [innerWidth, innerHeight] = this.child.dimensions;
        const [xOffset, yOffset] = this.offset;

        // viewport right and bottom
        const vpR = vpX + vpW;
        const vpB = vpY + vpH;

        // original child destination left and top
        const origXDst = this.x + xOffset;
        const origYDst = this.y + yOffset;

        // clipped child destination left, top, width and height
        let xDst = Math.min(Math.max(origXDst, vpX), vpR);
        let yDst = Math.min(Math.max(origYDst, vpY), vpB);
        let wClipped = Math.min(Math.max(origXDst + innerWidth, vpX), vpR) - xDst;
        let hClipped = Math.min(Math.max(origYDst + innerHeight, vpY), vpB) - yDst;
        [xDst, yDst, wClipped, hClipped] = this.roundRect(xDst, yDst, wClipped, hClipped, true);

        // Abort if outside of bounds
        if(wClipped === 0 || hClipped === 0) {
            if(this.viewport === null)
                this.child.dryPaint();

            this.forceRePaint = false;
            return;
        }

        // child source left and top
        const xSrc = xDst - origXDst;
        const ySrc = yDst - origYDst;

        // Clear background and paint canvas
        this.clearStart(ctx);
        ctx.rect(vpX, vpY, vpW, vpH);
        ctx.clip();
        if(this.viewport !== null) {
            ctx.drawImage(
                this.viewport.canvas,
                xSrc,
                ySrc,
                wClipped,
                hClipped,
                xDst,
                yDst,
                wClipped,
                hClipped,
            );
        }
        ctx.rect(xDst, yDst, wClipped, hClipped);
        this.clearEnd(ctx, 'evenodd');

        if(this.viewport === null) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(xDst, yDst, wClipped, hClipped);
            ctx.clip();
            this.child.paint(ctx, forced || this.forceRePaint);
            ctx.restore();
        }

        this.forceRePaint = false;
    }
}