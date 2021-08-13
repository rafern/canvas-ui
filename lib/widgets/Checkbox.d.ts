import { Variable, VariableCallback } from '../helpers/Variable';
import { ClickHelper } from '../helpers/ClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A checkbox widget; can be ticked or unticked.
 *
 * @category Widget
 */
export declare class Checkbox extends Widget {
    /** Horizontal offset. */
    private offsetX;
    /** Vertical offset. */
    private offsetY;
    /** Actual length after resolving layout. */
    private actualLength;
    /** The helper for handling pointer clicks */
    protected clickHelper: ClickHelper;
    /** The helper for keeping track of the checkbox value */
    protected variable: Variable<boolean>;
    /**
     * Create a new Checkbox.
     *
     * @param callback An optional callback called when the checkbox is ticked or unticked. If null, then no callback is called.
     */
    constructor(callback?: VariableCallback<boolean> | null, initialValue?: boolean, themeProperties?: ThemeProperties);
    protected onThemeUpdated(property?: string | null): void;
    /** Is the checkbox checked? */
    set checked(checked: boolean);
    get checked(): boolean;
    protected handleEvent(event: Event, root: Root): this | null;
    protected handlePostLayoutUpdate(_root: Root): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void;
}
