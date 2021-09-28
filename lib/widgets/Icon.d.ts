import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
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
    viewBox: [number, number, number, number] | null;
    /**
     * The wanted width. If null, the image's width will be used, taking
     * {@link viewBox} into account.
     *
     * @decorator `@layoutField`
     */
    imageWidth: number | null;
    /**
     * The wanted height. If null, the image's height will be used, taking
     * {@link viewBox} into account.
     *
     * @decorator `@layoutField`
     */
    imageHeight: number | null;
    /** Horizontal offset. */
    private offsetX;
    /** Vertical offset. */
    private offsetY;
    /** Actual image width */
    private actualWidth;
    /** Actual image height */
    private actualHeight;
    /** Create a new Icon. */
    constructor(image: HTMLImageElement | HTMLVideoElement | string, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, themeProperties?: ThemeProperties);
    /**
     * The image or video used by this Icon.
     *
     * Sets {@link _image} if changed and sets {@link lastSrc} to null to mark
     * the image as loading so that flickers are minimised.
     *
     * If getting, returns {@link _image}.
     */
    set image(image: HTMLImageElement | HTMLVideoElement);
    get image(): HTMLImageElement | HTMLVideoElement;
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    protected handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void;
    dryPaint(): void;
}
