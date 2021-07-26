/**
 * An aggregate helper class for widgets that contain text.
 *
 * Contains utilities for measuring text dimensions and converting between
 * offsets in pixels and text indices.
 *
 * @category Aggregate
 */
export declare class TextHelper {
    /** The current string of text */
    private _text;
    /** The current font used for rendering text */
    private _font;
    /** The current minimum text width */
    private _minWidth;
    /** The current minimum text ascent height */
    private _minAscent;
    /** The current minimum text descent height */
    private _minDescent;
    /**
     * The current text width corrected for minimum width. May be outdated.
     */
    private _width;
    /**
     * The current text ascent height corrected for minimum ascent height. May
     * be outdated.
     */
    private _ascent;
    /**
     * The current text descent height corrected for minimum descent height.
     * May be outdated.
     */
    private _descent;
    /** Does the text need to be re-measured? */
    private measureDirty;
    /** Has the text (or properties associated with it) changed? */
    private _dirty;
    /**
     * Has the text (or properties associated with it) changed? Resets
     * {@link _dirty} to false
     */
    get dirty(): boolean;
    /**
     * Update {@link _width}, {@link _ascent} and {@link _descent}. Sets
     * {@link measureDirty} to false. Does nothing if measurement is not needed.
     */
    private updateTextDims;
    /**
     * Get the horizontal offset, in pixels, of the beginning of a character at
     * a given index.
     *
     * See {@link findIndexOffsetFromOffset} for the opposite.
     *
     * @returns Returns the horizontal offset, in pixels. Note that this is not neccessarily an integer.
     */
    findOffsetFromIndex(index: number): number;
    /**
     * Get the index and horizontal offset, in pixels, of the beginning of a
     * character at a given offset.
     *
     * See {@link findOffsetFromIndex} for the opposite.
     *
     * @returns Returns a tuple containing the index of the character at the offset and the horizontal offset, in pixels. Note that this is not neccessarily an integer. Note that the returned offset is not the same as the input offset. The returned offset is exactly at the beginning of the character. This is useful for implementing selectable text.
     */
    findIndexOffsetFromOffset(offset: number): [number, number];
    /** Sets {@link _dirty} and {@link measureDirty} to true. */
    private setDirty;
    /** The current text width. Re-measures text if neccessary. */
    get width(): number;
    /** The current text ascent height. Re-measures text if neccessary. */
    get ascent(): number;
    /** The current text descent height. Re-measures text if neccessary. */
    get descent(): number;
    /**
     * The current text height. Re-measures text if neccessary. Equivalent to
     * adding up {@link ascent} and {@link descent}.
     */
    get height(): number;
    /**
     * The current string of text.
     *
     * Sets {@link _text} and calls {@link setDirty} if changed.
     */
    set text(text: string);
    get text(): string;
    /**
     * The current font used for rendering text.
     *
     * Sets {@link _font} and calls {@link setDirty} if changed.
     */
    set font(font: string);
    get font(): string;
    /**
     * The current minimum text width.
     *
     * Sets {@link _minWidth} and calls {@link setDirty} if changed.
     */
    set minWidth(minWidth: number);
    get minWidth(): number;
    /**
     * The current minimum text ascent height.
     *
     * Sets {@link _minAscent} and calls {@link setDirty} if changed.
     */
    set minAscent(minAscent: number);
    get minAscent(): number;
    /**
     * The current minimum text descent height.
     *
     * Sets {@link _minDescent} and calls {@link setDirty} if changed.
     */
    set minDescent(minDescent: number);
    get minDescent(): number;
}
