import type { Theme } from '../theme/Theme';
import { Button } from './Button';
/**
 * A {@link Button} with an {@link Icon} inside a {@link Margin}.
 *
 * @category Widget
 */
export declare class IconButton extends Button {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, callback?: (() => void) | null, flexRatio?: number, mainBasis?: number, crossBasis?: number, vertical?: boolean | null, themeOverride?: Theme | null);
}
