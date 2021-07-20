import { ButtonClickable } from './ButtonClickable';
import type { Widget } from '../widgets/Widget';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Theme } from '../theme/Theme';
/**
 * A {@link ButtonClickable} which overrides the canvas colour, meaning that it
 * has a filled background. Uses a technique similar to {@link ThemeScope} to
 * achieve this.
 *
 * This button version can also be "forced down"; the button becomes similar to
 * being pressed, visually. Useful for implementing widgets such as
 * {@link ShiftKey}.
 *
 * @category Mixin
 */
export declare class FilledButtonClickable extends ButtonClickable {
    /** Theme property used for overriding the canvas colour. */
    private backgroundProperty;
    /** Is the button currently forced down? */
    private _forced;
    /**
     * Is the button's background dirty? If extending {@link BaseContainer}, use
     * this to update the value of {@link BaseContainer._backgroundDirty}.
     */
    protected buttonBackgroundDirty: boolean;
    /**
     * Update the background fill.
     *
     * Sets {@link backgroundProperty} depending on {@link _forced} and
     * {@link clickState}, calls {@link inheritTheme} and sets
     * {@link _buttonBackgroundDirty} to true.
     */
    private updateBackground;
    set forced(forced: boolean);
    get forced(): boolean;
    protected setThemeOverride(theme: Theme | null): void;
    protected inheritTheme(theme: Theme): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleEvent(event: Event, width: number, height: number, root: Root): Widget | null;
}
