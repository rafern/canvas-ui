import { BasicVirtualKey } from './BasicVirtualKey';
import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
/**
 * A {@link BasicVirtualKey} which emits 'Enter' key presses.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class EnterKey extends BasicVirtualKey {
    /** Create a new EnterKey. */
    constructor(keyContext: KeyContext, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
