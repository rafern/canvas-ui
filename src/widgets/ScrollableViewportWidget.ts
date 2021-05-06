import { PassthroughWidget } from './PassthroughWidget';
import { ViewportWidget } from './ViewportWidget';
import { Column } from '../templates/Column';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { ScrollBar } from './ScrollBar';
import { Row } from '../templates/Row';
import type { Widget } from './Widget';

export class ScrollableViewportWidget extends PassthroughWidget {
    private viewport: ViewportWidget;
    private vScroll: ScrollBar;
    private hScroll: ScrollBar;
    forceHideScrollBars: boolean; // FIXME scrollbars always update one frame
    // late because of limitations with the layout system; you can only get the
    // used width and height in the update function after the widget has already
    // drawed. this variable is used as a workaround for avoiding a one frame
    // flash of a scrollbar, when you know the scrollbar visibility will change,
    // disable the scrollbars manually

    constructor(child: Widget, vertical: boolean, mainBasisTied = false, crossBasisTied = false, themeOverride: Theme | null = null) {
        // Create grid
        const viewport = new ViewportWidget(child, mainBasisTied, crossBasisTied, themeOverride);
        viewport.vertical = vertical;
        const vScroll = new ScrollBar(null, 0, 0, 0, themeOverride);
        vScroll.vertical = true;
        const row = Row(themeOverride).add([viewport, vScroll]);
        const hScroll = new ScrollBar(null, 0, 0, 0, themeOverride);
        hScroll.vertical = false;
        const grid = Column(themeOverride).add([row, hScroll]);

        super(grid, themeOverride);

        this.viewport = viewport;
        this.vScroll = vScroll;
        this.hScroll = hScroll;
        this.forceHideScrollBars = false;

        hScroll.callback = (newScroll: number | null) => {
            if(newScroll === null)
                newScroll = 0;
            this.viewport.offset = [-newScroll, this.viewport.offset[1]];
        };
        vScroll.callback = (newScroll: number | null) => {
            if(newScroll === null)
                newScroll = 0;
            this.viewport.offset = [this.viewport.offset[0], -newScroll];
        };
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
        return this.viewport.getChild();
    }

    resetScroll(): void {
        this.hScroll.value = 0;
        this.vScroll.value = 0;
    }

    handlePreLayoutUpdate(root: Root): void {
        const [innerW, innerH] = this.viewport.dimensions;
        if(this.viewport.resolvedWidth < innerW && !this.forceHideScrollBars)
            this.hScroll.enable();
        else {
            this.hScroll.value = 0;
            this.hScroll.disable();
        }

        if(this.viewport.resolvedHeight < innerH && !this.forceHideScrollBars)
            this.vScroll.enable();
        else {
            this.vScroll.value = 0;
            this.vScroll.disable();
        }

        super.handlePreLayoutUpdate(root);
    }

    handlePostLayoutUpdate(root: Root): void {
        [this.hScroll.end, this.vScroll.end] = this.viewport.dimensions;
        this.hScroll.barLength = this.viewport.lastViewportDims[0];
        this.vScroll.barLength = this.viewport.lastViewportDims[1];

        super.handlePostLayoutUpdate(root);
    }
}