import type { GConstructor } from './GConstructor';
import type { Widget } from '../widgets/Widget';

let measureContext: CanvasRenderingContext2D | null = null;
const measurePadding = new Map();
const CIRCUMFIX_CHAR = '-';

function measureTextDims(text: string, font: string): [number, number, number] {
    // Special case for empty strings. measureText likes to give out some bogus
    // values on empty strings, which doesn't make much sense
    if(text === '')
        return [0, 0, 0];

    // Like ctx.measureText(), but it manages a shared canvas for you and gives
    // you the correct bounding box
    if(measureContext === null) {
        const tempCanvas = document.createElement('canvas');
        measureContext = tempCanvas.getContext('2d');
        if(measureContext === null)
            throw 'Failed to get canvas context';
    }

    measureContext.font = font;

    // Get circumfix length in pixels with current font
    let suffixLength;
    if(measurePadding.has(font))
        suffixLength = measurePadding.get(font);
    else {
        // Circumfix length not cached yet, measure it
        const suffixDims = measureContext.measureText(CIRCUMFIX_CHAR);
        suffixLength = Math.abs(suffixDims.actualBoundingBoxLeft) + Math.abs(suffixDims.actualBoundingBoxRight);
        measurePadding.set(font, suffixLength);
    }

    // Measure text dimensions with a circumfix character so that whitespaces
    // are measurable, correcting for circumfix character's length
    const dims = measureContext.measureText(CIRCUMFIX_CHAR + text + CIRCUMFIX_CHAR);
    return [
        Math.abs(dims.actualBoundingBoxLeft) + Math.abs(dims.actualBoundingBoxRight) - suffixLength * 2,
        Math.abs(dims.actualBoundingBoxAscent),
        Math.abs(dims.actualBoundingBoxDescent),
    ];
}

// A Labelable is a widget that contains labels (text). It has utilities for
// measuring text dimensions and painting text
// FIXME the return type of mixin constructors is a mess, so linter is disabled
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function Labelable<TBase extends GConstructor<Widget>>(Base: TBase) {
    return class Labelable extends Base {
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

        private setLabelDirty() {
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

        protected setText(text: string) {
            if(this._text !== text) {
                this._text = text;
                this.dirty = true;
                this.setLabelDirty();
            }
        }

        protected setFont(font: string) {
            if(this._font !== font) {
                this._font = font;
                this.dirty = true;
                this.setLabelDirty();
            }
        }

        protected setMinLabelWidth(minLabelWidth: number) {
            if(this._minLabelWidth !== minLabelWidth) {
                this._minLabelWidth = minLabelWidth;
                this.setLabelDirty();
            }
        }

        protected setMinLabelAscent(minLabelAscent: number) {
            if(this._minLabelAscent !== minLabelAscent) {
                this._minLabelAscent = minLabelAscent;
                this.setLabelDirty();
            }
        }

        protected setMinLabelDescent(minLabelDescent: number) {
            if(this._minLabelDescent !== minLabelDescent) {
                this._minLabelDescent = minLabelDescent;
                this.setLabelDirty();
            }
        }
    };
}
