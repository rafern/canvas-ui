import type { LayoutContext } from '../core/LayoutContext';
import { Widget } from '../widgets/Widget';
/**
 * A mixin class which provides simple box layout resolution.
 *
 * @category Mixin
 */
export declare class BoxLayout extends Widget {
    /** The wanted box width */
    private _boxWidth;
    /** The wanted box height */
    private _boxHeight;
    /**
     * The wanted box width. Set this every frame on
     * {@link Widget.handlePreLayoutUpdate} or when handling events in
     * {@link Widget.handleEvent}. Updates {@link _boxWidth} and sets
     * {@link _layoutDirty} to true when changed.
     */
    get boxWidth(): number;
    set boxWidth(boxWidth: number);
    /**
     * The wanted box height. Set this every frame on
     * {@link Widget.handlePreLayoutUpdate} or when handling events in
     * {@link Widget.handleEvent}. Updates {@link _boxHeight} and sets
     * {@link _layoutDirty} to true when changed.
     */
    get boxHeight(): number;
    set boxHeight(boxHeight: number);
    /**
     * Handles layout population by adding {@link boxWidth} and
     * {@link boxHeight} to the {@link LayoutContext}'s basis
     */
    protected handlePopulateLayout(layoutCtx: LayoutContext): void;
    /**
     * Handles layout resolution by setting {@link resolvedWidth} to
     * {@link boxWidth} and {@link resolvedHeight} to {@link boxHeight}
     */
    protected handleResolveLayout(_layoutCtx: LayoutContext): void;
}
