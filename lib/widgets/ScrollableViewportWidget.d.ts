import { ViewportWidget } from './ViewportWidget';
import type { Widget } from './Widget';
/**
 * A wrapper for a {@link ViewportWidget} which can be scrolled with
 * {@link ScrollBar}.
 *
 * Can be constrained to a specific type of children.
 *
 * To avoid an ugly looking layout, scrollbars are automatically hidden if they
 * are not needed. However, you can only tell if a scrollbar is needed after
 * layout is resolved. This creates problems, because scrollbars also contribute
 * to the layout, resulting in scrollbar hiding/showing being one frame late and
 * potentially introducing flickering. An alternative will be provided in the
 * future, but for now, use {@link vScrollHide} and {@link hScrollHide} to
 * force-hide each scrollbar if you know they aren't needed to avoid flickering
 * or other layout issues.
 *
 * @category Widget
 */
export declare class ScrollableViewportWidget<W extends Widget = Widget> extends ViewportWidget<W> {
}
