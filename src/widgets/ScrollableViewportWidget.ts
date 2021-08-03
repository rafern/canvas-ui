import { ClickHelper, ClickState } from '../aggregates/ClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { PointerEvent } from '../events/PointerEvent';
import { PointerWheel } from '../events/PointerWheel';
import { ViewportWidget } from './ViewportWidget';
import type { Event } from '../events/Event';
import { Leave } from '../events/Leave';
import type { Widget } from './Widget';
import { Root } from '../core/Root';

/**
 * The mode for how a scrollbar is shown in a {@link ScrollableViewportWidget}.
 *
 * @category Widget
 */
export enum ScrollbarMode {
    /** The scrollbar is an overlay and therefore only shown when needed */
    Overlay,
    /** The scrollbar is part of the layout and therefore always shown */
    Layout,
}

/**
 * A wrapper for a {@link ViewportWidget} with scrollbars.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export class ScrollableViewportWidget<W extends Widget = Widget> extends ViewportWidget<W> {
    /** See {@link scrollbarMode}. For internal use only */
    private _scrollbarMode: ScrollbarMode;
    /**
     * The effective viewport width, for scrollbar calculations. For internal
     * use only.
     */
    private effectiveWidth = 0;
    /**
     * The effective viewport height, for scrollbar calculations. For internal
     * use only.
     */
    private effectiveHeight = 0;
    /**
     * ClickHelper used for checking if the horizontal scrollbar has been
     * dragged
     */
    private horizontalClickHelper: ClickHelper;
    /**
     * ClickHelper used for checking if the vertical scrollbar has been dragged
     */
    private verticalClickHelper: ClickHelper;
    /** Is the vertical scrollbar being dragged? If null, none is */
    private verticalDragged: boolean | null = null;
    /** What was the starting scroll value before dragging? */
    private startingScroll = 0;
    /** What was the normalised offset when starting drag? */
    private startingOffset = 0;
    /** When was the last scroll attempt in milliseconds since Unix epoch? */
    private lastScroll = 0;

    /**
     * Create a new ScrollableViewportWidget.
     *
     * If an axis is tied, that axis will not have a scrollbar.
     */
    constructor(child: W, minWidth = 0, minHeight = 0, widthTied = false, heightTied = false, scrollbarMode = ScrollbarMode.Overlay, themeProperties?: ThemeProperties) {
        super(child, minWidth, minHeight, widthTied, heightTied, themeProperties);

        this._scrollbarMode = scrollbarMode;
        this.horizontalClickHelper = new ClickHelper(this);
        this.verticalClickHelper = new ClickHelper(this);
    }

    /** The mode for how the scrollbar is shown. */
    get scrollbarMode(): ScrollbarMode {
        return this._scrollbarMode;
    }

    set scrollbarMode(scrollbarMode: ScrollbarMode) {
        if(this._scrollbarMode !== scrollbarMode) {
            const oldScroll = this.scroll;
            this._scrollbarMode = scrollbarMode;
            this.scroll = oldScroll;
            this._layoutDirty = true;
            this._dirty = true;
        }
    }

    /**
     * Offset of {@link child}. Positional events will take this into account,
     * as well as rendering. Unlike {@link ViewportWidget.offset}, this will
     * clamp to possible scroll values to avoid issues.
     */
    override get offset(): [number, number] {
        return super.offset;
    }

    override set offset(offset: [number, number]) {
        const [childWidth, childHeight] = this.child.dimensions;

        super.offset = [
            -Math.max(Math.min(-offset[0], childWidth - this.effectiveWidth), 0),
            -Math.max(Math.min(-offset[1], childHeight - this.effectiveHeight), 0),
        ];
    }

    /**
     * Is the width tied to the child's? If true, width constraints will be
     * overridden.
     */
    override get widthTied(): boolean {
        return super.widthTied;
    }

    override set widthTied(widthTied: boolean) {
        const oldScroll = this.scroll;
        super.widthTied = widthTied;
        this.scroll = oldScroll;
    }

    /**
     * Is the height tied to the child's? If true, height constraints will be
     * overridden.
     */
    override get heightTied(): boolean {
        return super.heightTied;
    }

    override set heightTied(heightTied: boolean) {
        const oldScroll = this.scroll;
        super.heightTied = heightTied;
        this.scroll = oldScroll;
    }

    /**
     * The current scroll values. Similar to {@link offset}, but with normalised
     * values (from 0 to 1).
     */
    get scroll(): [number, number] {
        const [offsetX, offsetY] = this.offset;
        const [childWidth, childHeight] = this.child.dimensions;
        const diffX = childWidth - this.effectiveWidth;
        const diffY = childHeight - this.effectiveHeight;
        return [
            diffX === 0 ? 0 : Math.min(Math.max(-offsetX / diffX, 0), 1),
            diffY === 0 ? 0 : Math.min(Math.max(-offsetY / diffY, 0), 1),
        ];
    }

    set scroll(scroll: [number, number]) {
        const [childWidth, childHeight] = this.child.dimensions;
        this.offset = [
            -scroll[0] * (childWidth - this.effectiveWidth),
            -scroll[1] * (childHeight - this.effectiveHeight),
        ];
    }

    /** Get the ClickHelper of a scrollbar */
    private getClickHelper(vertical: boolean): ClickHelper {
        if(vertical)
            return this.verticalClickHelper;
        else
            return this.horizontalClickHelper;
    }

    /** Handle a pointer/leave event for a given scrollbar */
    private handleEventScrollbar(vertical: boolean, corner: boolean, event: Event, root: Root): boolean {
        // Abort if the other scrollbar is being dragged
        if(this.verticalDragged !== null && this.verticalDragged !== vertical)
            return false;

        // Get click area of scrollbar. If in overlay mode, use the filled part
        // of the scrollbar as the click area since there is no background
        const [fillRect, bgRect] = this.getScrollbarRects(vertical, corner);
        const overlay = this._scrollbarMode === ScrollbarMode.Overlay;
        const clickRect = overlay ? fillRect : bgRect;
        const clickArea: [number, number, number, number] = [
            clickRect[0],
            clickRect[0] + clickRect[2],
            clickRect[1],
            clickRect[1] + clickRect[3],
        ];

        // Handle click event
        const clickHelper = this.getClickHelper(vertical);
        clickHelper.handleClickEvent(event, root, clickArea);

        const clickState = clickHelper.clickState;
        const stateChanged = clickHelper.clickStateChanged;
        if(stateChanged)
            this._dirty = true;

        if(clickState === ClickState.Hold) {
            // Abort if state is not valid, but grab the event
            if(clickHelper.pointerPos === null || !(event instanceof PointerEvent))
                return true;

            const axisIndex = vertical ? 1 : 0;
            const scroll = this.scroll;

            // Skip check if in overlay mode; can only scroll by dragging in
            // this mode
            let inFilledArea = overlay;
            if(!inFilledArea) {
                inFilledArea = clickHelper.isPointInRect(
                    event.x,
                    event.y,
                    fillRect[0],
                    fillRect[0] + fillRect[2],
                    fillRect[1],
                    fillRect[1] + fillRect[3],
                );
            }

            // Find offset along scrollbar. Necessary for overlay mode since
            // pointerPos is relative to the fillRect in that case, not bgRect
            let thisOffset;
            if(overlay) {
                thisOffset = clickHelper.getNormalInRect(
                    event.x,
                    event.y,
                    bgRect[0],
                    bgRect[0] + bgRect[2],
                    bgRect[1],
                    bgRect[1] + bgRect[3],
                )[axisIndex];
            }
            else
                thisOffset = clickHelper.pointerPos[axisIndex];

            if(stateChanged) {
                // If this was outside the filled area, snap scrollbar
                if(!inFilledArea) {
                    const viewportLength = vertical ? this.effectiveHeight : this.effectiveWidth;
                    const childLength = this.child.dimensions[axisIndex];
                    const barLength = viewportLength / childLength;
                    scroll[axisIndex] = (thisOffset - barLength / 2) / (1 - barLength);
                    this.scroll = scroll;
                }

                // Drag start, save current scroll and set this scrollbar as
                // being dragged
                this.startingOffset = thisOffset;
                this.startingScroll = scroll[axisIndex];
                this.verticalDragged = vertical;
            }
            else {
                // Drag continue, scroll
                const viewportLength = vertical ? this.effectiveHeight : this.effectiveWidth;
                const childLength = this.child.dimensions[axisIndex];
                const barLength = viewportLength / childLength;
                const dragDiff = thisOffset - this.startingOffset;
                scroll[axisIndex] = this.startingScroll + dragDiff / (1 - barLength);
                this.scroll = scroll;
            }

            return true;
        }
        else if(clickState === ClickState.Hover)
            return true;
        else if(stateChanged) {
            // Release this scrollbar
            this.verticalDragged = null;
            return true;
        }

        return false;
    }

    /** Clamp offset in-place to valid scroll values. For internal use only. */
    private clampOffset(offset: [number, number]): void {
        const [childWidth, childHeight] = this.child.dimensions;

        const minX = -(childWidth - this.effectiveWidth);
        if(minX >= 0)
            offset[0] = 0;
        else if(offset[0] < minX)
            offset[0] = minX;

        const minY = -(childHeight - this.effectiveHeight);
        if(minY >= 0)
            offset[1] = 0;
        else if(offset[1] < minY)
            offset[1] = minY;
    }

    /**
     * Handle a wheel scroll event. If scrolling fails due to being at the
     * limit, this returns true if the last scroll attempt happened less than
     * 200 milliseconds ago. This behaviour is disabled if
     * {@link PointerWheel.fromDrag} is true.
     *
     * @returns Returns true if this changed scroll was successful
     */
    private handleWheelEvent(event: PointerWheel): boolean {
        const offset = this.offset;
        const [oldX, oldY] = offset;
        offset[0] -= event.deltaX;
        offset[1] -= event.deltaY;
        this.clampOffset(offset);
        this.offset = offset;
        const [newX, newY] = this.offset;

        const success = newX !== oldX || newY !== oldY;
        const last = this.lastScroll;
        const now = (new Date()).getTime();
        this.lastScroll = now;

        if(success)
            return true;

        if(event.fromDrag)
            return false;

        const elapsed = now - last;
        return elapsed < 200;
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === 'scrollBarThickness')
        {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'backgroundFill' ||
                property === 'scrollBarMinPercent' ||
                property === 'scrollBarMinPixels' ||
                property === 'primaryFill' ||
                property === 'accentFill' ||
                property === 'backgroundGlowFill')
            this._dirty = true;
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        // Try to drag a scrollbar if this is a pointer or leave event with no
        // target or target on this
        if((event instanceof Leave || event instanceof PointerEvent) &&
           (event.target === null || event.target === this)) {
            const [childWidth, childHeight] = this.child.dimensions;
            const overlay = this._scrollbarMode === ScrollbarMode.Overlay;
            const forceCorner = !overlay && (!this.widthTied && !this.heightTied);
            const xNeeded = childWidth > this.width;
            const yNeeded = childHeight > this.height;

            let grabbedEvent = false;

            // Only handle event in scrollbar if the scrollbar is shown and
            // needed (layout mode shows unneeded scrollbars)
            if(!this.widthTied && (xNeeded || !overlay) &&
               this.handleEventScrollbar(false, yNeeded || forceCorner, event, root))
                grabbedEvent = true;

            if(!this.heightTied && (yNeeded || !overlay) &&
               this.handleEventScrollbar(true, xNeeded || forceCorner, event, root))
                grabbedEvent = true;

            // If the event was grabbed by either scrollbar, capture it
            if(grabbedEvent) {
                // If this is a wheel event, handle it
                if(event instanceof PointerWheel)
                    this.handleWheelEvent(event);

                return this;
            }
        }

        // Pass event along
        const capturer = super.handleEvent(event, root);

        // If this is a wheel event and nobody captured the event, try
        // scrolling. If scrolling did indeed occur, then capture the event.
        if(capturer === null && event instanceof PointerWheel && this.handleWheelEvent(event))
            return this;

        return capturer;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Check whether to reserve space or not
        const thickness = this.scrollBarThickness;
        const reserve = this._scrollbarMode === ScrollbarMode.Layout;
        const reserveX = reserve && !this.heightTied;
        const reserveY = reserve && !this.widthTied;

        // If reserving space, further constrain dimensions
        let rMinWidth, rMaxWidth, rMinHeight, rMaxHeight;
        if(reserveX) {
            rMaxWidth = Math.max(maxWidth - thickness, 0);
            rMinWidth = Math.min(minWidth, rMaxWidth);
        }
        else {
            rMaxWidth = maxWidth;
            rMinWidth = minWidth;
        }

        if(reserveY) {
            rMaxHeight = Math.max(maxHeight - thickness, 0);
            rMinHeight = Math.min(minHeight, rMaxHeight);
        }
        else {
            rMaxHeight = maxHeight;
            rMinHeight = minHeight;
        }

        // Resolve dimensions
        super.handleResolveDimensions(rMinWidth, rMaxWidth, rMinHeight, rMaxHeight);

        // Save dimensions to effective dimensions
        this.effectiveWidth = this.width;
        this.effectiveHeight = this.height;

        // Expand dimensions to fit scrollbars
        if(reserveX)
            this.width = Math.min(Math.max(this.width + thickness, minWidth), maxWidth);

        if(reserveY)
            this.height = Math.min(Math.max(this.height + thickness, minHeight), maxHeight);
    }

    protected override handlePostLayoutUpdate(root: Root): void {
        super.handlePostLayoutUpdate(root);

        // Keep scroll in bounds
        const offset = this.offset;
        this.clampOffset(offset);
        this.offset = offset;
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D): void {
        // Paint viewport
        super.handlePainting(ctx);

        // Paint scrollbars
        const [childWidth, childHeight] = this.child.dimensions;
        const xNeeded = childWidth > this.width;
        const yNeeded = childHeight > this.height;
        const forceCorner = this._scrollbarMode === ScrollbarMode.Layout && (!this.widthTied && !this.heightTied);

        if(!this.widthTied)
            this.paintScrollbar(false, xNeeded, yNeeded || forceCorner, ctx);
        if(!this.heightTied)
            this.paintScrollbar(true, yNeeded, xNeeded || forceCorner, ctx);

        // Paint corner if it is forced
        if(forceCorner) {
            const thickness = this.scrollBarThickness;
            ctx.fillStyle = this.backgroundFill;
            ctx.fillRect(
                this.x + this.width - thickness,
                this.y + this.height - thickness,
                thickness,
                thickness,
            );
        }
    }

    /**
     * Get the rectangles (filled and background) of a scrollbar
     *
     * @returns Returns a 2-tuple with 2 4-tuples. The first one is the scrollbar fill rectangle and the second one is the background fill rectangle. Each rectangle 4-tuple contains, respectively, horizontal offset, vertical offset, width and height
     */
    private getScrollbarRects(vertical: boolean, corner: boolean): [[number, number, number, number], [number, number, number, number]] {
        // Calculate basic scrollbar properties
        const overlay = this._scrollbarMode === ScrollbarMode.Overlay;
        const axisIndex = vertical ? 1 : 0;
        const percent = this.scroll[axisIndex];
        const childLength = this.child.dimensions[axisIndex];
        const viewportLength = vertical ? this.effectiveHeight : this.effectiveWidth;
        const thickness = this.scrollBarThickness;
        const minPercent = this.scrollBarMinPercent;
        const minPixels = this.scrollBarMinPixels;

        let viewportLengthCorner = viewportLength;
        if(overlay)
            viewportLengthCorner -= (corner ? thickness : 0);

        const length = Math.min(
            // Make sure scrollbar fill isn't bigger than viewport
            Math.max(
                // Make sure that scrollbar respects the minimum pixel length
                minPixels,
                Math.max(
                    // Make sure that scrollbar respects the minimum percent
                    viewportLength / childLength,
                    minPercent,
                ) * viewportLengthCorner,
            ),
            viewportLengthCorner,
        );

        const offset = (viewportLengthCorner - length) * percent;

        // Find rectangle where filled part of scrollbar will be painted
        let sX, sY, sWidth, sHeight;
        if(vertical) {
            sX = this.x + this.width - thickness;
            sY = this.y + offset;
            sWidth = thickness;
            sHeight = length;
        }
        else {
            sX = this.x + offset;
            sY = this.y + this.height - thickness;
            sWidth = length;
            sHeight = thickness;
        }

        // Find rectangle where background of scrollbar will be painted
        let bgX, bgY, bgWidth, bgHeight;
        if(vertical) {
            bgX = sX;
            bgY = this.y;
            bgWidth = thickness;
            bgHeight = viewportLengthCorner;
        }
        else {
            bgX = this.x;
            bgY = sY;
            bgWidth = viewportLengthCorner;
            bgHeight = thickness;
        }

        return [
            [sX, sY, sWidth, sHeight],
            [bgX, bgY, bgWidth, bgHeight],
        ];
    }

    /** Paint a scrollbar. For internal use only */
    private paintScrollbar(vertical: boolean, needed: boolean, corner: boolean, ctx: CanvasRenderingContext2D): void {
        // If the scrollbar isn't needed and the is an overlay, don't paint
        const overlay = this._scrollbarMode === ScrollbarMode.Overlay;
        if(!needed && overlay)
            return;

        // Get rectangles
        const [fillRect, bgRect] = this.getScrollbarRects(vertical, corner);

        // Paint background if not in overlay mode
        if(this._scrollbarMode !== ScrollbarMode.Overlay) {
            ctx.fillStyle = this.backgroundFill;
            ctx.fillRect(...bgRect);
        }

        // Paint filled part of scrollbar
        if(needed) {
            const clickHelper = this.getClickHelper(vertical);
            switch(clickHelper.clickState) {
                case ClickState.Released:
                    ctx.fillStyle = this.primaryFill;
                    break;
                case ClickState.Hover:
                case ClickState.Hold:
                    ctx.fillStyle = this.accentFill;
                    break;
            }
        }
        else
            ctx.fillStyle = this.backgroundGlowFill;

        ctx.fillRect(...fillRect);
    }
}