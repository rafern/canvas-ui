import type { ThemeProperty } from './ThemeProperty';
import type { Alignment2D } from './Alignment2D';
import type { Alignment } from './Alignment';
import type { Padding } from './Padding';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
export class Theme {
    // Theme properties
    properties: Map<ThemeProperty, unknown> = new Map<ThemeProperty, unknown>();
    // Fallback theme
    fallback: Theme | null = null;

    // Constructor. Makes theme from given theme properties and fallback theme.
    // These can be changed later
    constructor(properties: Map<ThemeProperty, unknown>, fallback: Theme | null = null) {
        this.properties = properties;
        this.fallback = fallback;
    }

    // Get a theme property. This may be a string with a colour, string with a
    // font, number, etc... If a theme property is not available, the theme will
    // try to get it from the fallback theme. If there is no fallback theme set,
    // an exception is thrown
    getProperty(themeProperty: ThemeProperty): unknown { // XXX private
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

    // See getProperty
    getString(themeProperty: ThemeProperty): string {
        const value = this.getProperty(themeProperty);

        if(typeof value !== 'string')
            throw new Error(`Theme property ${themeProperty} is not a string`);

        return value;
    }

    // See getProperty
    getNumber(themeProperty: ThemeProperty): number {
        const value = this.getProperty(themeProperty);

        if(typeof value !== 'number')
            throw new Error(`Theme property ${themeProperty} is not a number`);

        return value;
    }

    // See getProperty
    getPadding(themeProperty: ThemeProperty): Padding {
        // TODO proper type safety
        return this.getProperty(themeProperty) as Padding;
    }

    // See getProperty
    getAlignment(themeProperty: ThemeProperty): Alignment {
        // TODO proper type safety
        return this.getProperty(themeProperty) as Alignment;
    }

    // See getProperty
    getAlignment2D(themeProperty: ThemeProperty): Alignment2D {
        // TODO proper type safety
        return this.getProperty(themeProperty) as Alignment2D;
    }

    // See getProperty
    // @deprecated
    getFill(themeProperty: ThemeProperty): string {
        return this.getString(themeProperty);
    }

    // See getProperty
    // @deprecated
    getFont(themeProperty: ThemeProperty): string {
        return this.getString(themeProperty);
    }

    // See getProperty
    // @deprecated
    getSize(themeProperty: ThemeProperty): number {
        return this.getNumber(themeProperty);
    }
}