import { Variable, VariableCallback } from '../aggregates/Variable';
import { ClickHelper } from '../aggregates/ClickHelper';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
/**
 * A scrollbar flexbox widget which can be both vertical and horizontal.
 *
 * @category Widget
 */
export declare class ScrollBar extends FlexLayout {
    /**
     * The scrollbar's end. Maximum value will be
     * max(min(end - {@link barLength}, {@link value}), 0).
     */
    private _end;
    /** The scrollbar's bar length, in ratios similar to flex ratio. */
    private _barLength;
    /** What was the value when dragging began? */
    private dragValue;
    /** The helper for handling pointer clicks/drags */
    protected clickHelper: ClickHelper;
    /** The helper for keeping track of the scrollbar's scroll percentage */
    protected variable: Variable<number>;
    /** Create a new ScrollBar */
    constructor(callback?: VariableCallback<number> | null, end?: number, barLength?: number, initialValue?: number, themeOverride?: Theme | null);
    /** The scrollbar's scroll percentage (0 to 1) */
    set scroll(scroll: number);
    get scroll(): number;
    /**
     * The scrollbar's end; the length of the scrollable axis. For example, if
     * this is a vertical scrollbar, this value would be the resolved height of
     * the widget being scrolled.
     *
     * Tied to {@link _end}. If changed, {@link _dirty} is set to true.
     */
    get end(): number;
    set end(end: number);
    /**
     * The scrollbar's bar length; the length of the viewable zone along the
     * scrollable axis. For example, if this is a vertical scrollbar, this value
     * would be the resolved height of the viewport wrapping the widget being
     * scrolled.
     *
     * Tied to {@link _barLength}. If changed, {@link _dirty} is set to true.
     */
    get barLength(): number;
    set barLength(barLength: number);
    /**
     * Get the rectangle where the scrollbar will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's offset, the width, the top edge's offset and the height.
     */
    private getBarRect;
    protected handleEvent(event: Event, width: number, height: number, root: Root): this;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
