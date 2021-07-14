import type { ThemeProperty } from './ThemeProperty';
import type { Alignment2D } from './Alignment2D';
import type { Alignment } from './Alignment';
import type { Padding } from './Padding';

/**
 * A theme. Provides styling for widgets.
 *
 * @category Theme
 */
export class Theme {
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
     */
    constructor(properties: Map<ThemeProperty, unknown>, fallback: Theme | null = null) {
        this.properties = properties;
        this.fallback = fallback;
    }

    /**
     * Get the value associated with a given {@link ThemeProperty}.
     *
     * If the value is missing, the {@link fallback} is tried. If there is no
     * fallback, an exception is thrown.
     *
     * @returns Returns the value associated with the theme property. This could be any type.
     */
    private getProperty(themeProperty: ThemeProperty): unknown {
        // Get property's value
        let value = this.properties.get(themeProperty);

        // If property is missing, get property from fallback theme
        if(value === undefined) {
            if(this.fallback === null)
                throw new Error(`Theme property ${themeProperty} is not available`);

            value = this.fallback.getProperty(themeProperty);
        }

        return value;
    }

    /**
     * Same as {@link getProperty}, but with type checking for string.
     * @deprecated
     */
    getString(themeProperty: ThemeProperty): string {
        const value = this.getProperty(themeProperty);

        // TODO make this private and remove deprecated

        if(typeof value !== 'string')
            throw new Error(`Theme property ${themeProperty} is not a string`);

        return value;
    }

    /** Same as {@link getProperty}, but with type checking for number. */
    getNumber(themeProperty: ThemeProperty): number {
        const value = this.getProperty(themeProperty);

        if(typeof value !== 'number')
            throw new Error(`Theme property ${themeProperty} is not a number`);

        return value;
    }

    /** Same as {@link getProperty}, but casts value to {@link Padding}. */
    getPadding(themeProperty: ThemeProperty): Padding {
        // TODO proper type safety
        return this.getProperty(themeProperty) as Padding;
    }

    /** Same as {@link getProperty}, but casts value to {@link Alignment}. */
    getAlignment(themeProperty: ThemeProperty): Alignment {
        // TODO proper type safety
        return this.getProperty(themeProperty) as Alignment;
    }

    /** Same as {@link getProperty}, but casts value to {@link Alignment2D}. */
    getAlignment2D(themeProperty: ThemeProperty): Alignment2D {
        // TODO proper type safety
        return this.getProperty(themeProperty) as Alignment2D;
    }

    /** Equivalent to {@link getString} */
    getFill(themeProperty: ThemeProperty): string {
        // TODO allow gradients, etc... fill styles are not always strings
        return this.getString(themeProperty);
    }

    /** Equivalent to {@link getString} */
    getFont(themeProperty: ThemeProperty): string {
        return this.getString(themeProperty);
    }

    /**
     * Equivalent to {@link getNumber}
     * @deprecated
     */
    getSize(themeProperty: ThemeProperty): number {
        return this.getNumber(themeProperty);
    }
}