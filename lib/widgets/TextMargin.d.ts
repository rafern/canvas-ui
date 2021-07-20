import { Container } from './Container';
import type { Widget } from './Widget';
/**
 * A {@link Margin} which stretches on the vertical axis. Useful for
 * horizontally centering labels without making them look weird if they are in
 * a row, such as in a {@link KeyRow}.
 *
 * @category Widget
 */
export declare class TextMargin extends Container {
    /** Create a new TextMargin. */
    constructor(child: Widget);
}
