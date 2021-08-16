import type { ThemeProperties } from '../theme/ThemeProperties';
import { Button } from './Button';
import { Icon } from './Icon';

/**
 * A {@link Button} with an {@link Icon}.
 *
 * @category Widget
 */
export class IconButton extends Button<Icon> {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, callback: (() => void) | null = null, themeProperties?: ThemeProperties) {
        super(
            new Icon(image, width, height, viewBox, themeProperties),
            callback, themeProperties
        );
    }
}
