import { BoxLayout } from '../mixins/BoxLayout';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';

/**
 * A widget which displays a given image.
 *
 * @category Widget
 */
export class Icon extends BoxLayout {
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
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, themeOverride: Theme | null = null) {
        // Icons need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this._image = image;
        this.width = width;
        this.height = height;
        this.viewBox = viewBox;
        this.updateDimensions();
    }

    /**
     * Update {@link boxWidth} and {@link boxHeight}.
     *
     * If {@link width} is not set, then {@link _image}'s width is used. The
     * same applies for height.
     */
    private updateDimensions(): void {
        let wantedWidth = this.width;
        if(wantedWidth === null) {
            if(this.viewBox === null)
                wantedWidth = this._image.width;
            else
                wantedWidth = this.viewBox[2];
        }

        if(this.boxWidth !== wantedWidth)
            this.boxWidth = wantedWidth;

        let wantedHeight = this.height;
        if(wantedHeight === null) {
            if(this.viewBox === null)
                wantedHeight = this._image.height;
            else
                wantedHeight = this.viewBox[3];
        }

        if(this.boxHeight !== wantedHeight)
            this.boxHeight = wantedHeight;
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
     * Get the rectangle where the icon will be painted.
     *
     * @returns Returns a 4-tuple containing, in this order, the left edge's
     * offset, the top edge's offset, the width and the height.
     */
    private getIconRect(x: number, y: number, width: number, height: number): [number, number, number, number] {
        // Find icon rectangle, preserving aspect ratio
        const widthRatio = width / this.boxWidth;
        const heightRatio = height / this.boxHeight;
        const scale = Math.min(widthRatio, heightRatio);
        const iconWidth = this.boxWidth * scale;
        const iconHeight = this.boxHeight * scale;

        return [
            x + (width - iconWidth) / 2,
            y + (height - iconHeight) / 2,
            iconWidth,
            iconHeight,
        ];
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Icons only needs to be re-drawn if image changed, which is tracked by
        // the image setter, or if the source changed, but not if the icon isn't
        // loaded yet
        if(this._image?.src !== this.lastSrc && this._image?.complete)
            this._dirty = true;

        // Update dimensions, in case the width or height were changed
        this.updateDimensions();
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

    protected override handlePainting(x: number, y: number, width: number, height: number, ctx: CanvasRenderingContext2D): void {
        // Abort if icon isn't ready yet
        if(!this._image?.complete) {
            this.lastSrc = null;
            return;
        }

        // Mark as not needing to be drawn by setting the source
        this.lastSrc = this._image.src;
        const [dx, dy, dw, dh] = this.getIconRect(x, y, width, height);
        let tdx = dx, tdy = dy;

        // Translate and rotate if rotation is not 0
        if(this.rotation !== 0) {
            ctx.save();
            ctx.translate(dx + dw / 2, dy + dh / 2);
            tdx = -dw / 2;
            tdy = -dh / 2;
            ctx.rotate(this.rotation);
        }

        // Draw image, with viewBox if it is not null
        if(this.viewBox === null)
            ctx.drawImage(this._image, tdx, tdy, dw, dh);
        else
            ctx.drawImage(this._image, ...this.viewBox, tdx, tdy, dw, dh);

        // Revert transformation
        if(this.rotation !== 0)
            ctx.restore();
    }
}
