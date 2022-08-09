import { Icon, IconProperties } from './Icon';
import { Button } from './Button';
/**
 * A {@link Button} with an {@link Icon}.
 *
 * @category Widget
 * @category Aggregate Widget
 */
export declare class IconButton extends Button<Icon> {
    /** Create a new IconButton. */
    constructor(image: HTMLImageElement, callback: (() => void) | null, properties?: Readonly<IconProperties>);
}
