import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
import { Variable, VariableCallback } from '../mixins/Variable';
import { Clickable, ClickState } from '../mixins/Clickable';
import { ThemeProperty } from '../theme/ThemeProperty';
import { BoxLayout } from '../mixins/BoxLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

// XXX using this because Mixin can't use Variable<boolean>
class BooleanVariable extends Variable<boolean> {}

export class Checkbox extends Mixin(BoxLayout, Clickable, BooleanVariable) {
    constructor(callback: VariableCallback<boolean> | null = null, initialValue = false, themeOverride: Theme | null = null) {
        // Checkboxes need a clear background, have no children and don't
        // propagate events
        super(themeOverride, true, false);

        // Save callback and initial value
        this.callback = callback;
        this.setValue(initialValue, false);
    }

    private getBoxRect(x: number, y: number, width: number, height: number): [number, number, number, number] {
        // Find actual length
        const length = this.theme.getSize(ThemeProperty.CheckboxLength);
        const actualLength = Math.min(length, width, height);

        // Find offset
        const bx = x + (width - actualLength) / 2;
        const by = y + (height - actualLength) / 2;

        return [ bx, bx + actualLength, by, by + actualLength ];
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): this {
        // Check if checkbox rectangle was pressed and swap value if so
        const clickArea = this.getBoxRect(0, 0, width, height);
        this.handleClickEvent(event, root, clickArea);
        if(this.clickStateChanged && this.wasClick)
            this.value = !this.value;

        return this;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Update box width and height from checkbox length
        const length = this.theme.getSize(ThemeProperty.CheckboxLength);
        this.boxWidth = length;
        this.boxHeight = length;
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Find checkbox rect
        const [bx, br, by, _bb] = this.getBoxRect(x, y, width, height);
        const actualLength = br - bx;

        // Should we use glow colours? (background glow and accent)
        const useGlow = [ClickState.Hover, ClickState.Hold].includes(this.clickState);

        // Draw unchecked part of checkbox
        if(useGlow)
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundGlowFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        ctx.fillRect(bx, by, actualLength, actualLength);

        // Draw checked part of checkbox
        if(this.value) {
            if(useGlow)
                ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
            else
                ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);

            const innerPadding = this.theme.getSize(ThemeProperty.CheckboxInnerPadding);
            const innerLength = actualLength - innerPadding * 2;

            if(innerLength <= 0)
                ctx.fillRect(bx, by, actualLength, actualLength);
            else
                ctx.fillRect(bx + innerPadding, by + innerPadding, innerLength, innerLength);
        }
    }
}
