import { measureTextDims } from '../helpers/measureTextDims';
import { multiFlagField } from '../decorators/FlagFields';

/**
 * An aggregate helper class for widgets that contain text.
 *
 * Contains utilities for measuring text dimensions and converting between
 * offsets in pixels and text indices.
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
     * @multiFlagField(['_dirty', 'measureDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty'])
    font = '';
    /**
     * The current minimum text width.
     * @multiFlagField(['_dirty', 'measureDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty'])
    minWidth = 0;
    /**
     * The current minimum text ascent height.
     * @multiFlagField(['_dirty', 'measureDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty'])
    minAscent = 0;
    /**
     * The current minimum text descent height.
     * @multiFlagField(['_dirty', 'measureDirty'])
     */
    @multiFlagField(['_dirty', 'measureDirty'])
    minDescent = 0;

    /**
     * The current text width corrected for minimum width. May be outdated.
     */
    private _width = 0;
    /**
     * The current text ascent height corrected for minimum ascent height. May
     * be outdated.
     */
    private _ascent = 0;
    /**
     * The current text descent height corrected for minimum descent height.
     * May be outdated.
     */
    private _descent = 0;

    /** Does the text need to be re-measured? */
    private measureDirty = true;
    /** Has the text (or properties associated with it) changed? */
    private _dirty = false;

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
        // Abort if measurement not needed
        if(!this.measureDirty)
            return;

        // Measure text dimensions
        const [ width, ascent, descent ] = measureTextDims(this.text, this.font);

        this._width = Math.max(width, this.minWidth);
        this._ascent = Math.max(ascent, this.minAscent);
        this._descent = Math.max(descent, this.minDescent);

        // Mark as clean
        this.measureDirty = false;
    }

    /**
     * Get the horizontal offset, in pixels, of the beginning of a character at
     * a given index.
     *
     * See {@link findIndexOffsetFromOffset} for the opposite.
     *
     * @returns Returns the horizontal offset, in pixels. Note that this is not neccessarily an integer.
     */
    findOffsetFromIndex(index: number): number {
        // If index is 0 or an invalid negative number, it is at the beginning
        if(index <= 0)
            return 0;

        // Cut text up to given index and measure its length, this length is the
        // offset at the given index
        return measureTextDims(this.text.substring(0, index), this.font)[0];
    }

    /**
     * Get the index and horizontal offset, in pixels, of the beginning of a
     * character at a given offset.
     *
     * See {@link findOffsetFromIndex} for the opposite.
     *
     * @returns Returns a tuple containing the index of the character at the offset and the horizontal offset, in pixels. Note that this is not neccessarily an integer. Note that the returned offset is not the same as the input offset. The returned offset is exactly at the beginning of the character. This is useful for implementing selectable text.
     */
    findIndexOffsetFromOffset(offset: number): [number, number] {
        // If offset is before first character, default to index 0
        if(offset <= 0)
            return [0, 0];

        // TODO This has linear complexity, use a binary search instead
        // For each character, find index at which offset is smaller than
        // total length minus half length of current character
        let index = 0, buffer = '', lastLength = 0;
        for(const char of this.text) {
            // Add next character to buffer
            buffer += char;

            // Measure text buffer length and critical offset, which is text
            // buffer's length minus length of half character, equivalent to
            // average between last length and current length
            const bufferLength = measureTextDims(buffer, this.font)[0];
            // bl - (bl - ll) / 2 = bl - bl / 2 + ll / 2 = (bl + ll) / 2
            const criticalOffset = (bufferLength + lastLength) / 2;

            // If offset is before critical offset, this is the index we're
            // looking for
            if(offset < criticalOffset)
                return [index, lastLength];

            // Update index and last length
            index++;
            lastLength = bufferLength;
        }

        // Offset is after full length of text, return index after end
        return [this.text.length, lastLength];
    }

    /** The current text width. Re-measures text if neccessary. */
    get width(): number {
        this.updateTextDims();
        return this._width;
    }

    /** The current text ascent height. Re-measures text if neccessary. */
    get ascent(): number {
        this.updateTextDims();
        return this._ascent;
    }

    /** The current text descent height. Re-measures text if neccessary. */
    get descent(): number {
        this.updateTextDims();
        return this._descent;
    }

    /**
     * The current text height. Re-measures text if neccessary. Equivalent to
     * adding up {@link ascent} and {@link descent}.
     */
    get height(): number {
        this.updateTextDims();
        return this._ascent + this._descent;
    }
}
