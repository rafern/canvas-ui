import type { Alignment2D } from './Alignment2D';
import { ThemeProperty } from './ThemeProperty';
import type { Padding } from './Padding';
import { Alignment } from './Alignment';
/**
 * A theme. Provides styling for widgets.
 *
 * @category Theme
 */
export declare class Theme {
    /** The values associated to each {@link ThemeProperty} for this theme. */
    properties: Map<ThemeProperty, unknown>;
    /**
     * The fallback theme. If this theme has a missing property, the fallback
     * theme's property will be used instead
     */
    fallback: Theme | null;
    /**
     * Creates a new Theme.
     *
     * Sets {@link properties} and {@link fallback}.
     *
     * @param properties This theme's {@link ThemeProperty} values. If null, the default theme properties are used, which consist of mostly semi-transparent black backgrounds and azure blue accents, inspired by material design colours.
     */
    constructor(properties?: Map<ThemeProperty, unknown> | null, fallback?: Theme | null);
    /**
     * Get the value associated with a given {@link ThemeProperty}.
     *
     * If the value is missing, the {@link fallback} is tried. If there is no
     * fallback, an exception is thrown.
     *
     * @returns Returns the value associated with the theme property. This could be any type.
     */
    private getProperty;
    /**
     * Same as {@link getProperty}, but with type checking for string.
     * For internal use only.
     */
    private getString;
    /** Same as {@link getProperty}, but with type checking for number. */
    getNumber(themeProperty: ThemeProperty): number;
    /** Same as {@link getProperty}, but casts value to {@link Padding}. */
    getPadding(themeProperty: ThemeProperty): Padding;
    /** Same as {@link getProperty}, but casts value to {@link Alignment}. */
    getAlignment(themeProperty: ThemeProperty): Alignment;
    /** Same as {@link getProperty}, but casts value to {@link Alignment2D}. */
    getAlignment2D(themeProperty: ThemeProperty): Alignment2D;
    /** Equivalent to {@link getString} */
    getFill(themeProperty: ThemeProperty): string;
    /** Equivalent to {@link getString} */
    getFont(themeProperty: ThemeProperty): string;
}
