import { ThemeProperties } from '../theme/ThemeProperties';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Widget } from './Widget';
import { Theme } from '../theme/Theme';
import { Button } from './Button';
/**
 * A {@link Button} which overrides the canvas colour, meaning that it has a
 * filled background.
 *
 * Can be constrained to a specific type of children.
 *
 * This button version can also be "forced down"; the button becomes similar to
 * being pressed, visually. Useful for implementing widgets such as
 * {@link ShiftKey}.
 *
 * @category Widget
 */
export declare class FilledButton<W extends Widget = Widget> extends Button<W> {
    /** Theme property used for overriding the canvas colour. */
    private backgroundProperty;
    /**
     * Is the button currently forced down?
     *
     * @decorator `@watchField(FilledButton.prototype.updateBackground)`
     */
    forced: boolean;
    /** The inherited theme for the child */
    private childTheme;
    /** Create a new FilledButton. */
    constructor(child: W, callback?: (() => void) | null, themeProperties?: ThemeProperties);
    /**
     * Update the background fill.
     *
     * Sets {@link FilledButton#backgroundProperty} depending on
     * {@link FilledButton#forced} and {@link ButtonClickHelper#clickState},
     * sets {@link FilledButton#childTheme}.{@link Theme#canvasFill} and flags
     * {@link FilledButton#backgroundDirty} as true.
     */
    private updateBackground;
    private getBackgroundFill;
    set inheritedTheme(theme: Theme | undefined);
    get inheritedTheme(): Theme | undefined;
    protected onThemeUpdated(property?: string | null): void;
    onFocusGrabbed(focusType: FocusType): void;
    onFocusDropped(focusType: FocusType): void;
    protected handleEvent(event: Event): Widget | null;
    protected handlePainting(ctx: CanvasRenderingContext2D, forced: boolean): void;
}
