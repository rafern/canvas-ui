import { PassthroughWidget } from './PassthroughWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';

export class ThemeScope extends PassthroughWidget {
    private scopeTheme: Theme;

    // A passthrough widget that changes the theme of all children to a
    // different given one
    constructor(child: Widget, themeOverride: Theme) {
        super(child, null);
        this.scopeTheme = themeOverride;
    }

    // Set the scope theme
    setThemeOverride(scopeTheme: Theme): void {
        this.scopeTheme = scopeTheme;
        super.inheritTheme(this.scopeTheme);
    }

    inheritTheme(_theme: Theme): void {
        // Ignore theme and use scope theme instead
        super.inheritTheme(this.scopeTheme);
    }
}