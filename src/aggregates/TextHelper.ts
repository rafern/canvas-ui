import { measureTextDims } from '../helpers/measureTextDims';
import { multiFlagField } from '../decorators/FlagFields';
import { FillStyle } from '../theme/FillStyle';

/**
 * An aggregate helper class for widgets that contain text.
 *
 * Contains utilities for measuring text dimensions, converting between offsets
 * in pixels and text indices and painting.
 *
 * @category Aggregate
 */
export class TextHelper {
    /**
     * The current string of text.
     * @multiFlagField(['_dirty', 'measureDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty'])
    text = '';
    /**
     * The current font used for rendering text.
     * @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])
    font = '';
    /**
     * The current maximum text width. If not Infinite, then text will be
     * wrapped.
     * @multiFlagField(['_dirty', 'measureDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty'])
    maxWidth = Infinity;
    /**
     * The height of each line of text when wrapped. If null, then the helper
     * will try to automatically detect it.
     * @multiFlagField(['_dirty', 'lineHeightSpacingDirty'])
     */
    @multiFlagField(['_dirty', 'lineHeightSpacingDirty'])
    lineHeight: number | null = null;
    /**
     * The amount of spacing between lines. If null, then the helper will try to
     * automatically detect it.
     * @multiFlagField(['_dirty', 'measureDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty'])
    lineSpacing: number | null = null;

    /** The current largest text width. May be outdated. */
    private _width = 0;
    /** The current total text height. May be outdated. */
    private _height = 0;
    /** The current {@link lineHeight}. May be outdated */
    private _lineHeight = 0;
    /** The current {@link lineSpacing}. May be outdated */
    private _lineSpacing = 0;

    /** Does the text need to be re-measured? */
    private measureDirty = true;
    /** Does the line height or spacing need to be re-measured? */
    private lineHeightSpacingDirty = true;
    /** Has the text (or properties associated with it) changed? */
    private _dirty = false;
    /** See {@link lineRanges}. For internal use only. */
    private _lineRanges: Array<[number, number]> = [];

    /**
     * Has the text (or properties associated with it) changed? Resets
     * {@link _dirty} to false
     */
    get dirty(): boolean {
        const wasDirty = this._dirty;
        this._dirty = false;
        return wasDirty;
    }

    /**
     * Update {@link _width}, {@link _ascent} and {@link _descent}. Sets
     * {@link measureDirty} to false. Does nothing if measurement is not needed.
     */
    private updateTextDims(): void {
        // Update line height or line spacing if needed
        if(this.lineHeightSpacingDirty) {
            this.lineHeightSpacingDirty = false;

            const oldLineHeight = this._lineHeight;
            const oldLineSpacing = this._lineSpacing;

            if(this.lineHeight === null || this.lineSpacing === null) {
                const metrics = measureTextDims(
                    '~!@#$%^&*()_+`1234567890-=qwertyuiop[]\\QWERTYUIOP{}|asdfghjkl;\'ASDFGHJKL:"zxcvbnm,./ZXCVBNM<>?',
                    this.font,
                );

                if(this.lineHeight === null)
                    this._lineHeight = metrics.actualBoundingBoxAscent;
                else
                    this._lineHeight = this.lineHeight;

                if(this.lineSpacing === null)
                    this._lineSpacing = metrics.actualBoundingBoxDescent;
                else
                    this._lineSpacing = this.lineSpacing;
            }
            else {
                this._lineHeight = this.lineHeight;
                this._lineSpacing = this.lineSpacing;
            }

            // If line height or spacing changed, text needs to be re-measured
            if(oldLineHeight !== this._lineHeight || oldLineSpacing !== this._lineSpacing)
                this.measureDirty = true;
        }

        // Abort if measurement not needed
        if(!this.measureDirty)
            return;

        // Mark as clean
        this.measureDirty = false;

        const fullLineHeight = this._lineHeight + this._lineSpacing;

        if(this.text.length === 0) {
            // Special case for empty string; set height to height of single
            // line and width to 0 if maxWidth is not set or maxWidth if set
            this._height = fullLineHeight;
            this._width = this.maxWidth === Infinity ? 0 : this.maxWidth;
        }
        else if(this.maxWidth === Infinity) {
            // Don't wrap text, but split lines when there's a newline character
            this._lineRanges.length = 0;
            let lineStart = 0;
            this._height = 0;
            this._width = 0;

            const text = this.text;
            // eslint-disable-next-line no-constant-condition
            while(true) {
                // Where is the next newline?
                const newline = this.text.indexOf('\n', lineStart);
                const atEnd = newline === -1;
                const end = atEnd ? text.length : (newline + 1);

                // Measure this block of text and add it to the line ranges
                const metrics = measureTextDims(text.slice(lineStart, end), this.font);
                const width = metrics.width + Math.max(0, metrics.actualBoundingBoxLeft);
                if(width > this._width)
                    this._width = width;

                this._height += fullLineHeight;
                this._lineRanges.push([lineStart, end]);

                // At end, abort
                if(atEnd)
                    break;

                // Set start of next line
                lineStart = end;
            }
        }
        else {
            // Wrap text
            this._lineRanges.length = 0;
            const text = this.text;
            const spaceRegex = /\s/;
            let lineStart = 0;
            let wordStart = -1;

            for(let i = 0; i <= text.length; i++) {
                const isSpace = spaceRegex.test(text[i]);
                const atEnd = i === text.length;

                // If this is a whitespace, wrap the previous word and check
                // where this character fits
                if(isSpace || atEnd) {
                    // Try wrapping word if any
                    if(wordStart >= 0) {
                        let metrics = measureTextDims(text.slice(lineStart, i), this.font);
                        let width = metrics.width + Math.max(0, metrics.actualBoundingBoxLeft);
                        if(width > this.maxWidth) {
                            // TODO further wrap if word doesnt fit in new line. if so, break the word
                            // Overflow, check if word fits in new line
                            let j = i;
                            // eslint-disable-next-line no-constant-condition
                            for(; j > wordStart; j--) {
                                metrics = measureTextDims(text.slice(wordStart, j), this.font);
                                width = metrics.width + Math.max(0, metrics.actualBoundingBoxLeft);
                                if(width <= this.maxWidth)
                                    break;
                            }

                            if(i === j || lineStart !== wordStart) {
                                // Word fits in a new line or there was text
                                // before the word that needed wrapping
                                this._lineRanges.push([lineStart, wordStart]);
                                lineStart = wordStart;
                            }

                            if(i !== j) {
                                // Break word; it was too big even in a new line
                                // Backtrack to part where word was broken
                                this._lineRanges.push([wordStart, j]);
                                i = j;
                                wordStart = j;
                                lineStart = j;
                                continue;
                            }
                        }
                    }

                    wordStart = -1;

                    // Try fitting whitespace character
                    if(atEnd) {
                        this._lineRanges.push([lineStart, i]);
                        break;
                    }

                    if(text[i] === '\n') {
                        // Newline character. Break line
                        this._lineRanges.push([lineStart, i + 1]);
                        lineStart = i + 1;
                    }
                    else {
                        // Regular whitespace character
                        const metrics = measureTextDims(text.slice(lineStart, i + 1), this.font);
                        const width = metrics.width + Math.max(0, metrics.actualBoundingBoxLeft);
                        if(width > this.maxWidth) {
                            // Overflow, put whitespace in next line
                            this._lineRanges.push([lineStart, i]);
                            lineStart = i;
                        }
                    }
                }
                else if(wordStart === -1)
                    wordStart = i;
            }

            // Calculate dimensions
            this._width = this.maxWidth;
            this._height = fullLineHeight * this._lineRanges.length;
        }
    }

    paint(ctx: CanvasRenderingContext2D, fillStyle: FillStyle, x: number, y: number): void {
        // Clip
        ctx.save();
        ctx.beginPath();
        ctx.rect(x, y, this.width, this.height);
        ctx.clip();

        // Apply fill style and font
        ctx.font = this.font;
        ctx.fillStyle = fillStyle;
        ctx.textBaseline = 'alphabetic';

        // Paint line (or lines) of text
        const fullLineHeight = this._lineHeight + this._lineSpacing;
        let yOffset = y + this._lineHeight;
        for(const range of this._lineRanges) {
            ctx.fillText(this.text.slice(...range), x, yOffset);
            yOffset += fullLineHeight;
        }

        // Stop clipping
        ctx.restore();
    }

    /**
     * Get the horizontal offset, in pixels, of the beginning of a character at
     * a given index.
     *
     * See {@link findIndexOffsetFromOffset} for the opposite.
     *
     * @returns Returns a 2-tuple containing the offset, in pixels. Vertical offset in the tuple is at the top of the character. Note that this is not neccessarily an integer.
     */
    findOffsetFromIndex(index: number): [number, number] {
        // If index is 0 or an invalid negative number, it is at the beginning
        if(index <= 0)
            return [0, 0];

        // Check which line the index is in
        let line = 0;
        const ranges = this.lineRanges;
        for(const range of ranges) {
            if(index < range[1])
                break;

            line++;
        }

        // Special case; the index is after the end, pick the end of the text
        if(line >= ranges.length) {
            line = ranges.length - 1;
            index = this.text.length;
        }

        // Get line start index
        const lineStart = ranges[line][0];
        if(index < lineStart)
            index = lineStart;

        // Cut text up to given index and measure its length, this length is the
        // offset at the given index, ignoring newline character
        const metrics = measureTextDims(this.text.slice(lineStart, index), this.font);
        return [
            metrics.width + Math.max(0, metrics.actualBoundingBoxLeft),
            line * (this.actualLineHeight + this.actualLineSpacing),
        ];
    }

    /**
     * Get the index and horizontal offset, in pixels, of the beginning of a
     * character at a given offset.
     *
     * See {@link findOffsetFromIndex} for the opposite.
     *
     * @returns Returns a 2-tuple containing the index of the character at the offset and a 2-tuple containing the offset, in pixels. Note that this is not neccessarily an integer. Note that the returned offset is not the same as the input offset. The returned offset is exactly at the beginning of the character. This is useful for implementing selectable text.
     */
    findIndexOffsetFromOffset(offset: [number, number]): [number, [number, number]] {
        // If offset is before or at first character or text is mepty, default
        // to index 0
        const fullLineHeight = this.actualLineHeight + this.actualLineSpacing;
        if(this.text === '' || (offset[0] <= 0 && offset[1] < fullLineHeight) || offset[1] < 0)
            return [0, [0, 0]];

        // Find line being selected
        const line = Math.floor(offset[1] / fullLineHeight);

        // If this is beyond the last line, pick the last character
        const ranges = this.lineRanges;
        if(line >= ranges.length) {
            const index = this.text.length;
            return [index, this.findOffsetFromIndex(index)];
        }

        // TODO This has linear complexity, use a binary search instead
        // For each character, find index at which offset is smaller than
        // total length minus half length of current character
        let buffer = '', lastLength = 0;
        const vOffset = line * fullLineHeight;
        const [lineStart, lineEnd] = ranges[line];
        for(let i = lineStart; i < lineEnd; i++) {
            // Add next character to buffer
            const char = this.text[i];
            buffer += char;

            // Special case; this is a newline, stop now so that the index after
            // the newline isn't picked
            if(char === '\n')
                return [i, [lastLength, vOffset]];

            // Measure text buffer length and critical offset, which is text
            // buffer's length minus length of half character, equivalent to
            // average between last length and current length
            const metrics = measureTextDims(buffer, this.font);
            const bufferLength = metrics.width + Math.max(0, metrics.actualBoundingBoxLeft);
            const criticalOffset = (bufferLength + lastLength) / 2;

            // If offset is before critical offset, this is the index we're
            // looking for
            if(offset[0] < criticalOffset)
                return [i, [lastLength, vOffset]];

            // Update last length
            lastLength = bufferLength;
        }

        // Offset is after full length of text, return index after end
        return [lineEnd, [lastLength, vOffset]];
    }

    /** The current text width. Re-measures text if neccessary. */
    get width(): number {
        this.updateTextDims();
        return this._width;
    }

    /** The current total text height. Re-measures text if neccessary. */
    get height(): number {
        this.updateTextDims();
        return this._height;
    }

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
    get lineRanges(): Array<[number, number]> {
        this.updateTextDims();
        return [...this._lineRanges];
    }

    /**
     * Get the current line height, even if {@link lineHeight} is null.
     * Re-measures line height if neccessary.
     */
    get actualLineHeight(): number {
        this.updateTextDims();
        return this._lineHeight;
    }

    /**
     * Get the current line spacing, even if {@link lineSpacing} is null.
     * Re-measures line spacing if neccessary.
     */
    get actualLineSpacing(): number {
        this.updateTextDims();
        return this._lineSpacing;
    }

    /**
     * Get the height between the start of each line; the full line height.
     *
     * Equivalent to the sum of {@link actualLineHeight} and
     * {@link actualLineSpacing}
     */
    get fullLineHeight(): number {
        this.updateTextDims();
        return this._lineHeight + this._lineSpacing;
    }
}
