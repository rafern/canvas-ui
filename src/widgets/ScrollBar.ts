import { /* tree-shaking no-side-effects-when-called */ Variable, VariableCallback } from '../mixins/Variable';
import { /* tree-shaking no-side-effects-when-called */ Clickable, ClickState } from '../mixins/Clickable';
import { ThemeProperty } from '../theme/ThemeProperty';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import { FlexWidget } from './FlexWidget';
import type { Root } from '../core/Root';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME Should this really be a flex widget? flexRatio with scrollbars
// introduce a lot of issues because they tend to expand beyond what they should
export class ScrollBar extends Clickable(Variable<number, typeof FlexWidget>(FlexWidget, 0)) {
    // The scrollbar's end. Maximum value will be max(min(end - barLength, value), 0)
    #end: number;
    // The scrollbar's bar length, in ratios similar to flex ratio
    #barLength: number;
    // What was the value when dragging began?
    #dragValue: number;

    constructor(callback: VariableCallback<number> | null = null, end = 100, barLength = 100, initialValue = 0, themeOverride: Theme | null = null) {
        // Scrollbars need a clear background, have no children and don't
        // propagate events
        super(themeOverride, true, false);

        this.callback = callback;
        this.setValue(initialValue, false);
        this.#end = end;
        this.#barLength = barLength;
        this.#dragValue = initialValue;
    }

    get end(): number {
        return this.#end;
    }

    set end(end: number) {
        if(this.#end !== end) {
            this.#end = end;
            this.dirty = true;
        }
    }

    get barLength(): number {
        return this.#barLength;
    }

    set barLength(barLength: number) {
        if(this.#barLength !== barLength) {
            this.#barLength = barLength;
            this.dirty = true;
        }
    }

    override setValue(value: number, doCallback = true): void {
        super.setValue(
            Math.max(Math.min(this.#end - this.#barLength, value), 0),
            doCallback,
        );
    }

    getBarRect(x: number, y: number, width: number, height: number): [number, number, number, number] { // XXX private
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

    override handleEvent(event: Event, width: number, height: number, root: Root): this { // XXX protected
        // Handle click event
        this.handleClickEvent(
            event,
            root,
            this.getBarRect(0, 0, width, height),
        );

        // If the bar is currently being held, update value
        if(this.clickState == ClickState.Hold && this.pointerPos !== null) {
            // Interpolate and update value, taking drag into account
            if(this.clickStateChanged) {
                // If not inside filled part of bar, snap value
                let clickVal;
                if(this.lastVertical)
                    clickVal = this.pointerPos[1] * this.#end;
                else
                    clickVal = this.pointerPos[0] * this.#end;

                let value = this.value;
                if(value === null)
                    value = 0;

                if(clickVal < value || clickVal >= (value + this.#barLength)) {
                    value = clickVal - this.#barLength / 2;
                    this.value = value;
                }

                this.#dragValue = value;
            }
            else {
                if(this.startingPointerPos !== null) {
                    let dragChange;
                    if(this.lastVertical)
                        dragChange = this.pointerPos[1] - this.startingPointerPos[1];
                    else
                        dragChange = this.pointerPos[0] - this.startingPointerPos[0];

                    this.value = this.#dragValue + dragChange * this.#end;
                }
            }
        }

        // Always flag as dirty if the click state changed (so glow colour takes
        // effect)
        if(this.clickStateChanged)
            this.dirty = true;

        return this;
    }

    override handlePreLayoutUpdate(_root: Root): void {
        // Use theme settings for thickness and forbid flex ratio
        this.flexRatio = 0;
        this.crossBasis = this.theme.getSize(ThemeProperty.ScrollBarThickness);
    }

    override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
        // Find bar start and length percentage
        const [sl, sr, st, sb] = this.getBarRect(x, y, width, height);
        const [sw, sh] = [sr - sl, sb - st];

        let value = this.value;
        if(value === null)
            value = 0;

        const start = value / this.#end;
        const percent = this.#barLength / this.#end;

        // Draw empty part of bar
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        ctx.fillRect(sl, st, sw, sh);

        // Draw filled part of bar
        // Use accent colour if hovering or holding
        const accentStates = [ClickState.Hover, ClickState.Hold];
        if(accentStates.includes(this.clickState))
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