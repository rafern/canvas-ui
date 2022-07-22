import type { ThemeProperties } from '../theme/ThemeProperties';
import { FillStyle } from '../theme/FillStyle';
import { Alignment } from '../theme/Alignment';
import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
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
    /** Does the background need to be cleared? */
    protected backgroundDirty = true;

    /** Create a new BaseContainer. */
    constructor(child: W, propagateEvents: boolean, themeProperties?: ThemeProperties) {
        // Containers clear their own background, have a child and may propagate
        // events
        super(child, false, propagateEvents, themeProperties);
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this.backgroundDirty = true;
        }
        else if(property === 'canvasFill')
            this.backgroundDirty = true;
        else if(property === 'containerPadding')
            this._layoutDirty = true;
        else if(property === 'containerAlignment')
            this._layoutDirty = true;
    }

    protected override handleEvent(event: Event): Widget | null {
        // Dispatch event to child
        return this.child.dispatchEvent(event);
    }

    protected override handlePreLayoutUpdate(): void {
        // Pre-layout update child
        const child = this.child;
        child.preLayoutUpdate();

        // If child's layout is dirty, set self's layout as dirty
        if(child.layoutDirty)
            this._layoutDirty = true;
    }

    protected override handlePostFinalizeBounds(): void {
        // Post-finalize bounds update child
        this.child.postFinalizeBounds();
    }

    protected override handlePostLayoutUpdate(): void {
        // Post-layout update child
        const child = this.child;
        child.postLayoutUpdate();

        // If child is dirty, set self as dirty
        if(child.dirty)
            this._dirty = true;

        // If background is dirty, set self as dirty
        if(this.backgroundDirty)
            this._dirty = true;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Get padding
        const padding = this.containerPadding;
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

        // Provide minimum constraints if using stretch alignment, correcting
        // for padding. If maximum constraints are available (not infinite), use
        // those instead
        const alignment = this.containerAlignment;
        let childMinWidth = 0;
        if(alignment.horizontal === Alignment.Stretch) {
            if(childMaxWidth !== Infinity)
                childMinWidth = childMaxWidth;
            else
                childMinWidth = Math.max(minWidth - hPadding, 0);
        }

        let childMinHeight = 0;
        if(alignment.vertical === Alignment.Stretch) {
            if(childMaxHeight !== Infinity)
                childMinHeight = childMaxHeight;
            else
                childMinHeight = Math.max(minHeight - vPadding, 0);
        }

        // Resolve child's dimensions
        this.child.resolveDimensions(childMinWidth, childMaxWidth, childMinHeight, childMaxHeight);
        const [childWidth, childHeight] = this.child.idealDimensions;

        // Resolve own dimensions
        this.idealWidth = Math.max(minWidth, childWidth + hPadding);
        this.idealHeight = Math.max(minHeight, childHeight + vPadding);
    }

    protected override afterPositionResolved(): void {
        // Get padding and alignment
        const padding = this.containerPadding;
        const alignment = this.containerAlignment;

        // Calculate used space
        const [childWidth, childHeight] = this.child.idealDimensions;
        const usedWidth = childWidth + padding.left + padding.right;
        const usedHeight = childHeight + padding.top + padding.bottom;

        // Horizontal offset
        let childX = this.idealX + padding.left;
        if(alignment.horizontal !== Alignment.Stretch) {
            // Get free space for this axis
            const freeSpace = this.idealWidth - usedWidth;

            // Ignore if free space is negative or zero, as in, the child didn't
            // even get the space they requested or just enough space. If there
            // is free space, distribute free space according to chosen
            // alignment ratio
            if(freeSpace > 0)
                childX += freeSpace * alignment.horizontal;
        }

        // Vertical offset
        let childY = this.idealY + padding.top;
        if(alignment.vertical !== Alignment.Stretch) {
            // Same logic as above, but for vertical axis
            const freeSpace = this.idealHeight - usedHeight;

            if(freeSpace > 0)
                childY += freeSpace * alignment.vertical;
        }

        // Resolve child's position
        this.child.resolvePosition(childX, childY);
    }

    override finalizeBounds() {
        const [oldWidth, oldHeight] = this.dimensions;
        const [oldChildX, oldChildY] = this.child.position;
        const [oldChildWidth, oldChildHeight] = this.child.dimensions;

        super.finalizeBounds();

        // If dimensions, child's position or child's dimensions have changed,
        // mark background as dirty
        if(oldWidth !== this.width || oldHeight !== this.height) {
            this.backgroundDirty = true;
            return;
        }

        const [childX, childY] = this.child.position;
        if(oldChildX !== childX || oldChildY !== childY) {
            this.backgroundDirty = true;
            return;
        }

        const [childWidth, childHeight] = this.child.dimensions;
        if(oldChildWidth !== childWidth || oldChildHeight !== childHeight) {
            this.backgroundDirty = true;
            return;
        }
    }

    /**
     * Implementation of handlePainting; separate from handlePainting so that
     * the fillStyle for the background clear can be overridden.
     */
    protected handleBaseContainerPainting(ctx: CanvasRenderingContext2D, forced: boolean, fillStyle: FillStyle | null = null): void {
        // Clear background if needed
        if(this.backgroundDirty || forced) {
            this.clearStart(ctx, fillStyle);
            ctx.rect(...this.rect);
            ctx.rect(...this.child.rect);
            this.clearEnd(ctx, 'evenodd');

            this.backgroundDirty = false;
        }

        // Paint child
        this.child.paint(ctx, forced);
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D, forced: boolean): void {
        this.handleBaseContainerPainting(ctx, forced);
    }

    override dryPaint(): void {
        this.backgroundDirty = false;
        super.dryPaint();
    }

    override forceDirty(): void {
        super.forceDirty();
        this.backgroundDirty = true;
    }
}
