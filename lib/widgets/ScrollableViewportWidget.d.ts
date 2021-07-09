import { PassthroughWidget } from './PassthroughWidget';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
/**
 * A wrapper for a {@link ViewportWidget} which can be scrolled with
 * {@link ScrollBar}.
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
export declare class ScrollableViewportWidget extends PassthroughWidget {
    /** A reference to the created {@link ViewportWidget} for easy access. */
    private readonly viewport;
    /**
     * A reference to the created vertical {@link ScrollBar} for easy access.
     */
    private readonly vScroll;
    /**
     * A reference to the created horizontal {@link ScrollBar} for easy access.
     */
    private readonly hScroll;
    /**
     * Hide the vertical scroll bar?
     *
     * Used to work around the current limitation of flickering scrollbars. If
     * you know a scrollbar should be disabled, such as when loading, set this
     * to true to avoid flickering caused by layout changes.
     */
    vScrollHide: boolean;
    /**
     * Hide the horizontal scroll bar?
     *
     * Used to work around the current limitation of flickering scrollbars. If
     * you know a scrollbar should be disabled, such as when loading, set this
     * to true to avoid flickering caused by layout changes.
     */
    hScrollHide: boolean;
    /** Create a new ScrollableViewportWidget. */
    constructor(child: Widget, vertical: boolean, mainBasisTied?: boolean, crossBasisTied?: boolean, themeOverride?: Theme | null);
    /**
     * The {@link viewport}'s
     * {@link ViewportWidget.maxDimensions | maxDimensions}
     */
    get maxDimensions(): [number, number];
    set maxDimensions(maxDimensions: [number, number]);
    /** The {@link viewport}'s {@link ViewportWidget.flexRatio | flexRatio} */
    get flexRatio(): number;
    set flexRatio(flexRatio: number);
    /** The {@link viewport}'s {@link ViewportWidget.mainBasis | mainBasis} */
    get mainBasis(): number;
    set mainBasis(mainBasis: number);
    /** The {@link viewport}'s {@link ViewportWidget.crossBasis | crossBasis} */
    get crossBasis(): number;
    set crossBasis(crossBasis: number);
    /** The {@link viewport}'s {@link ViewportWidget.child | child} */
    get containedChild(): Widget;
    /** Reset both scroll offsets to 0. */
    resetScroll(): void;
    handlePreLayoutUpdate(root: Root): void;
    handlePostLayoutUpdate(root: Root): void;
}
