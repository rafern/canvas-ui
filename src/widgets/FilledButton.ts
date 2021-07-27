import { ClickState } from '../aggregates/ClickHelper';
import { ThemeProperty } from '../theme/ThemeProperty';
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
 * Can be constrained to a specific type of children.
 *
 * This button version can also be "forced down"; the button becomes similar to
 * being pressed, visually. Useful for implementing widgets such as
 * {@link ShiftKey}.
 *
 * @category Widget
 */
export class FilledButton<W extends Widget = Widget> extends Button<W> {
    /** Theme property used for overriding the canvas colour. */
    private backgroundProperty: ThemeProperty = ThemeProperty.BackgroundFill;
    /** Is the button currently forced down? */
    private _forced = false;

    /**
     * Update the background fill.
     *
     * Sets {@link backgroundProperty} depending on {@link _forced} and
     * {@link clickState}, calls {@link inheritTheme} and sets
     * {@link _backgroundDirty} to true.
     */
    private updateBackground(): void {
        if(this._forced)
            this.backgroundProperty = ThemeProperty.PrimaryFill;
        else {
            switch(this.clickHelper.clickState) {
            case ClickState.Hold:
                this.backgroundProperty = ThemeProperty.AccentFill;
                break;
            case ClickState.Hover:
                this.backgroundProperty = ThemeProperty.BackgroundGlowFill;
                break;
            default:
                this.backgroundProperty = ThemeProperty.BackgroundFill;
                break;
            }
        }

        // Update inherited theme
        const overrideValue = this.theme.getFill(this.backgroundProperty);
        const modifiedTheme = new Theme(
            new Map([
                [ThemeProperty.CanvasFill, overrideValue],
            ]),
            this.inheritedTheme?.fallback,
        );

        super.inheritTheme(modifiedTheme);
        this.backgroundDirty = true;
    }

    set forced(forced: boolean) {
        if(forced !== this._forced) {
            this._forced = forced;
            this.updateBackground();
        }
    }

    get forced(): boolean {
        return this._forced;
    }

    protected override setThemeOverride(theme: Theme | null): void {
        this.backgroundDirty = true;

        if(theme === null)
            return super.setThemeOverride(null);

        // Create new theme with the canvas colour set to the override's
        // background and use that as the theme override. If override doesn't
        // have the wanted property, it will throw an exception.
        try {
            const overrideValue = theme.getFill(this.backgroundProperty);
            const modifiedTheme = new Theme(new Map([
                [ThemeProperty.CanvasFill, overrideValue],
            ]));

            super.setThemeOverride(modifiedTheme);
        }
        catch(_e) {
            return super.setThemeOverride(null);
        }
    }

    protected override inheritTheme(theme: Theme): void {
        this.backgroundDirty = true;

        // Create theme with fallback to new theme with overridden canvas colour
        const canvasValue = theme.getFill(this.backgroundProperty);
        const modifiedTheme = new Theme(
            new Map([
                [ThemeProperty.CanvasFill, canvasValue],
            ]),
            theme,
        );

        super.inheritTheme(modifiedTheme);
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        const capturer = super.handleEvent(event, root);

        if(this.clickHelper.clickStateChanged)
            this.updateBackground();

        return capturer;
    }
}
