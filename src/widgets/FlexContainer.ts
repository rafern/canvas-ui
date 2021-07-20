import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
import { SingleParent } from '../mixins/SingleParent';
import { LayoutContext } from '../core/LayoutContext';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A {@link SingleParent} which contains a single child and automatically paints
 * the child, propagates events (if enabled) and handles layout. Like
 * {@link BaseContainer}, but with a {@link FlexLayout | flexbox layout} and no
 * padding or alignment; child is always stretched. If you want padding and/or
 * alignemnt, use a {@link Container} inside this widget. If children of this
 * container have flex-box layout, maxWidth and maxHeight is set to this
 * container's resolved dimensions.
 *
 * @category Widget
 */
export class FlexContainer extends Mixin(FlexLayout, SingleParent) {
    /** Last layout context used for child */
    protected _lastLayoutCtx: LayoutContext | null = null;

    /** Create a new FlexContainer. */
    constructor(child: Widget, propagateEvents: boolean, flexRatio = 1, mainBasis = 0, crossBasis = 0, vertical: boolean | null = null, themeOverride: Theme | null = null) {
        // Containers don't need to clear their background (the child does),
        // have a child and may propagate events
        super(child, themeOverride, false, propagateEvents);

        this.flexRatio = flexRatio;
        this.mainBasis = mainBasis;
        this.crossBasis = crossBasis;
        this.vertical = vertical;
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): Widget | null {
        // Dispatch event to child
        return this.child.dispatchEvent(event, width, height, root);
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
    }

    protected override handlePopulateLayout(layoutCtx: LayoutContext): void {
        // Setup temporary context with no basis or flex ratios. This clean
        // context will be used for getting child's basis and for resolving the
        // child's layout. For now, maxWidth and maxHeight are 0 since they are
        // unknown, but this shouldn't create any issues as these should only be
        // used when resolving layout, not when populating
        const vertical = this.vertical ?? layoutCtx.vertical
        this._lastLayoutCtx = new LayoutContext(0, 0, vertical);

        // Populate temporary context with what child wants
        this.child.populateLayout(this._lastLayoutCtx);

        // Add child's basis to internal main/cross basis
        if(vertical) {
            this.internalMainBasis = this._lastLayoutCtx.vBasis;
            this.internalCrossBasis = this._lastLayoutCtx.hBasis;
        }
        else {
            this.internalMainBasis = this._lastLayoutCtx.hBasis;
            this.internalCrossBasis = this._lastLayoutCtx.vBasis;
        }

        // Populate flex layout
        super.handlePopulateLayout(layoutCtx);
    }

    protected override handleResolveLayout(layoutCtx: LayoutContext): void {
        // Resolve flex layout
        super.handleResolveLayout(layoutCtx);

        // Update maxWidth or maxHeight of temporary layout context
        if(this._lastLayoutCtx === null)
            throw new Error('Unexpected null _lastLayoutCtx in FlexContainer.handleResolveLayout');

        this._lastLayoutCtx.maxWidth = this.resolvedWidth;
        this._lastLayoutCtx.maxHeight = this.resolvedHeight;

        // Resolve layout of child with temporary context
        this.child.resolveLayout(this._lastLayoutCtx);

        // Set outer context's sizeChanged flag if needed
        if(this._lastLayoutCtx.sizeChanged)
            layoutCtx.sizeChanged = true;
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Paint child
        this.child.paint(x, y, width, height, ctx);
    }
}
