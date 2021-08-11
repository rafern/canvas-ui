/**
 * Measures the dimensions of a given string of text with a given font.
 *
 * Note that the first time calling this function is slower than subsequent
 * calls because a dedicated canvas context must be created.
 *
 * @returns Returns a the TextMetrics of the measured text.
 *
 * @category Helper
 */
export declare function measureTextDims(text: string, font: string): TextMetrics;
