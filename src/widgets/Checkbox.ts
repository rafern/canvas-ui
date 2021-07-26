import { Variable, VariableCallback } from '../aggregates/Variable';
import { ClickHelper, ClickState } from '../aggregates/ClickHelper';
import { ThemeProperty } from '../theme/ThemeProperty';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A checkbox widget; can be ticked or unticked.
 *
 * @category Widget
 */
export class Checkbox extends Widget {
    /** The helper for handling pointer clicks */
    protected clickHelper: ClickHelper;
    /** The helper for keeping track of the checkbox value */
    protected variable: Variable<boolean>;

    /**
     * Create a new Checkbox.
     *
     * @param callback An optional callback called when the checkbox is ticked or unticked. If null, then no callback is called.
     */
    constructor(callback: VariableCallback<boolean> | null = null, initialValue = false, themeOverride: Theme | null = null) {
        // Checkboxes need a clear background, have no children and don't
        // propagate events
        super(themeOverride, true, false);

        // Save callback and initial value
        this.variable = new Variable<boolean>(initialValue, callback);

        // Setup click helper
        this.clickHelper = new ClickHelper(this);
    }

    /** Is the checkbox checked? */
    set checked(checked: boolean) {
        this.variable.value = checked;
    }

    get checked(): boolean {
        return this.variable.value;
    }

    /**
     * Get the rectangle where the checkbox will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's offset, the width, the top edge's offset and the height.
     */
    private getBoxRect(x: number, y: number, width: number, height: number): [number, number, number, number] {
        // Find actual length
        const length = this.theme.getNumber(ThemeProperty.CheckboxLength);
        const actualLength = Math.min(length, width, height);

        // Find offset
        const bx = x + (width - actualLength) / 2;
        const by = y + (height - actualLength) / 2;

        return [ bx, bx + actualLength, by, by + actualLength ];
    }

    protected override handleEvent(event: Event, root: Root): this {
        // Check if checkbox rectangle was pressed and swap value if so
        const clickArea = this.getBoxRect(0, 0, this.width, this.height);
        this.clickHelper.handleClickEvent(event, root, clickArea);
        if(this.clickHelper.clickStateChanged && this.clickHelper.wasClick)
            this.checked = !this.checked;

        return this;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Update box width and height from checkbox length
        const length = this.theme.getNumber(ThemeProperty.CheckboxLength);
        this.boxWidth = length;
        this.boxHeight = length;

        // Mark as dirty if variable is dirty
        if(this.variable.dirty)
            this._dirty = true;
    }

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Find checkbox rect
        const [bx, br, by, _bb] = this.getBoxRect(x, y, width, height);
        const actualLength = br - bx;

        // Should we use glow colours? (background glow and accent)
        const useGlow = this.clickHelper.clickState === ClickState.Hover ||
                        this.clickHelper.clickState === ClickState.Hold;

        // Draw unchecked part of checkbox
        if(useGlow)
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundGlowFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);
        ctx.fillRect(bx, by, actualLength, actualLength);

        // Draw checked part of checkbox
        if(this.checked) {
            if(useGlow)
                ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
            else
                ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);

            const innerPadding = this.theme.getNumber(ThemeProperty.CheckboxInnerPadding);
            const innerLength = actualLength - innerPadding * 2;

            if(innerLength <= 0)
                ctx.fillRect(bx, by, actualLength, actualLength);
            else
                ctx.fillRect(bx + innerPadding, by + innerPadding, innerLength, innerLength);
        }
    }
}
