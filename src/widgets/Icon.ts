import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

/**
 * A widget which displays a given image.
 *
 * @category Widget
 */
export class Icon extends Widget {
    /** The current image used by the icon. */
    private _image: HTMLImageElement;
    /**
     * The last source that the current image was using. Used for tracking if
     * the image source changed and if the image is fully loaded.
     */
    private lastSrc: string | null = null;
    /** The current image rotation in radians. */
    private _rotation = 0;
    /**
     * The view box of this Icon, useful if the image used for the icon is a
     * spritesheet. If null, the entire image will be used.
     */
    viewBox: [number, number, number, number] | null;
    /** See {@link imageWidth}. For internal use only */
    private _imageWidth: number | null;
    /** See {@link imageHeight}. For internal use only */
    private _imageHeight: number | null;
    /** Horizontal offset. */
    private offsetX = 0;
    /** Vertical offset. */
    private offsetY = 0;
    /** Actual image width */
    private actualWidth = 0;
    /** Actual image height */
    private actualHeight = 0;

    /** Create a new Icon. */
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, themeOverride: Theme | null = null) {
        // Icons need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this._image = image;
        this._imageWidth = width;
        this._imageHeight = height;
        this.viewBox = viewBox;
    }

    /**
     * The image used by this Icon.
     *
     * Sets {@link _image} if changed and sets {@link lastSrc} to null to mark
     * the image as loading so that flickers are minimised.
     *
     * If getting, returns {@link _image}.
     */
    set image(image: HTMLImageElement) {
        if(image !== this._image) {
            this._image = image;
            this.lastSrc = null;
        }
    }

    get image(): HTMLImageElement {
        return this._image;
    }

    /**
     * The wanted width. If null, the image's width will be used, taking
     * {@link viewBox} into account.
     */
    get imageWidth(): number | null {
        return this._imageWidth;
    }

    set imageWidth(imageWidth: number | null) {
        if(this._imageWidth !== imageWidth) {
            this._imageWidth = imageWidth;
            this._layoutDirty = true;
        }
    }

    /**
     * The wanted height. If null, the image's height will be used, taking
     * {@link viewBox} into account.
     */
    get imageHeight(): number | null {
        return this._imageHeight;
    }

    set imageHeight(imageHeight: number | null) {
        if(this._imageHeight !== imageHeight) {
            this._imageHeight = imageHeight;
            this._layoutDirty = true;
        }
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Icons only needs to be re-drawn if image changed, which is tracked by
        // the image setter, or if the source changed, but not if the icon isn't
        // loaded yet
        if(this._image?.src !== this.lastSrc && this._image?.complete)
            this._dirty = true;

    }

    protected override handleResolveLayout(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Find dimensions
        let wantedWidth = this._imageWidth;
        if(wantedWidth === null) {
            if(this.viewBox === null)
                wantedWidth = this._image.width;
            else
                wantedWidth = this.viewBox[2];
        }

        this.width = Math.max(Math.min(wantedWidth, maxWidth), minWidth);

        let wantedHeight = this._imageHeight;
        if(wantedHeight === null) {
            if(this.viewBox === null)
                wantedHeight = this._image.height;
            else
                wantedHeight = this.viewBox[3];
        }

        this.height = Math.max(Math.min(wantedHeight, maxHeight), minHeight);

        // Find offset and actual image dimensions (preserving aspect ratio)
        const widthRatio = this.width / wantedWidth;
        const heightRatio = this.height / wantedHeight;
        const scale = Math.min(widthRatio, heightRatio);
        this.actualWidth = wantedWidth * scale;
        this.actualHeight = wantedHeight * scale;
        this.offsetX = (this.width - this.actualWidth) / 2;
        this.offsetY = (this.height - this.actualHeight) / 2;
    }

    /**
     * This icon's rotation. Useful for implementing spinners.
     *
     * Sets {@link _rotation} if changed and sets {@link _dirty} to true.
     *
     * If getting, returns {@link _rotation}.
     */
    set rotation(rotation: number) {
        if(rotation !== this._rotation) {
            this._rotation = rotation;
            this._dirty = true;
        }
    }

    get rotation(): number {
        return this._rotation;
    }

    protected override handlePainting(x: number, y: number, ctx: CanvasRenderingContext2D): void {
        // Abort if icon isn't ready yet
        if(!this._image?.complete) {
            this.lastSrc = null;
            return;
        }

        // Mark as not needing to be drawn by setting the source
        this.lastSrc = this._image.src;

        // Translate and rotate if rotation is not 0
        let tdx = this.offsetX, tdy = this.offsetY;
        if(this.rotation !== 0) {
            ctx.save();
            ctx.translate(
                x + this.offsetX + this.actualWidth / 2,
                y + this.offsetY + this.actualHeight / 2,
            );
            tdx = -this.actualWidth / 2;
            tdy = -this.actualHeight / 2;
            ctx.rotate(this.rotation);
        }

        // Draw image, with viewBox if it is not null
        if(this.viewBox === null) {
            ctx.drawImage(
                this._image,
                tdx, tdy, this.actualWidth, this.actualHeight,
            );
        }
        else {
            ctx.drawImage(
                this._image, ...this.viewBox,
                tdx, tdy, this.actualWidth, this.actualHeight,
            );
        }

        // Revert transformation
        if(this.rotation !== 0)
            ctx.restore();
    }
}
