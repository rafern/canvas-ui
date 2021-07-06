import type { ThemeProperty } from './ThemeProperty';
import { Theme } from './Theme';
export declare class DebugTheme extends Theme {
    constructor(fallback: Theme);
    getFill(themeProperty: ThemeProperty): string;
}
