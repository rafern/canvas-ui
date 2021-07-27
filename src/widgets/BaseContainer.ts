import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { Alignment } from '../theme/Alignment';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A {@link SingleParent} which contains a single child and automatically paints
 * the child, adds padding, propagates events (if enabled) and handles layout.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export class BaseContainer<W extends Widget = Widget> extends SingleParent<W> {
    /** Horizontal offset of child relative to container. */
    private offsetX = 0;
    /** Vertical offset of child relative to container. */
    private offsetY = 0;
    /** Does the background need to be cleared? */
    protected backgroundDirty = true;

    /** Create a new BaseContainer. */
    constructor(child: W, propagateEvents: boolean, themeOverride: Theme | null = null) {
        // Containers clear their own background, have a child and may propagate
        // events
        super(child, themeOverride, false, propagateEvents);
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Correct pointer events for padding
        if(event instanceof PointerEvent)
            event = event.correctOffset(this.offsetX, this.offsetY);

        // Dispatch event to child
        return this.child.dispatchEvent(event, root);
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

    protected override handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Get padding
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        const hPadding = padding.left + padding.right;
        const vPadding = padding.top + padding.bottom;
        let childMaxWidth = maxWidth - hPadding;
        let childMaxHeight = maxHeight - vPadding;

        // If there isn't enough space for padding, resolve child's layout with
        // a tight fit of 0 for axis with lack of space
        if(childMaxWidth < 0)
            childMaxWidth = 0;
        if(childMaxHeight < 0)
            childMaxHeight = 0;

        // Use tight fit if using a stretch alignment and the max dimensions are
        // not unconstrained
        const alignment = this.theme.getAlignment2D(ThemeProperty.ContainerAlignment);
        const childMinWidth = (alignment.horizontal === Alignment.Stretch && maxWidth !== Infinity)
                                ? childMaxWidth : 0;
        const childMinHeight = (alignment.vertical === Alignment.Stretch && maxHeight !== Infinity)
                                ? childMaxHeight : 0;

        // Resolve child's layout
        this.child.resolveLayout(childMinWidth, childMaxWidth, childMinHeight, childMaxHeight);
        const childDims = this.child.dimensions;
        const usedWidth = childDims[0] + hPadding;
        const usedHeight = childDims[1] + vPadding;

        // Resolve own layout
        const [oldWidth, oldHeight] = [this.width, this.height];
        this.width = Math.max(minWidth, usedWidth);
        this.height = Math.max(minHeight, usedHeight);

        // Mark background as dirty if size changed
        if(this.width !== oldWidth || this.height !== oldHeight)
            this.backgroundDirty = true;

        // Horizontal offset
        this.offsetX = padding.left;
        if(alignment.horizontal !== Alignment.Stretch) {
            // Get free space for this axis
            const freeSpace = this.width - usedWidth;

            // Ignore if free space is negative or zero, as in, the child didn't
            // even get the space they requested or just enough space
            if(freeSpace > 0) {
                // Distribute free space according to chosen alignment mode
                // XXX Couldn't this be simplified by using a ratio instead of
                // an enum?
                switch(alignment.horizontal) {
                    case Alignment.Center:
                        this.offsetX += freeSpace / 2;
                        break;
                    case Alignment.End:
                        this.offsetX += freeSpace;
                        break;
                }
            }
        }

        // Vertical offset
        this.offsetY = padding.top;
        if(alignment.vertical !== Alignment.Stretch) {
            // Same logic as above, but for vertical axis
            const freeSpace = this.height - usedHeight;

            if(freeSpace > 0) {
                switch(alignment.vertical) {
                    case Alignment.Center:
                        this.offsetY += freeSpace / 2;
                        break;
                    case Alignment.End:
                        this.offsetY += freeSpace;
                        break;
                }
            }
        }
    }

    protected override handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void {
        // Clear background if needed
        if(this.backgroundDirty) {
            this.clear(x, y, this.width, this.height, ctx);
            this.backgroundDirty = false;
        }

        // Paint child
        this.child.paint(x + this.offsetX, y + this.offsetY, ctx);
    }
}
