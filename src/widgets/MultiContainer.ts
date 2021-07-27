import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import type { Event } from '../events/Event';
import { MultiParent } from './MultiParent';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A {@link MultiParent} which automatically paints children, adds spacing,
 * propagates events and handles layout.
 *
 * Can be constrained to a specific type of children.
 *
 * Note that there is no padding. Put this inside a {@link Margin} if padding is
 * needed.
 *
 * @category Widget
 */
export class MultiContainer<W extends Widget = Widget> extends MultiParent<W> {
    /** Is the container's whole background dirty (including spacing)? */
    private backgroundDirty = true;
    /** Is this container vertical? */
    private vertical: boolean;

    /** Create a MultiContainer. */
    constructor(vertical: boolean, themeOverride: Theme | null = null) {
        // MultiContainers clear their own background, have children and
        // propagate events
        super([], themeOverride, false, true);

        this.vertical = vertical;
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Find which widget the event should go to
        const spacing = this.theme.getNumber(ThemeProperty.ContainerSpacing);
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            const length = this.vertical ? child.dimensions[1] : child.dimensions[0];

            // Stop if event was captured
            const captured = child.dispatchEvent(event, root);
            if(captured !== null)
                return captured;

            // Correct event position and offset for next widget if event has
            // position
            if(event instanceof PointerEvent) {
                if(this.vertical)
                    event = event.correctOffset(0, length + spacing);
                else
                    event = event.correctOffset(length + spacing, 0);
            }
        }

        // Event wasn't dispatched to any child
        return null;
    }

    protected override handlePreLayoutUpdate(root: Root): void {
        // Pre-layout update children
        for(const child of this.children) {
            child.preLayoutUpdate(root);

            // If child's layout is dirty, set own layoutDirty flag
            if(child.layoutDirty)
                this._layoutDirty = true;
        }
    }

    protected override handlePostLayoutUpdate(root: Root): void {
        // Post-layout update children
        for(const child of this.children) {
            child.postLayoutUpdate(root);

            // If child is dirty, set own dirty flag
            if(child.dirty)
                this._dirty = true;
        }
    }

    protected override handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // TODO vertical alignment (non-stretch where min cross length = 0)
        // Resolve children's layout with loose constraints along the main axis
        // to get their wanted dimensions and calculate total flex ratio
        let totalFlex = 0;
        let crossLength = 0;
        let minCrossAxis = this.vertical ? maxWidth : maxHeight;
        const maxLength = this.vertical ? maxHeight : maxWidth;

        if(minCrossAxis == Infinity)
            minCrossAxis = 0;

        for(const child of this.children) {
            let childCross: number;
            if(this.vertical) {
                child.resolveLayout(minCrossAxis, maxWidth, 0, Infinity);
                childCross = child.dimensions[0];
            }
            else {
                child.resolveLayout(0, Infinity, minCrossAxis, maxHeight);
                childCross = child.dimensions[1];
            }

            totalFlex += child.flex;
            if(childCross > crossLength)
                crossLength = childCross;
        }

        // Clamp cross length
        const minCrossLength = this.vertical ? minWidth : minHeight;
        if(crossLength < minCrossLength)
            crossLength = minCrossLength;

        // Get free space
        const spacing = this.theme.getNumber(ThemeProperty.ContainerSpacing);
        let usedSpace = Math.trunc(this.childCount / 2) * spacing;
        for(const child of this.children)
            usedSpace += this.vertical ? child.dimensions[1] : child.dimensions[0];

        const freeSpace = maxLength - usedSpace;

        // Don't do flexbox calculations if free space is infinite
        // (unconstrained main axis) or if there isn't any free space.
        if(freeSpace == Infinity || freeSpace <= 0) {
            if(this.vertical) {
                this.width = crossLength;
                this.height = Math.min(usedSpace, maxHeight);
            }
            else {
                this.width = Math.min(usedSpace, maxWidth);
                this.height = crossLength;
            }

            // Shrink widgets that are in the overflown section of the container
            // if there is lack of space
            if(freeSpace >= 0)
                return;

            let spaceLeft = maxLength;
            for(const child of this.children) {
                const childLength = this.vertical ? child.dimensions[1]
                                                  : child.dimensions[0];

                if(childLength > spaceLeft) {
                    // Shrink widget
                    if(this.vertical)
                        child.resolveLayout(minCrossAxis, maxWidth, 0, spaceLeft);
                    else
                        child.resolveLayout(0, spaceLeft, minCrossAxis, maxHeight);

                    spaceLeft = 0;
                }
                else
                    spaceLeft = Math.max(0, spaceLeft - childLength - spacing);
            }

            return;
        }

        // Resolve children's layout with constraints restricted to distributed
        // free space
        for(const child of this.children) {
            const maxMainAxis = freeSpace * child.flex / totalFlex;
            if(this.vertical)
                child.resolveLayout(minCrossAxis, maxWidth, 0, maxMainAxis);
            else
                child.resolveLayout(0, maxMainAxis, minCrossAxis, maxHeight);
        }

        // Resolve width and height
        if(this.vertical) {
            this.width = crossLength;
            this.height = maxHeight;
        }
        else {
            this.width = maxWidth;
            this.height = crossLength;
        }
    }

    protected override handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void {
        // Clear background if never cleared before and there is spacing
        const spacing = this.theme.getNumber(ThemeProperty.ContainerSpacing);
        if(this.backgroundDirty && spacing > 0)
            this.clear(x, y, this.width, this.height, ctx);

        this.backgroundDirty = false;

        // Paint children
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            // Figure out child width and height and clamp if needed
            const length = this.vertical ? child.dimensions[1] : child.dimensions[0];

            // Paint child
            child.paint(x, y, ctx);

            // Increment position in growth direction, with spacing
            if(this.vertical)
                y += length + spacing;
            else
                x += length + spacing;
        }
    }
}
