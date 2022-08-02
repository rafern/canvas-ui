import type { LayoutConstraints } from "./LayoutConstraints";
import type { Widget } from "../widgets/Widget";
import type { Event } from "../events/Event";
import type { Rect } from "../helpers/Rect";

export interface Viewport {
    /** The Viewport's child. Painting and layout will be relative to this. */
    readonly child: Widget;
    /**
     * The render target's (canvas) 2D context. Alpha is enabled.
     *
     * Note that readonly in this context means that this property is a getter,
     * not that it is immutable. Ideally, this is a getter that gets the current
     * rendering context. Some Viewport implementations (such as
     * {@link CanvasViewport}) will always use the same context, while others
     * (such as {@link ClippedViewport}) will occasionally change the context.
     */
    readonly context: CanvasRenderingContext2D;
    // TODO ^^^ remove readonly once typescript ~~stops being bad~~ introduces
    // getters in interfaces
    /**
     * Layout constraints of viewport when resolving widget's layout. A 4-tuple
     * containing, respectively, minimum width, maximum width, minimum height
     * and maximum height.
     *
     * By default, has no minimum width nor height and unconstrained maximum
     * width and height.
     */
    constraints: LayoutConstraints;
    /**
     * The actual dimensions and position of the viewport, relative to the
     * parent Viewport (or the UI {@link Root} if there is no parent Viewport,
     * meaning that positions are absolute in that case); for example, this
     * would be the equivalent to an iframe's dimensions and position (the HTML
     * body in the iframe can have different dimensions than the iframe itself
     * and be scrolled by some amount).
     *
     * Do not use this value for resolving the layout. Only use this for event
     * handling or other logic that doesn't affect layout.
     *
     * Should be set by the owner of the Viewport (a {@link Root} or a
     * {@link ViewportWidget}) when finalizing layout.
     */
    rect: Rect;
    /**
     * Get the canvas scale that will be applied to the Viewport's child. Used
     * for checking whether a child's dimensions exceeds a canvas' maximum
     * dimensions.
     *
     * Note that readonly in this context means that this property is a getter,
     * not that it is immutable. Ideally, this is a getter that calculates the
     * effective scale of the viewport via the canvas dimensions and max
     * dimensions, which may returns different values, not the same value every
     * time.
     */
    readonly effectiveScale: [scaleX: number, scaleY: number];
    // TODO ^^^ remove readonly once typescript ~~stops being bad~~ introduces
    // getters in interfaces
    /**
     * The parent Viewport of this Viewport. Since positions are relative to
     * this, absolute positions can be calculated by following all the parents.
     *
     * If null, this is the topmost Viewport and owned by the UI {@link Root}.
     *
     * Should be set by the owner when the owner is activated and deactivated.
     */
    parent: Viewport | null;

    /**
     * Resolves the Viewport child's layout.
     *
     * @returns Returns true if the child was resized, else, false.
     */
    resolveLayout(): boolean;
    /**
     * Paint the {@link Viewport#child} to the {@link Viewport#context} and, if
     * it makes sense to do so, paint to the {@link Viewport#parent} Viewport's
     * context.
     *
     * Nothing is done if the child was not dirty.
     *
     * @param force - Force re-paint even if child.{@link Widget#dirty} is false
     * @returns Returns true if the child was dirty, else, false.
     */
    paint(force: boolean): boolean;
    /**
     * Dispatch an event to the Viewport's {@link Viewport#child}.
     *
     * @returns Returns the widget that captured the event or null if none captured the event.
     */
    dispatchEvent(event: Event): Widget | null;
}