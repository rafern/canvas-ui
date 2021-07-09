import type { Widget } from '../widgets/Widget';
import { LayoutContext } from './LayoutContext';
/**
 * Viewports are internally used to manage a canvas' size and painting. It is
 * used by {@link Root} and {@link ViewportWidget}.
 *
 * @category Core
 */
export declare class Viewport {
    /**
     * Maximum size of viewport. For internal use only.
     *
     * See {@link maxDimensions}.
     */
    private _maxDimensions;
    /** Does the viewport need to force-mark layout as dirty? */
    private forceLayout;
    /** The internal canvas. Widgets are painted to this */
    readonly canvas: HTMLCanvasElement;
    /** The internal canvas' context. Alpha is enabled. */
    readonly context: CanvasRenderingContext2D;
    /** Is the layout context vertical? */
    vertical: boolean;
    /**
     * Create a new Viewport.
     *
     * Creates a new canvas with a starting width and height, setting
     * {@link canvas} and {@link context}. Failure to get a canvas context
     * results in an exception.
     */
    constructor(startingWidth?: number, startingHeight?: number);
    /** The current dimensions of the {@link canvas | internal canvas} */
    get canvasDimensions(): [number, number];
    /**
     * Maximum size of viewport. This is passed as a hint to children.  If an
     * axis' maximum length is 0, then there is no maximum for that axis, but it
     * also means that flex components won't expand in that axis.
     *
     * See {@link _maxDimensions}.
     */
    set maxDimensions(maxDimensions: [number, number]);
    get maxDimensions(): [number, number];
    /**
     * Populates the given child's layout by calling
     * {@link Widget.populateLayout}.
     *
     * If {@link forceLayout} is true, then it is reset to false and
     * {@link Widget.forceLayoutDirty} is called.
     *
     * If the child's layout is not dirty, then populateLayout is not called and
     * no layout context is returned, else, a layout context is returned which
     * should be used with {@link resolveChildsLayout}.
     */
    populateChildsLayout(child: Widget): LayoutContext | null;
    /**
     * Resolves the given child's layout with a given layout context by calling
     * {@link Widget.resolveLayout}.
     *
     * If the child's layout is not dirty or the given layout context is null,
     * then resolveLayout is not called.
     *
     * Expands {@link canvas} if the new layout is too big for the current
     * canvas. Expansion is done in powers of 2 to avoid issues with external 3D
     * libraries.
     *
     * @returns Returns true if the child was resized, else, false.
     */
    resolveChildsLayout(child: Widget, layoutCtx: LayoutContext | null): boolean;
    /**
     * Paint a given child to {@link canvas}.
     *
     * Nothing is done if the child was not dirty.
     *
     * @returns Returns true if the child was dirty, else, false.
     */
    paintToCanvas(child: Widget): boolean;
}
