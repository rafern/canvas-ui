import { ThemeProperty } from '../theme/ThemeProperty';
import { TextHelper } from '../aggregates/TextHelper';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A function which returns a string. An alternative to supplying a
 * {@link Label} with a string if you have a text value that constantly changes.
 *
 * @category Widget
 */
export type TextGetter = () => string;

// TODO add support for multiline text with wrapping
/**
 * A widget which displays a line of text.
 *
 * @category Widget
 */
export class Label extends Widget {
    /**
     * The text getter source. If this is not null, text will be updated with
     * the return value of this callback, every update.
     */
    private textGetter: TextGetter | null = null;
    /** The helper for measuring/painting text */
    protected textHelper: TextHelper;

    /**
     * Create a new Label.
     *
     * @param source The text source of the label. Has the same behaviour as setting {@link source}.
     */
    constructor(source: string | TextGetter, themeOverride: Theme | null = null) {
        // Labels need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this.textHelper = new TextHelper();
        this.source = source;
    }

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
    set source(source: string | TextGetter) {
        if(source instanceof Function)
            this.textGetter = source;
        else {
            this.textGetter = null;
            this.textHelper.text = source;
        }
    }

    get source(): string | TextGetter {
        if(this.textGetter !== null)
            return this.textGetter;
        else
            return this.textHelper.text;
    }

    /** The current minimum text width. */
    set minWidth(minWidth: number) {
        this.textHelper.minWidth = minWidth;
    }

    get minWidth(): number {
        return this.textHelper.minWidth;
    }

    /** The current minimum text ascent height. */
    set minAscent(minAscent: number) {
        this.textHelper.minAscent = minAscent;
    }

    get minAscent(): number {
        return this.textHelper.minAscent;
    }

    /** The current minimum text descent height. */
    set minDescent(minDescent: number) {
        this.textHelper.minDescent = minDescent;
    }

    get minDescent(): number {
        return this.textHelper.minDescent;
    }

    /**
     * The current text value. If you want to get the current text source, then
     * use {@link source} instead.
     */
    get text(): string {
        return this.textHelper.text;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Update text helper variables
        if(this.textGetter !== null)
            this.textHelper.text = this.textGetter();

        this.textHelper.font = this.theme.getFont(ThemeProperty.BodyTextFont);
        this.textHelper.minWidth = this.theme.getNumber(ThemeProperty.LabelMinWidth);
        this.textHelper.minAscent = this.theme.getNumber(ThemeProperty.LabelMinAscent);
        this.textHelper.minDescent = this.theme.getNumber(ThemeProperty.LabelMinDescent);

        // Mark as dirty if text helper is dirty
        if(this.textHelper.dirty) {
            this._dirty = true;
            this._layoutDirty = true;
        }
    }

    protected override handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        this.width = Math.max(Math.min(this.textHelper.width, maxWidth), minWidth);
        this.height = Math.max(Math.min(this.textHelper.height, maxHeight), minHeight);
    }

    protected override handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void {
        // TODO clip to prevent drawing outside of widget if you know that the dimensions are too small
        ctx.font = this.textHelper.font;
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BodyTextFill);
        ctx.fillText(this.text, x, y + this.height - this.textHelper.descent);
    }
}
