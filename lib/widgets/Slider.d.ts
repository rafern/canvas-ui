import { Variable, VariableCallback } from '../aggregates/Variable';
import { ClickHelper } from '../aggregates/ClickHelper';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
/**
 * A slider flexbox widget; can slide a numeric value from an inclusive minimum
 * value to an inclusive maximum value, with optional snapping along set
 * increments.
 *
 * Note that sliders can only be horizontal.
 *
 * @category Widget
 */
export declare class Slider extends FlexLayout {
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
    /** Create a new Slider */
    constructor(callback?: VariableCallback<number> | null, minValue?: number, maxValue?: number, snapIncrement?: number, initialValue?: number, themeOverride?: Theme | null);
    /** The slider's value */
    set value(value: number);
    get value(): number;
    /**
     * Get the rectangle where the slider will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's offset, the width, the top edge's offset and the height.
     */
    private getSliderRect;
    protected handleEvent(event: Event, width: number, height: number, root: Root): this;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
