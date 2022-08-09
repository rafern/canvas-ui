import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which acts as an alt key; toggles
 * {@link KeyContext#alt} on click.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class AltKey extends VirtualKey {
    /** Create a new AltKey. */
    constructor(keyContext: KeyContext, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
