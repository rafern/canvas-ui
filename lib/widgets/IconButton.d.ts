import type { Theme } from '../theme/Theme';
import { Button } from './Button';
import { Margin } from './Margin';
import { Icon } from './Icon';
/**
 * A {@link Button} with an {@link Icon} inside a {@link Margin}.
 *
 * @category Widget
 */
export declare class IconButton extends Button<Margin<Icon>> {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, callback?: (() => void) | null, themeOverride?: Theme | null);
    /** This button's Icon widget */
    get icon(): Icon;
}
