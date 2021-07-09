import type { ThemeProperty } from './ThemeProperty';
import { Theme } from './Theme';
/**
 * A theme which always gives out a random fill colour. Used for debugging when
 * painting occurs. Has no properties but always has a fallback theme.
 *
 * @category Theme
 */
export declare class DebugTheme extends Theme {
    /**
     * Create a new DebugTheme instance.
     *
     * @param fallback The actual theme to use. Fill colors will be ignored as
     * they are randomly generated.
     */
    constructor(fallback: Theme);
    getFill(themeProperty: ThemeProperty): string;
}
