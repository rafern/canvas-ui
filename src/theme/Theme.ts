import type { ThemeProperties } from './ThemeProperties';
import { BaseTheme } from './BaseTheme';

export class Theme extends BaseTheme {
    /** Listeners that are listening for changes in this theme (or fallback) */
    protected subscribers: Set<(property: string | null) => void>;

    /** Create a new Theme */
    constructor(properties?: ThemeProperties, fallbackTheme?: Theme) {
        super(properties, fallbackTheme);
        this.subscribers = new Set();
    }

    protected override onThemeUpdated(property: string | null = null): void {
        // Notify all subscribers
        for(const listener of this.subscribers)
            listener(property);
    }

    subscribe(listener: (property: string | null) => void): void {
        this.subscribers.add(listener);
    }

    unsubscribe(listener: (property: string | null) => void): void {
        this.subscribers.delete(listener);
    }
}