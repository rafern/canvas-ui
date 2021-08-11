import type { ThemeProperties } from '../theme/ThemeProperties';
import { Container } from './Container';
import type { Widget } from './Widget';
/**
 * A {@link Margin} which stretches on the vertical axis. Useful for
 * horizontally centering labels without making them look weird if they are in
 * a row.
 *
 * Can be constrained to a specific type of children.
 *
 * @category Widget
 */
export declare class TextMargin<W extends Widget = Widget> extends Container<W> {
    /** Create a new TextMargin. */
    constructor(child: W, themeProperties?: ThemeProperties);
}
