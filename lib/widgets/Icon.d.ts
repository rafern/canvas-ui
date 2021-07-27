import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';
/**
 * A widget which displays a given image.
 *
 * @category Widget
 */
export declare class Icon extends Widget {
    /** The current image used by the icon. */
    private _image;
    /**
     * The last source that the current image was using. Used for tracking if
     * the image source changed and if the image is fully loaded.
     */
    private lastSrc;
    /** The current image rotation in radians. */
    private _rotation;
    /**
     * The view box of this Icon, useful if the image used for the icon is a
     * spritesheet. If null, the entire image will be used.
     */
    viewBox: [number, number, number, number] | null;
    /** See {@link imageWidth}. For internal use only */
    private _imageWidth;
    /** See {@link imageHeight}. For internal use only */
    private _imageHeight;
    /** Horizontal offset. */
    private offsetX;
    /** Vertical offset. */
    private offsetY;
    /** Actual image width */
    private actualWidth;
    /** Actual image height */
    private actualHeight;
    /** Create a new Icon. */
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, themeOverride?: Theme | null);
    /**
     * The image used by this Icon.
     *
     * Sets {@link _image} if changed and sets {@link lastSrc} to null to mark
     * the image as loading so that flickers are minimised.
     *
     * If getting, returns {@link _image}.
     */
    set image(image: HTMLImageElement);
    get image(): HTMLImageElement;
    /**
     * The wanted width. If null, the image's width will be used, taking
     * {@link viewBox} into account.
     */
    get imageWidth(): number | null;
    set imageWidth(imageWidth: number | null);
    /**
     * The wanted height. If null, the image's height will be used, taking
     * {@link viewBox} into account.
     */
    get imageHeight(): number | null;
    set imageHeight(imageHeight: number | null);
    protected handlePreLayoutUpdate(_root: Root): void;
    protected handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void;
    /**
     * This icon's rotation. Useful for implementing spinners.
     *
     * Sets {@link _rotation} if changed and sets {@link _dirty} to true.
     *
     * If getting, returns {@link _rotation}.
     */
    set rotation(rotation: number);
    get rotation(): number;
    protected handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void;
}
