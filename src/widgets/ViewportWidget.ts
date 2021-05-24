import { SingleParent } from '../interfaces/SingleParent';
import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { Viewport } from '../core/Viewport';
import { FlexWidget } from './FlexWidget';
import { Parent } from '../mixins/Parent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { LayoutContext } from './LayoutContext';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
export class ViewportWidget extends Parent(FlexWidget) implements SingleParent {
    // Is the ViewportWidget's basis tied to the child's?
    mainBasisTied: boolean;
    crossBasisTied: boolean;
    // The actual viewport object
    viewport: Viewport; // XXX private
    // Offset of child. Positional events will take this into account, as well
    // as rendering. Useful for implementing scrolling.
    _offset: [number, number] = [0, 0]; // XXX private
    // Layout context used by child. Can be null if no layout update required
    lastChildLayoutCtx: LayoutContext | null = null; // XXX private
    // What were the last dimensions of the viewport widget? Useful for
    // scrolling
    lastViewportDims: [number, number] = [0, 0];

    // A widget which has a single child bigger than itself. To achieve this,
    // the child is rendered in a dedicated canvas.
    constructor(child: Widget, mainBasisTied = false, crossBasisTied = false, themeOverride: Theme | null = null) {
        // Viewport clears its own background, has a single child and propagates
        // events
        super(themeOverride, false, true);

        this.viewport = new Viewport();
        this.mainBasisTied = mainBasisTied;
        this.crossBasisTied = crossBasisTied;
        this.children.push(child);
    }

    get canvasDimensions(): [number, number] {
        return this.viewport.canvasDimensions;
    }

    get offset(): [number, number] {
        return [...this._offset];
    }

    set offset(offset: [number, number]) {
        if(this._offset[0] !== offset[0] || this._offset[1] !== offset[1]) {
            this._offset = offset;
            this.dirty = true;
        }
    }

    get maxDimensions(): [number, number] {
        return [...this.viewport.maxDimensions];
    }

    set maxDimensions(maxDimensions: [number, number]) {
        const [mw, mh] = this.maxDimensions;
        if(mw !== maxDimensions[0] || mh !== maxDimensions[1])
            this.viewport.maxDimensions = maxDimensions;
    }

    get dimensions(): [number, number] {
        // Get child's width and height, cropping to maximum dimensions
        const [maxWidth, maxHeight] = this.viewport.maxDimensions;

        const child = this.getChild();
        let width = child.resolvedWidth;
        if(maxWidth > 0 && width > maxWidth)
            width = maxWidth;
        let height = child.resolvedHeight;
        if(maxHeight > 0 && height > maxHeight)
            height = maxHeight;

        return [width, height];
    }

    getChildMainBasis(vertical: boolean) { // XXX private
        if(this.lastChildLayoutCtx === null)
            return 0;

        const innerLength = vertical ? this.lastChildLayoutCtx.vBasis
                                     : this.lastChildLayoutCtx.hBasis;
        if(isNaN(innerLength))
            return 0;
        return innerLength;
    }

    getChildCrossBasis(vertical: boolean) { // XXX private
        return this.getChildMainBasis(!vertical);
    }

    getMaxMainBasis(vertical: boolean) { // XXX private
        return vertical ? this.viewport.maxDimensions[1]
                        : this.viewport.maxDimensions[0];
    }

    getMaxCrossBasis(vertical: boolean) { // XXX private
        return this.getMaxMainBasis(!vertical);
    }

    handleEvent(event: Event, _width: number, _height: number, root: Root): Widget | null { // XXX protected
        // Ignore events with no position and no target
        if(event.target === null && !(event instanceof PointerEvent))
            return null;

        // Drop event if it is a positional event with no target outside the
        // child's viewport
        const [innerWidth, innerHeight] = this.dimensions;
        const vpl = this.offset[0];
        const vpr = vpl + innerWidth;
        const vpt = this.offset[1];
        const vpb = vpt + innerHeight;
        if(event instanceof PointerEvent) {
            if(event.target === null) {
                if(event.x < vpl)
                    return null;
                if(event.x >= vpr)
                    return null;
                if(event.y < vpt)
                    return null;
                if(event.y >= vpb)
                    return null;
            }

            event = event.correctOffset(vpl, vpt);
        }

        // Dispatch event to child
        return this.getChild().dispatchEvent(event, vpr - vpl, vpb - vpt, root);
    }

    handlePreLayoutUpdate(root: Root): void {
        // If verticality was changed, update it and set dirty. Assume that null
        // verticality means that it's vertical as Viewports don't inherit
        // verticality
        let currentVerticality = this.vertical;
        if(currentVerticality === null)
            currentVerticality = true;

        const child = this.getChild();
        if(currentVerticality !== this.viewport.vertical) {
            this.viewport.vertical = currentVerticality;
            child.layoutDirty = true;
            child.dirty = true;
        }

        // If child's layout is dirty set self's layout as dirty
        if(child.layoutDirty)
            this.layoutDirty = true;
        else {
            // Although the internal basis won't change, they still need to be
            // set to update the effective basis
            if(this.mainBasisTied)
                this.internalMainBasis = this.internalMainBasis;
            if(this.crossBasisTied)
                this.internalCrossBasis = this.internalCrossBasis;

            return;
        }

        // Pre-layout update child
        child.preLayoutUpdate(root);

        // Populate child's layout context
        this.lastChildLayoutCtx = this.viewport.populateChildsLayout(child);

        // If a basis is tied, update internal basis to be equal to child's
        // basis
        if(this.mainBasisTied)
            this.internalMainBasis = this.getChildMainBasis(currentVerticality);
        else
            this.internalMainBasis = 0;

        if(this.crossBasisTied)
            this.internalCrossBasis = this.getChildCrossBasis(currentVerticality);
        else
            this.internalCrossBasis = 0;
    }

    handlePostLayoutUpdate(root: Root): void {
        const child = this.getChild();

        if(this.lastChildLayoutCtx !== null) {
            // Update max dimensions if basis is tied
            const newMaxDimensions = this.maxDimensions;

            if((this.viewport.vertical && this.crossBasisTied) || (!this.viewport.vertical && this.mainBasisTied)) {
                newMaxDimensions[0] = this.resolvedWidth;
                this.lastChildLayoutCtx.maxWidth = this.resolvedWidth;
            }

            if((this.viewport.vertical && this.mainBasisTied) || (!this.viewport.vertical && this.crossBasisTied)) {
                newMaxDimensions[1] = this.resolvedHeight;
                this.lastChildLayoutCtx.maxHeight = this.resolvedHeight;
            }

            this.maxDimensions = newMaxDimensions;

            // Resolve child's layout
            this.viewport.resolveChildsLayout(child, this.lastChildLayoutCtx);

            // Clear layout context, no longer needed
            this.lastChildLayoutCtx = null;
        }

        // Post-layout update child
        child.postLayoutUpdate(root);

        // If child is dirty, set self as dirty
        if(child.dirty)
            this.dirty = true;
    }

    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
        this.lastViewportDims = [width, height];

        // Paint child to viewport's canvas
        this.viewport.paintToCanvas(this.getChild());

        // Save context
        ctx.save();

        // Clip to drawing area
        // These are rounded because clipping and filling doesn't work properly
        // with decimal points
        const drawAreaClip = new Path2D();
        drawAreaClip.rect(Math.trunc(x), Math.trunc(y), Math.ceil(width), Math.ceil(height));
        ctx.clip(drawAreaClip);

        // Clear background
        ctx.globalCompositeOperation = 'copy';
        ctx.fillStyle = this.theme.getFill(ThemeProperty.CanvasFill);
        ctx.fill(drawAreaClip);

        // Draw canvas with offset in passed context
        const [innerWidth, innerHeight] = this.dimensions;
        const [xOffset, yOffset] = this.offset;
        const xDst = x + xOffset;
        const yDst = y + yOffset;
        const offsetClip = new Path2D();
        offsetClip.rect(Math.trunc(xDst), Math.trunc(yDst), Math.ceil(innerWidth), Math.ceil(innerHeight));
        ctx.clip(offsetClip);
        ctx.drawImage(
            this.viewport.canvas,
            0,
            0,
            innerWidth,
            innerHeight,
            xDst,
            yDst,
            innerWidth,
            innerHeight,
        );

        // Restore context
        ctx.restore();
    }

    getChild(): Widget {
        return this.children[0];
    }
}