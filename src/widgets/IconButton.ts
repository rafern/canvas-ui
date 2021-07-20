import type { Theme } from '../theme/Theme';
import { Button } from './Button';
import { Margin } from './Margin';
import { Icon } from './Icon';

/**
 * A {@link Button} with an {@link Icon} inside a {@link Margin}.
 *
 * @category Widget
 */
export class IconButton extends Button {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, callback: (() => void) | null = null, flexRatio = 0, mainBasis = 0, crossBasis = 0, vertical: boolean | null = null, themeOverride: Theme | null = null) {
        super(
            new Margin(
                new Icon(image, width, height, viewBox, themeOverride),
            ),
            callback, flexRatio, mainBasis, crossBasis, vertical, themeOverride
        );
    }
}
