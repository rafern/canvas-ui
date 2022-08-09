import { BasicVirtualKey } from './BasicVirtualKey';
import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
/**
 * A {@link BasicVirtualKey} which emits 'Backspace' key presses.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class BackspaceKey extends BasicVirtualKey {
    /** Create a new BackspaceKey. */
    constructor(keyContext: KeyContext, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
