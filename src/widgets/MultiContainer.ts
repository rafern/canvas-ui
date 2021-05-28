import { MultiParentWidget } from '../widgets/MultiParentWidget';
import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { LayoutContext } from './LayoutContext';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
export class MultiContainer extends MultiParentWidget {
    // Is the container's whole background dirty (including spacing)?
    #backgroundDirty = true;
    // Is this container vertical?
    #vertical: boolean;
    // Temporary layout context for layout resolution
    #innerContext: LayoutContext | null = null;

    // A widget that contains multiple child widgets and grows along a specified
    // axis
    constructor(vertical: boolean, themeOverride: Theme | null = null) {
        // MultiContainers clear their own background, have children and
        // propagate events
        super(themeOverride, false, true, []);

        this.#vertical = vertical;
    }

    handleEvent(event: Event, width: number, height: number, root: Root): Widget | null { // XXX protected
        // Find which widget the event should go to
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            const length = this.#vertical ? child.resolvedHeight : child.resolvedWidth;

            // Dispatch to this widget
            let childWidth, childHeight;
            if(this.#vertical) {
                childWidth = width;
                childHeight = length;
            }
            else {
                childWidth = length;
                childHeight = height;
            }

            // Stop if event was captured
            const captured = child.dispatchEvent(event, childWidth, childHeight, root);
            if(captured !== null)
                return captured;

            // Correct event position and offset for next widget if event has
            // position
            if(event instanceof PointerEvent) {
                if(this.#vertical)
                    event = event.correctOffset(0, length + spacing);
                else
                    event = event.correctOffset(length + spacing, 0);
            }
        }

        // Event wasn't dispatched to any child
        return null;
    }

    handlePreLayoutUpdate(root: Root): void {
        // Pre-layout update children
        let forceLayout = false;
        for(const child of this.children) {
            child.preLayoutUpdate(root);

            // If child's layout is dirty, layout must be forced as dirty, as
            // sibling might need to be resized due to flex ratios
            if(child.layoutDirty)
                forceLayout = true;
        }

        if(forceLayout)
            this.forceLayoutDirty();
    }

    handlePostLayoutUpdate(root: Root): void {
        // Post-layout update children
        for(const child of this.children) {
            child.postLayoutUpdate(root);

            // If child is dirty, set own dirty flag
            if(child.dirty)
                this.dirty = true;
        }
    }

    forceLayoutDirty(): void {
        this.#backgroundDirty = true;
        super.forceLayoutDirty();
    }

    handlePopulateLayout(layoutCtx: LayoutContext): void {
        // Setup context. Use inner context if verticality is different
        const usingInlineContext = (this.#vertical === layoutCtx.vertical);
        let usedContext;
        if(usingInlineContext)
            usedContext = layoutCtx;
        else {
            this.#innerContext = new LayoutContext(layoutCtx.maxWidth, layoutCtx.maxHeight, this.#vertical);
            usedContext = this.#innerContext;
        }

        // Populate layout with what children want
        for(const child of this.children)
            child.populateLayout(usedContext);

        // Add spacing to main basis
        const childrenCount = this.children.length;
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        if(childrenCount > 1 && spacing > 0) {
            const totalSpacing = spacing * (childrenCount - 1);
            if(usedContext.vertical)
                usedContext.vBasis += totalSpacing;
            else
                usedContext.hBasis += totalSpacing;
        }

        // Add container box to outer context's basis
        if(!usingInlineContext)
            layoutCtx.addBasis(usedContext.hBasis, usedContext.vBasis);

        // Expand maxWidth and maxHeight if needed
        if(usedContext.hBasis > layoutCtx.maxWidth)
            layoutCtx.maxWidth = usedContext.hBasis;
        if(usedContext.vBasis > layoutCtx.maxHeight)
            layoutCtx.maxHeight = usedContext.vBasis;
    }

    handleResolveLayout(layoutCtx: LayoutContext): void {
        // Update inner context's maximum dimensions. It's the outer maximum
        // dimensions
        const usingInlineContext = (this.#vertical === layoutCtx.vertical);
        let usedContext;
        if(usingInlineContext)
            usedContext = layoutCtx;
        else {
            usedContext = this.#innerContext;
            if(usedContext === null)
                throw 'Unexpected null innerContext';

            if(layoutCtx.maxWidth > usedContext.maxWidth)
                usedContext.maxWidth = layoutCtx.maxWidth;
            if(layoutCtx.maxHeight > usedContext.maxHeight)
                usedContext.maxHeight = layoutCtx.maxHeight;
        }

        // Resolve children and calculate biggest dimensions and cumulative
        // dimensions
        let widthMax = 0, heightMax = 0, widthSum = 0, heightSum = 0, count = 0;
        for(const child of this.children) {
            // Ignore disabled children, but count and resolve enabled
            if(!child.enabled) {
                // Just so that disabled child gets their layout marked as clean
                child.resolveLayout(usedContext);
                continue;
            }

            count++;

            // Resolve child
            const oldWidth = child.resolvedWidth;
            const oldHeight = child.resolvedHeight;

            child.resolveLayout(usedContext);

            const newWidth = child.resolvedWidth;
            const newHeight = child.resolvedHeight;

            if(isNaN(newWidth) || isNaN(newHeight) || newWidth < 0 || newHeight < 0) {
                console.error('Child resolved to invalid dimensions:', newWidth, newHeight, child);
                throw new Error('Child resolved to invalid dimensions');
            }

            // Check if child's size changed. Ignore cross-axis length, this
            // check is done with the container's cross-length itself
            if(this.#vertical) {
                if(newHeight !== oldHeight)
                    usedContext.sizeChanged = true;
            }
            else if(newWidth !== oldWidth)
                usedContext.sizeChanged = true;

            // Find max and sum of widths and heights
            widthSum += newWidth;
            if(newWidth > widthMax)
                widthMax = newWidth;

            heightSum += newHeight;
            if(newHeight > heightMax)
                heightMax = newHeight;
        }

        // Set outer context's sizeChanged flag if inner context's flag was set
        if(!usingInlineContext && usedContext.sizeChanged)
            layoutCtx.sizeChanged = true;

        // Clear inner context
        this.#innerContext = null;

        // Dimensions are bounding box of combined resolved children plus
        // spacing
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        let totalSpacing = 0;
        if(count > 1 && spacing > 0)
            totalSpacing = spacing * (count - 1);

        // Container's resolved dimensions are the biggest child's cross length
        // and cumulative length with padding
        if(this.#vertical) {
            this.resolvedWidth = widthMax;
            this.resolvedHeight = heightSum + totalSpacing;
        }
        else {
            this.resolvedWidth = widthSum + totalSpacing;
            this.resolvedHeight = heightMax;
        }
    }

    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
        // Clear background if never cleared before and there is spacing
        const spacing = this.theme.getSize(ThemeProperty.ContainerSpacing);
        if(this.#backgroundDirty && spacing > 0)
            this.clear(x, y, width, height, ctx);

        this.#backgroundDirty = false;

        // Calculate helper variables
        const mainAxisMax = this.#vertical ? (y + height) : (x + width);

        // Paint children
        for(const child of this.children) {
            // Ignore disabled children
            if(!child.enabled)
                continue;

            // Figure out child width and height and clamp if needed
            let childW, childH;
            let tooBig = false;

            if(this.#vertical) {
                childW = width;
                childH = child.resolvedHeight;

                if(y + childH > mainAxisMax) {
                    tooBig = true;
                    childH = mainAxisMax - y;
                }
            }
            else {
                childW = child.resolvedWidth;
                childH = height;

                if(x + childW > mainAxisMax) {
                    tooBig = true;
                    childW = mainAxisMax - x;
                }
            }

            // Paint child
            child.paint(x, y, childW, childH, ctx);

            // Stop paiting if this child couldn't fit fully in the container
            if(tooBig)
                console.warn('MultiContainer overflow, children may be painted with 0 length');

            // Increment position in growth direction, with spacing
            if(this.#vertical)
                y += childH + spacing;
            else
                x += childW + spacing;
        }
    }
}
