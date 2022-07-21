import type { WatchableVariable } from '../helpers/WatchableVariable';
import { ButtonClickHelper } from '../helpers/ButtonClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { VariableCallback } from '../helpers/VariableCallback';
import { ClickState } from '../helpers/ClickState';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A radio button widget; used for selecting one of many options. Uses a shared
 * {@link Variable} instance and expects the creation of multiple RadioButton
 * instances.
 *
 * @typeParam V - The type stored in the {@link RadioButton#"variable"}; when a radio button is clicked, the value inside the variable has this type.
 *
 * @category Widget
 */
export class RadioButton<V> extends Widget {
    /** Horizontal offset. */
    private offsetX = 0;
    /** Vertical offset. */
    private offsetY = 0;
    /** Actual length after resolving layout. */
    private actualLength = 0;
    /** The helper used for handling pointer clicks and enter presses */
    protected clickHelper: ButtonClickHelper;
    /** The shared {@link WatchableVariable} where the value is set */
    protected variable: WatchableVariable<V>;
    /**
     * The value that will be used when the {@link RadioButton#"variable"} is
     * set
     */
    protected value: V;
    /**
     * The callback used for the {@link RadioButton#"variable"}. This extra copy
     * is kept so that there is a strong reference linked to the radio button's
     * lifespan
     */
    private readonly callback: VariableCallback<V>;
    /** Was the radio button selected in the last paint? */
    private _wasSelected = false;

    /**
     * Create a new radio button.
     *
     * @param variable - The shared variable that radio buttons will save the value to when selected.
     * @param value - The value that will be used to set the {@link RadioButton#"variable"} when the radio button is clicked
     */
    constructor(variable: WatchableVariable<V>, value: V, themeProperties?: ThemeProperties) {
        // Radio buttons need a clear background, have no children and don't
        // propagate events
        super(true, false, themeProperties);

        this.tabFocusable = true;
        this.variable = variable;
        this.value = value;
        this.clickHelper = new ButtonClickHelper(this);
        this.callback = this.handleChange.bind(this);
        this._wasSelected = this.selected;
    }

    protected handleChange(_newValue: V): void {
        if(this.selected !== this._wasSelected)
            this._dirty = true;
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'radioButtonLength') {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'backgroundGlowFill' ||
                property === 'backgroundFill' ||
                property === 'accentFill' ||
                property === 'primaryFill' ||
                property === 'radioButtonInnerPadding')
        {
            this._dirty = true;
        }
    }

    /**
     * Select this radio button. Sets the value in
     * {@link RadioButton#"variable"} to be {@link RadioButton#value}
     */
    select() {
        this.variable.value = this.value;
    }

    /**
     * Is the radio button selected? Equivalent to checking if the value in the
     * {@link RadioButton#"variable"} is strictly equal to the
     * {@link RadioButton#value}
     */
    get selected(): boolean {
        return this.variable.value === this.value;
    }

    override onFocusGrabbed(focusType: FocusType): void {
        if(this.clickHelper.onFocusGrabbed(focusType))
            this._dirty = true;
    }

    override onFocusDropped(focusType: FocusType): void {
        if(this.clickHelper.onFocusDropped(focusType))
            this._dirty = true;
    }

    protected override handleEvent(event: Event): this | null {
        const x = this.x + this.offsetX;
        const y = this.y + this.offsetY;
        const [wasClick, capture] = this.clickHelper.handleEvent(
            event,
            this.root,
            true,
            [x, x + this.actualLength, y, y + this.actualLength]
        );

        // Select radio button if button was clicked
        if(wasClick)
            this.select();

        // Always flag as dirty if the click state changed (so glow colour takes
        // effect). Toggle value if clicked
        if(this.clickHelper.clickStateChanged)
            this._dirty = true;

        return capture ? this : null;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Find actual length
        const length = this.radioButtonLength;
        this.actualLength = Math.min(length, maxWidth, maxHeight);

        // Resolve width and height
        this.width = this.actualLength;
        this.height = this.actualLength;

        if(this.width < minWidth)
            this.width = minWidth;
        if(this.height < minHeight)
            this.height = minHeight;

        // Center radio button
        this.offsetX = (this.width - this.actualLength) / 2;
        this.offsetY = (this.height - this.actualLength) / 2;
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void {
        this._wasSelected = this.selected;

        // Should we use glow colours? (background glow and accent)
        const useGlow = this.clickHelper.clickState === ClickState.Hover ||
                        this.clickHelper.clickState === ClickState.Hold;

        // Draw unchecked part of radio button
        if(useGlow)
            ctx.fillStyle = this.backgroundGlowFill;
        else
            ctx.fillStyle = this.backgroundFill;

        const halfLength = this.actualLength / 2;
        const radioX = this.offsetX + this.x + halfLength;
        const radioY = this.offsetY + this.y + halfLength;
        this.paintCircle(ctx, radioX, radioY, halfLength);

        // Draw checked part of checkbox
        if(this.selected) {
            if(useGlow)
                ctx.fillStyle = this.accentFill;
            else
                ctx.fillStyle = this.primaryFill;

            const innerLength = this.actualLength - this.radioButtonInnerPadding * 2;

            // Fall back to filling entire radio button if there isn't enough
            // space for padding
            if(innerLength <= 0)
                this.paintCircle(ctx, radioX, radioY, halfLength);
            else {
                const halfInnerLength = innerLength / 2;
                this.paintCircle(ctx, radioX, radioY, halfInnerLength);
            }
        }
    }

    override activate(root: Root, parent: Widget | null): void {
        super.activate(root, parent);
        this.variable.watch(this.callback);
    }

    override deactivate(): void {
        super.deactivate();
        this.variable.unwatch(this.callback);
    }
}
