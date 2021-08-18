import type { FlexAlignment2D } from './FlexAlignment2D';
import type { ThemeProperties } from './ThemeProperties';
import { TextAlignMode } from '../helpers/TextHelper';
import type { Alignment2D } from './Alignment2D';
import type { FillStyle } from './FillStyle';
import type { Padding } from './Padding';
import type { Theme } from './Theme';
/**
 * The base class for {@link Widget} and {@link Theme}. The backbone of the
 * theming system.
 *
 * @category Theme
 */
export declare class BaseTheme implements ThemeProperties {
    /** See {@link fallbackTheme} */
    private _fallbackTheme?;
    /** Listener for theme fallback */
    private listener;
    /**
     * The fallback theme. If this theme has a missing property, the fallback
     * theme's property will be used instead. This will automatically
     * (un)subscribe to/from the fallback theme.
     */
    protected get fallbackTheme(): Theme | undefined;
    protected set fallbackTheme(newTheme: Theme | undefined);
    /** Called when the fallback theme changes. Does nothing by default. */
    protected onThemeUpdated(_property?: string | null): void;
    /** Create a new BaseTheme */
    constructor(properties?: ThemeProperties, fallbackTheme?: Theme);
    /** See {@link canvasFill}. For internal use only. */
    private _canvasFill?;
    get canvasFill(): FillStyle;
    set canvasFill(value: FillStyle | undefined);
    /** See {@link containerPadding}. For internal use only. */
    private _containerPadding?;
    get containerPadding(): Padding;
    set containerPadding(value: Padding | undefined);
    /** See {@link containerAlignment}. For internal use only. */
    private _containerAlignment?;
    get containerAlignment(): Alignment2D;
    set containerAlignment(value: Alignment2D | undefined);
    /** See {@link multiContainerSpacing}. For internal use only. */
    private _multiContainerSpacing?;
    get multiContainerSpacing(): number;
    set multiContainerSpacing(value: number | undefined);
    /** See {@link multiContainerAlignment}. For internal use only. */
    private _multiContainerAlignment?;
    get multiContainerAlignment(): FlexAlignment2D;
    set multiContainerAlignment(value: FlexAlignment2D | undefined);
    /** See {@link primaryFill}. For internal use only. */
    private _primaryFill?;
    get primaryFill(): FillStyle;
    set primaryFill(value: FillStyle | undefined);
    /** See {@link accentFill}. For internal use only. */
    private _accentFill?;
    get accentFill(): FillStyle;
    set accentFill(value: FillStyle | undefined);
    /** See {@link backgroundFill}. For internal use only. */
    private _backgroundFill?;
    get backgroundFill(): FillStyle;
    set backgroundFill(value: FillStyle | undefined);
    /** See {@link backgroundGlowFill}. For internal use only. */
    private _backgroundGlowFill?;
    get backgroundGlowFill(): FillStyle;
    set backgroundGlowFill(value: FillStyle | undefined);
    /** See {@link sliderMinLength}. For internal use only. */
    private _sliderMinLength?;
    get sliderMinLength(): number;
    set sliderMinLength(value: number | undefined);
    /** See {@link sliderThickness}. For internal use only. */
    private _sliderThickness?;
    get sliderThickness(): number;
    set sliderThickness(value: number | undefined);
    /** See {@link bodyTextFont}. For internal use only. */
    private _bodyTextFont?;
    get bodyTextFont(): string;
    set bodyTextFont(value: string | undefined);
    /** See {@link bodyTextFill}. For internal use only. */
    private _bodyTextFill?;
    get bodyTextFill(): FillStyle;
    set bodyTextFill(value: FillStyle | undefined);
    /** See {@link bodyTextHeight}. For internal use only. */
    private _bodyTextHeight?;
    get bodyTextHeight(): number | null;
    set bodyTextHeight(value: number | null | undefined);
    /** See {@link bodyTextSpacing}. For internal use only. */
    private _bodyTextSpacing?;
    get bodyTextSpacing(): number | null;
    set bodyTextSpacing(value: number | null | undefined);
    /** See {@link bodyTextAlign}. For internal use only. */
    private _bodyTextAlign?;
    get bodyTextAlign(): TextAlignMode | number;
    set bodyTextAlign(value: TextAlignMode | number | undefined);
    /** See {@link checkboxLength}. For internal use only. */
    private _checkboxLength?;
    get checkboxLength(): number;
    set checkboxLength(value: number | undefined);
    /** See {@link checkboxInnerPadding}. For internal use only. */
    private _checkboxInnerPadding?;
    get checkboxInnerPadding(): number;
    set checkboxInnerPadding(value: number | undefined);
    /** See {@link inputBackgroundFill}. For internal use only. */
    private _inputBackgroundFill?;
    get inputBackgroundFill(): FillStyle;
    set inputBackgroundFill(value: FillStyle | undefined);
    /** See {@link inputSelectBackgroundFill}. For internal use only. */
    private _inputSelectBackgroundFill?;
    get inputSelectBackgroundFill(): FillStyle;
    set inputSelectBackgroundFill(value: FillStyle | undefined);
    /** See {@link inputTextFont}. For internal use only. */
    private _inputTextFont?;
    get inputTextFont(): string;
    set inputTextFont(value: string | undefined);
    /** See {@link inputTextFill}. For internal use only. */
    private _inputTextFill?;
    get inputTextFill(): FillStyle;
    set inputTextFill(value: FillStyle | undefined);
    /** See {@link inputTextFillDisabled}. For internal use only. */
    private _inputTextFillDisabled?;
    get inputTextFillDisabled(): FillStyle;
    set inputTextFillDisabled(value: FillStyle | undefined);
    /** See {@link inputTextFillInvalid}. For internal use only. */
    private _inputTextFillInvalid?;
    get inputTextFillInvalid(): FillStyle;
    set inputTextFillInvalid(value: FillStyle | undefined);
    /** See {@link inputTextHeight}. For internal use only. */
    private _inputTextHeight?;
    get inputTextHeight(): number | null;
    set inputTextHeight(value: number | null | undefined);
    /** See {@link inputTextSpacing}. For internal use only. */
    private _inputTextSpacing?;
    get inputTextSpacing(): number | null;
    set inputTextSpacing(value: number | null | undefined);
    /** See {@link inputTextInnerPadding}. For internal use only. */
    private _inputTextInnerPadding?;
    get inputTextInnerPadding(): number;
    set inputTextInnerPadding(value: number | undefined);
    /** See {@link inputTextMinWidth}. For internal use only. */
    private _inputTextMinWidth?;
    get inputTextMinWidth(): number;
    set inputTextMinWidth(value: number | undefined);
    /** See {@link inputTextAlign}. For internal use only. */
    private _inputTextAlign?;
    get inputTextAlign(): TextAlignMode | number;
    set inputTextAlign(value: TextAlignMode | number | undefined);
    /** See {@link blinkRate}. For internal use only. */
    private _blinkRate?;
    get blinkRate(): number;
    set blinkRate(value: number | undefined);
    /** See {@link cursorThickness}. For internal use only. */
    private _cursorThickness?;
    get cursorThickness(): number;
    set cursorThickness(value: number | undefined);
    /** See {@link scrollBarThickness}. For internal use only. */
    private _scrollBarThickness?;
    get scrollBarThickness(): number;
    set scrollBarThickness(value: number | undefined);
    /** See {@link scrollBarMinPercent}. For internal use only. */
    private _scrollBarMinPercent?;
    get scrollBarMinPercent(): number;
    set scrollBarMinPercent(value: number | undefined);
    /** See {@link scrollBarMinPixels}. For internal use only. */
    private _scrollBarMinPixels?;
    get scrollBarMinPixels(): number;
    set scrollBarMinPixels(value: number | undefined);
}
