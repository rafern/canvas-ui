import { ClickState } from '../aggregates/ClickHelper';
import { watchField } from '../decorators/FlagFields';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';
import { Button } from './Button';
import { FillStyle } from '../theme/FillStyle';
import { ThemeProperties } from '../theme/ThemeProperties';

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
    private backgroundProperty = 'backgroundFill';
    /**
     * Is the button currently forced down?
     * @watchField(FilledButton.prototype.updateBackground)
     */
    @watchField(FilledButton.prototype.updateBackground)
    forced = false;

    /**
     * Update the background fill.
     *
     * Sets {@link backgroundProperty} depending on {@link _forced} and
     * {@link clickState}, calls {@link inheritTheme} and sets
     * {@link _backgroundDirty} to true.
     */
    private updateBackground(): void {
        const oldProperty = this.backgroundProperty;

        if(this.forced)
            this.backgroundProperty = 'primaryFill';
        else {
            switch(this.clickHelper.clickState) {
            case ClickState.Hold:
                this.backgroundProperty = 'accentFill';
                break;
            case ClickState.Hover:
                this.backgroundProperty = 'backgroundGlowFill';
                break;
            default:
                this.backgroundProperty = 'backgroundFill';
                break;
            }
        }

        // Update inherited theme of children and mark background as dirty if
        // property changed
        if(oldProperty !== this.backgroundProperty) {
            this.backgroundDirty = true;
            this.setChildrensTheme();
        }
    }

    private getBackgroundFill(): FillStyle {
        switch(this.backgroundProperty) {
            case 'primaryFill':
                return this.primaryFill;
            case 'accentFill':
                return this.accentFill;
            case 'backgroundGlowFill':
                return this.backgroundGlowFill;
            case 'backgroundFill':
                return this.backgroundFill;
            default:
                throw new Error(`Unknown theme property: ${this.backgroundProperty}`);
        }
    }

    override set inheritedTheme(theme: Theme | undefined) {
        if(theme === this.fallbackTheme)
            return;

        this.fallbackTheme = theme;
        this.setChildrensTheme();
    }

    override get inheritedTheme(): Theme | undefined {
        return this.fallbackTheme;
    }

    private setChildrensTheme(): void {
        // Create new theme with an overridden canvasFill value
        const themeOverride = new Theme(<ThemeProperties>{
            canvasFill: this.getBackgroundFill(),
        }, this.fallbackTheme);

        for(const child of this.children)
            child.inheritedTheme = themeOverride;
    }

    protected override onThemeUpdated(property: string | null = null): void {
        if(property === null) {
            this._layoutDirty = true;
            this.backgroundDirty = true;
            this.setChildrensTheme();
        }
        else if(property === this.backgroundFill) {
            this.backgroundDirty = true;
            this.setChildrensTheme();
        }
        else if(property === 'containerPadding')
            this._layoutDirty = true;
        else if(property === 'containerAlignment')
            this._layoutDirty = true;
    }

    protected override handleEvent(event: Event, root: Root): Widget | null {
        const capturer = super.handleEvent(event, root);

        if(this.clickHelper.clickStateChanged)
            this.updateBackground();

        return capturer;
    }
}
