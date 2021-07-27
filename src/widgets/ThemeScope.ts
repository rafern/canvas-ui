import { PassthroughWidget } from './PassthroughWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';

/**
 * A {@link PassthroughWidget} which changes the theme of its child and
 * completely ignores inherited themes.
 *
 * Can be constrained to a specific type of children.
 *
 * Since the new theme replaces the inherited theme, children of the child will
 * also inherit this theme since inherited themes are propagated down the widget
 * tree.
 *
 * @category Widget
 */
export class ThemeScope<W extends Widget = Widget> extends PassthroughWidget<W> {
    /** The theme used for the child. */
    private scopeTheme: Theme;

    /** Create a new ThemeScope. */
    constructor(child: W, themeOverride: Theme) {
        super(child, null);
        this.scopeTheme = themeOverride;
    }

    override setThemeOverride(scopeTheme: Theme): void {
        this.scopeTheme = scopeTheme;
        super.inheritTheme(this.scopeTheme);
    }

    override inheritTheme(_theme: Theme): void {
        // Ignore theme and use scope theme instead
        super.inheritTheme(this.scopeTheme);
    }
}