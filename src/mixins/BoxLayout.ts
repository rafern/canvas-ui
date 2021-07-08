import type { LayoutContext } from '../core/LayoutContext';
import { Widget } from '../widgets/Widget';

/**
 * A mixin class which provides simple box layout resolution.
 *
 * @category Mixin
 */
export class BoxLayout extends Widget {
    /** The wanted box width */
    private _boxWidth = 0;
    /** The wanted box height */
    private _boxHeight = 0;

    /**
     * The wanted box width. Set this every frame on
     * {@link Widget.handlePreLayoutUpdate} or when handling events in
     * {@link Widget.handleEvent}. Updates {@link _boxWidth} and sets
     * {@link _layoutDirty} to true when changed.
     */
    get boxWidth(): number {
        return this._boxWidth;
    }

    set boxWidth(boxWidth: number) {
        if(this._boxWidth !== boxWidth) {
            this._boxWidth = boxWidth;
            this._layoutDirty = true;
        }
    }

    /**
     * The wanted box height. Set this every frame on
     * {@link Widget.handlePreLayoutUpdate} or when handling events in
     * {@link Widget.handleEvent}. Updates {@link _boxHeight} and sets
     * {@link _layoutDirty} to true when changed.
     */
    get boxHeight(): number {
        return this._boxHeight;
    }

    set boxHeight(boxHeight: number) {
        if(this._boxHeight !== boxHeight) {
            this._boxHeight = boxHeight;
            this._layoutDirty = true;
        }
    }

    /**
     * Handles layout population by adding {@link boxWidth} and
     * {@link boxHeight} to the {@link LayoutContext}'s basis
     */
    protected override handlePopulateLayout(layoutCtx: LayoutContext): void {
        layoutCtx.addBasis(this._boxWidth, this._boxHeight);
    }

    /**
     * Handles layout resolution by setting {@link resolvedWidth} to
     * {@link boxWidth} and {@link resolvedHeight} to {@link boxHeight}
     */
    protected override handleResolveLayout(_layoutCtx: LayoutContext): void {
        this.resolvedWidth = this._boxWidth;
        this.resolvedHeight = this._boxHeight;
    }
}