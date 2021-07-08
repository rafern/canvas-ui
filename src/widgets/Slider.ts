import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
import { NumberVariable, VariableCallback } from '../mixins/Variable';
import { ClickState, Clickable } from '../mixins/Clickable';
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
export class Slider extends Mixin(FlexLayout, Clickable, NumberVariable) {
    /** The slider's minimum value. */
    private minValue: number;
    /** The slider's maximum value. */
    private maxValue: number;
    /**
     * The increments in which the slider changes value. If 0, there are no
     * fixed increments.
     */
    private snapIncrement: number;

    /** Create a new Slider */
    constructor(callback: VariableCallback<number> | null = null, minValue = 0, maxValue = 1, snapIncrement = 0, initialValue = 0, themeOverride: Theme | null = null) {
        // Sliders need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this.callback = callback;
        this.setValue(initialValue, false);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.snapIncrement = snapIncrement;

        // Sliders are always horizontal
        this.vertical = false;
    }

    /**
     * Get the rectangle where the slider will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's
     * offset, the width, the top edge's offset and the height.
     */
    private getSliderRect(x: number, y: number, width: number, height: number): [number, number, number, number] {
        const thickness = Math.min(this.crossBasis, height);
        const sy = y + (height - thickness) / 2;
        return [ x, x + width, sy, sy + thickness ];
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): this {
        // Handle click event
        this.handleClickEvent(event, root, this.getSliderRect(0, 0, width, height));

        // If this was a click or the slider is currently being held, update
        // value
        if(((this.clickStateChanged && this.wasClick) || this.clickState == ClickState.Hold)
            && this.pointerPos !== null) {
            // Interpolate value
            const percent = this.pointerPos[0];
            let newValue = this.minValue + percent * (this.maxValue - this.minValue);

            // Snap to increments if needed
            if(this.snapIncrement > 0)
                newValue = Math.round(newValue / this.snapIncrement) * this.snapIncrement;

            // Clamp value
            if(newValue < this.minValue)
                newValue = this.minValue;
            else if(newValue > this.maxValue)
                newValue = this.maxValue;

            // Update value
            this.value = newValue;
        }

        // Always flag as dirty if the click state changed (so glow colour takes
        // effect)
        if(this.clickStateChanged)
            this._dirty = true;

        return this;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Use theme settings for flex ratio and basis
        this.flexRatio = this.theme.getSize(ThemeProperty.SliderFlexRatio);
        this.mainBasis = this.theme.getSize(ThemeProperty.SliderMainBasis);
        this.crossBasis = this.theme.getSize(ThemeProperty.SliderCrossBasis);
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Find slider fill percentage
        const [sl, sr, st, sb] = this.getSliderRect(x, y, width, height);
        const [sw, sh] = [sr - sl, sb - st];

        let value = this.value;
        if(value === null)
            value = 0;

        const percent = (value - this.minValue) / (this.maxValue - this.minValue);

        // Draw filled part of slider
        // Use accent colour if hovering or holding
        const accentStates = [ClickState.Hover, ClickState.Hold];
        if(accentStates.includes(this.clickState))
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
