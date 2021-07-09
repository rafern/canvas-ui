import { PassthroughWidget } from './PassthroughWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
/**
 * A {@link PassthroughWidget} which changes the theme of its child and
 * completely ignores inherited themes.
 *
 * Since the new theme replaces the inherited theme, children of the child will
 * also inherit this theme since inherited themes are propagated down the widget
 * tree.
 *
 * @category Widget
 */
export declare class ThemeScope extends PassthroughWidget {
    /** The theme used for the child. */
    private scopeTheme;
    /** Create a new ThemeScope. */
    constructor(child: Widget, themeOverride: Theme);
    setThemeOverride(scopeTheme: Theme): void;
    inheritTheme(_theme: Theme): void;
}
