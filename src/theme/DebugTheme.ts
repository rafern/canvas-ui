import type { ThemeProperty } from './ThemeProperty';
import { defaultTheme } from './DefaultTheme';
import { Theme } from './Theme';

class DebugTheme extends Theme {
    constructor(fallback: Theme) {
        super(new Map(), fallback);
    }

    getFill(themeProperty: ThemeProperty): string {
        // Always return a random fill color if the original method didn't throw
        // an exception
        void super.getFill(themeProperty);

        return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }
}

export const debugTheme = new DebugTheme(defaultTheme);
