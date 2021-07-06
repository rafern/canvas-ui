import type { ThemeProperty } from './ThemeProperty';
import { Theme } from './Theme';

export class DebugTheme extends Theme {
    constructor(fallback: Theme) {
        super(new Map(), fallback);
    }

    override getFill(themeProperty: ThemeProperty): string {
        // Always return a random fill color if the original method didn't throw
        // an exception
        void super.getFill(themeProperty);

        return '#' + Math.floor(Math.random() * 0xffffff).toString(16);
    }
}
