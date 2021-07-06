import { PassthroughWidget } from './PassthroughWidget';
import type { Theme } from '../theme/Theme';
import type { Widget } from './Widget';
export declare class ThemeScope extends PassthroughWidget {
    private scopeTheme;
    constructor(child: Widget, themeOverride: Theme);
    setThemeOverride(scopeTheme: Theme): void;
    inheritTheme(_theme: Theme): void;
}
