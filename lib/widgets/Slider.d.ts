import { Variable, VariableCallback } from '../helpers/Variable';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { ClickHelper } from '../helpers/ClickHelper';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
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
    /** The helper for keeping track of the slider's value */
    protected variable: Variable<number>;
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
    /** Create a new Slider */
    constructor(callback?: VariableCallback<number> | null, minValue?: number, maxValue?: number, snapIncrement?: number, initialValue?: number, vertical?: boolean, themeProperties?: ThemeProperties);
    /** The slider's value */
    set value(value: number);
    get value(): number;
    /** Clamp a value to this slider's min and max values */
    protected clamp(value: number): number;
    /** Set the slider's value, optionally disabling callback */
    setValue(value: number, doCallback?: boolean): void;
    protected stepValue(add: boolean, incMul: number): void;
    protected onThemeUpdated(property?: string | null): void;
    onFocusGrabbed(focusType: FocusType, _root: Root): void;
    onFocusDropped(focusType: FocusType, _root: Root): void;
    protected handleEvent(event: Event, root: Root): this | null;
    protected handlePostLayoutUpdate(_root: Root): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void;
}
