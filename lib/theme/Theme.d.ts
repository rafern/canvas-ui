import type { ThemeProperties } from './ThemeProperties';
import { BaseTheme } from './BaseTheme';
export declare class Theme extends BaseTheme {
    /** Listeners that are listening for changes in this theme (or fallback) */
    protected subscribers: Set<(property: string | null) => void>;
    /** Create a new Theme */
    constructor(properties?: ThemeProperties, fallbackTheme?: Theme);
    get fallbackTheme(): Theme | undefined;
    set fallbackTheme(newTheme: Theme | undefined);
    protected onThemeUpdated(property?: string | null): void;
    subscribe(listener: (property: string | null) => void): void;
    unsubscribe(listener: (property: string | null) => void): void;
}
