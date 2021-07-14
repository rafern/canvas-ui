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
export declare function measureTextDims(text: string, font: string): [number, number, number];
