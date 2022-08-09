import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which acts as a shift key; toggles
 * {@link KeyContext#shift} on click.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class ShiftKey extends VirtualKey {
    /** Create a new ShiftKey. */
    constructor(keyContext: KeyContext, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
