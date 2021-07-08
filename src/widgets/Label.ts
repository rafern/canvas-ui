import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
import { ThemeProperty } from '../theme/ThemeProperty';
import { FlexLayout } from '../mixins/FlexLayout';
import { Labelable } from '../mixins/Labelable';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

/**
 * A function which returns a string. An alternative to supplying a
 * {@link Label} with a string if you have a text value that constantly changes.
 *
 * @category Widget
 */
export type TextGetter = () => string;

// TODO add support for multiline text with wrapping
/**
 * A flexbox widget which displays line of text.
 *
 * @category Widget
 */
export class Label extends Mixin(FlexLayout, Labelable) {
    /**
     * The text getter. If this is not null, text will be updated with the
     * return value of this callback, every update.
     */
    private textGetter: TextGetter | null = null;

    /**
     * Create a new Label.
     *
     * @param text The text source of the label. Has the same behaviour as
     * setting {@link text}.
     */
    constructor(text: string | TextGetter, themeOverride: Theme | null = null) {
        // Labels need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this.text = text;

        // Default to no flex ratio. This can be overridden
        this.flexRatio = 0;

        // Labels are always horizontal
        // XXX japanese vertical text? completely out of scope for this project,
        // but if this library is ever published it might be a good idea to add
        // support
        this.vertical = false;
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
    set text(text: string | TextGetter) {
        if(text instanceof Function)
            this.textGetter = text;
        else {
            this.textGetter = null;
            this.setText(text);
        }
    }

    get text(): string | TextGetter {
        if(this.textGetter !== null)
            return this.textGetter;
        else
            return this._text;
    }

    /**
     * Gets {@link _text}. If you want to get the current text source, then use
     * {@link text} instead.
     */
    get currentText(): string {
        return this._text;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Update Labelable variables
        if(this.textGetter !== null)
            this.setText(this.textGetter());

        this.setFont(this.theme.getFont(ThemeProperty.BodyTextFont));
        this.setMinLabelWidth(this.theme.getSize(ThemeProperty.LabelMinWidth));
        this.setMinLabelAscent(this.theme.getSize(ThemeProperty.LabelMinAscent));
        this.setMinLabelDescent(this.theme.getSize(ThemeProperty.LabelMinDescent));

        this.internalMainBasis = this.labelWidth;
        this.internalCrossBasis = this.labelHeight;
    }

    protected override handlePainting(x: number, y: number, _width: number, height: number, ctx: CanvasRenderingContext2D): void {
        ctx.font = this._font;
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BodyTextFill);
        ctx.fillText(this._text, x, y + height - this.labelDescent);
    }
}
