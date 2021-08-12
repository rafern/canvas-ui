import { Variable, VariableCallback } from '../helpers/Variable';
import { ClickHelper, ClickState } from '../helpers/ClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { PointerWheel } from '../events/PointerWheel';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A slider flexbox widget; can slide a numeric value from an inclusive minimum
 * value to an inclusive maximum value, with optional snapping along set
 * increments.
 *
 * Note that sliders can only be horizontal.
 *
 * @category Widget
 */
export class Slider extends Widget {
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
    /** Is this a vertical slider? */
    protected readonly vertical: boolean;
    /** The horizontal offset of the slider */
    private offsetX = 0;
    /** The vertical offset of the slider */
    private offsetY = 0;
    /** The actual width of the slider */
    private actualWidth = 0;
    /** The actual height of the slider */
    private actualHeight = 0;

    /** Create a new Slider */
    constructor(callback: VariableCallback<number> | null = null, minValue = 0, maxValue = 1, snapIncrement = 0, initialValue = 0, vertical = false, themeProperties?: ThemeProperties) {
        // Sliders need a clear background, have no children and don't propagate
        // events
        super(true, false, themeProperties);

        if(maxValue < minValue)
            throw new Error('Slider max value can\'t be smaller than minimum value');

        this.clickHelper = new ClickHelper(this);
        this.variable = new Variable(Math.max(initialValue, minValue), callback);
        this.minValue = minValue;
        this.maxValue = maxValue;
        this.snapIncrement = snapIncrement;
        this.vertical = vertical;
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

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'sliderThickness' ||
                property === 'sliderMinLength')
        {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'accentFill' ||
                property === 'primaryFill' ||
                property === 'backgroundFill')
            this._dirty = true;
    }

    protected override handleEvent(event: Event, root: Root): this | null {
        // Ignore wheel events
        if(event instanceof PointerWheel)
            return null;

        // Handle click event
        const x = this.x + this.offsetX;
        const y = this.y + this.offsetY;
        this.clickHelper.handleClickEvent(event, root, [
            x, x + this.actualWidth, y, y + this.actualHeight,
        ]);

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

    protected override handlePostLayoutUpdate(_root: Root): void {
        // Mark as dirty if variable is dirty
        if(this.variable.dirty)
            this._dirty = true;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Get theme properties
        const thickness = this.sliderThickness;
        const minLength = this.sliderMinLength;

        // Fully expand along main axis if constrained and center along cross
        // axis
        if(this.vertical) {
            // Main axis
            if(maxHeight != Infinity)
                this.height = maxHeight;
            else
                this.height = Math.max(minLength, minHeight);

            this.actualHeight = this.height;
            this.offsetY = 0;

            // Cross axis
            this.width = Math.min(Math.max(thickness, minWidth), maxWidth);

            this.actualWidth = Math.min(this.width, thickness);
            this.offsetX = (this.width - this.actualWidth) / 2;
        }
        else {
            // Main axis
            if(maxWidth != Infinity)
                this.width = maxWidth;
            else
                this.width = Math.max(minLength, minWidth);

            this.actualWidth = this.width;
            this.offsetY = 0;

            // Cross axis
            this.height = Math.min(Math.max(thickness, minHeight), maxHeight);

            this.actualHeight = Math.min(this.height, thickness);
            this.offsetX = (this.height - this.actualHeight) / 2;
        }
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void {
        // Correct position with offset
        const x = this.x + this.offsetX;
        const y = this.y + this.offsetY;

        // Draw filled part of slider. Use accent colour if hovering or holding
        if(this.clickHelper.clickState === ClickState.Hover || this.clickHelper.clickState === ClickState.Hold)
            ctx.fillStyle = this.accentFill;
        else
            ctx.fillStyle = this.primaryFill;
        const fullWidth = this.actualWidth * (this.value - this.minValue) / (this.maxValue - this.minValue);
        ctx.fillRect(x, y, fullWidth, this.actualHeight);

        // Draw empty part of slider
        ctx.fillStyle = this.backgroundFill;
        const emptyWidth = this.actualWidth - fullWidth;
        ctx.fillRect(x + fullWidth, y, emptyWidth, this.actualHeight);
    }
}
