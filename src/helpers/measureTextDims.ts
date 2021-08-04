let measureContext: CanvasRenderingContext2D | null = null;
const measurePadding = new Map();
// XXX make sure to use a character that isn't affected by kerning
const CIRCUMFIX_CHAR = '|';

/**
 * Measures the dimensions of a given string of text with a given font.
 *
 * Note that the first time calling this function is slower than subsequent
 * calls because a dedicated canvas context must be created.
 *
 * @returns Returns a tuple containing, in this order, the width of the text, the text's ascent length and the text's descent length. The actual height can be found by summing the ascent and descent.
 *
 * @category Helper
 */
export function measureTextDims(text: string, font: string): [number, number, number] {
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
            throw new Error('Failed to get canvas context');
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

    // TODO cache a limited amount of text measurements

    // Measure text dimensions with a circumfix character so that whitespaces
    // are measurable, correcting for circumfix character's length. Measure
    // again but without circumfix. Pick the biggest left/right of the two, but
    // use circumfix ascent and descent
    const dimsCircumfix = measureContext.measureText(CIRCUMFIX_CHAR + text + CIRCUMFIX_CHAR);
    const dims = measureContext.measureText(text);
    const left = Math.max(Math.abs(dims.actualBoundingBoxLeft), Math.abs(dimsCircumfix.actualBoundingBoxLeft) - suffixLength);
    const right = Math.max(Math.abs(dims.actualBoundingBoxRight), Math.abs(dimsCircumfix.actualBoundingBoxRight) - suffixLength);

    return [
        left + right,
        Math.abs(dimsCircumfix.actualBoundingBoxAscent),
        Math.abs(dimsCircumfix.actualBoundingBoxDescent),
    ];
}
