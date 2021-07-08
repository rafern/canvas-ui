import type { LayoutContext } from '../core/LayoutContext';
import { SingleParent } from '../mixins/SingleParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A {@link SingleParent} which contains a single child and does nothing,
 * passing all events through to its child. Useful for widgets that are only
 * used for logic, like {@link ThemeScope}.
 *
 * Since this does nothing on its own, it should not be used on its own.
 * Instead, extend this class if you are looking for a way to do wrapper widgets
 * that provide extra logic.
 *
 * @category Widget
 */
export class PassthroughWidget extends SingleParent {
    /** Create a new PassthroughWidget. */
    constructor(child: Widget, themeOverride: Theme | null = null) {
        // Passthrough widgets dont need a clear background, have a child and
        // propagate events
        super(child, themeOverride, false, true);
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
        // Populate child's layout
        this.child.populateLayout(layoutCtx);
    }

    protected override handleResolveLayout(layoutCtx: LayoutContext): void {
        // Resolve child's layout and set own resolved dimensions to be equal to
        // the child's
        const child = this.child;
        child.resolveLayout(layoutCtx);
        [this.resolvedWidth, this.resolvedHeight] = child.dimensions;
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Paint child
        this.child.paint(x, y, width, height, ctx);
    }
}