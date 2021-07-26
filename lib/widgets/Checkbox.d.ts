import { Variable, VariableCallback } from '../aggregates/Variable';
import { ClickHelper } from '../aggregates/ClickHelper';
import { BoxLayout } from '../mixins/BoxLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
/**
 * A checkbox widget; can be ticked or unticked.
 *
 * @category Widget
 */
export declare class Checkbox extends BoxLayout {
    /** The helper for handling pointer clicks */
    protected clickHelper: ClickHelper;
    /** The helper for keeping track of the checkbox value */
    protected variable: Variable<boolean>;
    /**
     * Create a new Checkbox.
     *
     * @param callback An optional callback called when the checkbox is ticked or unticked. If null, then no callback is called.
     */
    constructor(callback?: VariableCallback<boolean> | null, initialValue?: boolean, themeOverride?: Theme | null);
    /** Is the checkbox checked? */
    set checked(checked: boolean);
    get checked(): boolean;
    /**
     * Get the rectangle where the checkbox will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's offset, the width, the top edge's offset and the height.
     */
    private getBoxRect;
    protected handleEvent(event: Event, width: number, height: number, root: Root): this;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
