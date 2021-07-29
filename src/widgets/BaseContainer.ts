import { ThemeProperty } from '../theme/ThemeProperty';
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
    /** Does the background need to be cleared? */
    protected backgroundDirty = true;

    /** Create a new BaseContainer. */
    constructor(child: W, propagateEvents: boolean, themeOverride: Theme | null = null) {
        // Containers clear their own background, have a child and may propagate
        // events
        super(child, themeOverride, false, propagateEvents);
    }

    protected override setThemeOverride(theme: Theme | null): void {
        super.setThemeOverride(theme);
        this.backgroundDirty = true;
    }

    protected override inheritTheme(theme: Theme): void {
        super.inheritTheme(theme);
        this.backgroundDirty = true;
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
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

        // If background is dirty, set self as dirty
        if(this.backgroundDirty)
            this._dirty = true;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
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

        // Provide minimum constraints if using stretch alignment, correcting
        // for padding. If maximum constraints are available (not infinite), use
        // those instead
        // TODO ^^^^^^
        const alignment = this.theme.getAlignment2D(ThemeProperty.ContainerAlignment);
        const childMinWidth = alignment.horizontal === Alignment.Stretch
                                ? Math.max(minWidth - hPadding, 0) : 0;
        const childMinHeight = alignment.vertical === Alignment.Stretch
                                ? Math.max(minHeight - vPadding, 0) : 0;

        // Resolve child's dimensions
        const [oldChildWidth, oldChildHeight] = this.child.dimensions;
        this.child.resolveDimensions(childMinWidth, childMaxWidth, childMinHeight, childMaxHeight);
        const [childWidth, childHeight] = this.child.dimensions;

        // Resolve own dimensions
        const [oldWidth, oldHeight] = [this.width, this.height];
        this.width = Math.max(minWidth, childWidth + hPadding);
        this.height = Math.max(minHeight, childHeight + vPadding);

        // Mark background as dirty if own size or child's size changed
        if(this.width !== oldWidth || this.height !== oldHeight ||
           childWidth !== oldChildWidth || childHeight !== oldChildHeight)
            this.backgroundDirty = true;
    }

    protected override afterPositionResolved(): void {
        // Get padding and alignment
        const padding = this.theme.getPadding(ThemeProperty.ContainerPadding);
        const alignment = this.theme.getAlignment2D(ThemeProperty.ContainerAlignment);

        // Calculate used space
        const [childWidth, childHeight] = this.child.dimensions;
        const usedWidth = childWidth + padding.left + padding.right;
        const usedHeight = childHeight + padding.top + padding.bottom;

        // Horizontal offset
        let childX = this.x + padding.left;
        if(alignment.horizontal !== Alignment.Stretch) {
            // Get free space for this axis
            const freeSpace = this.width - usedWidth;

            // Ignore if free space is negative or zero, as in, the child didn't
            // even get the space they requested or just enough space. If there
            // is free space, distribute free space according to chosen
            // alignment ratio
            if(freeSpace > 0)
                childX += freeSpace * alignment.horizontal;
        }

        // Vertical offset
        let childY = this.y + padding.top;
        if(alignment.vertical !== Alignment.Stretch) {
            // Same logic as above, but for vertical axis
            const freeSpace = this.height - usedHeight;

            if(freeSpace > 0)
                childY += freeSpace * alignment.vertical;
        }

        // Resolve child's position
        const [oldChildX, oldChildY] = this.child.position;
        this.child.resolvePosition(childX, childY);

        // If child's position changed, mark background as dirty
        if(oldChildX !== childX || oldChildY !== childY)
            this.backgroundDirty = true;
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D): void {
        // Clear background if needed
        if(this.backgroundDirty) {
            this.clearStart(ctx);
            ctx.rect(...this.roundRect(this.x, this.y, this.width, this.height));
            ctx.rect(...this.roundRect(...this.child.position, ...this.child.dimensions, true));
            this.clearEnd(ctx, 'evenodd');

            this.backgroundDirty = false;
        }

        // Paint child
        this.child.paint(ctx);
    }
}
