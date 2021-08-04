import type { ThemeProperties } from '../theme/ThemeProperties';
import { FlexAlignment } from '../theme/FlexAlignment';
import { Alignment } from '../theme/Alignment';
import type { Event } from '../events/Event';
import { MultiParent } from './MultiParent';
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
    /** The number of enabled children in this container */
    private enabledChildCount = 0;

    /** Create a MultiContainer. */
    constructor(vertical: boolean, themeProperties?: ThemeProperties) {
        // MultiContainers clear their own background, have children and
        // propagate events
        super([], false, true, themeProperties);

        this.vertical = vertical;
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this.backgroundDirty = true;
        }
        else if(property === 'canvasFill')
            this.backgroundDirty = true;
        else if(property === 'multiContainerAlignment')
            this._layoutDirty = true;
        else if(property === 'multiContainerSpacing')
            this._layoutDirty = true;
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
        // Resolve children's layout with loose constraints along the main axis
        // to get their wanted dimensions and calculate total flex ratio
        let totalFlex = 0, crossLength = 0, minCrossAxis = 0;
        const maxLength = this.vertical ? maxHeight : maxWidth;

        const alignment = this.multiContainerAlignment;
        if(alignment.cross === Alignment.Stretch) {
            minCrossAxis = this.vertical ? maxWidth : maxHeight;
            if(minCrossAxis == Infinity)
                minCrossAxis = this.vertical ? minWidth : minHeight;
        }

        if(this.constructor.name === 'VirtualKeyRow')
            console.log(minCrossAxis, this.vertical ? maxWidth : maxHeight, this.vertical ? minWidth : minHeight);

        this.enabledChildCount = 0;
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            this.enabledChildCount++;

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
        const spacing = this.multiContainerSpacing;
        let usedSpace = Math.max(this.enabledChildCount - 1, 0) * spacing;
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

            // Resolve children's layout, but now with strict constraints so
            // that they stretch properly and shrink children if neccessary (on
            // overflow)
            let spaceLeft = maxLength;
            for(const child of this.children) {
                // Ignore disabled children
                if(!child.enabled)
                    continue;

                const [oldChildWidth, oldChildHeight] = child.dimensions;

                if(this.vertical) {
                    const wantedLength = Math.min(spaceLeft, oldChildHeight);
                    child.resolveDimensions(minCrossAxis, maxWidth, wantedLength, wantedLength);
                }
                else {
                    const wantedLength = Math.min(spaceLeft, oldChildWidth);
                    child.resolveDimensions(wantedLength, wantedLength, minCrossAxis, maxHeight);
                }

                const [childWidth, childHeight] = child.dimensions;

                // Mark background as dirty if child's dimensions changed
                if(childWidth !== oldChildWidth || childHeight !== oldChildHeight)
                    this.backgroundDirty = true;

                const childLength = this.vertical ? oldChildHeight
                                                  : oldChildWidth;
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
        // Align children
        const alignment = this.multiContainerAlignment;
        const around = alignment.main === FlexAlignment.SpaceAround;
        const between = alignment.main === FlexAlignment.SpaceBetween || around;
        // TODO remove as number once typescript 4.4 releases
        const mainRatio = (between ? 0 : alignment.main as number);
        const crossRatio = (alignment.cross === Alignment.Stretch ? 0 : alignment.cross);
        const effectiveChildren = this.enabledChildCount - 1 + (around ? 2 : 0);
        let extraSpacing;
        if(effectiveChildren <= 0)
            extraSpacing = 0;
        else
            extraSpacing = this.unusedSpace / effectiveChildren;

        let spacing = this.multiContainerSpacing;
        if(between)
            spacing += extraSpacing;

        let mainOffset = (this.vertical ? this.y : this.x) + mainRatio * this.unusedSpace;
        if(around)
            mainOffset += extraSpacing;

        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            const [oldChildX, oldChildY] = child.position;
            const [childWidth, childHeight] = child.dimensions;

            if(this.vertical) {
                child.resolvePosition(this.x + crossRatio * (this.width - childWidth), mainOffset);
                mainOffset += childHeight + spacing;
            }
            else {
                child.resolvePosition(mainOffset, this.y + crossRatio * (this.height - childHeight));
                mainOffset += childWidth + spacing;
            }

            const [childX, childY] = child.position;

            // Mark background as dirty if child's position changed
            if(childX !== oldChildX || childY !== oldChildY)
                this.backgroundDirty = true;
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
