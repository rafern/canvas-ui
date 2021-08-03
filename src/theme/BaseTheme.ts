import type { FlexAlignment2D } from './FlexAlignment2D';
import type { ThemeProperties } from './ThemeProperties';
import type { Alignment2D } from './Alignment2D';
import { FlexAlignment } from './FlexAlignment';
import type { FillStyle } from './FillStyle';
import type { Padding } from './Padding';
import { Alignment } from './Alignment';
import type { Theme } from './Theme';

/**
 * Provides styling for {@link Widget | Widgets}. Despite each property being
 * possibly undefined, getting a property is guaranteed to return a valid value.
 *
 * @category Theme
 */
export class BaseTheme implements ThemeProperties {
    /** See {@link fallbackTheme} */
    private _fallbackTheme?: Theme;
    /** Listener for theme fallback */
    private listener: ((property: string | null) => void) | null = null;

    /**
     * The fallback theme. If this theme has a missing property, the fallback
     * theme's property will be used instead. This will automatically
     * (un)subscribe to/from the fallback theme.
     */
    protected get fallbackTheme(): Theme | undefined {
        return this._fallbackTheme;
    }

    protected set fallbackTheme(newTheme: Theme | undefined) {
        if(this._fallbackTheme === newTheme)
            return;

        // Unsubscribe from old theme
        const oldTheme = this._fallbackTheme;
        if(typeof oldTheme !== 'undefined' && this.listener !== null)
            oldTheme.unsubscribe(this.listener);

        // Subscribe to new theme
        if(typeof newTheme !== 'undefined') {
            this.listener = (property: string | null) => this.onThemeUpdated(property);
            newTheme.subscribe(this.listener);
        }

        // Notify that the fallback theme has changed
        this.onThemeUpdated();
    }

    /** Called when the fallback theme changes. Does nothing by default. */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected onThemeUpdated(_property: string | null = null): void {}

    constructor(properties?: ThemeProperties, fallbackTheme?: Theme) {
        this._fallbackTheme = fallbackTheme;

        if(typeof properties === 'undefined')
            return;

        // XXX BASETHEME CTOR AUTO-GENERATED CODE START
        this.canvasFill = properties.canvasFill;
        this.containerPadding = properties.containerPadding;
        this.containerAlignment = properties.containerAlignment;
        this.multiContainerSpacing = properties.multiContainerSpacing;
        this.multiContainerAlignment = properties.multiContainerAlignment;
        this.primaryFill = properties.primaryFill;
        this.accentFill = properties.accentFill;
        this.backgroundFill = properties.backgroundFill;
        this.backgroundGlowFill = properties.backgroundGlowFill;
        this.sliderMinLength = properties.sliderMinLength;
        this.sliderThickness = properties.sliderThickness;
        this.bodyTextFont = properties.bodyTextFont;
        this.bodyTextFill = properties.bodyTextFill;
        this.labelMinWidth = properties.labelMinWidth;
        this.labelMinAscent = properties.labelMinAscent;
        this.labelMinDescent = properties.labelMinDescent;
        this.checkboxLength = properties.checkboxLength;
        this.checkboxInnerPadding = properties.checkboxInnerPadding;
        this.inputBackgroundFill = properties.inputBackgroundFill;
        this.inputTextFont = properties.inputTextFont;
        this.inputTextFill = properties.inputTextFill;
        this.inputTextFillDisabled = properties.inputTextFillDisabled;
        this.inputTextFillInvalid = properties.inputTextFillInvalid;
        this.inputTextMinWidth = properties.inputTextMinWidth;
        this.inputTextMinAscent = properties.inputTextMinAscent;
        this.inputTextMinDescent = properties.inputTextMinDescent;
        this.inputTextInnerPadding = properties.inputTextInnerPadding;
        this.blinkRate = properties.blinkRate;
        this.cursorThickness = properties.cursorThickness;
        this.scrollBarThickness = properties.scrollBarThickness;
        this.scrollBarMinPercent = properties.scrollBarMinPercent;
        this.scrollBarMinPixels = properties.scrollBarMinPixels;
        // XXX BASETHEME CTOR AUTO-GENERATED CODE END
    }

    // XXX BASETHEME AUTO-GENERATED CODE START
    /** See {@link canvasFill}. For internal use only. */
    private _canvasFill?: FillStyle;

    get canvasFill(): FillStyle {
        return this._canvasFill ?? this._fallbackTheme?.canvasFill ?? 'rgba(0,0,0,0.5)';
    }

    set canvasFill(value: FillStyle | undefined) {
        if(this._canvasFill !== value) {
            this._canvasFill = value;
            this.onThemeUpdated('canvasFill');
        }
    }

    /** See {@link containerPadding}. For internal use only. */
    private _containerPadding?: Padding;

    get containerPadding(): Padding {
        return this._containerPadding ?? this._fallbackTheme?.containerPadding ?? <Padding>{left: 4, right: 4, top: 4, bottom: 4};
    }

    set containerPadding(value: Padding | undefined) {
        if(this._containerPadding !== value) {
            this._containerPadding = value;
            this.onThemeUpdated('containerPadding');
        }
    }

    /** See {@link containerAlignment}. For internal use only. */
    private _containerAlignment?: Alignment2D;

    get containerAlignment(): Alignment2D {
        return this._containerAlignment ?? this._fallbackTheme?.containerAlignment ?? <Alignment2D>{horizontal: Alignment.Start, vertical: Alignment.Start};
    }

    set containerAlignment(value: Alignment2D | undefined) {
        if(this._containerAlignment !== value) {
            this._containerAlignment = value;
            this.onThemeUpdated('containerAlignment');
        }
    }

    /** See {@link multiContainerSpacing}. For internal use only. */
    private _multiContainerSpacing?: number;

    get multiContainerSpacing(): number {
        return this._multiContainerSpacing ?? this._fallbackTheme?.multiContainerSpacing ?? 4;
    }

    set multiContainerSpacing(value: number | undefined) {
        if(this._multiContainerSpacing !== value) {
            this._multiContainerSpacing = value;
            this.onThemeUpdated('multiContainerSpacing');
        }
    }

    /** See {@link multiContainerAlignment}. For internal use only. */
    private _multiContainerAlignment?: FlexAlignment2D;

    get multiContainerAlignment(): FlexAlignment2D {
        return this._multiContainerAlignment ?? this._fallbackTheme?.multiContainerAlignment ?? <FlexAlignment2D>{main: FlexAlignment.SpaceBetween, cross: Alignment.Stretch};
    }

    set multiContainerAlignment(value: FlexAlignment2D | undefined) {
        if(this._multiContainerAlignment !== value) {
            this._multiContainerAlignment = value;
            this.onThemeUpdated('multiContainerAlignment');
        }
    }

    /** See {@link primaryFill}. For internal use only. */
    private _primaryFill?: FillStyle;

    get primaryFill(): FillStyle {
        return this._primaryFill ?? this._fallbackTheme?.primaryFill ?? 'rgb(0,127,255)';
    }

    set primaryFill(value: FillStyle | undefined) {
        if(this._primaryFill !== value) {
            this._primaryFill = value;
            this.onThemeUpdated('primaryFill');
        }
    }

    /** See {@link accentFill}. For internal use only. */
    private _accentFill?: FillStyle;

    get accentFill(): FillStyle {
        return this._accentFill ?? this._fallbackTheme?.accentFill ?? 'rgb(0,195,255)';
    }

    set accentFill(value: FillStyle | undefined) {
        if(this._accentFill !== value) {
            this._accentFill = value;
            this.onThemeUpdated('accentFill');
        }
    }

    /** See {@link backgroundFill}. For internal use only. */
    private _backgroundFill?: FillStyle;

    get backgroundFill(): FillStyle {
        return this._backgroundFill ?? this._fallbackTheme?.backgroundFill ?? 'rgb(32,32,32)';
    }

    set backgroundFill(value: FillStyle | undefined) {
        if(this._backgroundFill !== value) {
            this._backgroundFill = value;
            this.onThemeUpdated('backgroundFill');
        }
    }

    /** See {@link backgroundGlowFill}. For internal use only. */
    private _backgroundGlowFill?: FillStyle;

    get backgroundGlowFill(): FillStyle {
        return this._backgroundGlowFill ?? this._fallbackTheme?.backgroundGlowFill ?? 'rgb(48,48,48)';
    }

    set backgroundGlowFill(value: FillStyle | undefined) {
        if(this._backgroundGlowFill !== value) {
            this._backgroundGlowFill = value;
            this.onThemeUpdated('backgroundGlowFill');
        }
    }

    /** See {@link sliderMinLength}. For internal use only. */
    private _sliderMinLength?: number;

    get sliderMinLength(): number {
        return this._sliderMinLength ?? this._fallbackTheme?.sliderMinLength ?? 100;
    }

    set sliderMinLength(value: number | undefined) {
        if(this._sliderMinLength !== value) {
            this._sliderMinLength = value;
            this.onThemeUpdated('sliderMinLength');
        }
    }

    /** See {@link sliderThickness}. For internal use only. */
    private _sliderThickness?: number;

    get sliderThickness(): number {
        return this._sliderThickness ?? this._fallbackTheme?.sliderThickness ?? 10;
    }

    set sliderThickness(value: number | undefined) {
        if(this._sliderThickness !== value) {
            this._sliderThickness = value;
            this.onThemeUpdated('sliderThickness');
        }
    }

    /** See {@link bodyTextFont}. For internal use only. */
    private _bodyTextFont?: string;

    get bodyTextFont(): string {
        return this._bodyTextFont ?? this._fallbackTheme?.bodyTextFont ?? '16px sans';
    }

    set bodyTextFont(value: string | undefined) {
        if(this._bodyTextFont !== value) {
            this._bodyTextFont = value;
            this.onThemeUpdated('bodyTextFont');
        }
    }

    /** See {@link bodyTextFill}. For internal use only. */
    private _bodyTextFill?: FillStyle;

    get bodyTextFill(): FillStyle {
        return this._bodyTextFill ?? this._fallbackTheme?.bodyTextFill ?? 'white';
    }

    set bodyTextFill(value: FillStyle | undefined) {
        if(this._bodyTextFill !== value) {
            this._bodyTextFill = value;
            this.onThemeUpdated('bodyTextFill');
        }
    }

    /** See {@link labelMinWidth}. For internal use only. */
    private _labelMinWidth?: number;

    get labelMinWidth(): number {
        return this._labelMinWidth ?? this._fallbackTheme?.labelMinWidth ?? 0;
    }

    set labelMinWidth(value: number | undefined) {
        if(this._labelMinWidth !== value) {
            this._labelMinWidth = value;
            this.onThemeUpdated('labelMinWidth');
        }
    }

    /** See {@link labelMinAscent}. For internal use only. */
    private _labelMinAscent?: number;

    get labelMinAscent(): number {
        return this._labelMinAscent ?? this._fallbackTheme?.labelMinAscent ?? 0;
    }

    set labelMinAscent(value: number | undefined) {
        if(this._labelMinAscent !== value) {
            this._labelMinAscent = value;
            this.onThemeUpdated('labelMinAscent');
        }
    }

    /** See {@link labelMinDescent}. For internal use only. */
    private _labelMinDescent?: number;

    get labelMinDescent(): number {
        return this._labelMinDescent ?? this._fallbackTheme?.labelMinDescent ?? 3;
    }

    set labelMinDescent(value: number | undefined) {
        if(this._labelMinDescent !== value) {
            this._labelMinDescent = value;
            this.onThemeUpdated('labelMinDescent');
        }
    }

    /** See {@link checkboxLength}. For internal use only. */
    private _checkboxLength?: number;

    get checkboxLength(): number {
        return this._checkboxLength ?? this._fallbackTheme?.checkboxLength ?? 12;
    }

    set checkboxLength(value: number | undefined) {
        if(this._checkboxLength !== value) {
            this._checkboxLength = value;
            this.onThemeUpdated('checkboxLength');
        }
    }

    /** See {@link checkboxInnerPadding}. For internal use only. */
    private _checkboxInnerPadding?: number;

    get checkboxInnerPadding(): number {
        return this._checkboxInnerPadding ?? this._fallbackTheme?.checkboxInnerPadding ?? 2;
    }

    set checkboxInnerPadding(value: number | undefined) {
        if(this._checkboxInnerPadding !== value) {
            this._checkboxInnerPadding = value;
            this.onThemeUpdated('checkboxInnerPadding');
        }
    }

    /** See {@link inputBackgroundFill}. For internal use only. */
    private _inputBackgroundFill?: FillStyle;

    get inputBackgroundFill(): FillStyle {
        return this._inputBackgroundFill ?? this._fallbackTheme?.inputBackgroundFill ?? 'white';
    }

    set inputBackgroundFill(value: FillStyle | undefined) {
        if(this._inputBackgroundFill !== value) {
            this._inputBackgroundFill = value;
            this.onThemeUpdated('inputBackgroundFill');
        }
    }

    /** See {@link inputTextFont}. For internal use only. */
    private _inputTextFont?: string;

    get inputTextFont(): string {
        return this._inputTextFont ?? this._fallbackTheme?.inputTextFont ?? '16px mono';
    }

    set inputTextFont(value: string | undefined) {
        if(this._inputTextFont !== value) {
            this._inputTextFont = value;
            this.onThemeUpdated('inputTextFont');
        }
    }

    /** See {@link inputTextFill}. For internal use only. */
    private _inputTextFill?: FillStyle;

    get inputTextFill(): FillStyle {
        return this._inputTextFill ?? this._fallbackTheme?.inputTextFill ?? 'black';
    }

    set inputTextFill(value: FillStyle | undefined) {
        if(this._inputTextFill !== value) {
            this._inputTextFill = value;
            this.onThemeUpdated('inputTextFill');
        }
    }

    /** See {@link inputTextFillDisabled}. For internal use only. */
    private _inputTextFillDisabled?: FillStyle;

    get inputTextFillDisabled(): FillStyle {
        return this._inputTextFillDisabled ?? this._fallbackTheme?.inputTextFillDisabled ?? 'grey';
    }

    set inputTextFillDisabled(value: FillStyle | undefined) {
        if(this._inputTextFillDisabled !== value) {
            this._inputTextFillDisabled = value;
            this.onThemeUpdated('inputTextFillDisabled');
        }
    }

    /** See {@link inputTextFillInvalid}. For internal use only. */
    private _inputTextFillInvalid?: FillStyle;

    get inputTextFillInvalid(): FillStyle {
        return this._inputTextFillInvalid ?? this._fallbackTheme?.inputTextFillInvalid ?? 'red';
    }

    set inputTextFillInvalid(value: FillStyle | undefined) {
        if(this._inputTextFillInvalid !== value) {
            this._inputTextFillInvalid = value;
            this.onThemeUpdated('inputTextFillInvalid');
        }
    }

    /** See {@link inputTextMinWidth}. For internal use only. */
    private _inputTextMinWidth?: number;

    get inputTextMinWidth(): number {
        return this._inputTextMinWidth ?? this._fallbackTheme?.inputTextMinWidth ?? 10;
    }

    set inputTextMinWidth(value: number | undefined) {
        if(this._inputTextMinWidth !== value) {
            this._inputTextMinWidth = value;
            this.onThemeUpdated('inputTextMinWidth');
        }
    }

    /** See {@link inputTextMinAscent}. For internal use only. */
    private _inputTextMinAscent?: number;

    get inputTextMinAscent(): number {
        return this._inputTextMinAscent ?? this._fallbackTheme?.inputTextMinAscent ?? 16;
    }

    set inputTextMinAscent(value: number | undefined) {
        if(this._inputTextMinAscent !== value) {
            this._inputTextMinAscent = value;
            this.onThemeUpdated('inputTextMinAscent');
        }
    }

    /** See {@link inputTextMinDescent}. For internal use only. */
    private _inputTextMinDescent?: number;

    get inputTextMinDescent(): number {
        return this._inputTextMinDescent ?? this._fallbackTheme?.inputTextMinDescent ?? 3;
    }

    set inputTextMinDescent(value: number | undefined) {
        if(this._inputTextMinDescent !== value) {
            this._inputTextMinDescent = value;
            this.onThemeUpdated('inputTextMinDescent');
        }
    }

    /** See {@link inputTextInnerPadding}. For internal use only. */
    private _inputTextInnerPadding?: number;

    get inputTextInnerPadding(): number {
        return this._inputTextInnerPadding ?? this._fallbackTheme?.inputTextInnerPadding ?? 2;
    }

    set inputTextInnerPadding(value: number | undefined) {
        if(this._inputTextInnerPadding !== value) {
            this._inputTextInnerPadding = value;
            this.onThemeUpdated('inputTextInnerPadding');
        }
    }

    /** See {@link blinkRate}. For internal use only. */
    private _blinkRate?: number;

    get blinkRate(): number {
        return this._blinkRate ?? this._fallbackTheme?.blinkRate ?? 0.8;
    }

    set blinkRate(value: number | undefined) {
        if(this._blinkRate !== value) {
            this._blinkRate = value;
            this.onThemeUpdated('blinkRate');
        }
    }

    /** See {@link cursorThickness}. For internal use only. */
    private _cursorThickness?: number;

    get cursorThickness(): number {
        return this._cursorThickness ?? this._fallbackTheme?.cursorThickness ?? 1;
    }

    set cursorThickness(value: number | undefined) {
        if(this._cursorThickness !== value) {
            this._cursorThickness = value;
            this.onThemeUpdated('cursorThickness');
        }
    }

    /** See {@link scrollBarThickness}. For internal use only. */
    private _scrollBarThickness?: number;

    get scrollBarThickness(): number {
        return this._scrollBarThickness ?? this._fallbackTheme?.scrollBarThickness ?? 8;
    }

    set scrollBarThickness(value: number | undefined) {
        if(this._scrollBarThickness !== value) {
            this._scrollBarThickness = value;
            this.onThemeUpdated('scrollBarThickness');
        }
    }

    /** See {@link scrollBarMinPercent}. For internal use only. */
    private _scrollBarMinPercent?: number;

    get scrollBarMinPercent(): number {
        return this._scrollBarMinPercent ?? this._fallbackTheme?.scrollBarMinPercent ?? 0.1;
    }

    set scrollBarMinPercent(value: number | undefined) {
        if(this._scrollBarMinPercent !== value) {
            this._scrollBarMinPercent = value;
            this.onThemeUpdated('scrollBarMinPercent');
        }
    }

    /** See {@link scrollBarMinPixels}. For internal use only. */
    private _scrollBarMinPixels?: number;

    get scrollBarMinPixels(): number {
        return this._scrollBarMinPixels ?? this._fallbackTheme?.scrollBarMinPixels ?? 20;
    }

    set scrollBarMinPixels(value: number | undefined) {
        if(this._scrollBarMinPixels !== value) {
            this._scrollBarMinPixels = value;
            this.onThemeUpdated('scrollBarMinPixels');
        }
    }

    // XXX BASETHEME AUTO-GENERATED CODE END
}
