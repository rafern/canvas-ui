import { Variable, VariableCallback } from '../mixins/Variable';
import { PointerRelease } from '../events/PointerRelease';
import { ThemeProperty } from '../theme/ThemeProperty';
import { PointerEvent } from '../events/PointerEvent';
import { PointerPress } from '../events/PointerPress';
import { Labelable } from '../mixins/Labelable';
import { KeyPress } from '../events/KeyPress';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import { FlexWidget } from './FlexWidget';
import type { Root } from '../core/Root';

export class TextInput extends Labelable(Variable<string, typeof FlexWidget>(FlexWidget)) {
    // At what timestamp did the blinking start
    private blinkStart = 0;
    // Was the cursor shown last frame due to blinking?
    private blinkWasOn: boolean | null = null;
    // Current cursor position (index)
    private cursorPos = 0;
    // Current cursor offset (pixels)
    private cursorOffset = 0;
    // Does the cursor offset need to be updated?
    private cursorOffsetDirty = false;

    // A widget that accepts keyboard input and holds a text value
    constructor(callback: VariableCallback<string | null> | null = null, initialValue = '', themeOverride: Theme | null = null) {
        // TextInputs clear their own background, have no children and don't
        // propagate events
        super(themeOverride, false, false);

        this.callback = callback;
        this._value = initialValue;

        // TextInputs are always horizontal
        this.vertical = false;
    }

    get blinkOn(): boolean | null {
        if(this.blinkStart === 0)
            return null;

        const blinkRate = this.theme.getSize(ThemeProperty.BlinkRate);
        return Math.trunc(((Date.now() - this.blinkStart) / (500 * blinkRate)) % 2) === 0;
    }

    moveCursorTo(index: number): void {
        // Update cursor position, checking for boundaries
        if(index < 0)
            this.cursorPos = 0;
        else if(this._value === null)
            this.cursorPos = 0;
        else if(index > this._value.length)
            this.cursorPos = this._value.length;
        else
            this.cursorPos = index;

        // Update cursor offset
        this.cursorOffsetDirty = true;
        this.dirty = true;
    }

    moveCursor(delta: number): void {
        this.moveCursorTo(this.cursorPos + delta);
    }

    insertText(str: string): void {
        let value = this._value;

        // Special case for null value
        if(value === null) {
            this.value = str;
            this.moveCursorTo(str.length);
            return;
        }

        // Insert string in current cursor position
        this.value = value.substring(0, this.cursorPos) + str + value.substring(this.cursorPos);
        // Move cursor neccessary amount forward
        this.moveCursor(str.length);
    }

    deleteText(delta: number): void {
        // Special case for null value
        if(this._value === null)
            return;

        // Delete characters forwards if delta is positive, backwards if delta
        // is negative. Deleting characters backwards results in moving the
        // cursor
        if(delta > 0)
            this.value = this._value.substring(0, this.cursorPos) + this._value.substring(this.cursorPos + delta);
        else if(delta < 0) {
            // NOTE, still checking if delta < 0 so that nothing is done if
            // delta is 0
            this.value = this._value.substring(0, this.cursorPos + delta) + this._value.substring(this.cursorPos);
            this.moveCursor(delta);
        }
    }

    onFocusDropped(focusType: FocusType, _root: Root): void {
        // Stop blinking cursor if keyboard focus lost
        if(focusType === FocusType.Keyboard)
            this.blinkStart = 0;
    }

    protected handleEvent(event: Event, _width: number, _height: number, root: Root): this {
        if(event instanceof PointerEvent) {
            // If this is a pointer event, set pointer style and handle clicks
            root.pointerStyle = 'text';

            // Request keyboard focus if this is a pointer press
            if(event instanceof PointerPress) {
                // Update cursor position (and offset) from click position
                [this.cursorPos, this.cursorOffset] = this.findIndexOffsetFromOffset(event.x);

                // Start blinking cursor and mark component as dirty, to
                // make sure that cursor blink always resets for better
                // feedback
                this.blinkStart = Date.now();
                this.dirty = true;

                // Request focus
                root.requestFocus(FocusType.Keyboard, this);
            }
            // Get mobile-friendly text input if available
            else if(event instanceof PointerRelease && root.hasMobileTextInput) {
                let initialValue = this.value;
                if(initialValue === null)
                    initialValue = '';

                root.getTextInput(initialValue).then((newValue: string | null) => {
                    if(newValue === null)
                        return;

                    if(this.value !== newValue) {
                        this.value = newValue;
                        this.moveCursorTo(newValue.length);
                    }
                });
            }

            return this;
        }
        else if(event instanceof KeyPress) {
            // If this is a key press, do the key's action
            if(event.key.length === 1)
                this.insertText(event.key); // Insert character
            else if(event.key === 'Backspace')
                this.deleteText(-1); // Delete backwards
            else if(event.key === 'Delete')
                this.deleteText(1); // Delete forwards
            else if(event.key === 'ArrowLeft')
                this.moveCursor(-1); // Move cursor left
            else if(event.key === 'ArrowRight')
                this.moveCursor(1); // Move cursor right
            else if(event.key === 'Home')
                this.moveCursorTo(0); // Move cursor to beginning
            else if(event.key === 'End')
                this.moveCursorTo(this.valueLength); // Move cursor to end
            else if(event.key === 'Escape') {
                root.dropFocus(FocusType.Keyboard, this); // Drop focus
                return this;
            }
            else
                return this; // Ignore key if it is unknown

            // Reset blink time for better feedback
            this.blinkStart = Date.now();
        }

        return this;
    }

    handlePreLayoutUpdate(_root: Root): void {
        // Mark as dirty when a blink needs to occur
        if(this.blinkOn !== this.blinkWasOn)
            this.dirty = true;

        // Update Labelable variables
        const cursorPadding = this.theme.getSize(ThemeProperty.CursorPadding);
        const cursorThickness = this.theme.getSize(ThemeProperty.CursorThickness);
        const widthError = cursorPadding + cursorThickness;

        this.setText(this._value ?? '');
        this.setFont(this.theme.getFont(ThemeProperty.InputTextFont));
        this.setMinLabelWidth(this.theme.getSize(ThemeProperty.InputTextMinWidth) - widthError);
        this.setMinLabelAscent(this.theme.getSize(ThemeProperty.InputTextMinAscent));
        this.setMinLabelDescent(this.theme.getSize(ThemeProperty.InputTextMinDescent));

        if(this.cursorOffsetDirty) {
            this.cursorOffset = this.findOffsetFromIndex(this.cursorPos);
            this.cursorOffsetDirty = false;
        }

        this.flexRatio = this.theme.getSize(ThemeProperty.InputTextFlexRatio);
        this.internalMainBasis = this.labelWidth + widthError;
        this.internalCrossBasis = this.labelHeight;
    }

    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Paint background
        ctx.fillStyle = this.theme.getFill(ThemeProperty.InputBackgroundFill);
        ctx.fillRect(x, y, width, height);

        // Paint current text value
        ctx.font = this.theme.getFont(ThemeProperty.InputTextFont);
        ctx.fillStyle = this.theme.getFill(ThemeProperty.InputTextFill);

        ctx.fillText(
            this._value ?? '',
            x,
            y + height - this.labelDescent,
        );

        // Paint blink
        const blinkOn = this.blinkOn;
        this.blinkWasOn = blinkOn;
        if(!blinkOn)
            return;

        const cursorPadding = this.theme.getSize(ThemeProperty.CursorPadding);
        const cursorThickness = this.theme.getSize(ThemeProperty.CursorThickness);
        ctx.fillRect(
            x + this.cursorOffset,
            y + cursorPadding,
            cursorThickness,
            height - cursorPadding * 2,
        );
    }

    get valueLength(): number {
        if(this._value === null)
            return 0;

        return this._value.length;
    }
}
