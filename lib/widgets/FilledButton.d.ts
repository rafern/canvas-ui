import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';
import { Button } from './Button';
/**
 * A {@link Button} which overrides the canvas colour, meaning that it has a
 * filled background. Uses a technique similar to {@link ThemeScope} to achieve
 * this.
 *
 * This button version can also be "forced down"; the button becomes similar to
 * being pressed, visually. Useful for implementing widgets such as
 * {@link ShiftKey}.
 *
 * @category Widget
 */
export declare class FilledButton extends Button {
    /** Theme property used for overriding the canvas colour. */
    private backgroundProperty;
    /** Is the button currently forced down? */
    private _forced;
    /**
     * Update the background fill.
     *
     * Sets {@link backgroundProperty} depending on {@link _forced} and
     * {@link clickState}, calls {@link inheritTheme} and sets
     * {@link _backgroundDirty} to true.
     */
    private updateBackground;
    set forced(forced: boolean);
    get forced(): boolean;
    protected setThemeOverride(theme: Theme | null): void;
    protected inheritTheme(theme: Theme): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
