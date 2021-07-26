import { TextHelper } from '../aggregates/TextHelper';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
/**
 * A function which returns a string. An alternative to supplying a
 * {@link Label} with a string if you have a text value that constantly changes.
 *
 * @category Widget
 */
export declare type TextGetter = () => string;
/**
 * A flexbox widget which displays line of text.
 *
 * @category Widget
 */
export declare class Label extends FlexLayout {
    /**
     * The text getter source. If this is not null, text will be updated with
     * the return value of this callback, every update.
     */
    private textGetter;
    /** The helper for measuring/painting text */
    protected textHelper: TextHelper;
    /**
     * Create a new Label.
     *
     * @param source The text source of the label. Has the same behaviour as setting {@link source}.
     */
    constructor(source: string | TextGetter, themeOverride?: Theme | null);
    /**
     * This label's text source. If you want to get the current text string,
     * then use {@link currentText} instead.
     *
     * When setting, if text is a {@link TextGetter}, then {@link textGetter} is
     * set, else, {@link setText} is called.
     *
     * When getting, if {@link textGetter} is set, then it is returned, else,
     * {@link _text} is returned.
     */
    set source(source: string | TextGetter);
    get source(): string | TextGetter;
    /** The current minimum text width. */
    set minWidth(minWidth: number);
    get minWidth(): number;
    /** The current minimum text ascent height. */
    set minAscent(minAscent: number);
    get minAscent(): number;
    /** The current minimum text descent height. */
    set minDescent(minDescent: number);
    get minDescent(): number;
    /**
     * The current text value. If you want to get the current text source, then
     * use {@link source} instead.
     */
    get text(): string;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, _width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
