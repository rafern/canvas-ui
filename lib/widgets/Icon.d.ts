import { BoxLayout } from '../mixins/BoxLayout';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
/**
 * A widget which displays a given image.
 *
 * @category Widget
 */
export declare class Icon extends BoxLayout {
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
    /**
     * The wanted width. If null, the image's width will be used, taking
     * {@link viewBox} into account.
     */
    width: number | null;
    /**
     * The wanted height. If null, the image's height will be used, taking
     * {@link viewBox} into account.
     */
    height: number | null;
    /** Create a new Icon. */
    constructor(image: HTMLImageElement, width?: number | null, height?: number | null, viewBox?: [number, number, number, number] | null, themeOverride?: Theme | null);
    /**
     * Update {@link boxWidth} and {@link boxHeight}.
     *
     * If {@link width} is not set, then {@link _image}'s width is used. The
     * same applies for height.
     */
    private updateDimensions;
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
     * Get the rectangle where the icon will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's
     * offset, the top edge's offset, the width and the height.
     */
    private getIconRect;
    protected handlePreLayoutUpdate(_root: Root): void;
    /**
     * This icon's rotation. Useful for implementing spinners.
     *
     * Sets {@link _rotation} if changed and sets {@link _dirty} to true.
     *
     * If getting, returns {@link _rotation}.
     */
    set rotation(rotation: number);
    get rotation(): number;
    protected handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void;
}
