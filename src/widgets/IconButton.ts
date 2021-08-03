import type { ThemeProperties } from '../theme/ThemeProperties';
import { Button } from './Button';
import { Margin } from './Margin';
import { Icon } from './Icon';

/**
 * A {@link Button} with an {@link Icon} inside a {@link Margin}.
 *
 * @category Widget
 */
export class IconButton extends Button<Margin<Icon>> {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, callback: (() => void) | null = null, themeProperties?: ThemeProperties) {
        super(
            new Margin(
                new Icon(image, width, height, viewBox, themeProperties),
            ),
            callback, themeProperties
        );
    }

    /** This button's Icon widget */
    get icon(): Icon {
        return this.child.child;
    }
}
