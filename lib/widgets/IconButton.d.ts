import type { ButtonCallback } from './Button';
import type { Theme } from '../theme/Theme';
import { Button } from './Button';
/**
 * A {@link Button} with an {@link Icon}.
 *
 * @category Widget
 */
export declare class IconButton extends Button {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, callback?: ButtonCallback | null, themeOverride?: Theme | null);
}
