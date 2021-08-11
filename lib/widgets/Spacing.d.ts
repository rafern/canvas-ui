import type { ThemeProperties } from '../theme/ThemeProperties';
import { Widget } from './Widget';
/**
 * A widget with empty space.
 *
 * Will always try to expand if the layout is constrained, so make sure to set
 * flex or pass it along the constructor
 *
 * @category Widget
 */
export declare class Spacing extends Widget {
    /** The minimum width this will try to expand */
    minWidth: number;
    /** The minimum height this will try to expand */
    minHeight: number;
    /** Create a new Spacing. */
    constructor(flex?: number, minWidth?: number, minHeight?: number, themeProperties?: ThemeProperties);
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
}
