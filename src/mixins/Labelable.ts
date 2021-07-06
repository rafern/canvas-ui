import { measureTextDims } from '../helpers/measureTextDims';
import { Widget } from '../widgets/Widget';

// A Labelable is a widget that contains labels (text). It has utilities for
// measuring text dimensions and painting text
export class Labelable extends Widget {
    // Label variables
    protected _text = '';
    protected _font = '';
    protected _minLabelWidth = 0;
    protected _minLabelAscent = 0;
    protected _minLabelDescent = 0;

    // Text dimensions corrected for minimum dimensions
    private _labelWidth = 0;
    private _labelAscent = 0;
    private _labelDescent = 0;

    // Does the label need to be re-measured?
    private labelDirty = true;

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

    protected findOffsetFromIndex(index: number): number {
        // If index is 0 or an invalid negative number, it is at the beginning
        if(index <= 0)
            return 0;

        // Cut text up to given index and measure its length, this length is the
        // offset at the given index
        return measureTextDims(this._text.substring(0, index), this._font)[0];
    }

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

    private setLabelDirty(): void {
        this.labelDirty = true;
        this._layoutDirty = true;
    }

    get labelWidth(): number {
        this.updateTextDims();
        return this._labelWidth;
    }

    get labelAscent(): number {
        this.updateTextDims();
        return this._labelAscent;
    }

    get labelDescent(): number {
        this.updateTextDims();
        return this._labelDescent;
    }

    get labelHeight(): number {
        this.updateTextDims();
        return this._labelAscent + this._labelDescent;
    }

    protected setText(text: string): void {
        if(this._text !== text) {
            this._text = text;
            this._dirty = true;
            this.setLabelDirty();
        }
    }

    protected setFont(font: string): void {
        if(this._font !== font) {
            this._font = font;
            this._dirty = true;
            this.setLabelDirty();
        }
    }

    protected setMinLabelWidth(minLabelWidth: number): void {
        if(this._minLabelWidth !== minLabelWidth) {
            this._minLabelWidth = minLabelWidth;
            this.setLabelDirty();
        }
    }

    protected setMinLabelAscent(minLabelAscent: number): void {
        if(this._minLabelAscent !== minLabelAscent) {
            this._minLabelAscent = minLabelAscent;
            this.setLabelDirty();
        }
    }

    protected setMinLabelDescent(minLabelDescent: number): void {
        if(this._minLabelDescent !== minLabelDescent) {
            this._minLabelDescent = minLabelDescent;
            this.setLabelDirty();
        }
    }
}
