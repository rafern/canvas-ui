import type { TextValidator } from '../validators/Validator';
import { ThemeProperties } from '../theme/ThemeProperties';
import { TextHelper } from '../helpers/TextHelper';
import { Variable } from '../helpers/Variable';
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
 * @template V The type of {@link validValue}; the type of the transformed value returned by the validator.
 *
 * @category Widget
 */
export declare class TextInput<V> extends Widget {
    /**
     * At what timestamp did the blinking start. If 0, then the text cursor is
     * not blinking.
     */
    private blinkStart;
    /**
     * Was the cursor shown last frame due to blinking? If null, then the text
     * cursor is not blinking.
     */
    private blinkWasOn;
    /** Current cursor position (index, not offset). */
    private cursorPos;
    /** Current cursor offset in pixels. */
    private cursorOffset;
    /** Current cursor selection start position (index, not offset). */
    private selectPos;
    /** Current cursor selection start offset in pixels. */
    private selectOffset;
    /** Does the cursor offset need to be updated? */
    private cursorOffsetDirty;
    /** Is editing enabled? */
    private _editingEnabled;
    /**
     * Is the text hidden?
     *
     * @decorator `@multiFlagField(['cursorOffsetDirty', '_dirty'])`
     */
    hideText: boolean;
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
     *
     * @decorator `@paintArrayField()`
     */
    private offset;
    /**
     * Is text wrapping enabled? If not, text will be panned if needed
     *
     * @decorator `@layoutField`
     */
    wrapText: boolean;
    /**
     * An input filter; a function which dictates whether a certain input can be
     * inserted in the text. If the function returns false given the input,
     * then the input will not be inserted in the text. Useful for preventing
     * newlines or forcing numeric input. Note that the input is not
     * neccessarily a character; it can be a whole sentence.
     */
    inputFilter: ((input: string) => boolean) | null;
    /** Is the pointer dragging? */
    private dragging;
    /** When was the last pointer click? For detecting double/triple-clicks */
    private lastClick;
    /**
     * The cursor position when dragging was started. Used for
     * double/triple-click dragging.
     */
    private dragStart;
    /**
     * How many clicks have there been after a first click where the time
     * between each click is less than 500 ms. Used for detecting double/triple
     * clicks
     */
    private successiveClickCount;
    /** Create a new TextInput. */
    constructor(validator: TextValidator<V>, inputFilter?: ((input: string) => boolean) | null, initialValue?: string, themeProperties?: ThemeProperties);
    protected onThemeUpdated(property?: string | null): void;
    /**
     * Is the text cursor shown?
     *
     * @returns Returns true if the text cursor is shown, false if not shown but the text input is in use, or null if the text cursor is not shown due to the text input not being in use.
     */
    get blinkOn(): boolean | null;
    /**
     * Is editing enabled?
     *
     * Tied to {@link _editingEnabled}. If changed, {@link _dirty} is set to
     * true. If disabled, blinking stops and the cursor position is reset to the
     * beginning.
     */
    get editingEnabled(): boolean;
    set editingEnabled(editingEnabled: boolean);
    /** The current text value. */
    set text(text: string);
    get text(): string;
    /**
     * Get the text as it is shown. If the text is hidden, all characters are
     * replaced with a black circle.
     */
    get displayedText(): string;
    /** Is the current value in the text input valid? */
    get valid(): boolean;
    /** The last valid value, transformed by the validator. */
    get validValue(): V;
    /** The current line number, starting from 0. */
    get line(): number;
    /**
     * Move the cursor to a given index.
     *
     * Sets {@link _dirty} and {@link cursorOffsetDirty} to true.
     *
     * @param select Should this do text selection?
     */
    moveCursorTo(index: number, select: boolean): void;
    /**
     * Move the cursor by a given index delta. Calls {@link moveCursorTo}
     *
     * @param delta The change in index; if a positive number, the cursor will be moved right by that amount, else, the cursor will be moved left by that amount.
     */
    moveCursor(delta: number, select: boolean): void;
    /**
     * Move the cursor given a given pointer offset.
     *
     * @param offsetX The horizontal offset in pixels, relative to the text area with padding removed
     * @param offsetY The vertical offset in pixels, relative to the text area with padding removed
     * @param select Should this do text selection?
     */
    moveCursorFromOffset(offsetX: number, offsetY: number, select: boolean): void;
    /**
     * Move the cursor by a given line delta. Calls {@link moveCursorFromOffset}
     *
     * @param delta The change in line; if a positive number, the cursor will be moved down by that amount, else, the cursor will be moved up by that amount.
     */
    moveCursorLine(delta: number, select: boolean): void;
    /**
     * Move the cursor to the start of the line. Calls {@link moveCursorTo}
     */
    moveCursorStart(select: boolean): void;
    /**
     * Move the cursor to the end of the line. Calls {@link moveCursorTo}
     */
    moveCursorEnd(select: boolean): void;
    /**
     * Move the cursor by skipping over a number of words. Calls
     * {@link moveCursorTo}
     *
     * @param delta The change in words; if a positive number, the cursor skip this amount of words, else, it will do the same, but backwards.
     */
    moveCursorWord(delta: number, select: boolean): void;
    /**
     * Deletes a range of text and moves the cursor to the start of the range.
     *
     * @param start The inclusive index of the start of the text range
     * @param end The exclusive index of the end of the text range
     */
    deleteRange(start: number, end: number): void;
    /**
     * Like {@link moveCursorWord}, but for deleting words. Calls
     * {@link moveCursorWord} and {@link deleteRange}. If text is being
     * selected, delta is ignored and the selection is deleted instead. Note
     * that a delta of zero doesn't delete anything.
     */
    deleteWord(delta: number): void;
    /**
     * Insert text at the current cursor index. Calls {@link moveCursorTo}
     * afterwards.
     */
    insertText(str: string): void;
    /**
     * Deletes a certain amount of characters in a given direction from the
     * current cursor index. Calls {@link deleteRange} or {@link moveCursorTo}
     * if neccessary. If text is being selected, delta is ignored and the
     * selection is deleted instead. Note that a delta of zero doesn't delete
     * anything.
     *
     * @param delta The amount and direction of the deletion. For example, if 5, then 5 characters are deleted after the cursor. If -5, then 5 characters are deleted before the cursor and the cursor is moved 5 indices left.
     */
    deleteText(delta: number): void;
    /**
     * Select a range of text (either word or non-word, but not both) which
     * includes the given cursor position
     *
     * @returns Returns a 2-tuple with, respectively, the start and end of the range
     */
    private selectRangeAt;
    onFocusDropped(focusType: FocusType, _root: Root): void;
    protected handleEvent(event: Event, root: Root): this | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePostLayoutUpdate(_root: Root): void;
    protected handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void;
}
