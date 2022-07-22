import type { ThemeProperties } from '../theme/ThemeProperties';
import { FlexAlignment } from '../theme/FlexAlignment';
import { Alignment } from '../theme/Alignment';
import type { Event } from '../events/Event';
import { MultiParent } from './MultiParent';
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

    protected override handleEvent(event: Event): Widget | null {
        // Reverse children if necessary
        let children = this.children;
        if(event.reversed)
            children = Array.from(children).reverse();

        // Find which widget the event should go to
        for(const child of children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            // Stop if event was captured
            const captured = child.dispatchEvent(event);
            if(captured !== null)
                return captured;
        }

        // Event wasn't dispatched to any child
        return null;
    }

    protected override handlePreLayoutUpdate(): void {
        // Pre-layout update children
        for(const child of this.children) {
            child.preLayoutUpdate();

            // If child's layout is dirty, set own layoutDirty flag
            if(child.layoutDirty)
                this._layoutDirty = true;
        }
    }

    protected override handlePostFinalizeBounds(): void {
        // Post-finalize bounds update children
        for(const child of this.children)
            child.postFinalizeBounds();
    }

    protected override handlePostLayoutUpdate(): void {
        // Post-layout update children
        for(const child of this.children) {
            child.postLayoutUpdate();

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

        this.enabledChildCount = 0;
        for(const child of this.children) {
            // Resolve dimensions of disabled children with zero-width
            // constraints just so layout dirty flag is cleared
            if(!child.enabled) {
                child.resolveDimensions(0, 0, 0, 0);
                continue;
            }

            this.enabledChildCount++;
            if(this.vertical)
                child.resolveDimensions(minCrossAxis, maxWidth, 0, Infinity);
            else
                child.resolveDimensions(0, Infinity, minCrossAxis, maxHeight);

            const [childWidth, childHeight] = child.idealDimensions;

            totalFlex += child.flex;
            crossLength = Math.max(this.vertical ? childWidth : childHeight, crossLength);
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

            usedSpace += this.vertical ? child.idealDimensions[1] : child.idealDimensions[0];
        }

        const freeSpace = maxLength - usedSpace;

        // Don't do flexbox calculations if free space is infinite
        // (unconstrained main axis) or if there isn't any free space.
        if(freeSpace == Infinity || freeSpace <= 0) {
            if(this.vertical) {
                this.idealWidth = crossLength;
                this.idealHeight = Math.min(usedSpace, maxHeight);
            }
            else {
                this.idealWidth = Math.min(usedSpace, maxWidth);
                this.idealHeight = crossLength;
            }

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

                const [oldChildWidth, oldChildHeight] = child.idealDimensions;

                if(this.vertical) {
                    const wantedLength = Math.min(spaceLeft, oldChildHeight);
                    child.resolveDimensions(minCrossAxis, maxWidth, wantedLength, wantedLength);
                }
                else {
                    const wantedLength = Math.min(spaceLeft, oldChildWidth);
                    child.resolveDimensions(wantedLength, wantedLength, minCrossAxis, maxHeight);
                }

                const childLength = this.vertical ? oldChildHeight
                                                  : oldChildWidth;
                spaceLeft = Math.max(0, spaceLeft - childLength - spacing);
            }

            return;
        }

        // Resolve children's layout with constraints restricted to distributed
        // free space. Calculate used space after flexbox calculations.
        let usedSpaceAfter = 0;
        let freeSpacePerFlex = 0;
        if(totalFlex > 0)
            freeSpacePerFlex = freeSpace / totalFlex;

        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            // Add spacing to used space if this is not the first widget
            if(usedSpaceAfter !== 0)
                usedSpaceAfter += spacing;

            const dedicatedSpace = freeSpacePerFlex * child.flex;
            const [oldChildWidth, oldChildHeight] = child.idealDimensions;
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

            const [childWidth, childHeight] = child.idealDimensions;
            usedSpaceAfter += this.vertical ? childHeight : childWidth;
        }

        // Resolve width and height
        let length;
        if(this.vertical) {
            length = maxHeight;
            this.idealWidth = crossLength;
            this.idealHeight = length;
        }
        else {
            length = maxWidth;
            this.idealWidth = length;
            this.idealHeight = crossLength;
        }

        // Calculate final unused space; used for alignment. Clamp to zero just
        // in case XXX is that neccessary?
        this.unusedSpace = Math.max(length - usedSpaceAfter, 0);
    }

    protected override afterPositionResolved(): void {
        // Align children
        const alignment = this.multiContainerAlignment;
        const around = alignment.main === FlexAlignment.SpaceAround;
        const between = alignment.main === FlexAlignment.SpaceBetween || around;
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

        let mainOffset = (this.vertical ? this.idealY : this.idealX) + mainRatio * this.unusedSpace;
        if(around)
            mainOffset += extraSpacing;

        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            const [childWidth, childHeight] = child.idealDimensions;
            if(this.vertical) {
                child.resolvePosition(this.idealX + crossRatio * (this.idealWidth - childWidth), mainOffset);
                mainOffset += childHeight + spacing;
            }
            else {
                child.resolvePosition(mainOffset, this.idealY + crossRatio * (this.idealHeight - childHeight));
                mainOffset += childWidth + spacing;
            }
        }
    }

    override finalizeBounds() {
        const oldChildPos: [x: number, y: number][] = [];
        const oldChildDims: [width: number, height: number][] = [];
        for(const child of this.children) {
            if(!child.enabled)
                continue;

            const [x, y] = child.position;
            oldChildPos.push([x, y]);
            const [width, height] = child.dimensions;
            oldChildDims.push([width, height]);
        }

        const [ownOldWidth, ownOldHeight] = this.dimensions;

        super.finalizeBounds();

        // check if own dimensions changed. if so, mark background as dirty
        if(ownOldWidth !== this.width || ownOldHeight !== this.height) {
            this.backgroundDirty = true;
            return;
        }

        // check if child positions or dimensions changed. if so, mark
        // background as dirty
        let i = 0;
        for(const child of this.children) {
            if(!child.enabled)
                continue;

            const [oldX, oldY] = oldChildPos[i];
            const [x, y] = child.position;
            if(x !== oldX || y !== oldY) {
                this.backgroundDirty = true;
                return;
            }

            const [oldWidth, oldHeight] = oldChildDims[i];
            const [width, height] = child.dimensions;
            if(width !== oldWidth || height !== oldHeight) {
                this.backgroundDirty = true;
                return;
            }

            i++;
        }
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D, forced: boolean): void {
        // Paint children and build clipping region if background is dirty
        const clipRects: [number, number, number, number][] = [];
        for(const child of this.children) {
            // Paint child
            child.paint(ctx, forced);

            // Add to clipping region if needed. Don't add disabled children to
            // clipping region
            if(child.enabled && (this.backgroundDirty || forced))
                clipRects.push(child.rect);
        }

        // Clear background if needed
        if(this.backgroundDirty || forced) {
            this.clearStart(ctx);
            ctx.rect(...this.rect);
            for(const clipRect of clipRects)
                ctx.rect(...clipRect);
            this.clearEnd(ctx, 'evenodd');
        }

        this.backgroundDirty = false;
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
