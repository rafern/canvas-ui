import { measureTextDims } from '../helpers/measureTextDims';
import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';

// A Labelable is a widget that contains labels (text). It has utilities for
// measuring text dimensions and painting text
// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Labelable<TBase extends GConstructor<Widget>>(Base: TBase) {
    return class Labelable extends Base {
        // Label variables
        _text = ''; // XXX protected
        _font = ''; // XXX protected
        _minLabelWidth = 0; // XXX protected
        _minLabelAscent = 0; // XXX protected
        _minLabelDescent = 0; // XXX protected

        // Text dimensions corrected for minimum dimensions
        _labelWidth = 0; // XXX private
        _labelAscent = 0; // XXX private
        _labelDescent = 0; // XXX private

        // Does the label need to be re-measured?
        labelDirty = true; // XXX private

        updateTextDims(): void { // XXX private
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

        findOffsetFromIndex(index: number): number { // XXX protected
            // If index is 0 or an invalid negative number, it is at the beginning
            if(index <= 0)
                return 0;

            // Cut text up to given index and measure its length, this length is the
            // offset at the given index
            return measureTextDims(this._text.substring(0, index), this._font)[0];
        }

        findIndexOffsetFromOffset(offset: number): [number, number] { // XXX protected
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

        setLabelDirty() { // XXX private
            this.labelDirty = true;
            this.layoutDirty = true;
        }

        get labelWidth() {
            this.updateTextDims();
            return this._labelWidth;
        }

        get labelAscent() {
            this.updateTextDims();
            return this._labelAscent;
        }

        get labelDescent() {
            this.updateTextDims();
            return this._labelDescent;
        }

        get labelHeight() {
            this.updateTextDims();
            return this._labelAscent + this._labelDescent;
        }

        setText(text: string) { // XXX protected
            if(this._text !== text) {
                this._text = text;
                this.dirty = true;
                this.setLabelDirty();
            }
        }

        setFont(font: string) { // XXX protected
            if(this._font !== font) {
                this._font = font;
                this.dirty = true;
                this.setLabelDirty();
            }
        }

        setMinLabelWidth(minLabelWidth: number) { // XXX protected
            if(this._minLabelWidth !== minLabelWidth) {
                this._minLabelWidth = minLabelWidth;
                this.setLabelDirty();
            }
        }

        setMinLabelAscent(minLabelAscent: number) { // XXX protected
            if(this._minLabelAscent !== minLabelAscent) {
                this._minLabelAscent = minLabelAscent;
                this.setLabelDirty();
            }
        }

        setMinLabelDescent(minLabelDescent: number) { // XXX protected
            if(this._minLabelDescent !== minLabelDescent) {
                this._minLabelDescent = minLabelDescent;
                this.setLabelDirty();
            }
        }
    };
}
