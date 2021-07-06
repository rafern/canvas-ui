import { SingleParentWidget } from '../widgets/SingleParentWidget';
import type { LayoutContext } from './LayoutContext';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
export class PassthroughWidget extends SingleParentWidget {
    // A widget that contains a single child and acts as if it doesn't exist,
    // passing all events through to its child. Useful for Widgets that are only
    // used for logic
    constructor(child: Widget, themeOverride: Theme | null = null) {
        // Passthrough widgets dont need a clear background, have a child and
        // propagate events
        super(themeOverride, false, true, child);
    }

    override handleEvent(event: Event, width: number, height: number, root: Root): Widget | null { // XXX protected
        // Dispatch event to child
        return this.getChild().dispatchEvent(event, width, height, root);
    }

    override handlePreLayoutUpdate(root: Root): void {
        // Pre-layout update child
        const child = this.getChild();
        child.preLayoutUpdate(root);

        // If child's layout is dirty, set self's layout as dirty
        if(child.layoutDirty)
            this.layoutDirty = true;
    }

    override handlePostLayoutUpdate(root: Root): void {
        // Post-layout update child
        const child = this.getChild();
        child.postLayoutUpdate(root);

        // If child is dirty, set self as dirty
        if(child.dirty)
            this.dirty = true;
    }

    override handlePopulateLayout(layoutCtx: LayoutContext): void {
        // Populate child's layout
        this.getChild().populateLayout(layoutCtx);
    }

    override handleResolveLayout(layoutCtx: LayoutContext): void {
        // Resolve child's layout and set own resolved dimensions to be equal to
        // the child's
        const child = this.getChild();
        child.resolveLayout(layoutCtx);
        this.resolvedWidth = child.resolvedWidth;
        this.resolvedHeight = child.resolvedHeight;
    }

    override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
        // Paint child
        this.getChild().paint(x, y, width, height, ctx);
    }
}