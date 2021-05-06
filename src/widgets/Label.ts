import { ThemeProperty } from '../theme/ThemeProperty';
import { Labelable } from '../mixins/Labelable';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { BoxWidget } from './BoxWidget';

export type TextGetter = () => string;

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
export class Label extends Labelable(BoxWidget) {
    // The text getter. If this is not null, text will be updated with the
    // return value of this callback, every update
    textGetter: TextGetter | null = null; // XXX private

    // A widget that renders a single line of text. If text is dynamic, a
    // function may be passed as the text
    constructor(text: string | TextGetter, themeOverride: Theme | null = null) {
        // Labels need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this.text = text;
    }

    set text(text: string | TextGetter) {
        if(text instanceof Function)
            this.textGetter = text;
        else
            this.setText(text);
    }

    get text(): string | TextGetter {
        if(this.textGetter !== null)
            return this.textGetter;
        else
            return this._text;
    }

    get currentText(): string {
        return this._text;
    }

    handlePreLayoutUpdate(_root: Root): void {
        // Update Labelable variables
        if(this.textGetter !== null)
            this.setText(this.textGetter());

        this.setFont(this.theme.getFont(ThemeProperty.BodyTextFont));
        this.setMinLabelWidth(this.theme.getSize(ThemeProperty.LabelMinWidth));
        this.setMinLabelAscent(this.theme.getSize(ThemeProperty.LabelMinAscent));
        this.setMinLabelDescent(this.theme.getSize(ThemeProperty.LabelMinDescent));

        this.boxWidth = this.labelWidth;
        this.boxHeight = this.labelHeight;
    }

    handlePainting(x: number, y: number, _width: number, height: number, ctx: CanvasRenderingContext2D): void { // XXX protected
        ctx.font = this._font;
        ctx.fillStyle = this.theme.getFill(ThemeProperty.BodyTextFill);
        ctx.fillText(this._text, x, y + height - this.labelDescent);
    }
}
