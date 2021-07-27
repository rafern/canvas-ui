import type { Theme } from '../theme/Theme';
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
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, callback: (() => void) | null = null, themeOverride: Theme | null = null) {
        super(
            new Margin(
                new Icon(image, width, height, viewBox, themeOverride),
            ),
            callback, themeOverride
        );
    }

    /** This button's Icon widget */
    get icon(): Icon {
        return this.child.child;
    }
}
