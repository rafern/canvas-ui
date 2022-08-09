import { BasicVirtualKey } from './BasicVirtualKey';
import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
/**
 * A {@link BasicVirtualKey} which emits ' ' key presses.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class SpaceKey extends BasicVirtualKey {
    /** Create a new SpaceKey. */
    constructor(keyContext: KeyContext, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
