import type { ThemeProperty } from './ThemeProperty';
import { Theme } from './Theme';

/**
 * A theme which always gives out a random fill colour. Used for debugging when
 * painting occurs. Has no properties but always has a fallback theme.
 *
 * @category Theme
 */
export class DebugTheme extends Theme {
    /**
     * Create a new DebugTheme instance.
     *
     * @param fallback The actual theme to use. Fill colors will be ignored as they are randomly generated. If none supplied, then the default theme found in {@link Theme.constructor} is used
     */
    constructor(fallback: Theme = new Theme()) {
        super(new Map(), fallback);
    }

    override getFill(themeProperty: ThemeProperty): string {
        // Always return a random fill color if the original method didn't throw
        // an exception
        void super.getFill(themeProperty);

        return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }
}
