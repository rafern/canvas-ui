import type { ThemeProperty } from './ThemeProperty';
import type { Alignment2D } from './Alignment2D';
import type { Alignment } from './Alignment';
import type { Padding } from './Padding';
export declare class Theme {
    properties: Map<ThemeProperty, unknown>;
    fallback: Theme | null;
    constructor(properties: Map<ThemeProperty, unknown>, fallback?: Theme | null);
    getProperty(themeProperty: ThemeProperty): unknown;
    getString(themeProperty: ThemeProperty): string;
    getNumber(themeProperty: ThemeProperty): number;
    getPadding(themeProperty: ThemeProperty): Padding;
    getAlignment(themeProperty: ThemeProperty): Alignment;
    getAlignment2D(themeProperty: ThemeProperty): Alignment2D;
    getFill(themeProperty: ThemeProperty): string;
    getFont(themeProperty: ThemeProperty): string;
    getSize(themeProperty: ThemeProperty): number;
}
