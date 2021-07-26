import { Variable, VariableCallback } from '../aggregates/Variable';
import { ClickHelper, ClickState } from '../aggregates/ClickHelper';
import { ThemeProperty } from '../theme/ThemeProperty';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

/**
 * A scrollbar flexbox widget which can be both vertical and horizontal.
 *
 * @category Widget
 */
export class ScrollBar extends FlexLayout {
    /**
     * The scrollbar's end. Maximum value will be
     * max(min(end - {@link barLength}, {@link value}), 0).
     */
    private _end: number;
    /** The scrollbar's bar length, in ratios similar to flex ratio. */
    private _barLength: number;
    /** What was the value when dragging began? */
    private dragValue: number;
    /** The helper for handling pointer clicks/drags */
    protected clickHelper: ClickHelper;
    /** The helper for keeping track of the scrollbar's scroll percentage */
    protected variable: Variable<number>;

    /** Create a new ScrollBar */
    constructor(callback: VariableCallback<number> | null = null, end = 100, barLength = 100, initialValue = 0, themeOverride: Theme | null = null) {
        // Scrollbars need a clear background, have no children and don't
        // propagate events
        super(themeOverride, true, false);

        this.clickHelper = new ClickHelper(this);
        this.variable = new Variable<number>(initialValue, callback);
        this._end = end;
        this._barLength = barLength;
        this.dragValue = initialValue;
    }

    /** The scrollbar's scroll percentage (0 to 1) */
    set scroll(scroll: number) {
        this.variable.value = Math.max(Math.min(this._end - this._barLength, scroll), 0);
    }

    get scroll(): number {
        return this.variable.value;
    }

    /**
     * The scrollbar's end; the length of the scrollable axis. For example, if
     * this is a vertical scrollbar, this value would be the resolved height of
     * the widget being scrolled.
     *
     * Tied to {@link _end}. If changed, {@link _dirty} is set to true.
     */
    get end(): number {
        return this._end;
    }

    set end(end: number) {
        if(this._end !== end) {
            this._end = end;
            this._dirty = true;
        }
    }

    /**
     * The scrollbar's bar length; the length of the viewable zone along the
     * scrollable axis. For example, if this is a vertical scrollbar, this value
     * would be the resolved height of the viewport wrapping the widget being
     * scrolled.
     *
     * Tied to {@link _barLength}. If changed, {@link _dirty} is set to true.
     */
    get barLength(): number {
        return this._barLength;
    }

    set barLength(barLength: number) {
        if(this._barLength !== barLength) {
            this._barLength = barLength;
            this._dirty = true;
        }
    }

    /**
     * Get the rectangle where the scrollbar will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's offset, the width, the top edge's offset and the height.
     */
    private getBarRect(x: number, y: number, width: number, height: number): [number, number, number, number] {
        if(this.lastVertical) {
            const thickness = Math.min(this.crossBasis, width);
            const bx = x + (width - thickness) / 2;
            return [ bx, bx + thickness, y, y + height ];
        }
        else {
            const thickness = Math.min(this.crossBasis, height);
            const by = y + (height - thickness) / 2;
            return [ x, x + width, by, by + thickness ];
        }
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): this {
        // Handle click event
        this.clickHelper.handleClickEvent(
            event,
            root,
            this.getBarRect(0, 0, width, height),
        );

        // If the bar is currently being held, update value
        if(this.clickHelper.clickState == ClickState.Hold && this.clickHelper.pointerPos !== null) {
            // Interpolate and update value, taking drag into account
            if(this.clickHelper.clickStateChanged) {
                // If not inside filled part of bar, snap value
                let clickVal;
                if(this.lastVertical)
                    clickVal = this.clickHelper.pointerPos[1] * this._end;
                else
                    clickVal = this.clickHelper.pointerPos[0] * this._end;

                let scroll = this.scroll;
                if(clickVal < scroll || clickVal >= (scroll + this._barLength)) {
                    scroll = clickVal - this._barLength / 2;
                    this.scroll = scroll;
                }

                this.dragValue = scroll;
            }
            else {
                if(this.clickHelper.startingPointerPos !== null) {
                    let dragChange;
                    if(this.lastVertical)
                        dragChange = this.clickHelper.pointerPos[1]
                                     - this.clickHelper.startingPointerPos[1];
                    else
                        dragChange = this.clickHelper.pointerPos[0]
                                     - this.clickHelper.startingPointerPos[0];

                    this.scroll = this.dragValue + dragChange * this._end;
                }
            }
        }

        // Always flag as dirty if the click state changed (so glow colour takes
        // effect)
        if(this.clickHelper.clickStateChanged)
            this._dirty = true;

        return this;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Use theme settings for thickness and forbid flex ratio
        this.flexRatio = 0;
        this.crossBasis = this.theme.getNumber(ThemeProperty.ScrollBarThickness);

        // Mark as dirty if variable is dirty
        if(this.variable.dirty)
            this._dirty = true;
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Find bar start and length percentage
        const [sl, sr, st, sb] = this.getBarRect(x, y, width, height);
        const [sw, sh] = [sr - sl, sb - st];

        const start = this.scroll / this._end;
        const percent = this._barLength / this._end;

        // Draw empty part of bar
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        ctx.fillRect(sl, st, sw, sh);

        // Draw filled part of bar
        // Use accent colour if hovering or holding
        const accentStates = [ClickState.Hover, ClickState.Hold];
        if(accentStates.includes(this.clickHelper.clickState))
            ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);

        if(this.lastVertical) {
            let barHeight = percent * sh;
            if(barHeight > sh)
                barHeight = sh;
            ctx.fillRect(sl, st + start * sh, sw, barHeight);
        }
        else {
            let barWidth = percent * sw;
            if(barWidth > sw)
                barWidth = sw;
            ctx.fillRect(sl + start * sw, st, barWidth, sh);
        }
    }
}