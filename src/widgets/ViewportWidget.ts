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

export class ViewportWidget extends Parent(FlexWidget) implements SingleParent {
    // Is the ViewportWidget's basis tied to the child's?
    mainBasisTied: boolean;
    crossBasisTied: boolean;
    // The actual viewport object
    private viewport: Viewport;
    // Offset of child. Positional events will take this into account, as well
    // as rendering. Useful for implementing scrolling.
    private _offset: [number, number] = [0, 0];
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

    private getChildMainBasis(vertical: boolean) {
        const child = this.getChild();
        const innerLength = vertical ? child.resolvedHeight
                                     : child.resolvedWidth;
        if(isNaN(innerLength))
            return 0;
        return innerLength;
    }

    private getChildCrossBasis(vertical: boolean) {
        return this.getChildMainBasis(!vertical);
    }

    private getMaxMainBasis(vertical: boolean) {
        return vertical ? this.viewport.maxDimensions[1]
                        : this.viewport.maxDimensions[0];
    }

    private getMaxCrossBasis(vertical: boolean) {
        return this.getMaxMainBasis(!vertical);
    }

    protected handleEvent(event: Event, _width: number, _height: number, root: Root): Widget | null {
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

        // Pre-layout update child
        child.preLayoutUpdate(root);

        // If child's layout is dirty and an axis is tied, set self's layout as
        // dirty
        if(child.layoutDirty && (this.mainBasisTied || this.crossBasisTied))
            this.layoutDirty = true;

        // Resolve child's layout
        this.viewport.resolveChildsLayout(child);

        // Post-layout update child
        child.postLayoutUpdate(root);

        // If child is dirty, set self as dirty
        if(child.dirty)
            this.dirty = true;

        // If a basis is tied, update internal basis to be equal to child's
        // basis, taking maximum dimensions into account
        if(this.mainBasisTied) {
            this.internalMainBasis = this.getChildMainBasis(currentVerticality);

            const maxMainBasis = this.getMaxMainBasis(currentVerticality);
            if(maxMainBasis != 0)
                this.internalMainBasis = Math.min(this.internalMainBasis, maxMainBasis);
        }

        if(this.crossBasisTied) {
            this.internalCrossBasis = this.getChildCrossBasis(currentVerticality);

            const maxCrossBasis = this.getMaxCrossBasis(currentVerticality);
            if(maxCrossBasis != 0)
                this.internalCrossBasis = Math.min(this.internalCrossBasis, maxCrossBasis);
        }
    }

    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
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