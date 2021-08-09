import { measureTextDims } from '../helpers/measureTextDims';
import { multiFlagField } from '../decorators/FlagFields';
import { FillStyle } from '../theme/FillStyle';

const WIDTH_OVERRIDING_CHARS = new Set(['\n', '\t']);

/**
 * A text render group. Contains all neccessary information to position a piece
 * of text. A 4-tuple containing, respectively, the inclusive index where the
 * piece of text starts, the exclusive index where the piece of text ends
 * (including characters that aren't rendered, such as newlines), the right
 * horizontal offset of the piece of text and whether the piece of text
 * overrides width or not. For characters that override width, the text range
 * will have a size of 1 and will not be merged with other text render groups,
 * else, it is a hint containing the pre-measured size, for optimisation
 * reasons, and may be merged with other text render groups.
 *
 * @category Aggregate
 */
export type TextRenderGroup = [rangeStart: number, rangeEnd: number, right: number, overridesWidth: boolean];

/**
 * A line range. Contains all neccessary information to render a line of text.
 * An array of text render groups.
 *
 * @category Aggregate
 */
export type LineRange = Array<TextRenderGroup>;

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
     * @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty', 'tabWidthDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty', 'tabWidthDirty'])
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
     * @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])
    lineHeight: number | null = null;
    /**
     * The amount of spacing between lines. If null, then the helper will try to
     * automatically detect it.
     * @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty', 'lineHeightSpacingDirty'])
    lineSpacing: number | null = null;
    /**
     * The amount of spaces that each tab character is equivalent to. By
     * default, it is equivalent to 4 spaces.
     * @multiFlagField(['_dirty', 'measureDirty', 'tabWidthDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty', 'tabWidthDirty'])
    tabWidth = 4;

    /** The current largest text width. May be outdated. */
    private _width = 0;
    /** The current total text height. May be outdated. */
    private _height = 0;
    /** The current {@link lineHeight}. May be outdated */
    private _lineHeight = 0;
    /** The current {@link lineSpacing}. May be outdated */
    private _lineSpacing = 0;
    /** The actual {@link tabWidth} in pixels. May be outdated */
    private _tabWidth = 0;

    /** Does the text need to be re-measured? */
    private measureDirty = true;
    /** Does the line height or spacing need to be re-measured? */
    private lineHeightSpacingDirty = true;
    /** Does the tab width need to be re-measured? */
    private tabWidthDirty = true;
    /** Has the text (or properties associated with it) changed? */
    private _dirty = false;
    /** See {@link lineRanges}. For internal use only. */
    private _lineRanges: Array<LineRange> = [];

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
     * Measure a slice of text taking left offset into account. If left offset
     * is 0, then this will also add the left bounding box overhang. If not,
     * then it will just return the width.
     *
     * Only for slices of text which have no width-overriding characters, else,
     * you will get wrong measurements.
     *
     * @returns Returns the new horizontal offset
     */
    private measureTextSlice(left: number, start: number, end: number): number {
        const metrics = measureTextDims(this.text.slice(start, end), this.font);
        if(left === 0)
            return metrics.width + Math.max(0, metrics.actualBoundingBoxLeft);
        else
            return left + metrics.width;
    }

    /**
     * Get width from line range start to index. Handles out of bounds indices,
     * but keeps them in the same line
     */
    private getLineRangeWidthUntil(range: LineRange, index: number): number {
        // If before or at first group's start index, 0 width
        if(index <= range[0][0])
            return 0;

        // Find text render group that this index belongs to
        let groupIndex = 0;
        for(; groupIndex < range.length; groupIndex++) {
            // If index is at this group's end, return group's right value.
            // Since width-overriding groups always have a length of 1, this
            // will also succeed for those
            const group = range[groupIndex];
            const groupEnd = group[1];
            if(index == groupEnd)
                return group[2];
            else if(index >= group[0] && index < groupEnd)
                break;
        }

        // If index was after line end, pick end of last group
        if(groupIndex === range.length)
            return range[groupIndex - 1][2];

        // Find left value
        let left = 0;
        if(groupIndex > 0)
            left = range[groupIndex - 1][2];

        // Measure the slice of text
        return this.measureTextSlice(left, range[groupIndex][0], index);
    }

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
    measureText(start: number, end: number, maxWidth: number, lineRange: LineRange): boolean {
        // Remove render groups that intersect the range that will be measured.
        // Removing a group means that the group will have to be re-measured and
        // therefore start is overridden
        let wantedGroups = 0;
        for(; wantedGroups < lineRange.length; wantedGroups++) {
            const group: TextRenderGroup = lineRange[wantedGroups];
            if(start >= group[0] && start < group[1]) {
                start = group[0];
                break;
            }
        }

        // Correct start value; attempt to merge with previous groups or expand
        // the measurement to include previous parts of text that haven't been
        // measured yet
        if(wantedGroups > 0) {
            let lastGroup: TextRenderGroup | null = lineRange[wantedGroups - 1];
            if(lastGroup[1] !== start) {
                start = lastGroup[1];

                if(--wantedGroups > 0)
                    lastGroup = lineRange[wantedGroups];
                else
                    lastGroup = null;
            }

            if(lastGroup !== null && !lastGroup[3] && !WIDTH_OVERRIDING_CHARS.has(this.text[start])) {
                start = lastGroup[0];
                wantedGroups--;
            }
        }

        // Find left horizontal offset
        let left = 0;
        if(wantedGroups > 0)
            left = lineRange[wantedGroups - 1][2];

        // Measure range of text, potentially splitting it into render groups
        let groupStart = start;
        const addedGroups: Array<TextRenderGroup> = [];
        while(groupStart < end) {
            if(this.text[groupStart] === '\t') {
                // Align to tab width
                const tabWidth = this.actualTabWidth;
                left = (Math.floor(left / tabWidth) + 1) * tabWidth;
                addedGroups.push([groupStart, ++groupStart, left, true]);
            }
            else if(this.text[groupStart] === '\n') {
                // Make it 0-width and ignore all other text
                addedGroups.push([groupStart, ++groupStart, left, true]);

                if(groupStart < end)
                    console.warn('measureText called with text range where newline was at the middle of the range instead of at the end. Some text was ignored');

                break;
            }
            else {
                // Find group end index; at next width-overriding character or
                // at end
                let nextNewline = this.text.indexOf('\n', groupStart + 1);
                if(nextNewline === -1)
                    nextNewline = Infinity;

                let nextTab = this.text.indexOf('\t', groupStart + 1);
                if(nextTab === -1)
                    nextTab = Infinity;

                const groupEnd = Math.min(nextNewline, nextTab, end);

                // Measure group
                left = this.measureTextSlice(left, groupStart, groupEnd);
                addedGroups.push([groupStart, groupEnd, left, false]);

                groupStart = groupEnd;
            }
        }

        // Check if this fits in maximum width
        const groupCount = wantedGroups + addedGroups.length;
        const lastGroup = addedGroups[addedGroups.length - 1]
                            ?? lineRange[wantedGroups - 1]
                            ?? null;

        if(lastGroup === null) {
            // Lines ranges must have at least one group
            lineRange.length = 0;
            lineRange.push([start, start, 0, false]);
            return true;
        }
        else if((groupCount === 1 && (lastGroup[1] - lastGroup[0]) <= 1) ||
                lastGroup[2] <= maxWidth) {
            lineRange.length = wantedGroups;
            lineRange.push(...addedGroups);
            return true;
        }
        else
            return false;
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

        // Update tab width if needed
        if(this.tabWidthDirty) {
            this.tabWidthDirty = false;
            this._tabWidth = measureTextDims(' ', this.font).width * this.tabWidth;
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
            this._lineRanges.length = 1;
            this._lineRanges[0] = [[0, 0, 0, false]];
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
                const range: LineRange = [];
                this.measureText(lineStart, end, Infinity, range);
                this._lineRanges.push(range);

                this._height += fullLineHeight;
                const width = range[range.length - 1][2];
                if(width > this._width)
                    this._width = width;

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
            let range: LineRange = [];
            const text = this.text;
            const spaceRegex = /\s/;
            let wordStart = -1;

            for(let i = 0; i <= text.length;) {
                const isSpace = spaceRegex.test(text[i]);
                const atEnd = i === text.length;

                // If this is a whitespace, wrap the previous word and check
                // where this character fits
                if(isSpace || atEnd) {
                    // Try fitting word if any
                    if(wordStart >= 0 && !this.measureText(wordStart, i, this.maxWidth, range)) {
                        // Overflow, check if word fits in new line
                        const newRange: LineRange = [];
                        if(this.measureText(wordStart, i, this.maxWidth, newRange)) {
                            // Fits in new line. Push old line to line ranges if
                            // it had any text render groups
                            if(range.length === 0)
                                throw new Error('Unexpected line range without any render groups');
                            this._lineRanges.push(range);
                            range = newRange;
                        }
                        else {
                            // Doesn't fit in new line. Fit as much as possible
                            // in current line and move rest to new line by
                            // backtracking to where the split occurs. Don't
                            // reverse this loop; although it may seem more
                            // efficient, it breaks when the word is broken
                            // across more than 2 lines
                            let j = wordStart;
                            for(; j < i - 1; j++) {
                                if(!this.measureText(j, j + 1, this.maxWidth, range))
                                    break;
                            }
                            this._lineRanges.push(range);
                            range = newRange;

                            i = j;
                            wordStart = j;
                            continue;
                        }
                    }

                    wordStart = -1;

                    // End line
                    if(atEnd) {
                        // If there isn't a render group in the line range yet,
                        // add it. Use last group's position. If there isn't a
                        // last group, default to the very beginning
                        if(range.length === 0) {
                            const lastLineRange = this._lineRanges[this._lineRanges.length - 1];
                            if(lastLineRange === undefined)
                                range.push([0, 0, 0, false]);
                            else {
                                const lastGroup = lastLineRange[lastLineRange.length - 1];
                                if(lastGroup === undefined)
                                    range.push([0, 0, 0, false]);
                                else
                                    range.push([lastGroup[1], lastGroup[1], 0, false]);
                            }
                        }

                        this._lineRanges.push(range);
                        break;
                    }

                    // Try fitting whitespace character
                    if(text[i] === '\n') {
                        // Newline character. Break line, but measure text
                        // anyways to update line range
                        this.measureText(i, i + 1, Infinity, range);
                        this._lineRanges.push(range);
                        range = [];
                    }
                    else if(!this.measureText(i, i + 1, this.maxWidth, range)) {
                        // Regular whitespace character overflow: put whitespace
                        // in next line but measure it anyways to update line
                        // range
                        this._lineRanges.push(range);
                        range = [];
                        this.measureText(i, i + 1, Infinity, range);
                    }
                }
                else if(wordStart === -1)
                    wordStart = i;

                // Incrementing down here so that we don't have to do i = j - 1
                // when splitting words
                i++;
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
            let left = 0;
            for(const group of range) {
                // Skip render groups which contain width-overidding characters
                // since they are always whitespace characters
                if(!WIDTH_OVERRIDING_CHARS.has(this.text[group[0]]))
                    ctx.fillText(this.text.slice(group[0], group[1]), x + left, yOffset);

                left = group[2];
            }
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
    findOffsetFromIndex(index: number): [x: number, yTop: number] {
        // If index is 0, an invalid negative number or there are no lines, it
        // is at the beginning
        const lineRanges = this.lineRanges;
        if(index <= 0 || lineRanges.length === 0)
            return [0, 0];

        // Check which line the index is in
        let line = 0;
        for(const range of lineRanges) {
            if(index < range[range.length - 1][1])
                break;

            line++;
        }

        // Special case; the index is after the end, pick the end of the text
        if(line >= lineRanges.length) {
            line = lineRanges.length - 1;
            index = this.text.length;
        }

        // Get horizontal offset
        return [
            this.getLineRangeWidthUntil(lineRanges[line], index),
            line * this.fullLineHeight,
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
        // If offset is before or at first character, text is empty or there are
        // no lines, default to index 0
        const fullLineHeight = this.fullLineHeight;
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

        // If this is an empty line, stop
        const yOffset = line * fullLineHeight;
        const range = ranges[line];
        if(range.length === 1 && range[0][0] === range[0][1])
            return [range[0][0], [range[0][2], yOffset]];

        // TODO This has linear complexity, use binary search instead if possible
        // For each character, find index at which offset is smaller than
        // total length minus half length of current character
        let lastLength = 0;
        const lineStart = range[0][0];

        // Special case; if line range ends with a newline, ignore last
        // character
        let lineEnd = range[range.length - 1][1];
        if(this.text[lineEnd - 1] === '\n')
            lineEnd--;

        for(let i = lineStart; i < lineEnd; i++) {
            // Measure length from this index to the next
            const length = this.getLineRangeWidthUntil(range, i + 1);
            const criticalOffset = (length + lastLength) / 2;

            // If offset is before critical offset, this is the index we're
            // looking for
            if(offset[0] < criticalOffset)
                return [i, [lastLength, yOffset]];

            // Update last length
            lastLength = length;
        }

        // Offset is after full length of text, return index after end
        return [lineEnd, [lastLength, yOffset]];
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
    get lineRanges(): Array<LineRange> {
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

    /** Get the current tab width in pixels. Re-measures if neccessary */
    get actualTabWidth(): number {
        this.updateTextDims();
        return this._tabWidth;
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
