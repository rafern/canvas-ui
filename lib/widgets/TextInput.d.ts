import { ValidatedVariable } from '../state/ValidatedVariable';
import { Widget, WidgetProperties } from './Widget';
import { TextHelper } from '../helpers/TextHelper';
import type { Viewport } from '../core/Viewport';
import type { Bounds } from '../helpers/Bounds';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Rect } from '../helpers/Rect';
import type { Root } from '../core/Root';
/**
 * Optional TextInput constructor properties.
 *
 * @category Widget
 */
export interface TextInputProperties extends WidgetProperties {
    /** Sets {@link TextInput#hideText}. */
    hideText?: boolean;
    /** Sets {@link TextInput#wrapText}. */
    wrapText?: boolean;
    /** Sets {@link TextInput#inputFilter}. */
    inputFilter?: ((input: string) => boolean) | null;
    /** Sets {@link TextInput#typeableTab}. */
    typeableTab?: boolean;
    /** Sets {@link TextInput#editingEnabled}. */
    editingEnabled?: boolean;
}
/**
 * A flexbox widget that allows for a single line of text input.
 *
 * Supports obscuring the text with {@link TextInput#hideText}, which shows all
 * characters as black circles like in password fields, text validation and
 * toggling editing.
 *
 * If a {@link TextInputHandler} is set, then that will be used instead of
 * keyboard input for mobile compatibility.
 *
 * @category Widget
 */
export declare class TextInput extends Widget {
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
    /** The helper for measuring/painting text */
    protected textHelper: TextHelper;
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
    /**
     * Can tab characters be typed in this input widget? If true, then pressing
     * tab will not move the focus to the next widget, unless tab is a filtered
     * character.
     *
     * If tab is not a filtered character and this is true, holding shift will
     * move to the next widget instead of typing the character, not move to the
     * previous focusable widget.
     */
    typeableTab: boolean;
    /**
     * Should the caret position be {@link AutoScroll | auto-scrolled} after the
     * layout is finalized?
     */
    private needsAutoScroll;
    /** The helper for keeping track of the checkbox value */
    readonly variable: ValidatedVariable<string, unknown>;
    /** The callback used for the {@link TextInput#"variable"} */
    private readonly callback;
    /** Create a new TextInput. */
    constructor(variable?: ValidatedVariable<string, unknown>, properties?: Readonly<TextInputProperties>);
    protected handleChange(): void;
    attach(root: Root, viewport: Viewport, parent: Widget | null): void;
    detach(): void;
    protected activate(): void;
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
     * Tied to {@link TextInput#_editingEnabled}. If changed,
     * {@link Widget#_dirty} is set to true. If disabled, blinking stops and the
     * cursor position is reset to the beginning.
     */
    get editingEnabled(): boolean;
    set editingEnabled(editingEnabled: boolean);
    /**
     * The current text value.
     *
     * Should not be used internally as a setter (but using it as a getter is
     * fine); if you are extending TextInput, use this.variable.value instead.
     */
    set text(text: string);
    get text(): string;
    /**
     * Get the text as it is shown. If the text is hidden, all characters are
     * replaced with a black circle.
     */
    get displayedText(): string;
    /** The current line number, starting from 0. */
    get line(): number;
    /** Auto-scroll to the caret if the {@link blinkStart | caret is shown}. */
    private autoScrollCaret;
    /**
     * Move the cursor to a given index.
     *
     * Sets {@link Widget#_dirty} and {@link TextInput#cursorOffsetDirty} to
     * true.
     *
     * @param select - Should this do text selection?
     */
    moveCursorTo(index: number, select: boolean): void;
    /**
     * Move the cursor by a given index delta. Calls
     * {@link TextInput#moveCursorTo}
     *
     * @param delta - The change in index; if a positive number, the cursor will be moved right by that amount, else, the cursor will be moved left by that amount.
     */
    moveCursor(delta: number, select: boolean): void;
    /**
     * Move the cursor given a given pointer offset.
     *
     * @param offsetX - The horizontal offset in pixels, relative to the text area with padding removed
     * @param offsetY - The vertical offset in pixels, relative to the text area with padding removed
     * @param select - Should this do text selection?
     */
    moveCursorFromOffset(offsetX: number, offsetY: number, select: boolean): void;
    /**
     * Move the cursor by a given line delta. Calls
     * {@link TextInput#moveCursorFromOffset}
     *
     * @param delta - The change in line; if a positive number, the cursor will be moved down by that amount, else, the cursor will be moved up by that amount.
     */
    moveCursorLine(delta: number, select: boolean): void;
    /**
     * Move the cursor to the start of the line. Calls
     * {@link TextInput#moveCursorTo}
     */
    moveCursorStart(select: boolean): void;
    /**
     * Move the cursor to the end of the line. Calls
     * {@link TextInput#moveCursorTo}
     */
    moveCursorEnd(select: boolean): void;
    /**
     * Move the cursor by skipping over a number of words. Calls
     * {@link TextInput#moveCursorTo}
     *
     * @param delta - The change in words; if a positive number, the cursor skip this amount of words, else, it will do the same, but backwards.
     */
    moveCursorWord(delta: number, select: boolean): void;
    /**
     * Deletes a range of text and moves the cursor to the start of the range.
     *
     * @param start - The inclusive index of the start of the text range
     * @param end - The exclusive index of the end of the text range
     */
    deleteRange(start: number, end: number): void;
    /**
     * Like {@link TextInput#moveCursorWord}, but for deleting words. Calls
     * {@link TextInput#moveCursorWord} and {@link TextInput#deleteRange}. If
     * text is being selected, delta is ignored and the selection is deleted
     * instead. Note that a delta of zero doesn't delete anything.
     */
    deleteWord(delta: number): void;
    /**
     * Insert text at the current cursor index. Calls
     * {@link TextInput#moveCursorTo} afterwards.
     */
    insertText(str: string): void;
    /**
     * Deletes a certain amount of characters in a given direction from the
     * current cursor index. Calls {@link TextInput#deleteRange} or
     * {@link TextInput#moveCursorTo} if neccessary. If text is being selected,
     * delta is ignored and the selection is deleted instead. Note that a delta
     * of zero doesn't delete anything.
     *
     * @param delta - The amount and direction of the deletion. For example, if 5, then 5 characters are deleted after the cursor. If -5, then 5 characters are deleted before the cursor and the cursor is moved 5 indices left.
     */
    deleteText(delta: number): void;
    /**
     * Select a range of text (either word or non-word, but not both) which
     * includes the given cursor position
     *
     * @returns Returns a 2-tuple with, respectively, the start and end of the range
     */
    private selectRangeAt;
    onFocusGrabbed(focusType: FocusType): void;
    onFocusDropped(focusType: FocusType): void;
    protected handleEvent(event: Event): this | null;
    protected handlePreLayoutUpdate(): void;
    protected handlePostLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * The rectangle that the caret occupies, relative to the TextInput's
     * top-left corner.
     */
    protected get caretRect(): Rect;
    /** Similar to {@link TextInput#caretRect}, but uses absolute positions. */
    protected get caretAbsoluteRect(): Rect;
    /** Similar to {@link TextInput#caretRect}, but gets bounds instead. */
    protected get caretBounds(): Bounds;
    protected handlePainting(_forced: boolean): void;
}
