import type { ThemeProperty } from './ThemeProperty';
import { Theme } from './Theme';
declare class DebugTheme extends Theme {
    constructor(fallback: Theme);
    getFill(themeProperty: ThemeProperty): string;
}
export declare const debugTheme: DebugTheme;
export {};
