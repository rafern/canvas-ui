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
export declare type TextGetter = () => string;
declare const Label_base: import("ts-mixer/dist/types/types").Class<[themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean], FlexLayout & Labelable, {
    prototype: FlexLayout;
} & {
    prototype: Labelable;
}>;
/**
 * A flexbox widget which displays line of text.
 *
 * @category Widget
 */
export declare class Label extends Label_base {
    /**
     * The text getter. If this is not null, text will be updated with the
     * return value of this callback, every update.
     */
    private textGetter;
    /**
     * Create a new Label.
     *
     * @param text The text source of the label. Has the same behaviour as
     * setting {@link text}.
     */
    constructor(text: string | TextGetter, themeOverride?: Theme | null);
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
    set text(text: string | TextGetter);
    get text(): string | TextGetter;
    /**
     * Gets {@link _text}. If you want to get the current text source, then use
     * {@link text} instead.
     */
    get currentText(): string;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, _width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
