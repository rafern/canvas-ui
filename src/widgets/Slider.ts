import { Variable, VariableCallback } from '../aggregates/Variable';
import { ClickHelper, ClickState } from '../aggregates/ClickHelper';
import { ThemeProperty } from '../theme/ThemeProperty';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

// TODO allow vertical sliders
/**
 * A slider flexbox widget; can slide a numeric value from an inclusive minimum
 * value to an inclusive maximum value, with optional snapping along set
 * increments.
 *
 * Note that sliders can only be horizontal.
 *
 * @category Widget
 */
export class Slider extends FlexLayout {
    /** The slider's minimum value. */
    private minValue: number;
    /** The slider's maximum value. */
    private maxValue: number;
    /**
     * The increments in which the slider changes value. If 0, there are no
     * fixed increments.
     */
    private snapIncrement: number;
    /** The helper for handling pointer clicks/drags */
    protected clickHelper: ClickHelper;
    /** The helper for keeping track of the slider's value */
    protected variable: Variable<number>;

    /** Create a new Slider */
    constructor(callback: VariableCallback<number> | null = null, minValue = 0, maxValue = 1, snapIncrement = 0, initialValue = 0, themeOverride: Theme | null = null) {
        // Sliders need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this.clickHelper = new ClickHelper(this);
        this.variable = new Variable(initialValue, callback);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.snapIncrement = snapIncrement;

        // Sliders are always horizontal
        this.vertical = false;
    }

    /** The slider's value */
    set value(value: number) {
        // Snap to increments if needed
        if(this.snapIncrement > 0)
            value = Math.round(value / this.snapIncrement) * this.snapIncrement;

        // Clamp value
        if(value < this.minValue)
            value = this.minValue;
        else if(value > this.maxValue)
            value = this.maxValue;

        // Update value in variable
        this.variable.value = value;
    }

    get value(): number {
        return this.variable.value;
    }

    /**
     * Get the rectangle where the slider will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's offset, the width, the top edge's offset and the height.
     */
    private getSliderRect(x: number, y: number, width: number, height: number): [number, number, number, number] {
        const thickness = Math.min(this.crossBasis, height);
        const sy = y + (height - thickness) / 2;
        return [ x, x + width, sy, sy + thickness ];
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): this {
        // Handle click event
        this.clickHelper.handleClickEvent(event, root, this.getSliderRect(0, 0, width, height));

        // If this was a click or the slider is currently being held, update
        // value
        if(((this.clickHelper.clickStateChanged && this.clickHelper.wasClick) || this.clickHelper.clickState == ClickState.Hold)
            && this.clickHelper.pointerPos !== null) {
            // Interpolate value
            const percent = this.clickHelper.pointerPos[0];
            this.value = this.minValue + percent * (this.maxValue - this.minValue);
        }

        // Always flag as dirty if the click state changed (so glow colour takes
        // effect)
        if(this.clickHelper.clickStateChanged)
            this._dirty = true;

        return this;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Use theme settings for flex ratio and basis
        this.flexRatio = this.theme.getNumber(ThemeProperty.SliderFlexRatio);
        this.mainBasis = this.theme.getNumber(ThemeProperty.SliderMainBasis);
        this.crossBasis = this.theme.getNumber(ThemeProperty.SliderCrossBasis);
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Find slider fill percentage
        const [sl, sr, st, sb] = this.getSliderRect(x, y, width, height);
        const [sw, sh] = [sr - sl, sb - st];
        const percent = (this.value - this.minValue) / (this.maxValue - this.minValue);

        // Draw filled part of slider
        // Use accent colour if hovering or holding
        const accentStates = [ClickState.Hover, ClickState.Hold];
        if(accentStates.includes(this.clickHelper.clickState))
            ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);
        const fullWidth = percent * sw;
        ctx.fillRect(sl, st, fullWidth, sh);

        // Draw empty part of slider
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        const emptyWidth = sw - fullWidth;
        ctx.fillRect(sl + fullWidth, st, emptyWidth, sh);
    }
}
