import type { VariableCallback } from '../state/VariableCallback';
import { ButtonClickHelper } from '../helpers/ButtonClickHelper';
import type { ThemeProperties } from '../theme/ThemeProperties';
import { WatchableVariable } from '../state/WatchableVariable';
import type { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
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
    /** The helper used for handling pointer clicks and enter presses */
    protected clickHelper: ButtonClickHelper;
    /** The helper for keeping track of the checkbox value */
    protected variable: WatchableVariable<boolean>;
    /**
     * Create a new Checkbox.
     *
     * @param callback - An optional callback called when the checkbox is ticked or unticked. If null, then no callback is called.
     */
    constructor(callback?: VariableCallback<boolean> | null, initialValue?: boolean, themeProperties?: ThemeProperties);
    protected onThemeUpdated(property?: string | null): void;
    /** Is the checkbox checked? */
    set checked(checked: boolean);
    get checked(): boolean;
    onFocusGrabbed(focusType: FocusType): void;
    onFocusDropped(focusType: FocusType): void;
    protected handleEvent(event: Event): this | null;
    protected handlePostLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    finalizeBounds(): void;
    protected handlePainting(_forced: boolean): void;
}
