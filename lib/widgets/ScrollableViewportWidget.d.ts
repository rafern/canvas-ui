import { ViewportWidget, ViewportWidgetProperties } from './ViewportWidget';
import { AxisCoupling } from '../widgets/AxisCoupling';
import type { Event } from '../events/Event';
import type { Widget } from './Widget';
/**
 * The mode for how a scrollbar is shown in a {@link ScrollableViewportWidget}.
 *
 * @category Widget
 */
export declare enum ScrollbarMode {
    /** The scrollbar is an overlay and therefore only shown when needed */
    Overlay = 0,
    /** The scrollbar is part of the layout and therefore always shown */
    Layout = 1,
    /** The scrollbar is hidden, but the content can still be scrolled */
    Hidden = 2
}
/**
 * Optional ScrollableViewportWidget constructor properties.
 *
 * @category Widget
 */
export interface ScrollableViewportWidgetProperties extends ViewportWidgetProperties {
    /** Sets {@link ScrollableViewportWidget#scrollbarMode}. */
    scrollbarMode?: ScrollbarMode;
}
/**
 * A wrapper for a {@link ViewportWidget} with scrollbars.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export declare class ScrollableViewportWidget<W extends Widget = Widget> extends ViewportWidget<W> {
    /**
     * See {@link ScrollableViewportWidget#scrollbarMode}. For internal use only
     */
    private _scrollbarMode;
    /**
     * The effective viewport width (ideal width not occupied by a non-overlay
     * scrollbar), for scrollbar calculations. For internal use only.
     */
    private effectiveWidth;
    /**
     * The effective viewport height (ideal height not occupied by a non-overlay
     * scrollbar), for scrollbar calculations. For internal use only.
     */
    private effectiveHeight;
    /**
     * ClickHelper used for checking if the horizontal scrollbar has been
     * dragged
     */
    private horizontalClickHelper;
    /**
     * ClickHelper used for checking if the vertical scrollbar has been dragged
     */
    private verticalClickHelper;
    /** Is the vertical scrollbar being dragged? If null, none is */
    private verticalDragged;
    /** What was the starting scroll value before dragging? */
    private startingScroll;
    /** What was the normalised offset when starting drag? */
    private startingOffset;
    /** When was the last scroll attempt in milliseconds since Unix epoch? */
    private lastScroll;
    /** Was the horizontal scrollbar painted last frame? */
    private horizWasPainted;
    /** Was the vertical scrollbar painted last frame? */
    private vertWasPainted;
    /** The line height used for scrolling via wheel events. */
    private _scrollLineHeight;
    /**
     * Create a new ScrollableViewportWidget.
     *
     * If an axis is bi-coupled, that axis will not have a scrollbar.
     */
    constructor(child: W, properties?: Readonly<ScrollableViewportWidgetProperties>);
    /** The mode for how the scrollbar is shown. */
    get scrollbarMode(): ScrollbarMode;
    set scrollbarMode(scrollbarMode: ScrollbarMode);
    /**
     * Offset of {@link SingleParent#child}. Positional events will take this
     * into account, as well as rendering. Unlike {@link ViewportWidget#offset},
     * this will clamp to possible scroll values to avoid issues.
     */
    get offset(): [number, number];
    set offset(offset: [number, number]);
    get widthCoupling(): AxisCoupling;
    set widthCoupling(widthCoupling: AxisCoupling);
    get heightCoupling(): AxisCoupling;
    set heightCoupling(heightCoupling: AxisCoupling);
    /**
     * The current scroll values. Similar to
     * {@link ScrollableViewportWidget#offset}, but with normalised values (from
     * 0 to 1).
     */
    get scroll(): [number, number];
    set scroll(scroll: [number, number]);
    /** Get the ClickHelper of a scrollbar */
    private getClickHelper;
    /**
     * Handle a pointer/leave event for a given scrollbar.
     *
     * @returns Returns true if the event was captured
     */
    private handleEventScrollbar;
    /** Clamp offset in-place to valid scroll values. For internal use only. */
    private clampOffset;
    /**
     * Handle a wheel scroll event. If scrolling fails due to being at the
     * limit, this returns true if the last scroll attempt happened less than
     * 200 milliseconds ago. This behaviour is disabled if
     * {@link PointerWheel#fromDrag} is true.
     *
     * @returns Returns true if this changed scroll was successful
     */
    private handleWheelEvent;
    protected updateScrollLineHeight(): void;
    protected onThemeUpdated(property?: string | null): void;
    protected handleEvent(event: Event): Widget | null;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePostLayoutUpdate(): void;
    protected handlePainting(forced: boolean): void;
    /**
     * Get the rectangles (filled and background) of a scrollbar
     *
     * @returns Returns a 2-tuple with 2 4-tuples. The first one is the scrollbar fill rectangle and the second one is the background fill rectangle. Each rectangle 4-tuple contains, respectively, horizontal offset, vertical offset, width and height
     */
    private getScrollbarRects;
    /** Check if a scrollbar needs to be painted */
    private scrollbarNeedsPaint;
    /** Paint a scrollbar. For internal use only */
    private paintScrollbar;
}
