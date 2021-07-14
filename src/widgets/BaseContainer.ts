import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { SingleParent } from '../mixins/SingleParent';
import { LayoutContext } from '../core/LayoutContext';
import { Alignment } from '../theme/Alignment';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A {@link SingleParent} which contains a single child and automatically paints
 * the child, adds padding, propagates events (if enabled) and handles layout.
 *
 * @category Widget
 */
export class BaseContainer extends SingleParent {
    /** Is the container's whole background dirty (including padding)? */
    protected _backgroundDirty = true;

    /** Create a new BaseContainer. */
    constructor(child: Widget, propagateEvents: boolean, themeOverride: Theme | null = null) {
        // Containers clear their own background, have a child and may propagate
        // events
        super(child, themeOverride, false, propagateEvents);
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): Widget | null {
        // Correct pointer events for padding
        const [vpl, vpr, vpt, vpb] = this.calcChildViewport(0, 0, width, height);
        if(event instanceof PointerEvent)
            event = event.correctOffset(vpl, vpt);

        // Dispatch event to child
        return this.child.dispatchEvent(event, vpr - vpl, vpb - vpt, root);
    }

    protected override handlePreLayoutUpdate(root: Root): void {
        // Pre-layout update child
        const child = this.child;
        child.preLayoutUpdate(root);

        // If child's layout is dirty, set self's layout as dirty
        if(child.layoutDirty)
            this._layoutDirty = true;
    }

    protected override handlePostLayoutUpdate(root: Root): void {
        // Post-layout update child
        const child = this.child;
        child.postLayoutUpdate(root);

        // If child is dirty, set self as dirty
        if(child.dirty)
            this._dirty = true;
    }

    override forceLayoutDirty(): void {
        this._backgroundDirty = true;
        super.forceLayoutDirty();
    }

    protected override handlePopulateLayout(layoutCtx: LayoutContext): void {
        // Setup temporary context with reduced maxWidth or maxHeight
        // XXX This is extremely hacky, but it's the only way I could think of
        // doing padding properly
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        let maxWidth = layoutCtx.maxWidth;
        const hPadding = padding.left + padding.right;
        if(layoutCtx.vertical)
            maxWidth -= hPadding;

        let maxHeight = layoutCtx.maxHeight;
        const vPadding = padding.top + padding.bottom;
        if(!layoutCtx.vertical)
            maxHeight -= vPadding;

        const tempContext = new LayoutContext(maxWidth, maxHeight, layoutCtx.vertical);

        // Populate temporary context with what child wants
        this.child.populateLayout(tempContext);

        // Add container box to outer context's basis, with padding
        layoutCtx.addBasis(tempContext.hBasis + hPadding, tempContext.vBasis + vPadding);

        // Merge other properties from temporary context to outer context
        layoutCtx.hFlex += tempContext.hFlex;
        layoutCtx.vFlex += tempContext.vFlex;

        // Expand maxWidth and maxHeight if needed
        const candidateMaxWidth = tempContext.hBasis + hPadding;
        if(candidateMaxWidth > layoutCtx.maxWidth)
            layoutCtx.maxWidth = candidateMaxWidth;
        const candidateMaxHeight = tempContext.vBasis + vPadding;
        if(candidateMaxHeight > layoutCtx.maxHeight)
            layoutCtx.maxHeight = candidateMaxHeight;
    }

    protected override handleResolveLayout(layoutCtx: LayoutContext): void {
        // Setup temporary context again by cloning outer context, but use a
        // reduced maxWidth or maxHeight
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        const hPadding = padding.left + padding.right;
        let maxWidth = layoutCtx.maxWidth;
        if(layoutCtx.vertical)
            maxWidth -= hPadding;

        const vPadding = padding.top + padding.bottom;
        let maxHeight = layoutCtx.maxHeight;
        if(!layoutCtx.vertical)
            maxHeight -= vPadding;

        const tempCtx = layoutCtx.clone();
        tempCtx.maxWidth = maxWidth;
        tempCtx.maxHeight = maxHeight;

        // Resolve layout of child with temporary context
        const child = this.child;
        child.resolveLayout(tempCtx);

        const [newWidth, newHeight] = child.dimensions;
        if(isNaN(newWidth) || isNaN(newHeight) || newWidth < 0 || newHeight < 0) {
            console.error('Child resolved to invalid dimensions:', newWidth, newHeight, child);
            throw new Error('Child resolved to invalid dimensions');
        }

        // Set outer context's sizeChanged flag if needed
        if(tempCtx.sizeChanged)
            layoutCtx.sizeChanged = true;

        // Container's resolved dimensions are the child's with padding added
        const oldWidth = this.resolvedWidth;
        const oldHeight = this.resolvedHeight;
        this.resolvedWidth = newWidth + hPadding;
        this.resolvedHeight = newHeight + vPadding;

        // If dimensions changed, mark background as dirty
        if(oldWidth !== this.resolvedWidth || oldHeight !== this.resolvedHeight)
            this._backgroundDirty = true;
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Clear background if it is dirty
        if(this._backgroundDirty)
            this.clear(x, y, width, height, ctx);

        this._backgroundDirty = false;

        // Paint child
        const [left, right, top, bottom] = this.calcChildViewport(x, y, width, height);
        this.child.paint(left, top, right - left, bottom - top, ctx);
    }

    /**
     * Calculate the "viewport" of the child. Here, viewport refers to the
     * rectangle where the child will be painted and has no connection to
     * {@link Viewport}.
     *
     * Separated into this method because it takes padding and alignment into
     * account, and is used in multiple methods.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's offset, the right edge's offset, the top edge's offset and the bottom edge's offset.
     */
    private calcChildViewport(x: number, y: number, width: number, height: number): [number, number, number, number] {
        // TODO should this be called calcChildRect to avoid confusion?
        // Calculate viewport of the child (rectangle where the child widget is
        // drawed) given the position and dimensions of the container, and by
        // using its resolved dimensions, padding and alignment

        // Resolve viewport taking only padding, position and dimensions into
        // account
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        let left = x + padding.left;
        let right = x + width - padding.right;
        let top = y + padding.top;
        let bottom = y + height - padding.bottom;

        // If there isn't enough space for padding, fall back to stretching
        // everything out without padding
        if(left > right || top > bottom) {
            console.warn('Not enough space for padding in Container widget! Falling back to using no padding');
            return [x, y, width, height];
        }

        // Take alignment and resolved dimensions into account for each axis.
        // Stretch alignment completely disables this behaviour, i.e. it is
        // equivalent to using no alignment, all the available space is given to
        // the child, not only the space that the child wanted

        // Horizontal axis
        const alignment = this.theme.getAlignment2D(ThemeProperty.ContainerAlignment);
        if(alignment.horizontal !== Alignment.Stretch) {
            // Get free space for this axis
            const freeSpace = (right - left) - this.resolvedWidth;

            // Ignore if free space is negative or zero, as in, the child didn't
            // even get the space they requested or just enough space
            if(freeSpace > 0) {
                // Distribute free space according to chosen alignment mode
                // XXX Couldn't this be simplified by using a ratio instead of
                // an enum?
                switch(alignment.horizontal) {
                    case Alignment.Start:
                        right -= freeSpace;
                        break;
                    case Alignment.Center:
                        left += freeSpace / 2;
                        right -= freeSpace / 2;
                        break;
                    case Alignment.End:
                        left += freeSpace;
                        break;
                }
            }
        }

        // Vertical axis
        if(alignment.vertical !== Alignment.Stretch) {
            // Same logic as above, but for vertical axis
            const freeSpace = (bottom - top) - this.resolvedHeight;

            if(freeSpace > 0) {
                switch(alignment.vertical) {
                    case Alignment.Start:
                        bottom -= freeSpace;
                        break;
                    case Alignment.Center:
                        top += freeSpace / 2;
                        bottom -= freeSpace / 2;
                        break;
                    case Alignment.End:
                        top += freeSpace;
                        break;
                }
            }
        }

        return [left, right, top, bottom];
    }
}
