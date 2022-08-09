import { Widget, WidgetProperties } from './Widget';
import type { Rect } from '../helpers/Rect';
/**
 * The image fitting mode for {@link Icon} widgets; describes how an image is
 * transformed if its dimensions don't match the output dimensions.
 */
export declare enum IconFit {
    /**
     * The image will be scaled down or up such that at least an axis of the
     * image has the same dimensions as the widget, and the entire image is
     * visible, preserving the aspect ratio of the image. The default image
     * fitting mode.
     */
    Contain = 0,
    /**
     * Similar to {@link IconFit.Contain}, except parts of the image can be cut
     * off so that all parts of the widget are covered by the image.
     */
    Cover = 1,
    /**
     * The image will be forced to have the same size as the widget by
     * stretching or squishing it.
     */
    Fill = 2
}
/**
 * Optional Icon constructor properties.
 *
 * @category Widget
 */
export interface IconProperties extends WidgetProperties {
    /** Sets {@link Icon#rotation}. */
    rotation?: number;
    /** Sets {@link Icon#viewBox}. */
    viewBox?: Rect | null;
    /** Sets {@link Icon#width}. */
    width?: number | null;
    /** Sets {@link Icon#height}. */
    height?: number | null;
    /** Sets {@link Icon#fit}. */
    fit?: IconFit;
}
/**
 * A widget which displays a given image.
 *
 * @category Widget
 */
export declare class Icon extends Widget {
    /** The current image/video used by the icon. */
    private _image;
    /**
     * The last source that the current image was using. Used for tracking if
     * the image source changed and if the image is fully loaded. Only used if
     * image is not a video.
     */
    private lastSrc;
    /**
     * The current image rotation in radians.
     *
     * @decorator `@paintField`
     */
    rotation: number;
    /**
     * The view box of this Icon, useful if the image used for the icon is a
     * spritesheet. If null, the entire image will be used.
     *
     * @decorator `@paintLayoutArrayField(true)`
     */
    viewBox: Rect | null;
    /**
     * The wanted width. If null, the image's width will be used, taking
     * {@link Icon#viewBox} into account.
     *
     * @decorator `@layoutField`
     */
    imageWidth: number | null;
    /**
     * The wanted height. If null, the image's height will be used, taking
     * {@link Icon#viewBox} into account.
     *
     * @decorator `@layoutField`
     */
    imageHeight: number | null;
    /** Horizontal offset. */
    private offsetX;
    /** Vertical offset. */
    private offsetY;
    /** Actual image width. */
    private actualWidth;
    /** Actual image height. */
    private actualHeight;
    /**
     * Listener for video loadedmetadata and canplay events. Saved so it can be
     * removed when needed.
     */
    private loadedmetadataListener;
    /**
     * Listener for video canplay event. Saved so it can be removed when needed.
     */
    private canplayListener;
    /**
     * Used for requestVideoFrameCallback. If null, then callback is being done
     * by setting _dirty to true every frame, which may be wasteful.
     */
    private frameCallback;
    /**
     * The {@link IconFit} mode to use when the image dimensions don't match the
     * widget dimensions.
     */
    fit: IconFit;
    /** Create a new Icon. */
    constructor(image: HTMLImageElement | HTMLVideoElement | string, properties?: Readonly<IconProperties>);
    /**
     * Setup event listeners for video. Has no effect if {@link Icon#image} is
     * not a video
     */
    private setupVideoEvents;
    /**
     * The image or video used by this Icon.
     *
     * Sets {@link Icon#_image} if changed and sets {@link Icon#lastSrc} to null
     * to mark the image as loading so that flickers are minimised.
     *
     * If getting, returns {@link Icon#_image}.
     */
    set image(image: HTMLImageElement | HTMLVideoElement);
    get image(): HTMLImageElement | HTMLVideoElement;
    protected handlePreLayoutUpdate(): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(_forced: boolean): void;
    dryPaint(): void;
}
