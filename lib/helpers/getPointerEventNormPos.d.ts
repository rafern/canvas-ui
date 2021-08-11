/**
 * Extracts the position of a DOM MouseEvent and normalises it. Useful for
 * implementing mouse input.
 *
 * @returns Returns a 2-tuple containing the normalised coordinates; the first
 * element contains the normalised x axis, and the second element contains the
 * normalised y axis
 *
 * @category Helper
 */
export declare function getPointerEventNormPos(event: MouseEvent, domElem: HTMLElement): [number, number];
