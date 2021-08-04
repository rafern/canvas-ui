let measureContext: CanvasRenderingContext2D | null = null;

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
export function measureTextDims(text: string, font: string): TextMetrics {
    // Get canvas context if not yet got
    if(measureContext === null) {
        const tempCanvas = document.createElement('canvas');
        measureContext = tempCanvas.getContext('2d');
        if(measureContext === null)
            throw new Error('Failed to get canvas context');
    }

    // Set font
    measureContext.font = font;

    // Measure text
    // TODO cache a limited amount of text measurements
    return measureContext.measureText(text);
}
