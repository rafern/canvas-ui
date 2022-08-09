import { Widget, WidgetProperties } from './Widget';
/**
 * Optional TextInput constructor properties.
 *
 * @category Widget
 */
export interface SpacingProperties extends WidgetProperties {
    /** Sets {@link Spacing#minWidth}. */
    minWidth?: number;
    /** Sets {@link Spacing#minHeight}. */
    minHeight?: number;
}
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
    constructor(properties?: Readonly<SpacingProperties>);
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
}
