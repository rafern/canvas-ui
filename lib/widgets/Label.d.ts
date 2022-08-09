import { TextHelper } from '../helpers/TextHelper';
import { Widget, WidgetProperties } from './Widget';
/**
 * Optional TextInput constructor properties.
 *
 * @category Widget
 */
export interface LabelProperties extends WidgetProperties {
    /** Sets {@link Label#wrapText}. */
    wrapText?: boolean;
}
/**
 * A widget which displays a line of text.
 *
 * @category Widget
 */
export declare class Label extends Widget {
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
     * @param text - The text of the label. Has the same behaviour as setting {@link Label#text}.
     */
    constructor(text?: string, properties?: Readonly<LabelProperties>);
    /** The current text value. */
    set text(text: string);
    get text(): string;
    protected onThemeUpdated(property?: string | null): void;
    protected handlePreLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(_forced: boolean): void;
}
