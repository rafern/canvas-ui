import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
import type { LayoutContext } from '../core/LayoutContext';
import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { SingleParent } from '../mixins/SingleParent';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import { Viewport } from '../core/Viewport';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';

export class ViewportWidget extends Mixin(SingleParent, FlexLayout) {
    // Is the ViewportWidget's basis tied to the child's?
    mainBasisTied: boolean;
    crossBasisTied: boolean;
    // The actual viewport object
    private viewport: Viewport;
    // Offset of child. Positional events will take this into account, as well
    // as rendering. Useful for implementing scrolling.
    private _offset: [number, number] = [0, 0];
    // Layout context used by child. Can be null if no layout update required
    private lastChildLayoutCtx: LayoutContext | null = null;
    // Max dimensions. Not the effective max dimensions; those are set every
    // frame and are the viewport's max dimensions
    maxDimensions: [number, number] = [0, 0];
    // What were the last dimensions of the viewport widget? Useful for
    // scrolling
    lastViewportDims: [number, number] = [0, 0];

    // A widget which has a single child bigger than itself. To achieve this,
    // the child is rendered in a dedicated canvas.
    constructor(child: Widget, mainBasisTied = false, crossBasisTied = false, themeOverride: Theme | null = null) {
        // Viewport clears its own background, has a single child and propagates
        // events
        super(child, themeOverride, false, true);

        this.viewport = new Viewport();
        this.mainBasisTied = mainBasisTied;
        this.crossBasisTied = crossBasisTied;
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
            this._dirty = true;
        }
    }

    private getChildMainBasis(vertical: boolean): number {
        if(this.lastChildLayoutCtx === null)
            return 0;

        const innerLength = vertical ? this.lastChildLayoutCtx.vBasis
                                     : this.lastChildLayoutCtx.hBasis;

        if(isNaN(innerLength))
            return 0;

        return innerLength;
    }

    private getChildCrossBasis(vertical: boolean): number {
        return this.getChildMainBasis(!vertical);
    }

    private getMaxMainBasis(vertical: boolean): number {
        return vertical ? this.maxDimensions[1]
                        : this.maxDimensions[0];
    }

    private getMaxCrossBasis(vertical: boolean): number {
        return this.getMaxMainBasis(!vertical);
    }

    protected override handleEvent(event: Event, _width: number, _height: number, root: Root): Widget | null {
        // Ignore events with no position and no target
        if(event.target === null && !(event instanceof PointerEvent))
            return null;

        // Drop event if it is a positional event with no target outside the
        // child's viewport
        const [innerWidth, innerHeight] = this.child.dimensions;
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
        return this.child.dispatchEvent(event, vpr - vpl, vpb - vpt, root);
    }

    protected override handlePreLayoutUpdate(root: Root): void {
        // If verticality was changed, update it and set dirty. Assume that null
        // verticality means that it's vertical as Viewports don't inherit
        // verticality
        let currentVerticality = this.vertical;
        if(currentVerticality === null)
            currentVerticality = true;

        const child = this.child;
        if(currentVerticality !== this.viewport.vertical) {
            this.viewport.vertical = currentVerticality;
            child.forceLayoutDirty();
        }

        // Pre-layout update child
        child.preLayoutUpdate(root);

        // If child's layout is dirty set self's layout as dirty
        if(child.layoutDirty)
            this._layoutDirty = true;
        else
            return;

        // Populate child's layout context
        this.lastChildLayoutCtx = this.viewport.populateChildsLayout(child);

        // If a basis is tied, update internal basis to be equal to child's
        // basis
        if(this.mainBasisTied) {
            let basis = this.getChildMainBasis(currentVerticality);
            const maxBasis = this.getMaxMainBasis(currentVerticality);

            if(maxBasis !== 0 && basis > maxBasis)
                basis = maxBasis;

            this.internalMainBasis = basis;
        }
        else
            this.internalMainBasis = 0;

        if(this.crossBasisTied) {
            let basis = this.getChildCrossBasis(currentVerticality);
            const maxBasis = this.getMaxCrossBasis(currentVerticality);

            if(maxBasis !== 0 && basis > maxBasis)
                basis = maxBasis;

            this.internalCrossBasis = basis;
        }
        else
            this.internalCrossBasis = 0;
    }

    protected override handlePostLayoutUpdate(root: Root): void {
        const child = this.child;

        if(this.lastChildLayoutCtx !== null) {
            // Update viewport's max dimensions taking into account whether a
            // basis is tied
            let [newMaxWidth, newMaxHeight] = [...this.maxDimensions];

            if(this.viewport.vertical ? this.crossBasisTied : this.mainBasisTied) {
                if(newMaxWidth === 0 || this.resolvedWidth < newMaxWidth)
                    newMaxWidth = this.resolvedWidth;
            }

            if(this.viewport.vertical ? this.mainBasisTied : this.crossBasisTied) {
                if(newMaxHeight === 0 || this.resolvedHeight < newMaxHeight)
                    newMaxHeight = this.resolvedHeight;
            }

            this.viewport.maxDimensions = [newMaxWidth, newMaxHeight];
            this.lastChildLayoutCtx.maxWidth = newMaxWidth;
            this.lastChildLayoutCtx.maxHeight = newMaxHeight;

            // Resolve child's layout
            this.viewport.resolveChildsLayout(child, this.lastChildLayoutCtx);

            // Clear layout context, no longer needed
            this.lastChildLayoutCtx = null;
        }

        // Post-layout update child
        child.postLayoutUpdate(root);

        // If child is dirty, set self as dirty
        if(child.dirty)
            this._dirty = true;
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        this.lastViewportDims = [width, height];

        // Paint child to viewport's canvas
        this.viewport.paintToCanvas(this.child);

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
        const [innerWidth, innerHeight] = this.child.dimensions;
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
}