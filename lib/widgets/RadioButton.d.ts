import type { WatchableVariable } from '../helpers/WatchableVariable';
import { ButtonClickHelper } from '../helpers/ButtonClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A radio button widget; used for selecting one of many options. Uses a shared
 * {@link Variable} instance and expects the creation of multiple RadioButton
 * instances.
 *
 * @typeParam V - The type stored in the {@link RadioButton#"variable"}; when a radio button is clicked, the value inside the variable has this type.
 *
 * @category Widget
 */
export declare class RadioButton<V> extends Widget {
    /** Horizontal offset. */
    private offsetX;
    /** Vertical offset. */
    private offsetY;
    /** Actual length after resolving layout. */
    private actualLength;
    /** The helper used for handling pointer clicks and enter presses */
    protected clickHelper: ButtonClickHelper;
    /** The shared {@link WatchableVariable} where the value is set */
    protected variable: WatchableVariable<V>;
    /**
     * The value that will be used when the {@link RadioButton#"variable"} is
     * set
     */
    protected value: V;
    /**
     * The callback used for the {@link RadioButton#"variable"}. This extra copy
     * is kept so that there is a strong reference linked to the radio button's
     * lifespan
     */
    private readonly callback;
    /** Was the radio button selected in the last paint? */
    private _wasSelected;
    /**
     * Create a new radio button.
     *
     * @param variable - The shared variable that radio buttons will save the value to when selected.
     * @param value - The value that will be used to set the {@link RadioButton#"variable"} when the radio button is clicked
     */
    constructor(variable: WatchableVariable<V>, value: V, themeProperties?: ThemeProperties);
    protected handleChange(_newValue: V): void;
    protected onThemeUpdated(property?: string | null): void;
    /**
     * Select this radio button. Sets the value in
     * {@link RadioButton#"variable"} to be {@link RadioButton#value}
     */
    select(): void;
    /**
     * Is the radio button selected? Equivalent to checking if the value in the
     * {@link RadioButton#"variable"} is strictly equal to the
     * {@link RadioButton#value}
     */
    get selected(): boolean;
    onFocusGrabbed(focusType: FocusType): void;
    onFocusDropped(focusType: FocusType): void;
    protected handleEvent(event: Event): this | null;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void;
    activate(root: Root, parent: Widget | null): void;
    deactivate(): void;
}
