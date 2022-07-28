import type { ThemeProperties } from '../theme/ThemeProperties';
import { TextHelper } from '../helpers/TextHelper';
import { Widget } from './Widget';
/**
 * A function which returns a string. An alternative to supplying a
 * {@link Label} with a string if you have a text value that constantly changes.
 *
 * @category Widget
 */
export declare type TextGetter = () => string;
/**
 * A widget which displays a line of text.
 *
 * @category Widget
 */
export declare class Label extends Widget {
    /**
     * The text getter source. If this is not null, text will be updated with
     * the return value of this callback, every update.
     */
    private textGetter;
    /** The helper for measuring/painting text */
    protected textHelper: TextHelper;
    /**
     * Is text wrapping enabled? If not, text will clipped on overflow
     *
     * @decorator `@layoutField`
     */
    wrapText: boolean;
    /**
     * Create a new Label.
     *
     * @param source - The text source of the label. Has the same behaviour as setting {@link Label#source}.
     */
    constructor(source: string | TextGetter, themeProperties?: ThemeProperties);
    /**
     * This label's text source. If you want to get the current text string,
     * then use {@link Label#text} instead.
     *
     * When setting, if source is a {@link TextGetter}, then
     * {@link Label#textGetter} is set, else, {@link Label#textGetter} is set to
     * null and and the {@link Label#textHelper}'s
     * {@link TextHelper#text | text} is set.
     *
     * When getting, if {@link Label#textGetter} is set, then it is returned,
     * else, {@link Label#textHelper}.{@link TextHelper#text | text} is
     * returned.
     */
    set source(source: string | TextGetter);
    get source(): string | TextGetter;
    /**
     * The current text value. If you want to get the current text source, then
     * use {@link Label#source} instead.
     */
    get text(): string;
    protected onThemeUpdated(property?: string | null): void;
    protected handlePreLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(_forced: boolean): void;
}
