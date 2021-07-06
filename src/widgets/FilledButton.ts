import { ThemeProperty } from '../theme/ThemeProperty';
import { ClickState } from '../mixins/Clickable';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';
import { Button } from './Button';

// A Button, but overrides the canvas colour; normally a Button itself is
// invisible, but not a FilledButton
export class FilledButton extends Button {
    // Theme property used for overriding the canvas colour
    private backgroundProperty: ThemeProperty = ThemeProperty.BackgroundFill;
    // Is the button currently forced down?
    private _forced = false;

    private updateBackground(): void {
        if(this._forced)
            this.backgroundProperty = ThemeProperty.PrimaryFill;
        else {
            switch(this.clickState) {
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
        this._backgroundDirty = true;
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
        this._backgroundDirty = true;

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
        this._backgroundDirty = true;

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

    protected override handlePostLayoutUpdate(root: Root): void {
        super.handlePostLayoutUpdate(root);

        if(this._dirty)
            this._backgroundDirty = true;
    }

    protected override handleEvent(event: Event, width: number, height: number, root: Root): Widget | null {
        const capturer = super.handleEvent(event, width, height, root);

        if(this.clickStateChanged)
            this.updateBackground();

        return capturer;
    }
}
