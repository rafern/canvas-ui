import { ButtonClickHelper } from '../helpers/ButtonClickHelper';
import { Widget, WidgetProperties } from './Widget';
import type { FocusType } from '../core/FocusType';
import type { Viewport } from '../core/Viewport';
import type { Event } from '../events/Event';
import { Variable } from '../state/Variable';
import type { Root } from '../core/Root';
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
    /** The helper used for handling pointer clicks and enter presses */
    protected clickHelper: ButtonClickHelper;
    /** The helper for keeping track of the checkbox value */
    readonly variable: Variable<boolean>;
    /** The callback used for the {@link Checkbox#"variable"} */
    private readonly callback;
    /** See {@link Checkbox#clickable} */
    private _clickable;
    /**
     * Create a new Checkbox.
     *
     * @param variable - The {@link Variable} where the value will be stored.
     */
    constructor(variable?: Variable<boolean>, properties?: Readonly<WidgetProperties>);
    protected handleChange(): void;
    attach(root: Root, viewport: Viewport, parent: Widget | null): void;
    detach(): void;
    protected activate(): void;
    protected onThemeUpdated(property?: string | null): void;
    /** Is the checkbox checked? */
    set checked(checked: boolean);
    get checked(): boolean;
    onFocusGrabbed(focusType: FocusType): void;
    onFocusDropped(focusType: FocusType): void;
    protected handleEvent(event: Event): this | null;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    finalizeBounds(): void;
    protected handlePainting(_forced: boolean): void;
    /**
     * Is the checkbox clickable? True by default. Used for disabling the
     * checkbox without hiding it.
     */
    get clickable(): boolean;
    set clickable(clickable: boolean);
}
