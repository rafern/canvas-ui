import { measureTextDims } from '../helpers/measureTextDims';
import { Widget } from '../widgets/Widget';

/**
 * A mixin class for widgets that contain labels (text).
 *
 * Contains utilities for measuring text dimensions and converting between
 * offsets in pixels and text indices.
 *
 * @category Mixin
 */
export class Labelable extends Widget {
    /** The current string of text */
    protected _text = '';
    /** The current font used for rendering text */
    protected _font = '';
    /** The current minimum text width */
    protected _minLabelWidth = 0;
    /** The current minimum text ascent height */
    protected _minLabelAscent = 0;
    /** The current minimum text descent height */
    protected _minLabelDescent = 0;

    /**
     * The current text width corrected for minimum width. May be outdated.
     */
    private _labelWidth = 0;
    /**
     * The current text ascent height corrected for minimum ascent height. May
     * be outdated.
     */
    private _labelAscent = 0;
    /**
     * The current text descent height corrected for minimum descent height.
     * May be outdated.
     */
    private _labelDescent = 0;

    /** Does the label need to be re-measured? */
    private labelDirty = true;

    /**
     * Update {@link _labelWidth}, {@link _labelAscent} and
     * {@link _labelDescent}. Sets {@link labelDirty} to false. Does nothing if
     * label is not dirty.
     */
    private updateTextDims(): void {
        // Abort if not dirty
        if(!this.labelDirty)
            return;

        // Measure text dimensions
        const [ width, ascent, descent ] = measureTextDims(this._text, this._font);

        this._labelWidth = Math.max(width, this._minLabelWidth);
        this._labelAscent = Math.max(ascent, this._minLabelAscent);
        this._labelDescent = Math.max(descent, this._minLabelDescent);

        // Mark as clean
        this.labelDirty = false;
    }

    /**
     * Get the horizontal offset, in pixels, of the beginning of a character at
     * a given index.
     *
     * See {@link findIndexOffsetFromOffset} for the opposite.
     *
     * @returns Returns the horizontal offset, in pixels. Note that this is not
     * neccessarily an integer.
     */
    protected findOffsetFromIndex(index: number): number {
        // If index is 0 or an invalid negative number, it is at the beginning
        if(index <= 0)
            return 0;

        // Cut text up to given index and measure its length, this length is the
        // offset at the given index
        return measureTextDims(this._text.substring(0, index), this._font)[0];
    }

    /**
     * Get the index and horizontal offset, in pixels, of the beginning of a
     * character at a given offset.
     *
     * See {@link findOffsetFromIndex} for the opposite.
     *
     * @returns Returns a tuple containing the index of the character at the
     * offset and the horizontal offset, in pixels. Note that this is not
     * neccessarily an integer.
     *
     * Note that the returned offset is not the same as the input offset. The
     * returned offset is exactly at the beginning of the character. This is
     * useful for implementing selectable text.
     */
    protected findIndexOffsetFromOffset(offset: number): [number, number] {
        // If offset is before first character, default to index 0
        if(offset <= 0)
            return [0, 0];

        // TODO This has linear complexity, use a binary search instead
        // For each character, find index at which offset is smaller than
        // total length minus half length of current character
        let index = 0, buffer = '', lastLength = 0;
        for(const char of this._text) {
            // Add next character to buffer
            buffer += char;

            // Measure text buffer length and critical offset, which is text
            // buffer's length minus length of half character, equivalent to
            // average between last length and current length
            const bufferLength = measureTextDims(buffer, this._font)[0];
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
        return [this._text.length, lastLength];
    }

    /** Sets {@link labelDirty} and {@link _layoutDirty} to true. */
    private setLabelDirty(): void {
        this.labelDirty = true;
        this._layoutDirty = true;
    }

    /** The current label width. Re-measures text if neccessary. */
    get labelWidth(): number {
        this.updateTextDims();
        return this._labelWidth;
    }

    /** The current label ascent height. Re-measures text if neccessary. */
    get labelAscent(): number {
        this.updateTextDims();
        return this._labelAscent;
    }

    /** The current label descent height. Re-measures text if neccessary. */
    get labelDescent(): number {
        this.updateTextDims();
        return this._labelDescent;
    }

    /**
     * The current label height. Re-measures text if neccessary. Equivalent to
     * adding up {@link labelAscent} and {@link labelDescent}.
     */
    get labelHeight(): number {
        this.updateTextDims();
        return this._labelAscent + this._labelDescent;
    }

    /**
     * Sets {@link _text} if the value is different. If it is different, also
     * sets {@link _dirty} to true and calls {@link setLabelDirty}.
     */
    protected setText(text: string): void {
        if(this._text !== text) {
            this._text = text;
            this._dirty = true;
            this.setLabelDirty();
        }
    }

    /**
     * Sets {@link _font} if the value is different. If it is different, also
     * sets {@link _dirty} to true and calls {@link setLabelDirty}.
     */
    protected setFont(font: string): void {
        if(this._font !== font) {
            this._font = font;
            this._dirty = true;
            this.setLabelDirty();
        }
    }

    /**
     * Sets {@link _minLabelWidth} if the value is different. If it is
     * different, also calls {@link setLabelDirty}.
     */
    protected setMinLabelWidth(minLabelWidth: number): void {
        if(this._minLabelWidth !== minLabelWidth) {
            this._minLabelWidth = minLabelWidth;
            this.setLabelDirty();
        }
    }

    /**
     * Sets {@link _minLabelAscent} if the value is different. If it is
     * different, also calls {@link setLabelDirty}.
     */
    protected setMinLabelAscent(minLabelAscent: number): void {
        if(this._minLabelAscent !== minLabelAscent) {
            this._minLabelAscent = minLabelAscent;
            this.setLabelDirty();
        }
    }

    /**
     * Sets {@link _minLabelDescent} if the value is different. If it is
     * different, also calls {@link setLabelDirty}.
     */
    protected setMinLabelDescent(minLabelDescent: number): void {
        if(this._minLabelDescent !== minLabelDescent) {
            this._minLabelDescent = minLabelDescent;
            this.setLabelDirty();
        }
    }
}
