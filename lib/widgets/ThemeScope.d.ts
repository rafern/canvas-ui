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
export declare class ThemeScope<W extends Widget = Widget> extends PassthroughWidget<W> {
    /** The theme used for the child. */
    private scopeTheme;
    /** Create a new ThemeScope. */
    constructor(child: W, themeOverride: Theme);
    set inheritedTheme(_theme: Theme | undefined);
    get inheritedTheme(): Theme | undefined;
}
