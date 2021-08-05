import type { TextValidator } from '../validators/Validator';
import { multiFlagField } from '../decorators/FlagFields';
import { PointerRelease } from '../events/PointerRelease';
import { ThemeProperties } from '../theme/ThemeProperties';
import { TextHelper } from '../aggregates/TextHelper';
import { PointerEvent } from '../events/PointerEvent';
import { PointerPress } from '../events/PointerPress';
import { PointerWheel } from '../events/PointerWheel';
import { Variable } from '../aggregates/Variable';
import { KeyPress } from '../events/KeyPress';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

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
    private cursorOffset = [0, 0];
    /** Does the cursor offset need to be updated? */
    private cursorOffsetDirty = false;
    /** Is editing enabled? */
    private _editingEnabled = true;
    /**
     * Is the text hidden?
     * @multiFlagField(['cursorOffsetDirty', '_dirty'])
     */
    @multiFlagField(['cursorOffsetDirty', '_dirty'])
    hideText = false;
    /** Is the text valid? */
    private _valid;
    /** Last valid value. */
    private _validValue;
    /** The helper for measuring/painting text */
    protected textHelper: TextHelper;
    /** The helper for keeping track of the input value */
    protected variable: Variable<string>;

    /** Create a new TextInput. */
    constructor(validator: TextValidator<V>, initialValue = '', themeProperties?: ThemeProperties) {
        // TextInputs clear their own background, have no children and don't
        // propagate events
        super(false, false, themeProperties);

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

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'inputTextInnerPadding' ||
                property === 'inputTextFont' ||
                property === 'inputTextMinAscent' ||
                property === 'inputTextMinDescent')
        {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'inputBackgroundFill' ||
                property === 'inputTextFill' ||
                property === 'inputTextFillInvalid' ||
                property === 'inputTextFillDisabled' ||
                property === 'cursorThickness')
        {
            this._dirty = true;
        }
    }

    /**
     * Is the text cursor shown?
     *
     * @returns Returns true if the text cursor is shown, false if not shown but the text input is in use, or null if the text cursor is not shown due to the text input not being in use.
     */
    get blinkOn(): boolean | null {
        if(this.blinkStart === 0)
            return null;

        const blinkRate = this.blinkRate;
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
        if(this.hideText)
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

    /** The current line number, starting from 0. */
    get line(): number {
        const line = Math.floor(
            this.cursorOffset[1] / this.textHelper.fullLineHeight,
        );

        if(line < 0)
            return 0;

        const lineMax = Math.max(this.textHelper.lineRanges.length, 1);
        if(line < lineMax)
            return line;
        else
            return lineMax - 1;
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
     * Move the cursor given a given pointer offset.
     *
     * @param offsetX The horizontal offset in pixels, relative to the text area with padding removed
     * @param offsetY The vertical offset in pixels, relative to the text area with padding removed
     */
    moveCursorFromOffset(offsetX: number, offsetY: number): void {
        [this.cursorPos, this.cursorOffset] = this.textHelper.findIndexOffsetFromOffset(
            [ offsetX, offsetY ],
        );

        // Start blinking cursor and mark component as dirty, to
        // make sure that cursor blink always resets for better
        // feedback
        this.blinkStart = Date.now();
        this._dirty = true;
    }

    /**
     * Move the cursor by a given line delta. Calls {@link moveCursorFromOffset}
     *
     * @param delta The change in line; if a positive number, the cursor will be moved down by that amount, else, the cursor will be moved up by that amount.
     */
    moveCursorLine(delta: number): void {
        this.moveCursorFromOffset(
            this.cursorOffset[0],
            this.cursorOffset[1] + (0.5 + delta) * this.textHelper.fullLineHeight,
        );
    }

    /**
     * Move the cursor to the start of the line. Calls {@link moveCursorTo}
     */
    moveCursorStart(): void {
        // Special case for empty text (which has no line ranges)
        const ranges =  this.textHelper.lineRanges;
        if(ranges.length === 0)
            this.moveCursorTo(0);
        else
            this.moveCursorTo(ranges[this.line][0]);
    }

    /**
     * Move the cursor to the end of the line. Calls {@link moveCursorTo}
     */
    moveCursorEnd(): void {
        // Special case for empty text (which has no line ranges)
        const ranges =  this.textHelper.lineRanges;
        if(ranges.length === 0) {
            this.moveCursorTo(0);
            return;
        }

        let candidateIndex = ranges[this.line][1];

        // Special case for newlines, since they occupy a character in the range
        if(candidateIndex > 0 && this.text[candidateIndex - 1] === '\n')
            candidateIndex--;

        this.moveCursorTo(candidateIndex);
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
                const padding = this.inputTextInnerPadding;
                this.moveCursorFromOffset(
                    event.x - this.x - padding, event.y - this.y - padding,
                );

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
            else if(event.key === 'ArrowUp')
                this.moveCursorLine(-1); // Move cursor up
            else if(event.key === 'ArrowDown')
                this.moveCursorLine(1); // Move cursor down
            else if(event.key === 'PageUp')
                this.moveCursorLine(-5); // Move cursor up x5
            else if(event.key === 'PageDown')
                this.moveCursorLine(5); // Move cursor down x5
            else if(event.key === 'Home')
                this.moveCursorStart(); // Move cursor to beginning
            else if(event.key === 'End')
                this.moveCursorEnd(); // Move cursor to end
            else if(event.key === 'Escape') {
                root.dropFocus(FocusType.Keyboard, this); // Drop focus
                return this;
            }
            else if(event.key === 'Enter')
                this.insertText('\n');
            else if(event.key === 'Tab')
                this.insertText('\t');
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
        this.textHelper.font = this.inputTextFont;
        this.textHelper.lineHeight = this.inputTextHeight;
        this.textHelper.lineSpacing = this.inputTextSpacing;

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
        this.textHelper.maxWidth = maxWidth;
        if(this.textHelper.dirty)
            this._dirty = true;

        const padding = 2 * this.inputTextInnerPadding;
        this.width = Math.min(Math.max(minWidth, this.textHelper.width + padding), maxWidth);
        this.height = Math.min(Math.max(minHeight, this.textHelper.height + padding), maxHeight);
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D): void {
        // TODO scrolling
        // Paint background
        ctx.fillStyle = this.inputBackgroundFill;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Paint current text value
        let fillStyle;
        if(this._editingEnabled) {
            if(this._valid)
                fillStyle = this.inputTextFill;
            else
                fillStyle = this.inputTextFillInvalid;
        }
        else
            fillStyle = this.inputTextFillDisabled;

        const padding = this.inputTextInnerPadding;
        this.textHelper.paint(ctx, fillStyle, this.x + padding, this.y + padding)

        // Paint blink
        const blinkOn = this.blinkOn;
        this.blinkWasOn = blinkOn;
        if(!blinkOn)
            return;

        const cursorThickness = this.cursorThickness;
        ctx.fillStyle = fillStyle;
        ctx.fillRect(
            this.x + padding + this.cursorOffset[0],
            this.y + padding + this.cursorOffset[1],
            cursorThickness,
            this.textHelper.actualLineHeight + this.textHelper.actualLineSpacing,
        );
    }
}
