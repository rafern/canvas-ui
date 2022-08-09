import { BasicVirtualKey } from './BasicVirtualKey';
import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
/**
 * A {@link BasicVirtualKey} which emits 'Escape' key presses.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class EscapeKey extends BasicVirtualKey {
    /** Create a new EscapeKey. */
    constructor(keyContext: KeyContext, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
