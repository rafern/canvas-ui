import { SingleParent } from '../mixins/SingleParent';
import { FlexLayout } from '../mixins/FlexLayout';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';
declare const ViewportWidget_base: import("ts-mixer/dist/types/types").Class<[child: Widget, themeOverride: Theme | null, needsClear: boolean, propagatesEvents: boolean], FlexLayout & SingleParent, {
    prototype: FlexLayout;
} & {
    prototype: SingleParent;
}>;
/**
 * A type of container widget which is allowed to be bigger or smaller than its
 * child.
 *
 * Allows setting the offset of the child, automatically clips it if neccessary.
 * Otherwise acts like a {@link Container}. Implemented by using a
 * {@link Viewport}; effectively, the child widget is painted to a dedicated
 * canvas.
 *
 * @category Widget
 */
export declare class ViewportWidget extends ViewportWidget_base {
    /** Is the main basis tied to the child's? */
    mainBasisTied: boolean;
    /** Is the cross basis tied to the child's? */
    crossBasisTied: boolean;
    /** The actual viewport object. */
    private viewport;
    /**
     * Offset of {@link child}. Positional events will take this into account,
     * as well as rendering. Useful for implementing scrolling.
     */
    private _offset;
    /**
     * Layout context used by {@link child}. Can be null if no layout update is
     * required.
     */
    private lastChildLayoutCtx;
    /**
     * Max dimensions. Not the effective max dimensions; those are set every
     * frame and are the viewport's max dimensions.
     */
    maxDimensions: [number, number];
    /**
     * What were the last dimensions of the viewport widget? Useful for
     * scrolling,
     */
    lastViewportDims: [number, number];
    /** Create a new ViewportWidget. */
    constructor(child: Widget, mainBasisTied?: boolean, crossBasisTied?: boolean, themeOverride?: Theme | null);
    /**
     * Get {@link viewport}'s
     * {@link Viewport.canvasDimensions | canvasDimensions}.
     */
    get canvasDimensions(): [number, number];
    /**
     * The offset of {@link child}, used for scrolling.
     *
     * If getting, creates a clone of {@link _offset}.
     *
     * If setting, sets each value in {@link _offset} to the wanted one, so old
     * references are still valid. {@link _dirty} is set to true. Nothing
     * happens if the offset is unchanged.
     */
    get offset(): [number, number];
    set offset(offset: [number, number]);
    /** Get the main basis of the {@link child} */
    private getChildMainBasis;
    /** Get the cross basis of the {@link child} */
    private getChildCrossBasis;
    /** Get the max length along the main axis of the {@link child} */
    private getMaxMainBasis;
    /** Get the max length along the cross axis of the {@link child} */
    private getMaxCrossBasis;
    protected handleEvent(event: Event, _width: number, _height: number, root: Root): Widget | null;
    protected handlePreLayoutUpdate(root: Root): void;
    protected handlePostLayoutUpdate(root: Root): void;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
export {};
