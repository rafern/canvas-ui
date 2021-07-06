import { /* tree-shaking no-side-effects-when-called */ Labelable } from '../mixins/Labelable';
import { ThemeProperty } from '../theme/ThemeProperty';
import type { Theme } from '../theme/Theme';
import { FlexWidget } from './FlexWidget';
import type { Root } from '../core/Root';

export type TextGetter = () => string;

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
export class Label extends Labelable(FlexWidget) {
    // The text getter. If this is not null, text will be updated with the
    // return value of this callback, every update
    #textGetter: TextGetter | null = null;

    // A widget that renders a single line of text. If text is dynamic, a
    // function may be passed as the text
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

    set text(text: string | TextGetter) {
        if(text instanceof Function)
            this.#textGetter = text;
        else
            this.setText(text);
    }

    get text(): string | TextGetter {
        if(this.#textGetter !== null)
            return this.#textGetter;
        else
            return this._text;
    }

    get currentText(): string {
        return this._text;
    }

    override handlePreLayoutUpdate(_root: Root): void {
        // Update Labelable variables
        if(this.#textGetter !== null)
            this.setText(this.#textGetter());

        this.setFont(this.theme.getFont(ThemeProperty.BodyTextFont));
        this.setMinLabelWidth(this.theme.getSize(ThemeProperty.LabelMinWidth));
        this.setMinLabelAscent(this.theme.getSize(ThemeProperty.LabelMinAscent));
        this.setMinLabelDescent(this.theme.getSize(ThemeProperty.LabelMinDescent));

        this.internalMainBasis = this.labelWidth;
        this.internalCrossBasis = this.labelHeight;
    }

    override handlePainting(x: number, y: number, _width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
        ctx.font = this._font;
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BodyTextFill);
        ctx.fillText(this._text, x, y + height - this.labelDescent);
    }
}
