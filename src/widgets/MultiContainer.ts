import { ThemeProperty } from '../theme/ThemeProperty';
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
    /** Is the container's background dirty? */
    private backgroundDirty = true;
    /** Is this container vertical? */
    private vertical: boolean;
    /** The unused space along the main axis after resolving dimensions */
    private unusedSpace = 0;

    /** Create a MultiContainer. */
    constructor(vertical: boolean, themeOverride: Theme | null = null) {
        // MultiContainers clear their own background, have children and
        // propagate events
        super([], themeOverride, false, true);

        this.vertical = vertical;
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Find which widget the event should go to
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            // Stop if event was captured
            const captured = child.dispatchEvent(event, root);
            if(captured !== null)
                return captured;
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

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // TODO vertical alignment (non-stretch where min cross length = 0)
        // Resolve children's layout with loose constraints along the main axis
        // to get their wanted dimensions and calculate total flex ratio
        let totalFlex = 0;
        let crossLength = 0;
        let minCrossAxis = this.vertical ? maxWidth : maxHeight;
        const maxLength = this.vertical ? maxHeight : maxWidth;

        if(minCrossAxis == Infinity)
            minCrossAxis = 0;

        let enabledChildCount = 0;
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            enabledChildCount++;

            const [oldChildWidth, oldChildHeight] = child.dimensions;

            if(this.vertical)
                child.resolveDimensions(minCrossAxis, maxWidth, 0, Infinity);
            else
                child.resolveDimensions(0, Infinity, minCrossAxis, maxHeight);

            const [childWidth, childHeight] = child.dimensions;

            totalFlex += child.flex;
            crossLength = Math.max(this.vertical ? childWidth : childHeight, crossLength);

            // Mark background as dirty if child's dimensions changed
            if(childWidth !== oldChildWidth || childHeight !== oldChildHeight)
                this.backgroundDirty = true;
        }

        // Clamp cross length
        const minCrossLength = this.vertical ? minWidth : minHeight;
        if(crossLength < minCrossLength)
            crossLength = minCrossLength;

        // Get free space
        const spacing = this.theme.getNumber(ThemeProperty.ContainerSpacing);
        let usedSpace = Math.max(enabledChildCount - 1, 0) * spacing;
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            usedSpace += this.vertical ? child.dimensions[1] : child.dimensions[0];
        }

        const freeSpace = maxLength - usedSpace;

        // Don't do flexbox calculations if free space is infinite
        // (unconstrained main axis) or if there isn't any free space.
        if(freeSpace == Infinity || freeSpace <= 0) {
            const oldWidth = this.width;
            const oldHeight = this.height;

            if(this.vertical) {
                this.width = crossLength;
                this.height = Math.min(usedSpace, maxHeight);
            }
            else {
                this.width = Math.min(usedSpace, maxWidth);
                this.height = crossLength;
            }

            // Mark background as dirty if dimensions changed
            if(this.width !== oldWidth || this.height !== oldHeight)
                this.backgroundDirty = true;

            // Set unused space to 0; no alignment should be done
            this.unusedSpace = 0;

            // Shrink widgets that are in the overflown section of the container
            // if there is lack of space
            if(freeSpace >= 0)
                return;

            let spaceLeft = maxLength;
            for(const child of this.children) {
                // Ignore disabled children
                if(!child.enabled)
                    continue;

                const childLength = this.vertical ? child.dimensions[1]
                                                  : child.dimensions[0];

                if(childLength > spaceLeft) {
                    // Shrink widget
                    const [oldChildWidth, oldChildHeight] = child.dimensions;

                    if(this.vertical)
                        child.resolveDimensions(minCrossAxis, maxWidth, 0, spaceLeft);
                    else
                        child.resolveDimensions(0, spaceLeft, minCrossAxis, maxHeight);

                    const [childWidth, childHeight] = child.dimensions;

                    // Mark background as dirty if child's dimensions changed
                    if(childWidth !== oldChildWidth || childHeight !== oldChildHeight)
                        this.backgroundDirty = true;

                    spaceLeft = 0;
                }
                else
                    spaceLeft = Math.max(0, spaceLeft - childLength - spacing);
            }

            return;
        }

        // Resolve children's layout with constraints restricted to distributed
        // free space. Calculate used space after flexbox calculations. Skip if
        // none of the children have a flex ratio (or else there is a division
        // by zero)
        let usedSpaceAfter = 0;
        if(totalFlex === 0)
            usedSpaceAfter = usedSpace;
        else {
            for(const child of this.children) {
                // Ignore disabled children
                if(!child.enabled)
                    continue;

                // Add spacing to used space if this is not the first widget
                if(usedSpaceAfter !== 0)
                    usedSpaceAfter += spacing;

                const dedicatedSpace = freeSpace * child.flex / totalFlex;
                const [oldChildWidth, oldChildHeight] = child.dimensions;
                if(this.vertical) {
                    const wantedLength = dedicatedSpace + oldChildHeight;
                    child.resolveDimensions(
                        minCrossAxis, maxWidth,
                        wantedLength, wantedLength,
                    );
                }
                else {
                    const wantedLength = dedicatedSpace + oldChildWidth;
                    child.resolveDimensions(
                        wantedLength, wantedLength,
                        minCrossAxis, maxHeight,
                    );
                }

                const [childWidth, childHeight] = child.dimensions;
                usedSpaceAfter += this.vertical ? childHeight : childWidth;

                // Mark background as dirty if child's dimensions changed
                if(childWidth !== oldChildWidth || childHeight !== oldChildHeight)
                    this.backgroundDirty = true;
            }
        }

        // Resolve width and height
        const oldWidth = this.width;
        const oldHeight = this.height;

        let length;
        if(this.vertical) {
            length = maxHeight;
            this.width = crossLength;
            this.height = length;
        }
        else {
            length = maxWidth;
            this.width = length;
            this.height = crossLength;
        }

        // Mark background as dirty if dimensions changed
        if(this.width !== oldWidth || this.height !== oldHeight)
            this.backgroundDirty = true;

        // Calculate final unused space; used for alignment. Clamp to zero just
        // in case XXX is that neccessary?
        this.unusedSpace = Math.max(length - usedSpaceAfter, 0);
    }

    protected override afterPositionResolved(): void {
        // TODO cross axis alignment
        // Align children
        const spacing = this.theme.getNumber(ThemeProperty.ContainerSpacing);
        // eslint-disable-next-line no-constant-condition
        if(false /*this.unusedSpace > 0*/) {
            // TODO actual alignment modes using this.unusedSpace
        }
        else {
            let mainOffset = this.vertical ? this.y : this.x;
            for(const child of this.children) {
                // Ignore disabled children
                if(!child.enabled)
                    continue;

                const [oldChildX, oldChildY] = child.position;

                if(this.vertical) {
                    child.resolvePosition(this.x, mainOffset);
                    mainOffset += child.dimensions[1] + spacing;
                }
                else {
                    child.resolvePosition(mainOffset, this.y);
                    mainOffset += child.dimensions[0] + spacing;
                }

                const [childX, childY] = child.position;

                // Mark background as dirty if child's position changed
                if(childX !== oldChildX || childY !== oldChildY)
                    this.backgroundDirty = true;
            }
        }
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D): void {
        // Paint children and build clipping region if background is dirty
        const clipRects: [number, number, number, number][] = [];
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            // Paint child
            child.paint(ctx);

            // Add to clipping region if needed
            if(this.backgroundDirty)
                clipRects.push(this.roundRect(...child.position, ...child.dimensions));
        }

        // Clear background if needed
        if(this.backgroundDirty) {
            this.clearStart(ctx);
            ctx.rect(...this.roundRect(this.x, this.y, this.width, this.height));
            for(const clipRect of clipRects)
                ctx.rect(...clipRect);
            this.clearEnd(ctx, 'evenodd');
        }

        this.backgroundDirty = false;
    }
}
