import type { TextValidator } from '../validators/Validator';
import { PointerRelease } from '../events/PointerRelease';
import { ThemeProperty } from '../theme/ThemeProperty';
import { TextHelper } from '../aggregates/TextHelper';
import { PointerEvent } from '../events/PointerEvent';
import { PointerPress } from '../events/PointerPress';
import { Variable } from '../aggregates/Variable';
import { KeyPress } from '../events/KeyPress';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
import { PointerWheel } from '../events/PointerWheel';

/**
 * A flexbox widget that allows for a single line of text input.
 *
 * Supports obscuring the text with {@link hideText}, which shows all characters
 * as black circles like in password fields, text validation and toggling
 * editing.
 *
 * If a {@link TextInputHandler} is set, then that will be used instead of
 * keyboard input for mobile compatibility.
 *
 * @template V The type of {@link value}; the type of the transformed value returned by the validator.
 *
 * @category Widget
 */
export class TextInput<V> extends Widget {
    /**
     * At what timestamp did the blinking start. If 0, then the text cursor is
     * not blinking.
     */
    private blinkStart = 0;
    /**
     * Was the cursor shown last frame due to blinking? If null, then the text
     * cursor is not blinking.
     */
    private blinkWasOn: boolean | null = null;
    /** Current cursor position (index, not offset). */
    private cursorPos = 0;
    /** Current cursor offset in pixels. */
    private cursorOffset = 0;
    /** Does the cursor offset need to be updated? */
    private cursorOffsetDirty = false;
    /** Is editing enabled? */
    private _editingEnabled = true;
    /** Is the text hidden? */
    private _hideText = false;
    /** Is the text valid? */
    private _valid;
    /** Last valid value. */
    private _validValue;
    /** The helper for measuring/painting text */
    protected textHelper: TextHelper;
    /** The helper for keeping track of the input value */
    protected variable: Variable<string>;

    /** Create a new TextInput. */
    constructor(validator: TextValidator<V>, initialValue = '', themeOverride: Theme | null = null) {
        // TextInputs clear their own background, have no children and don't
        // propagate events
        super(themeOverride, false, false);

        this.textHelper = new TextHelper();
        this.variable = new Variable<string>(initialValue, (text: string) => {
            const [valid, validatedValue] = validator(text);

            if(valid)
                this._validValue = validatedValue;

            if(valid !== this._valid) {
                this._valid = valid;
                this._dirty = true;
            }
        });
        [this._valid, this._validValue] = validator(initialValue);
    }

    /**
     * Is the text cursor shown?
     *
     * @returns Returns true if the text cursor is shown, false if not shown but the text input is in use, or null if the text cursor is not shown due to the text input not being in use.
     */
    get blinkOn(): boolean | null {
        if(this.blinkStart === 0)
            return null;

        const blinkRate = this.theme.getNumber(ThemeProperty.BlinkRate);
        return Math.trunc(((Date.now() - this.blinkStart) / (500 * blinkRate)) % 2) === 0;
    }

    /**
     * Is editing enabled?
     *
     * Tied to {@link _editingEnabled}. If changed, {@link _dirty} is set to
     * true. If disabled, blinking stops and the cursor position is reset to the
     * beginning.
     */
    get editingEnabled(): boolean {
        return this._editingEnabled;
    }

    set editingEnabled(editingEnabled: boolean) {
        if(this._editingEnabled !== editingEnabled) {
            this._editingEnabled = editingEnabled;

            // Disable blinking and reset cursor position if disabled
            if(!editingEnabled) {
                this.blinkStart = 0;
                this.moveCursorTo(0);
            }

            // Mark as dirty; the text color changes
            this._dirty = true;
        }
    }

    /**
     * Is the text hidden?
     *
     * Tied to {@link _hideText}. If changed, {@link _dirty} and
     * {@link cursorOffsetDirty} are set to true.
     */
    get hideText(): boolean {
        return this._hideText;
    }

    set hideText(hideText: boolean) {
        if(this._hideText !== hideText) {
            this._hideText = hideText;

            // Mark as dirty and cursor offset as dirty; the text is
            // (de)obfuscated
            this.cursorOffsetDirty = true;
            this._dirty = true;
        }
    }

    /** The current text value. */
    set text(text: string) {
        this.variable.value = text;
    }

    get text(): string {
        return this.variable.value;
    }

    /**
     * Get the text as it is shown. If the text is hidden, all characters are
     * replaced with a black circle.
     */
    get displayedText(): string {
        if(this._hideText)
            return '●'.repeat(this.variable.value.length);
        else
            return this.variable.value;
    }

    /** Is the current value in the text input valid? */
    get valid(): boolean {
        return this._valid;
    }

    /** The last valid value, transformed by the validator. */
    get validValue(): V {
        return this._validValue;
    }

    /** The current minimum text width. */
    set minWidth(minWidth: number) {
        this.textHelper.minWidth = minWidth;
    }

    get minWidth(): number {
        return this.textHelper.minWidth;
    }

    /** The current minimum text ascent height. */
    set minAscent(minAscent: number) {
        this.textHelper.minAscent = minAscent;
    }

    get minAscent(): number {
        return this.textHelper.minAscent;
    }

    /** The current minimum text descent height. */
    set minDescent(minDescent: number) {
        this.textHelper.minDescent = minDescent;
    }

    get minDescent(): number {
        return this.textHelper.minDescent;
    }

    /**
     * Move the cursor to a given index.
     *
     * Sets {@link _dirty} and {@link cursorOffsetDirty} to true.
     */
    moveCursorTo(index: number): void {
        // Update cursor position, checking for boundaries
        this.cursorPos = Math.min(Math.max(index, 0), this.text.length);

        // Update cursor offset
        this.cursorOffsetDirty = true;
        this._dirty = true;
    }

    /**
     * Move the cursor by a given index delta. Calls {@link moveCursorTo}
     *
     * @param delta The change in index; if a positive number, the cursor will be moved right by that amount, else, the cursor will be moved left by that amount.
     */
    moveCursor(delta: number): void {
        this.moveCursorTo(this.cursorPos + delta);
    }

    /**
     * Insert text at the current cursor index. Calls {@link moveCursorTo}
     * afterwards.
     */
    insertText(str: string): void {
        // Insert string in current cursor position
        this.text = this.text.substring(0, this.cursorPos) + str + this.text.substring(this.cursorPos);
        // Move cursor neccessary amount forward
        this.moveCursor(str.length);
    }

    /**
     * Deletes a certain amount of characters in a given direction from the
     * current cursor index. Calls {@link moveCursorTo} afterwards if
     * neccessary.
     *
     * @param delta The amount and direction of the deletion. For example, if 5, then 5 characters are deleted after the cursor. If -5, then 5 characters are deleted before the cursor and the cursor is moved 5 indices left.
     */
    deleteText(delta: number): void {
        // Delete characters forwards if delta is positive, backwards if delta
        // is negative. Deleting characters backwards results in moving the
        // cursor
        if(delta > 0)
            this.text = this.text.substring(0, this.cursorPos) + this.text.substring(this.cursorPos + delta);
        else if(delta < 0) {
            // NOTE, still checking if delta < 0 so that nothing is done if
            // delta is 0
            this.text = this.text.substring(0, this.cursorPos + delta) + this.text.substring(this.cursorPos);
            this.moveCursor(delta);
        }
    }

    override onFocusDropped(focusType: FocusType, _root: Root): void {
        // Stop blinking cursor if keyboard focus lost
        if(focusType === FocusType.Keyboard)
            this.blinkStart = 0;
    }

    protected override handleEvent(event: Event, root: Root): this | null {
        // If editing is disabled, abort
        if(!this._editingEnabled)
            return this;

        if(event instanceof PointerWheel) {
            // Don't capture wheel events
            return null;
        }
        else if(event instanceof PointerEvent) {
            // If this is a pointer event, set pointer style and handle clicks
            root.pointerStyle = 'text';

            // Request keyboard focus if this is a pointer press
            if(event instanceof PointerPress) {
                // Update cursor position (and offset) from click position
                const padding = this.theme.getNumber(ThemeProperty.InputTextInnerPadding);
                [this.cursorPos, this.cursorOffset] = this.textHelper.findIndexOffsetFromOffset(event.x - padding);

                // Start blinking cursor and mark component as dirty, to
                // make sure that cursor blink always resets for better
                // feedback
                this.blinkStart = Date.now();
                this._dirty = true;

                // Request focus
                root.requestFocus(FocusType.Keyboard, this);
            }
            // Get mobile-friendly text input if available
            else if(event instanceof PointerRelease && root.hasMobileTextInput) {
                root.getTextInput(this.text).then((newValue: string | null) => {
                    if(newValue === null)
                        return;

                    if(this.text !== newValue) {
                        this.text = newValue;
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
                this.moveCursorTo(this.text.length); // Move cursor to end
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

    protected override handlePreLayoutUpdate(root: Root): void {
        // Drop focus if editing is disabled
        if(!this.editingEnabled)
            root.dropFocus(FocusType.Keyboard, this);

        // Mark as dirty when a blink needs to occur
        if(this.blinkOn !== this.blinkWasOn)
            this._dirty = true;

        // Update TextHelper variables
        this.textHelper.text = this.displayedText;
        this.textHelper.font = this.theme.getFont(ThemeProperty.InputTextFont);
        this.textHelper.minWidth = this.theme.getNumber(ThemeProperty.InputTextMinWidth);
        this.textHelper.minAscent = this.theme.getNumber(ThemeProperty.InputTextMinAscent);
        this.textHelper.minDescent = this.theme.getNumber(ThemeProperty.InputTextMinDescent);

        if(this.cursorOffsetDirty) {
            this.cursorOffset = this.textHelper.findOffsetFromIndex(this.cursorPos);
            this.cursorOffsetDirty = false;
        }

        // Mark as dirty if text helper is dirty
        if(this.textHelper.dirty) {
            this._dirty = true;
            this._layoutDirty = true;
        }
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Only expand to the needed dimensions
        const padding = 2 * this.theme.getNumber(ThemeProperty.InputTextInnerPadding);
        this.width = Math.min(Math.max(minWidth, this.textHelper.width + padding), maxWidth);
        this.height = Math.min(Math.max(minHeight, this.textHelper.height + padding), maxHeight);
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D): void {
        // TODO scrolling
        // Paint background
        ctx.fillStyle = this.theme.getFill(ThemeProperty.InputBackgroundFill);
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Paint current text value
        ctx.font = this.theme.getFont(ThemeProperty.InputTextFont);
        if(this._editingEnabled) {
            if(this._valid)
                ctx.fillStyle = this.theme.getFill(ThemeProperty.InputTextFill);
            else
                ctx.fillStyle = this.theme.getFill(ThemeProperty.InputTextFillInvalid);
        }
        else
            ctx.fillStyle = this.theme.getFill(ThemeProperty.InputTextFillDisabled);

        const padding = this.theme.getNumber(ThemeProperty.InputTextInnerPadding);
        ctx.fillText(
            this.displayedText,
            this.x + padding,
            this.y + this.height - this.textHelper.descent - padding,
        );

        // Paint blink
        const blinkOn = this.blinkOn;
        this.blinkWasOn = blinkOn;
        if(!blinkOn)
            return;

        const cursorThickness = this.theme.getNumber(ThemeProperty.CursorThickness);
        ctx.fillRect(
            this.x + this.cursorOffset,
            this.y + padding,
            cursorThickness,
            this.height - padding * 2,
        );
    }
}
