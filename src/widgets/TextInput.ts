import { layoutField, multiFlagField, paintArrayField } from '../decorators/FlagFields';
import type { TextValidator } from '../validators/Validator';
import { ThemeProperties } from '../theme/ThemeProperties';
import { PointerRelease } from '../events/PointerRelease';
import { TextPasteEvent } from '../events/TextPasteEvent';
import { TextHelper } from '../aggregates/TextHelper';
import { PointerEvent } from '../events/PointerEvent';
import { PointerPress } from '../events/PointerPress';
import { PointerWheel } from '../events/PointerWheel';
import { PointerMove } from '../events/PointerMove';
import { Variable } from '../aggregates/Variable';
import { KeyPress } from '../events/KeyPress';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Leave } from '../events/Leave';
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
    private cursorOffset: [number, number] = [0, 0];
    /** Current cursor selection start position (index, not offset). */
    private selectPos = 0;
    /** Current cursor selection start offset in pixels. */
    private selectOffset: [number, number] = [0, 0];
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
    /**
     * Current offset of the text in the text box. Used on overflow.
     * @paintArrayField()
     */
    @paintArrayField()
    private offset = [0, 0];
    /**
     * Is text wrapping enabled? If not, text will be panned if needed
     */
    @layoutField
    wrapText = true;
    /**
     * An input filter; a function which dictates whether a certain input can be
     * inserted in the text. If the function returns false given the input,
     * then the input will not be inserted in the text. Useful for preventing
     * newlines or forcing numeric input. Note that the input is not
     * neccessarily a character; it can be a whole sentence.
     */
    inputFilter: ((input: string) => boolean) | null = null;
    /** Is the pointer dragging? */
    private dragging = false;
    /** When was the last pointer click? For detecting double-clicks */
    private lastClick = 0;
    /**
     * If double-click dragging, what was the cursor position on the first
     * double-click? This will be null if not double-click dragging
     */
    private doubleDragStart: number | null = null;

    /** Create a new TextInput. */
    constructor(validator: TextValidator<V>, inputFilter: ((input: string) => boolean) | null = null, initialValue = '', themeProperties?: ThemeProperties) {
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
        this.inputFilter = inputFilter;
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
                this.moveCursorTo(0, false);
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
     *
     * @param select Should this do text selection?
     */
    moveCursorTo(index: number, select: boolean): void {
        // Update cursor position, checking for boundaries
        this.cursorPos = Math.min(Math.max(index, 0), this.text.length);

        if(!select)
            this.selectPos = this.cursorPos;

        // Update cursor offset
        this.cursorOffsetDirty = true;
        this._dirty = true;
    }

    /**
     * Move the cursor by a given index delta. Calls {@link moveCursorTo}
     *
     * @param delta The change in index; if a positive number, the cursor will be moved right by that amount, else, the cursor will be moved left by that amount.
     */
    moveCursor(delta: number, select: boolean): void {
        this.moveCursorTo(this.cursorPos + delta, select);
    }

    /**
     * Move the cursor given a given pointer offset.
     *
     * @param offsetX The horizontal offset in pixels, relative to the text area with padding removed
     * @param offsetY The vertical offset in pixels, relative to the text area with padding removed
     * @param select Should this do text selection?
     */
    moveCursorFromOffset(offsetX: number, offsetY: number, select: boolean): void {
        [this.cursorPos, this.cursorOffset] = this.textHelper.findIndexOffsetFromOffset(
            [ offsetX, offsetY ],
        );

        if(!select) {
            this.selectPos = this.cursorPos;
            this.selectOffset = this.cursorOffset;
        }

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
    moveCursorLine(delta: number, select: boolean): void {
        this.moveCursorFromOffset(
            this.cursorOffset[0],
            this.cursorOffset[1] + (0.5 + delta) * this.textHelper.fullLineHeight,
            select,
        );
    }

    /**
     * Move the cursor to the start of the line. Calls {@link moveCursorTo}
     */
    moveCursorStart(select: boolean): void {
        this.moveCursorTo(this.textHelper.lineRanges[this.line][0][0], select);
    }

    /**
     * Move the cursor to the end of the line. Calls {@link moveCursorTo}
     */
    moveCursorEnd(select: boolean): void {
        const range = this.textHelper.lineRanges[this.line];
        const groupIndex = range.length - 1;
        const group = range[groupIndex];
        const lastIndex = group[1];

        // Special case for newline in line with contents, since it counts as a
        // character
        if(lastIndex > 0 && this.text[lastIndex - 1] === '\n' && group[0] !== group[1])
            this.moveCursorTo(lastIndex - 1, select);
        else
            this.moveCursorTo(lastIndex, select);
    }

    /**
     * Move the cursor by skipping over a number of words. Calls
     * {@link moveCursorTo}
     *
     * @param delta The change in words; if a positive number, the cursor skip this amount of words, else, it will do the same, but backwards.
     */
    moveCursorWord(delta: number, select: boolean): void {
        if(delta == 0)
            return;

        const wordRegex = /\w/;
        const text = this.text;
        let targetPos = this.cursorPos;

        if(delta > 0) {
            while(delta > 0) {
                let insideWord = false;
                for(; targetPos <= text.length; targetPos++) {
                    if(targetPos < text.length && wordRegex.test(text[targetPos]))
                        insideWord = true;
                    else if(insideWord)
                        break;
                }

                delta--;
            }
        }
        else {
            while(delta < 0) {
                targetPos--;
                let insideWord = false;
                for(; targetPos >= 0; targetPos--) {
                    if(targetPos >= 0 && wordRegex.test(text[targetPos]))
                        insideWord = true;
                    else if(insideWord)
                        break;
                }

                targetPos++;
                delta++;
            }
        }

        this.moveCursorTo(targetPos, select);
    }

    /**
     * Deletes a range of text and moves the cursor to the start of the range.
     *
     * @param start The inclusive index of the start of the text range
     * @param end The exclusive index of the end of the text range
     */
    deleteRange(start: number, end: number): void {
        if(start === end)
            return;

        // Delete text
        this.text = this.text.substring(0, start) + this.text.substring(end);

        // Update cursor position
        this.cursorPos = this.selectPos = start;
        this.cursorOffsetDirty = true;
    }

    /**
     * Like {@link moveCursorWord}, but for deleting words. Calls
     * {@link moveCursorWord} and {@link deleteRange}. If text is being
     * selected, delta is ignored and the selection is deleted instead. Note
     * that a delta of zero doesn't delete anything.
     */
    deleteWord(delta: number): void {
        if(delta === 0)
            return;

        // Delete selection
        if(this.cursorPos !== this.selectPos) {
            this.deleteRange(
                Math.min(this.cursorPos, this.selectPos),
                Math.max(this.cursorPos, this.selectPos),
            );
            return;
        }

        // Move cursor by wanted words
        const oldPos = this.cursorPos;
        this.moveCursorWord(delta, false);

        // If cursor position is different, delete
        if(oldPos !== this.cursorPos) {
            this.deleteRange(
                Math.min(oldPos, this.cursorPos),
                Math.max(oldPos, this.cursorPos),
            );
        }
    }

    /**
     * Insert text at the current cursor index. Calls {@link moveCursorTo}
     * afterwards.
     */
    insertText(str: string): void {
        // Abort if input can't be inserted
        if(this.inputFilter !== null && !this.inputFilter(str))
            return;

        if(this.selectPos === this.cursorPos) {
            // Insert string in current cursor position
            this.text = this.text.substring(0, this.cursorPos) + str + this.text.substring(this.cursorPos);
            // Move cursor neccessary amount forward
            this.moveCursor(str.length, false);
        }
        else {
            const start = Math.min(this.cursorPos, this.selectPos);
            const end = Math.max(this.cursorPos, this.selectPos);

            // Replace text in selection with the one being inserted
            this.text = this.text.substring(0, start) + str + this.text.substring(end);
            // Move cursor to end of selection after insert
            this.moveCursorTo(start + str.length, false);
        }
    }

    /**
     * Deletes a certain amount of characters in a given direction from the
     * current cursor index. Calls {@link deleteRange} or {@link moveCursorTo}
     * if neccessary. If text is being selected, delta is ignored and the
     * selection is deleted instead. Note that a delta of zero doesn't delete
     * anything.
     *
     * @param delta The amount and direction of the deletion. For example, if 5, then 5 characters are deleted after the cursor. If -5, then 5 characters are deleted before the cursor and the cursor is moved 5 indices left.
     */
    deleteText(delta: number): void {
        if(delta === 0)
            return;

        if(this.cursorPos !== this.selectPos) {
            // Delete selection
            this.deleteRange(
                Math.min(this.cursorPos, this.selectPos),
                Math.max(this.cursorPos, this.selectPos),
            );
        }
        else if(delta > 0) {
            // Delete forwards
            this.text = this.text.substring(0, this.cursorPos) + this.text.substring(this.cursorPos + delta);
        }
        else {
            // Delete backwards
            // NOTE, still checking if delta < 0 so that nothing is done if
            // delta is 0
            this.text = this.text.substring(0, this.cursorPos + delta) + this.text.substring(this.cursorPos);
            this.moveCursor(delta, false);
        }
    }

    /**
     * Select a range of text (either word or non-word, but not both) which
     * includes the given cursor position
     *
     * @returns Returns a 2-tuple with, respectively, the start and end of the range
     */
    private selectRangeAt(pos: number): [number, number] {
        const text = this.text;
        const wordRegex = /\w/;
        const isWord = wordRegex.test(text[pos]);
        const midPos = pos;

        // Grow left
        for(; pos >= 0; pos--) {
            if(wordRegex.test(text[pos]) !== isWord)
                break;
        }

        const startPos = pos + 1;

        // Grow right
        pos = midPos;
        for(; pos < text.length; pos++) {
            if(wordRegex.test(text[pos]) !== isWord)
                break;
        }

        return [startPos, pos];
    }

    override onFocusDropped(focusType: FocusType, _root: Root): void {
        // Stop blinking cursor if keyboard focus lost and stop dragging if
        // pointer focus is lost
        if(focusType === FocusType.Keyboard)
            this.blinkStart = 0;
    }

    protected override handleEvent(event: Event, root: Root): this | null {
        // If editing is disabled, abort
        if(!this._editingEnabled)
            return this;

        if(event instanceof Leave) {
            // Stop dragging if the pointer leaves the text input, since it
            // won't receive pointer release events outside the widget
            this.dragging = false;
            this.doubleDragStart = null;
            return this;
        }
        else if(event instanceof PointerWheel) {
            // Don't capture wheel events
            return null;
        }
        else if(event instanceof PointerEvent) {
            // If this is a pointer event, set pointer style and handle clicks
            root.pointerStyle = 'text';

            // Request keyboard focus if this is a pointer press with the
            // primary button
            if(event instanceof PointerPress || event instanceof PointerMove) {
                const isPress = event instanceof PointerPress && event.isPrimary();
                let doubleClick = false;
                if(isPress) {
                    this.dragging = true;
                    this.doubleDragStart = null;
                    const clickTime = (new Date()).getTime();

                    // Clicking again in less than 500 milliseconds counts as a
                    // double click
                    if(clickTime - this.lastClick < 500)
                        doubleClick = true;

                    this.lastClick = clickTime;
                }
                else if(!this.dragging)
                    return this;

                // Update cursor position (and offset) from click position
                const lastCursorPos = this.cursorPos;
                const padding = this.inputTextInnerPadding;
                this.moveCursorFromOffset(
                    event.x - this.x - padding + this.offset[0],
                    event.y - this.y - padding + this.offset[1],
                    !isPress && this.dragging,
                );

                // If this was a double-click and the cursor position didn't
                // change, start double-click dragging
                if(doubleClick && this.cursorPos === lastCursorPos) {
                    this.doubleDragStart = this.cursorPos;
                    this.lastClick = 0;
                }

                // If double-click dragging, select ranges of text
                if(this.doubleDragStart !== null) {
                    // Get the text range at the cursor and at the start of the
                    // double click drag, then mush them together into a single
                    // range
                    const [doubleStart, doubleEnd] = this.selectRangeAt(this.doubleDragStart);
                    const [curStart, curEnd] = this.selectRangeAt(this.cursorPos);
                    const start = Math.min(doubleStart, curStart);
                    const end = Math.max(doubleEnd, curEnd);

                    // Set cursor positions. Get the drag direction and swap
                    // cursor and select pos depending on the direction
                    if(this.cursorPos >= this.doubleDragStart) {
                        this.selectPos = start;
                        this.cursorPos = end;
                    }
                    else {
                        this.selectPos = end;
                        this.cursorPos = start;
                    }

                    this.cursorOffsetDirty = true;
                }

                // Request focus
                root.requestFocus(FocusType.Keyboard, this);
            }
            else if(event instanceof PointerRelease && event.isPrimary()) {
                // Stop dragging
                this.dragging = false;
                this.doubleDragStart = null;

                // Get mobile-friendly text input if available
                if(root.hasMobileTextInput) {
                    root.getTextInput(this.text).then((newValue: string | null) => {
                        if(newValue === null)
                            return;

                        if(this.text !== newValue) {
                            this.text = newValue;
                            this.moveCursorTo(newValue.length, false);
                        }
                    });
                }
            }

            return this;
        }
        else if(event instanceof KeyPress) {
            // Stop dragging
            this.dragging = false;
            this.doubleDragStart = null;

            // Ignore all key presses with alt modifier
            if(event.alt)
                return this;

            // Ignore most key presses if control is pressed
            if(event.ctrl) {
                if(event.key === 'Backspace')
                    this.deleteWord(-1); // Delete word backwards
                else if(event.key === 'Delete')
                    this.deleteWord(1); // Delete word forwards
                else if(event.key === 'ArrowLeft')
                    this.moveCursorWord(-1, event.shift); // Back-skip a word
                else if(event.key === 'ArrowRight')
                    this.moveCursorWord(1, event.shift); // Skip a word
                else if(event.key === 'c' || event.key === 'C') {
                    // Copy selected text to clipboard, if any
                    if(this.cursorPos === this.selectPos)
                        return this;

                    const selectedText = this.text.slice(
                        Math.min(this.cursorPos, this.selectPos),
                        Math.max(this.cursorPos, this.selectPos),
                    );

                    if(navigator.clipboard)
                        navigator.clipboard.writeText(selectedText);
                    else
                        return this;
                }
                else
                    return this;

                // Reset blink time for better feedback
                this.blinkStart = Date.now();
                return this;
            }

            // Regular key presses:
            if(event.key.length === 1)
                this.insertText(event.key); // Insert character
            else if(event.key === 'Backspace')
                this.deleteText(-1); // Delete backwards
            else if(event.key === 'Delete')
                this.deleteText(1); // Delete forwards
            else if(event.key === 'ArrowLeft')
                this.moveCursor(-1, event.shift); // Move cursor left
            else if(event.key === 'ArrowRight')
                this.moveCursor(1, event.shift); // Move cursor right
            else if(event.key === 'ArrowUp')
                this.moveCursorLine(-1, event.shift); // Move cursor up
            else if(event.key === 'ArrowDown')
                this.moveCursorLine(1, event.shift); // Move cursor down
            else if(event.key === 'PageUp')
                this.moveCursorLine(-5, event.shift); // Move cursor up x5
            else if(event.key === 'PageDown')
                this.moveCursorLine(5, event.shift); // Move cursor down x5
            else if(event.key === 'Home')
                this.moveCursorStart(event.shift); // Move cursor to beginning
            else if(event.key === 'End')
                this.moveCursorEnd(event.shift); // Move cursor to end
            else if(event.key === 'Escape') {
                root.dropFocus(FocusType.Keyboard, this); // Drop focus
                return this; // Return now so that blink time isn't reset
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
        else if(event instanceof TextPasteEvent && event.target === this) {
            // Insert pasted text
            this.insertText(event.text);

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

            if(this.selectPos === this.cursorPos) {
                this.selectOffset[0] = this.cursorOffset[0];
                this.selectOffset[1] = this.cursorOffset[1];
            }
            else
                this.selectOffset = this.textHelper.findOffsetFromIndex(this.selectPos);

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
        const padding = 2 * this.inputTextInnerPadding;
        this.textHelper.maxWidth = this.wrapText ? Math.max(maxWidth - padding, 0) : Infinity;
        if(this.textHelper.dirty)
            this._dirty = true;

        this.width = Math.min(Math.max(minWidth, this.textHelper.width + padding), maxWidth);
        this.height = Math.min(Math.max(minHeight, this.textHelper.height + padding), maxHeight);
    }

    protected override handlePostLayoutUpdate(_root: Root): void {
        // Check if panning is needed
        const padding = this.inputTextInnerPadding;
        const innerWidth = this.textHelper.width;
        const innerHeight = this.textHelper.height;
        const usableWidth = this.width - padding * 2;
        const usableHeight = this.height - padding * 2;
        const candidateOffset = this.offset;
        const [cursorX, cursorY] = this.cursorOffset;

        if(innerWidth > usableWidth) {
            // Horizontal panning needed
            const deadZone = Math.min(20, usableWidth / 2);
            const left = candidateOffset[0] + deadZone;
            const right = candidateOffset[0] + usableWidth - deadZone;

            // Pan right
            if(cursorX > right)
                candidateOffset[0] += cursorX - right;

            // Pan left
            if(cursorX < left)
                candidateOffset[0] -= left - cursorX;

            // Clamp
            if(candidateOffset[0] + usableWidth > innerWidth)
                candidateOffset[0] = innerWidth - usableWidth;
            if(candidateOffset[0] < 0)
                candidateOffset[0] = 0;
        }
        else {
            // Horizontal panning not needed
            candidateOffset[0] = 0;
        }

        if(innerHeight > usableHeight) {
            // Vertical panning needed
            const fullLineHeight = this.textHelper.fullLineHeight;
            const deadZone = usableHeight < 2 * fullLineHeight ? 0 : fullLineHeight / 2;
            const top = candidateOffset[1] + deadZone;
            const bottom = candidateOffset[1] + usableHeight - deadZone - fullLineHeight;

            // Pan down
            if(cursorY > bottom)
                candidateOffset[1] += cursorY - bottom;

            // Pan up
            if(cursorY < top)
                candidateOffset[1] -= top - cursorY;

            // Clamp
            if(candidateOffset[1] + usableHeight > innerHeight)
                candidateOffset[1] = innerHeight - usableHeight;
            if(candidateOffset[1] < 0)
                candidateOffset[1] = 0;
        }
        else {
            // Vertical panning not needed
            candidateOffset[1] = 0;
        }

        this.offset = candidateOffset;
    }

    protected override handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void {
        // Paint background
        ctx.fillStyle = this.inputBackgroundFill;
        ctx.fillRect(this.x, this.y, this.width, this.height);

        // Start clipping
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.clip();

        // Paint background for selection if there is a selection
        const padding = this.inputTextInnerPadding;
        if(this.cursorPos !== this.selectPos) {
            ctx.fillStyle = this.inputSelectBackgroundFill;
            if(this.cursorOffset[1] === this.selectOffset[1]) {
                // Same line
                const left = Math.min(this.cursorOffset[0], this.selectOffset[0]);
                const right = Math.max(this.cursorOffset[0], this.selectOffset[0]);
                ctx.fillRect(
                    this.x + padding + left - this.offset[0],
                    this.y + padding + this.cursorOffset[1] - this.offset[1],
                    right - left,
                    this.textHelper.fullLineHeight,
                );
            }
            else {
                // Spans multiple lines
                let topOffset: [number, number], bottomOffset: [number, number];
                if(this.cursorOffset[1] < this.selectOffset[1]) {
                    topOffset = this.cursorOffset;
                    bottomOffset = this.selectOffset;
                }
                else {
                    bottomOffset = this.cursorOffset;
                    topOffset = this.selectOffset;
                }

                // Top line:
                const fullLineHeight = this.textHelper.fullLineHeight;
                const topWidth = this.width + this.offset[0] - topOffset[0] - padding;
                if(topWidth > 0) {
                    ctx.fillRect(
                        this.x + padding + topOffset[0] - this.offset[0],
                        this.y + padding + topOffset[1] - this.offset[1],
                        topWidth,
                        fullLineHeight,
                    );
                }

                // Bottom line:
                const bottomWidth = bottomOffset[0] + padding - this.offset[0];
                if(bottomWidth > 0) {
                    ctx.fillRect(
                        this.x,
                        this.y + padding + bottomOffset[1] - this.offset[1],
                        bottomWidth,
                        fullLineHeight,
                    );
                }

                // Middle lines:
                const middleYOffset = topOffset[1] + fullLineHeight;
                const middleHeight = bottomOffset[1] - middleYOffset;
                if(middleHeight > 0) {
                    ctx.fillRect(
                        this.x,
                        this.y + padding + middleYOffset - this.offset[1],
                        this.width,
                        middleHeight,
                    );
                }
            }
        }

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

        this.textHelper.paint(
            ctx, fillStyle,
            this.x + padding - this.offset[0],
            this.y + padding - this.offset[1],
        );

        // Paint blink
        const blinkOn = this.blinkOn;
        this.blinkWasOn = blinkOn;
        if(blinkOn) {
            ctx.fillStyle = fillStyle;
            ctx.fillRect(
                this.x + padding + this.cursorOffset[0] - this.offset[0],
                this.y + padding + this.cursorOffset[1] - this.offset[1],
                this.cursorThickness,
                this.textHelper.fullLineHeight,
            );
        }

        // Stop clipping
        ctx.restore();
    }
}
