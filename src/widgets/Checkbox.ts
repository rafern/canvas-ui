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
    /** Horizontal offset. */
    private offsetX = 0;
    /** Vertical offset. */
    private offsetY = 0;
    /** Actual length after resolving layout. */
    private actualLength = 0;
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

    protected override handleEvent(event: Event, root: Root): this {
        // Check if checkbox rectangle was pressed and swap value if so
        const x = this.x + this.offsetX;
        const y = this.y + this.offsetY;
        this.clickHelper.handleClickEvent(
            event,
            root,
            [x, x + this.actualLength, y, y + this.actualLength],
        );

        if(this.clickHelper.clickStateChanged && this.clickHelper.wasClick)
            this.checked = !this.checked;

        return this;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Mark as dirty if variable is dirty
        if(this.variable.dirty)
            this._dirty = true;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Find actual length
        const length = this.theme.getNumber(ThemeProperty.CheckboxLength);
        this.actualLength = Math.min(length, maxWidth, maxHeight);

        // Resolve width and height
        this.width = this.actualLength;
        this.height = this.actualLength;

        if(this.width < minWidth)
            this.width = minWidth;
        if(this.height < minHeight)
            this.height = minHeight;

        // Center checkbox
        this.offsetX = (this.width - this.actualLength) / 2;
        this.offsetY = (this.height - this.actualLength) / 2;
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D): void {
        // Should we use glow colours? (background glow and accent)
        const useGlow = this.clickHelper.clickState === ClickState.Hover ||
                        this.clickHelper.clickState === ClickState.Hold;

        // Draw unchecked part of checkbox
        if(useGlow)
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundGlowFill);
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.BackgroundFill);

        ctx.fillRect(
            this.offsetX, this.offsetY, this.actualLength, this.actualLength,
        );

        // Draw checked part of checkbox
        if(this.checked) {
            if(useGlow)
                ctx.fillStyle = this.theme.getFill(ThemeProperty.AccentFill);
            else
                ctx.fillStyle = this.theme.getFill(ThemeProperty.PrimaryFill);

            const innerPadding = this.theme.getNumber(ThemeProperty.CheckboxInnerPadding);
            const innerLength = this.actualLength - innerPadding * 2;

            // Fall back to filling entire checkbox if there isn't enougn space
            // for padding
            if(innerLength <= 0) {
                ctx.fillRect(
                    this.x + this.offsetX,
                    this.y + this.offsetY,
                    this.actualLength,
                    this.actualLength,
                );
            }
            else {
                ctx.fillRect(
                    this.x + this.offsetX + innerPadding,
                    this.y + this.offsetY + innerPadding,
                    innerLength,
                    innerLength,
                );
            }
        }
    }
}
