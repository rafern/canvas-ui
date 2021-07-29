import type { FlexAlignment2D } from './FlexAlignment2D';
import type { Alignment2D } from './Alignment2D';
import { ThemeProperty } from './ThemeProperty';
import { FlexAlignment } from './FlexAlignment';
import type { Padding } from './Padding';
import { Alignment } from './Alignment';

// The default theme's properties. This will be cloned and, therefore, can't be
// modified
const defaultThemeProperties = new Map<ThemeProperty, unknown>([
    [ThemeProperty.CanvasFill, 'rgba(0,0,0,0.5)'], // 50% opaque black
    [ThemeProperty.ContainerPadding, <Padding>{
        left: 4,
        right: 4,
        top: 4,
        bottom: 4,
    }],
    [ThemeProperty.ContainerAlignment, <Alignment2D>{
        horizontal: Alignment.Start, vertical: Alignment.Start
    }],
    [ThemeProperty.MultiContainerSpacing, 4],
    [ThemeProperty.MultiContainerAlignment, <FlexAlignment2D>{
        main: FlexAlignment.SpaceBetween, cross: Alignment.Stretch
    }],
    [ThemeProperty.PrimaryFill, 'rgb(0,127,255)'], // Azure blue
    [ThemeProperty.AccentFill, 'rgb(0,195,255)'], // Greener azure blue
    [ThemeProperty.BackgroundFill, 'rgb(32,32,32)'], // Dark grey
    [ThemeProperty.BackgroundGlowFill, 'rgb(48,48,48)'], // Lighter dark grey
    [ThemeProperty.SliderMinLength, 100],
    [ThemeProperty.SliderThickness, 10],
    [ThemeProperty.BodyTextFont, '16px sans'],
    [ThemeProperty.BodyTextFill, 'white'],
    [ThemeProperty.LabelMinWidth, 0],
    [ThemeProperty.LabelMinAscent, 0],
    [ThemeProperty.LabelMinDescent, 3],
    [ThemeProperty.CheckboxLength, 12],
    [ThemeProperty.CheckboxInnerPadding, 2],
    [ThemeProperty.InputBackgroundFill, 'white'],
    [ThemeProperty.InputTextFont, '16px mono'],
    [ThemeProperty.InputTextFill, 'black'],
    [ThemeProperty.InputTextFillDisabled, 'grey'],
    [ThemeProperty.InputTextFillInvalid, 'red'],
    [ThemeProperty.InputTextMinWidth, 100],
    [ThemeProperty.InputTextMinAscent, 16],
    [ThemeProperty.InputTextMinDescent, 3],
    [ThemeProperty.InputTextInnerPadding, 2],
    [ThemeProperty.BlinkRate, 0.8],
    [ThemeProperty.CursorThickness, 1],
    [ThemeProperty.ScrollBarThickness, 10],
]);

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
     *
     * @param properties This theme's {@link ThemeProperty} values. If null, the default theme properties are used, which consist of mostly semi-transparent black backgrounds and azure blue accents, inspired by material design colours.
     */
    constructor(properties: Map<ThemeProperty, unknown> | null = null, fallback: Theme | null = null) {
        if(properties === null)
            this.properties = new Map(defaultThemeProperties);
        else
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
     * For internal use only.
     */
    private getString(themeProperty: ThemeProperty): string {
        const value = this.getProperty(themeProperty);

        if(typeof value !== 'string')
            throw new Error(`Theme property ${themeProperty} is not a string`);

        return value;
    }

    /** Validate a potential (Flex)Alignment ratio. For internal use only */
    private validateAlignmentType<T>(value: unknown): T | number {
        // TODO proper type safety
        if(typeof value === 'number') {
            if(value < 0 || value > 1)
                throw new Error(`(Flex)Alignment ratio of ${value} (< 0 or > 1) not allowed`);

            return value;
        }
        else
            return value as T;
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

    /**
     * Same as {@link getProperty}, but casts value to {@link Alignment} or
     * number (for ratio alignment).
     */
    getAlignment(themeProperty: ThemeProperty): Alignment | number {
        return this.validateAlignmentType(this.getProperty(themeProperty));
    }

    /** Same as {@link getProperty}, but casts value to {@link Alignment2D}. */
    getAlignment2D(themeProperty: ThemeProperty): Alignment2D {
        // TODO proper type safety
        const value = this.getProperty(themeProperty) as Alignment2D;
        this.validateAlignmentType(value.horizontal);
        this.validateAlignmentType(value.vertical);
        return value;
    }

    /**
     * Same as {@link getProperty}, but casts value to {@link FlexAlignment} or
     * number (for ratio alignment).
     */
    getFlexAlignment(themeProperty: ThemeProperty): FlexAlignment | number {
        return this.validateAlignmentType(this.getProperty(themeProperty));
    }

    /**
     * Same as {@link getProperty}, but casts value to {@link FlexAlignment2D}.
     */
    getFlexAlignment2D(themeProperty: ThemeProperty): FlexAlignment2D {
        // TODO proper type safety
        const value = this.getProperty(themeProperty) as FlexAlignment2D;
        this.validateAlignmentType(value.main);
        this.validateAlignmentType(value.cross);
        return value;
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
}