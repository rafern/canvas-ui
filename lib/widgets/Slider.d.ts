import { ClickHelper } from '../helpers/ClickHelper';
import { Widget, WidgetProperties } from './Widget';
import type { Viewport } from '../core/Viewport';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import { Variable } from '../state/Variable';
import type { Root } from '../core/Root';
/**
 * Optional Slider constructor properties.
 *
 * @category Widget
 */
export interface SliderProperties extends WidgetProperties {
    /** Sets {@link Slider#snapIncrement}. */
    snapIncrement?: number;
    /** Sets {@link Slider#vertical}. */
    vertical?: boolean;
}
/**
 * A slider flexbox widget; can slide a numeric value from an inclusive minimum
 * value to an inclusive maximum value, with optional snapping along set
 * increments.
 *
 * Note that sliders can only be horizontal.
 *
 * @category Widget
 */
export declare class Slider extends Widget {
    /** The slider's minimum value. */
    private minValue;
    /** The slider's maximum value. */
    private maxValue;
    /**
     * The increments in which the slider changes value. If 0, there are no
     * fixed increments.
     */
    private snapIncrement;
    /** The helper for handling pointer clicks/drags */
    protected clickHelper: ClickHelper;
    /** Is this a vertical slider? */
    protected readonly vertical: boolean;
    /** The horizontal offset of the slider */
    private offsetX;
    /** The vertical offset of the slider */
    private offsetY;
    /** The actual width of the slider */
    private actualWidth;
    /** The actual height of the slider */
    private actualHeight;
    /** Is the keyboard focusing this widget? */
    private keyboardFocused;
    /** The helper for keeping track of the slider value */
    readonly variable: Variable<number>;
    /** The callback used for the {@link Slider#"variable"} */
    private readonly callback;
    /**
     * The rectangle of the slider when the dragging started. Used to prevent
     * glitchy behaviour when the slider is being used while the layout is
     * changing. For internal use only.
     */
    private dragBounds;
    /** Create a new Slider */
    constructor(variable?: Variable<number>, minValue?: number, maxValue?: number, properties?: Readonly<SliderProperties>);
    protected handleChange(): void;
    attach(root: Root, viewport: Viewport, parent: Widget | null): void;
    detach(): void;
    protected activate(): void;
    /** The slider's value */
    set value(value: number);
    get value(): number;
    /** Clamp a value to this slider's min and max values */
    protected clamp(value: number): number;
    /** Set the slider's value, optionally disabling callback */
    setValue(value: number, doCallback?: boolean): void;
    protected stepValue(add: boolean, incMul: number): void;
    protected onThemeUpdated(property?: string | null): void;
    onFocusGrabbed(focusType: FocusType): void;
    onFocusDropped(focusType: FocusType): void;
    protected handleEvent(event: Event): this | null;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    finalizeBounds(): void;
    protected handlePainting(_forced: boolean): void;
}
