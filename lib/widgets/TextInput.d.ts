import type { TextValidator } from '../validators/Validator';
import { StringVariable } from '../mixins/Variable';
import { FlexLayout } from '../mixins/FlexLayout';
import { Labelable } from '../mixins/Labelable';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
declare const TextInput_base: import("ts-mixer/dist/types/types").Class<[themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean], FlexLayout & Labelable & StringVariable, {
    prototype: FlexLayout;
} & {
    prototype: Labelable;
} & {
    prototype: StringVariable;
}>;
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
export declare class TextInput<V> extends TextInput_base {
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
    /** Does the cursor offset need to be updated? */
    private cursorOffsetDirty;
    /** Is editing enabled? */
    private _editingEnabled;
    /** Is the text hidden? */
    private _hideText;
    /** Is the text valid? */
    private _valid;
    /** Last valid value. */
    private _validValue;
    /** Create a new TextInput. */
    constructor(validator: TextValidator<V>, initialValue?: string, themeOverride?: Theme | null);
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
    /**
     * Is the text hidden?
     *
     * Tied to {@link _hideText}. If changed, {@link _dirty} and
     * {@link cursorOffsetDirty} are set to true.
     */
    get hideText(): boolean;
    set hideText(hideText: boolean);
    /**
     * Get the text as it is shown. If the text is hidden, all characters are
     * replaced with a black circle.
     */
    get text(): string;
    /** Is the current value in the text input valid? */
    get valid(): boolean;
    /** The last valid value, transformed by the validator. */
    get validValue(): V;
    /**
     * Move the cursor to a given index.
     *
     * Sets {@link _dirty} and {@link cursorOffsetDirty} to true.
     */
    moveCursorTo(index: number): void;
    /**
     * Move the cursor by a given index delta. Calls {@link moveCursorTo}
     *
     * @param delta The change in index; if a positive number, the cursor will be moved right by that amount, else, the cursor will be moved left by that amount.
     */
    moveCursor(delta: number): void;
    /**
     * Insert text at the current cursor index. Calls {@link moveCursorTo}
     * afterwards.
     */
    insertText(str: string): void;
    /**
     * Deletes a certain amount of characters in a given direction from the
     * current cursor index. Calls {@link moveCursorTo} afterwards if
     * neccessary.
     *
     * @param delta The amount and direction of the deletion. For example, if 5, then 5 characters are deleted after the cursor. If -5, then 5 characters are deleted before the cursor and the cursor is moved 5 indices left.
     */
    deleteText(delta: number): void;
    onFocusDropped(focusType: FocusType, _root: Root): void;
    protected handleEvent(event: Event, _width: number, _height: number, root: Root): this;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
