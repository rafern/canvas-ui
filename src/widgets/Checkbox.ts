import type { VariableCallback } from '../state/VariableCallback';
import { ButtonClickHelper } from '../helpers/ButtonClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { WatchableVariable } from '../state/WatchableVariable';
import { ClickState } from '../helpers/ClickState';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
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
    /** The helper used for handling pointer clicks and enter presses */
    protected clickHelper: ButtonClickHelper;
    /** The helper for keeping track of the checkbox value */
    protected variable: WatchableVariable<boolean>;

    /**
     * Create a new Checkbox.
     *
     * @param callback - An optional callback called when the checkbox is ticked or unticked. If null, then no callback is called.
     */
    constructor(callback: VariableCallback<boolean> | null = null, initialValue = false, themeProperties?: ThemeProperties) {
        // Checkboxes need a clear background, have no children and don't
        // propagate events
        super(true, false, themeProperties);

        this.tabFocusable = true;
        // Save callback and initial value
        this.variable = new WatchableVariable<boolean>(initialValue);
        if(callback)
            this.variable.watch(callback);

        // Setup click helper
        this.clickHelper = new ButtonClickHelper(this);
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'checkboxLength') {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'backgroundGlowFill' ||
                property === 'backgroundFill' ||
                property === 'accentFill' ||
                property === 'primaryFill' ||
                property === 'checkboxInnerPadding')
        {
            this._dirty = true;
        }
    }

    /** Is the checkbox checked? */
    set checked(checked: boolean) {
        this.variable.value = checked;
    }

    get checked(): boolean {
        return this.variable.value;
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
        const x = this.idealX + this.offsetX;
        const y = this.idealY + this.offsetY;
        const [wasClick, capture] = this.clickHelper.handleEvent(
            event,
            this.root,
            true,
            [x, x + this.actualLength, y, y + this.actualLength]
        );

        // Swap value if checkbox was clicked
        if(wasClick)
            this.checked = !this.checked;

        // Always flag as dirty if the click state changed (so glow colour takes
        // effect). Toggle value if clicked
        if(this.clickHelper.clickStateChanged)
            this._dirty = true;

        return capture ? this : null;
    }

    protected override handlePostLayoutUpdate(): void {
        // Mark as dirty if variable is dirty
        if(this.variable.dirty)
            this._dirty = true;
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Resolve width and height
        const minLength = Math.min(this.checkboxLength, maxWidth, maxHeight);
        this.idealWidth = minLength;
        this.idealHeight = minLength;

        if(this.idealWidth < minWidth)
            this.idealWidth = minWidth;
        if(this.idealHeight < minHeight)
            this.idealHeight = minHeight;
    }

    override finalizeBounds() {
        super.finalizeBounds();

        // Center checkbox
        this.actualLength = Math.min(this.checkboxLength, this.width, this.height);
        this.offsetX = (this.width - this.actualLength) / 2;
        this.offsetY = (this.height - this.actualLength) / 2;
    }

    protected override handlePainting(_forced: boolean): void {
        // Should we use glow colours? (background glow and accent)
        const useGlow = this.clickHelper.clickState === ClickState.Hover ||
                        this.clickHelper.clickState === ClickState.Hold;

        // Draw unchecked part of checkbox
        const ctx = this.viewport.context;
        if(useGlow)
            ctx.fillStyle = this.backgroundGlowFill;
        else
            ctx.fillStyle = this.backgroundFill;

        const checkboxX = this.offsetX + this.x;
        const checkboxY = this.offsetY + this.y;
        ctx.fillRect(
            checkboxX, checkboxY, this.actualLength, this.actualLength,
        );

        // Draw checked part of checkbox
        if(this.checked) {
            if(useGlow)
                ctx.fillStyle = this.accentFill;
            else
                ctx.fillStyle = this.primaryFill;

            const innerPadding = this.checkboxInnerPadding;
            const innerLength = this.actualLength - innerPadding * 2;

            // Fall back to filling entire checkbox if there isn't enough space
            // for padding
            if(innerLength <= 0) {
                ctx.fillRect(
                    checkboxX,
                    checkboxY,
                    this.actualLength,
                    this.actualLength,
                );
            }
            else {
                ctx.fillRect(
                    checkboxX + innerPadding,
                    checkboxY + innerPadding,
                    innerLength,
                    innerLength,
                );
            }
        }
    }
}
