import type { WidgetProperties } from '../Widget';
import type { KeyContext } from './KeyContext';
import { VirtualKey } from './VirtualKey';
/**
 * A {@link VirtualKey} which acts as a control key; toggles
 * {@link KeyContext#ctrl} on click.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class ControlKey extends VirtualKey {
    /** Create a new ControlKey. */
    constructor(keyContext: KeyContext, minWidth?: number, minHeight?: number, properties?: Readonly<WidgetProperties>);
}
