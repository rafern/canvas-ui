import type { ThemeProperties } from '../theme/ThemeProperties';
import { TextHelper, WrapMode } from '../helpers/TextHelper';
import { layoutField } from '../decorators/FlagFields';
import { Widget } from './Widget';

/**
 * A function which returns a string. An alternative to supplying a
 * {@link Label} with a string if you have a text value that constantly changes.
 *
 * @category Widget
 */
export type TextGetter = () => string;

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
     * Is text wrapping enabled? If not, text will clipped on overflow
     *
     * @decorator `@layoutField`
     */
    @layoutField
    wrapText = true;

    /**
     * Create a new Label.
     *
     * @param source - The text source of the label. Has the same behaviour as setting {@link Label#source}.
     */
    constructor(source: string | TextGetter, themeProperties?: ThemeProperties) {
        // Labels need a clear background, have no children and don't propagate
        // events
        super(true, false, themeProperties);

        this.textHelper = new TextHelper();
        this.textHelper.wrapMode = WrapMode.Shrink;
        this.source = source;
    }

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

    /**
     * The current text value. If you want to get the current text source, then
     * use {@link Label#source} instead.
     */
    get text(): string {
        return this.textHelper.text;
    }

    protected override onThemeUpdated(property: string | null = null): void {
        super.onThemeUpdated(property);

        if(property === null) {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'bodyTextFont' ||
                property === 'labelMinWidth' ||
                property === 'labelMinAscent' ||
                property === 'labelMinDescent')
        {
            this._layoutDirty = true;
            this._dirty = true;
        }
        else if(property === 'bodyTextFill')
            this._dirty = true;
    }

    protected override handlePreLayoutUpdate(): void {
        // Update text helper variables
        if(this.textGetter !== null)
            this.textHelper.text = this.textGetter();

        this.textHelper.font = this.bodyTextFont;
        this.textHelper.lineHeight = this.bodyTextHeight;
        this.textHelper.lineSpacing = this.bodyTextSpacing;
        this.textHelper.alignMode = this.bodyTextAlign;

        // Mark as dirty if text helper is dirty
        if(this.textHelper.dirty) {
            this._dirty = true;
            this._layoutDirty = true;
        }
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        this.textHelper.maxWidth = this.wrapText ? maxWidth : Infinity;
        if(this.textHelper.dirty)
            this._dirty = true;

        this.idealWidth = Math.max(Math.min(this.textHelper.width, maxWidth), minWidth);
        this.idealHeight = Math.max(Math.min(this.textHelper.height, maxHeight), minHeight);
    }

    protected override handlePainting(_forced: boolean): void {
        // Start clipping if text wrapping is disabled
        const ctx = this.viewport.context;
        if(!this.wrapText) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.clip();
        }

        // Paint text
        this.textHelper.paint(ctx, this.bodyTextFill, this.idealX, this.idealY);

        // Stop clipping if text wrapping is disabled
        if(!this.wrapText)
            ctx.restore();
    }
}
