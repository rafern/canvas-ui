import { FillStyle } from '../theme/FillStyle';
/**
 * A text render group. Contains all neccessary information to position a piece
 * of text.
 *
 * A 4-tuple containing, respectively, the inclusive index where the piece of
 * text starts, the exclusive index where the piece of text ends (including
 * characters that aren't rendered, such as newlines), the right horizontal
 * offset of the piece of text and whether the piece of text overrides width or
 * not.
 *
 * For characters that override width, the text range should have a length of 1
 * and will not be merged with other text render groups, else, it is a hint
 * containing the pre-measured size, for optimisation reasons, and may be merged
 * with other text render groups. Width-overidding groups where the text range
 * length is greater than 1 will have the length of each individual character as
 * an interpolation of the total length, where each character has equal width,
 * which is cheap, but innacurate; this is the reason why it is preferred to
 * have length 1 text range for width-overriding groups although you may still
 * want this for specific reasons (such as trailing space removal).
 * Width-overriding groups are also only meant to be used for whitespaces and
 * will therefore not be painted.
 *
 * Note that 0-width text render groups are valid and used for empty lines.
 *
 * @category Helper
 */
export declare type TextRenderGroup = [rangeStart: number, rangeEnd: number, right: number, overridesWidth: boolean];
/**
 * A line range. Contains all neccessary information to render a line of text.
 * An array of text render groups.
 *
 * @category Helper
 */
export declare type LineRange = Array<TextRenderGroup>;
/**
 * The mode to use for text wrapping in {@link TextHelper}.
 *
 * @category Helper
 */
export declare enum WrapMode {
    /**
     * Whitespaces always have width. The default wrapping mode for input
     * widgets
     */
    Normal = 0,
    /**
     * Whitespaces at the end of a line which result in an overflow have no
     * width. The default wrapping mode for widgets that display text, since
     * spaces at the beginning of a line due to wrapping looks weird in
     * {@link Label | labels}. Whitespaces at the beginning of a new line are
     * still kept, as they are deliberate.
     */
    Shrink = 1
}
/**
 * The mode to use for text alignment in {@link TextHelper}.
 *
 * @category Helper
 */
export declare enum TextAlignMode {
    /** Align to the start of the line. Equivalent to a ratio of 0. */
    Start = 0,
    /** Align to the center of the line. Equivalent to a ratio of 0.5. */
    Center = 0.5,
    /** Align to the end of the line. Equivalent to a ratio of 0.5. */
    End = 1
}
/**
 * An aggregate helper class for widgets that contain text.
 *
 * Contains utilities for measuring text dimensions, converting between offsets
 * in pixels and text indices and painting.
 *
 * @category Helper
 */
export declare class TextHelper {
    /**
     * The current string of text.
     *
     * @decorator `@multiFlagField(['_dirty', 'measureDirty'])`
     */
    text: string;
    /**
     * The current font used for rendering text.
     *
     * @decorator `@multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty', 'tabWidthDirty'])`
     */
    font: string;
    /**
     * The current maximum text width. If not Infinite, then text will be
     * wrapped and width will be set to maxWidth.
     *
     * @decorator `@multiFlagField(['_dirty', 'measureDirty'])`
     */
    maxWidth: number;
    /**
     * The height of each line of text when wrapped. If null, then the helper
     * will try to automatically detect it.
     *
     * @decorator `@multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])`
     */
    lineHeight: number | null;
    /**
     * The amount of spacing between lines. If null, then the helper will try to
     * automatically detect it.
     *
     * @decorator `@multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])`
     */
    lineSpacing: number | null;
    /**
     * The amount of spaces that each tab character is equivalent to. By
     * default, it is equivalent to 4 spaces.
     *
     * @decorator `@multiFlagField(['_dirty', 'measureDirty', 'tabWidthDirty'])`
     */
    tabWidth: number;
    /**
     * The mode for text wrapping
     *
     * @decorator `@multiFlagField(['_dirty', 'measureDirty'])`
     */
    wrapMode: WrapMode;
    /**
     * The text alignment mode. Can also be a ratio.
     *
     * Note that this only aligns text in the text's width. If you have wrapping
     * disabled (maxWidth === Infinity), then you may still need to align the
     * widget that uses this text helper with a {@link BaseContainer}.
     */
    alignMode: TextAlignMode | number;
    /** The current largest text width. May be outdated. */
    private _width;
    /** The current total text height. May be outdated. */
    private _height;
    /** The current {@link lineHeight}. May be outdated */
    private _lineHeight;
    /** The current {@link lineSpacing}. May be outdated */
    private _lineSpacing;
    /** The actual {@link tabWidth} in pixels. May be outdated */
    private _tabWidth;
    /** Does the text need to be re-measured? */
    private measureDirty;
    /** Does the line height or spacing need to be re-measured? */
    private lineHeightSpacingDirty;
    /** Does the tab width need to be re-measured? */
    private tabWidthDirty;
    /** Has the text (or properties associated with it) changed? */
    private _dirty;
    /** See {@link lineRanges}. For internal use only. */
    private _lineRanges;
    /**
     * Has the text (or properties associated with it) changed? Resets
     * {@link _dirty} to false
     */
    get dirty(): boolean;
    /**
     * Measure a slice of text taking left offset into account. If left offset
     * is 0, then this will also add the left bounding box overhang. If not,
     * then it will just return the width.
     *
     * Only for slices of text which have no width-overriding characters, else,
     * you will get wrong measurements.
     *
     * @returns Returns the new horizontal offset
     */
    private measureTextSlice;
    /**
     * Get width from line range start to index. Handles out of bounds indices,
     * but keeps them in the same line
     */
    private getLineRangeWidthUntil;
    /**
     * Similar to {@link measureTextDims}, but uses text render groups for
     * optimisation purposes and for the ability of individual characters to
     * override their natively measured size; tabs having a dynamic size that
     * aligns them to multiples of a value and newlines having no length.
     *
     * @param start The inclusive index to start measuring at. If there are render groups and unmeasured text before this index, then this value will be overridden to include the unmeasured text. Render groups will also be merged if they don't override width.
     * @param end The exclusive index to stop measuring at.
     * @param lineRange The current text render groups for this line of text. This will be updated in place.
     * @param maxWidth The maximum width of a line of text. If the line contains a single character, this will be ignored.
     * @returns Returns true if the line range was modified and it fit into the maximum width
     */
    private measureText;
    /**
     * Update {@link _width}, {@link _ascent} and {@link _descent}. Sets
     * {@link measureDirty} to false. Does nothing if measurement is not needed.
     */
    private updateTextDims;
    /**
     * Paint a single text render group with a given offset and left value for
     * checking if the group is zero-width. left value must not be shifted.
     *
     * Used mainly for injecting debug code; you won't get much use out of this
     * method unless you have a very specific need.
     */
    paintGroup(ctx: CanvasRenderingContext2D, group: TextRenderGroup, left: number, x: number, y: number): void;
    /** Paint all line ranges. */
    paint(ctx: CanvasRenderingContext2D, fillStyle: FillStyle, x: number, y: number): void;
    /**
     * Get the horizontal offset, in pixels, of the beginning of a character at
     * a given index.
     *
     * See {@link findIndexOffsetFromOffset} for the opposite.
     *
     * @returns Returns a 2-tuple containing the offset, in pixels. Vertical offset in the tuple is at the top of the character. Note that this is not neccessarily an integer.
     */
    findOffsetFromIndex(index: number): [x: number, yTop: number];
    /**
     * Get the index and horizontal offset, in pixels, of the beginning of a
     * character at a given offset.
     *
     * See {@link findOffsetFromIndex} for the opposite.
     *
     * @returns Returns a 2-tuple containing the index of the character at the offset and a 2-tuple containing the offset, in pixels. Note that this is not neccessarily an integer. Note that the returned offset is not the same as the input offset. The returned offset is exactly at the beginning of the character. This is useful for implementing selectable text.
     */
    findIndexOffsetFromOffset(offset: [number, number]): [number, [number, number]];
    /**
     * Get a line number from a given cursor index. If out of bounds, returns
     * nearest in-bounds line. Line numbers start at 0.
     */
    getLine(index: number): number;
    /**
     * Get the index of the start of a line. If out of bounds, returns the
     * nearest in-bounds index
     */
    getLineStart(line: number): number;
    /**
     * Get the index of the end of a line.
     *
     * @param includeNewlines If false, newline characters will be ignored and the end will be at their index, instead of after their index
     */
    getLineEnd(line: number, includeNewlines?: boolean): number;
    /**
     * Get the horizontal offset, in pixels, of the start of a line. Takes text
     * wrapping into account. Line indices before first line will be treated as
     * the first line, after the last line will be treated as a new empty line.
     */
    getLineShift(line: number): number;
    /** The current text width. Re-measures text if neccessary. */
    get width(): number;
    /** The current total text height. Re-measures text if neccessary. */
    get height(): number;
    /**
     * Which range of text indices are used for each line.
     *
     * If there is no text wrapping (maxWidth is Infinity), then this will
     * contain a single tuple containing [0, (text length)].
     *
     * If there is text wrapping, then this will be an array where each member
     * is a tuple containing the starting index of a line of text and the ending
     * index (exclusive) of a line of text.
     */
    get lineRanges(): Array<LineRange>;
    /**
     * Get the current line height, even if {@link lineHeight} is null.
     * Re-measures line height if neccessary.
     */
    get actualLineHeight(): number;
    /**
     * Get the current line spacing, even if {@link lineSpacing} is null.
     * Re-measures line spacing if neccessary.
     */
    get actualLineSpacing(): number;
    /** Get the current tab width in pixels. Re-measures if neccessary */
    get actualTabWidth(): number;
    /**
     * Get the height between the start of each line; the full line height.
     *
     * Equivalent to the sum of {@link actualLineHeight} and
     * {@link actualLineSpacing}
     */
    get fullLineHeight(): number;
}
