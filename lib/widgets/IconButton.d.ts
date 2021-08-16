import type { ThemeProperties } from '../theme/ThemeProperties';
import { Button } from './Button';
import { Icon } from './Icon';
/**
 * A {@link Button} with an {@link Icon}.
 *
 * @category Widget
 */
export declare class IconButton extends Button<Icon> {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, callback?: (() => void) | null, themeProperties?: ThemeProperties);
}
