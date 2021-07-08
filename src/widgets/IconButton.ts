import type { ButtonCallback } from './Button';
import type { Theme } from '../theme/Theme';
import { Button } from './Button';
import { Icon } from './Icon';

/**
 * A {@link Button} with an {@link Icon}.
 *
 * @category Widget
 */
export class IconButton extends Button {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, callback: ButtonCallback | null = null, themeOverride: Theme | null = null) {
        super(new Icon(image, width, height, viewBox, themeOverride), callback, themeOverride);
    }
}
