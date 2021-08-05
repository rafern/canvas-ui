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
    /** The inherited theme for the child */
    private childTheme: Theme;

    /** Create a new FilledButton. */
    constructor(child: W, callback: (() => void) | null = null, themeProperties?: ThemeProperties) {
        super(child, callback, themeProperties);

        // Make theme that will be inherited by child. Later, this theme's
        // canvasFill property will be changed, notifying the child. Make the
        // child inherit the theme. fallbackTheme is also later set when this
        // widget inherits a theme
        this.childTheme = new Theme(<ThemeProperties>{
            canvasFill: this.getBackgroundFill(),
        });
        this.child.inheritedTheme = this.childTheme;
    }

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

        // Update canvasFill property of child's theme
        if(oldProperty !== this.backgroundProperty) {
            this.backgroundDirty = true;
            this.childTheme.canvasFill = this.getBackgroundFill();
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
        this.childTheme.fallbackTheme = theme;
    }

    override get inheritedTheme(): Theme | undefined {
        return this.fallbackTheme;
    }

    protected override onThemeUpdated(property: string | null = null): void {
        if(property === null) {
            this._layoutDirty = true;
            this.backgroundDirty = true;
            this.childTheme.canvasFill = this.getBackgroundFill();
        }
        else if(property === this.backgroundFill) {
            this.backgroundDirty = true;
            this.childTheme.canvasFill = this.getBackgroundFill();
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

    protected override handlePainting(ctx: CanvasRenderingContext2D, forced: boolean): void {
        this.handleBaseContainerPainting(ctx, forced, this.getBackgroundFill());
    }
}
