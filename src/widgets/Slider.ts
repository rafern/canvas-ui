import { Variable, VariableCallback } from '../mixins/Variable';
import { ClickState, Clickable } from '../mixins/Clickable';
import { ThemeProperty } from '../theme/ThemeProperty';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import { FlexWidget } from './FlexWidget';
import type { Root } from '../core/Root';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
export class Slider extends Clickable(Variable<number, typeof FlexWidget>(FlexWidget)) {
    // The slider's minimum and maximum
    minValue: number; // XXX private
    maxValue: number; // XXX private
    // The increments in which the slider changes value. If 0, there are no
    // fixed increments
    snapIncrement: number; // XXX private

    constructor(callback: VariableCallback<number | null> | null = null, minValue = 0, maxValue = 1, snapIncrement = 0, initialValue = 0, themeOverride: Theme | null = null) {
        // Sliders need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this.callback = callback;
        this._value = initialValue;
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.snapIncrement = snapIncrement;

        // Sliders are always horizontal
        this.vertical = false;
    }

    getSliderRect(x: number, y: number, width: number, height: number): [number, number, number, number] { // XXX private
        const thickness = Math.min(this.crossBasis, height);
        const sy = y + (height - thickness) / 2;
        return [ x, x + width, sy, sy + thickness ];
    }

    handleEvent(event: Event, width: number, height: number, root: Root): this { // XXX protected
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
            this.dirty = true;

        return this;
    }

    handlePreLayoutUpdate(_root: Root): void {
        // Use theme settings for flex ratio and basis
        this.flexRatio = this.theme.getSize(ThemeProperty.SliderFlexRatio);
        this.mainBasis = this.theme.getSize(ThemeProperty.SliderMainBasis);
        this.crossBasis = this.theme.getSize(ThemeProperty.SliderCrossBasis);
    }

    handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
        // Find slider fill percentage
        const [sl, sr, st, sb] = this.getSliderRect(x, y, width, height);
        const [sw, sh] = [sr - sl, sb - st];

        let value = this._value;
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
