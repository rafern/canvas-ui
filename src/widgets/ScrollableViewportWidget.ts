import { PassthroughWidget } from './PassthroughWidget';
import { ViewportWidget } from './ViewportWidget';
import { MultiContainer } from './MultiContainer';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { ScrollBar } from './ScrollBar';
import type { Widget } from './Widget';
import { Column } from './Column';
import { Row } from './Row';

export class ScrollableViewportWidget extends PassthroughWidget {
    private viewport: ViewportWidget;
    private vScroll: ScrollBar;
    private hScroll: ScrollBar;
    // FIXME scrollbars always update one frame late because of limitations with
    // the layout system; you can only get the used width and height in the
    // update function after the widget has already drawed. this variable is
    // used as a workaround for avoiding a one frame flash of a scrollbar, when
    // you know the scrollbar visibility will change, disable the scrollbars
    // manually
    vScrollHide: boolean;
    hScrollHide: boolean;

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

    get maxDimensions(): [number, number] {
        return this.viewport.maxDimensions;
    }

    set maxDimensions(maxDimensions: [number, number]) {
        this.viewport.maxDimensions = maxDimensions;
    }

    get flexRatio(): number {
        return this.viewport.flexRatio;
    }

    set flexRatio(flexRatio: number) {
        this.viewport.flexRatio = flexRatio;
    }

    get mainBasis(): number {
        return this.viewport.mainBasis;
    }

    set mainBasis(mainBasis: number) {
        this.viewport.mainBasis = mainBasis;
    }

    get crossBasis(): number {
        return this.viewport.crossBasis;
    }

    set crossBasis(crossBasis: number) {
        this.viewport.crossBasis = crossBasis;
    }

    get containedChild(): Widget {
        return this.viewport.child;
    }

    resetScroll(): void {
        this.hScroll.value = 0;
        this.vScroll.value = 0;
    }

    override handlePreLayoutUpdate(root: Root): void {
        const [innerW, innerH] = this.viewport.child.dimensions;
        const [outerW, outerH] = this.viewport.dimensions;
        if(outerW < innerW && !this.hScrollHide)
            this.hScroll.enabled = true;
        else {
            this.hScroll.value = 0;
            this.hScroll.enabled = false;
        }

        if(outerH < innerH && !this.vScrollHide)
            this.vScroll.enabled = true;
        else {
            this.vScroll.value = 0;
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