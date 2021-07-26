import { PassthroughWidget } from './PassthroughWidget';
import { ViewportWidget } from './ViewportWidget';
import { MultiContainer } from './MultiContainer';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { ScrollBar } from './ScrollBar';
import type { Widget } from './Widget';
import { Column } from './Column';
import { Row } from './Row';

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
export class ScrollableViewportWidget extends PassthroughWidget {
    /** A reference to the created {@link ViewportWidget} for easy access. */
    private readonly viewport: ViewportWidget;
    /**
     * A reference to the created vertical {@link ScrollBar} for easy access.
     */
    private readonly vScroll: ScrollBar;
    /**
     * A reference to the created horizontal {@link ScrollBar} for easy access.
     */
    private readonly hScroll: ScrollBar;
    // FIXME scrollbars always update one frame late because of limitations with
    // the layout system; you can only get the used width and height in the
    // update function after the widget has already drawed. this variable is
    // used as a workaround for avoiding a one frame flash of a scrollbar, when
    // you know the scrollbar visibility will change, disable the scrollbars
    // manually
    // XXX even if you could get layout at update, that would require
    // recursively resolving layout. auto-hiding scrollbars is a flawed idea
    // when the scrollbars also affect layout. maybe thats why html scrollbars
    // are always either shown and disabled, or auto-hiding but not affecting
    // layout. maybe have a way to use either one of these modes? non-layout
    // affecting scrollbars would require a system for doing overlays though...
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
    constructor(child: Widget, vertical: boolean, mainBasisTied = false, crossBasisTied = false, themeOverride: Theme | null = null) {
        super(new Column(themeOverride), themeOverride);

        // Create grid
        this.viewport = new ViewportWidget(child, mainBasisTied, crossBasisTied, themeOverride);
        this.viewport.vertical = vertical;
        this.vScrollHide = false;
        this.hScrollHide = false;

        this.vScroll = new ScrollBar((newScroll: number | null) => {
            if(newScroll === null)
                newScroll = 0;
            this.viewport.offset = [this.viewport.offset[0], -newScroll];
        }, 0, 0, 0, themeOverride);

        this.vScroll.vertical = true;
        const row = new Row(themeOverride).add([this.viewport, this.vScroll]);

        this.hScroll = new ScrollBar((newScroll: number | null) => {
            if(newScroll === null)
                newScroll = 0;
            this.viewport.offset = [-newScroll, this.viewport.offset[1]];
        }, 0, 0, 0, themeOverride);
        this.hScroll.vertical = false;

        const grid = this.child as MultiContainer;
        grid.add([row, this.hScroll]);
    }

    /**
     * The {@link viewport}'s
     * {@link ViewportWidget.maxDimensions | maxDimensions}
     */
    get maxDimensions(): [number, number] {
        return this.viewport.maxDimensions;
    }

    set maxDimensions(maxDimensions: [number, number]) {
        this.viewport.maxDimensions = maxDimensions;
    }

    /** The {@link viewport}'s {@link ViewportWidget.flexRatio | flexRatio} */
    get flexRatio(): number {
        return this.viewport.flexRatio;
    }

    set flexRatio(flexRatio: number) {
        this.viewport.flexRatio = flexRatio;
    }

    /** The {@link viewport}'s {@link ViewportWidget.mainBasis | mainBasis} */
    get mainBasis(): number {
        return this.viewport.mainBasis;
    }

    set mainBasis(mainBasis: number) {
        this.viewport.mainBasis = mainBasis;
    }

    /** The {@link viewport}'s {@link ViewportWidget.crossBasis | crossBasis} */
    get crossBasis(): number {
        return this.viewport.crossBasis;
    }

    set crossBasis(crossBasis: number) {
        this.viewport.crossBasis = crossBasis;
    }

    /** The {@link viewport}'s {@link ViewportWidget.child | child} */
    get containedChild(): Widget {
        return this.viewport.child;
    }

    /** Reset both scroll offsets to 0. */
    resetScroll(): void {
        this.hScroll.scroll = 0;
        this.vScroll.scroll = 0;
    }

    override handlePreLayoutUpdate(root: Root): void {
        const [innerW, innerH] = this.viewport.child.dimensions;
        const [outerW, outerH] = this.viewport.dimensions;
        if(outerW < innerW && !this.hScrollHide)
            this.hScroll.enabled = true;
        else {
            this.hScroll.scroll = 0;
            this.hScroll.enabled = false;
        }

        if(outerH < innerH && !this.vScrollHide)
            this.vScroll.enabled = true;
        else {
            this.vScroll.scroll = 0;
            this.vScroll.enabled = false;
        }

        super.handlePreLayoutUpdate(root);
    }

    override handlePostLayoutUpdate(root: Root): void {
        [this.hScroll.end, this.vScroll.end] = this.viewport.child.dimensions;
        this.hScroll.barLength = this.viewport.lastViewportDims[0];
        this.vScroll.barLength = this.viewport.lastViewportDims[1];

        super.handlePostLayoutUpdate(root);
    }
}