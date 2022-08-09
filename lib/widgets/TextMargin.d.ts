import type { Widget, WidgetProperties } from './Widget';
import { Container } from './Container';
/**
 * A {@link Margin} which stretches on the vertical axis. Useful for
 * horizontally centering labels without making them look weird if they are in
 * a row.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 * @category Alias Widget
 */
export declare class TextMargin<W extends Widget = Widget> extends Container<W> {
    /** Create a new TextMargin. */
    constructor(child: W, properties?: Readonly<WidgetProperties>);
}
