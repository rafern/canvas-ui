import { SingleParent } from './SingleParent';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
/**
 * A type of container widget which is allowed to be bigger or smaller than its
 * child.
 *
 * Can be constrained to a specific type of children.
 *
 * Allows setting the offset of the child, automatically clips it if neccessary.
 * Otherwise acts like a {@link Container}. Implemented by using a
 * {@link Viewport}; effectively, the child widget is painted to a dedicated
 * canvas.
 *
 * @category Widget
 */
export declare class ViewportWidget<W extends Widget = Widget> extends SingleParent<W> {
    /** See {@link widthTied}. For internal use only */
    private _widthTied;
    /** See {@link heightTied}. For internal use only */
    private _heightTied;
    /** See {@link minWidth}. For internal use only */
    private _minWidth;
    /** See {@link minHeight}. For internal use only */
    private _minHeight;
    /** The actual viewport object. */
    private viewport;
    /** See {@link offset}. For internal use only */
    private _offset;
    /** Create a new ViewportWidget. */
    constructor(child: W, widthTied?: boolean, heightTied?: boolean, themeOverride?: Theme | null);
    /**
     * Get {@link viewport}'s
     * {@link Viewport.canvasDimensions | canvasDimensions}.
     */
    get canvasDimensions(): [number, number];
    /**
     * Offset of {@link child}. Positional events will take this into account,
     * as well as rendering. Useful for implementing scrolling.
     */
    get offset(): [number, number];
    set offset(offset: [number, number]);
    /** The {@link Viewport.constraints | Viewport's constraints}. */
    set constraints(constraints: [number, number, number, number]);
    get constraints(): [number, number, number, number];
    /**
     * Is the width tied to the child's? If true, width constraints will be
     * overridden.
     */
    get widthTied(): boolean;
    set widthTied(widthTied: boolean);
    /**
     * Is the height tied to the child's? If true, height constraints will be
     * overridden.
     */
    get heightTied(): boolean;
    set heightTied(heightTied: boolean);
    /** The minimum width that this widget will try to expand to. */
    get minWidth(): number;
    set minWidth(minWidth: number);
    /** The minimum height that this widget will try to expand to. */
    get minHeight(): number;
    set minHeight(minHeight: number);
    protected handleEvent(event: Event, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(ctx: CanvasRenderingContext2D): void;
}
