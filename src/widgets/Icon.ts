import { paintField, layoutField, paintLayoutArrayField } from '../decorators/FlagFields';
import type { ThemeProperties } from '../theme/ThemeProperties';
import type { Root } from '../core/Root';
import { Widget } from './Widget';

const videoRegex = /^.*\.(webm|og[gv]|m(p4|4v|ov)|avi|qt)$/i;

/**
 * A widget which displays a given image.
 *
 * @category Widget
 */
export class Icon extends Widget {
    /** The current image/video used by the icon. */
    private _image: HTMLImageElement | HTMLVideoElement;
    /**
     * The last source that the current image was using. Used for tracking if
     * the image source changed and if the image is fully loaded. Only used if
     * image is not a video.
     */
    private lastSrc: string | null = null;
    /**
     * The current image rotation in radians.
     *
     * @decorator `@paintField`
     */
    @paintField
    rotation = 0;
    /**
     * The view box of this Icon, useful if the image used for the icon is a
     * spritesheet. If null, the entire image will be used.
     *
     * @decorator `@paintLayoutArrayField(true)`
     */
    @paintLayoutArrayField(true)
    viewBox: [number, number, number, number] | null;
    /**
     * The wanted width. If null, the image's width will be used, taking
     * {@link viewBox} into account.
     *
     * @decorator `@layoutField`
     */
    @layoutField
    imageWidth: number | null = null;
    /**
     * The wanted height. If null, the image's height will be used, taking
     * {@link viewBox} into account.
     *
     * @decorator `@layoutField`
     */
    @layoutField
    imageHeight: number | null = null;
    /** Horizontal offset. */
    private offsetX = 0;
    /** Vertical offset. */
    private offsetY = 0;
    /** Actual image width */
    private actualWidth = 0;
    /** Actual image height */
    private actualHeight = 0;
    /**
     * Listener for video loadedmetadata and canplay events. Saved so it can be
     * removed when needed
     */
    private loadedmetadataListener: ((event: Event) => void) | null = null;
    /**
     * Listener for video canplay event. Saved so it can be removed when needed
     */
    private canplayListener: ((event: Event) => void) | null = null;
    /**
     * Used for requestVideoFrameCallback. If null, then callback is being done
     * by setting _dirty to true every frame, which may be wasteful
     */
    private frameCallback: ((now: DOMHighResTimeStamp, metadata: unknown /* VideoFrameMetadata */) => void) | null = null;

    /** Create a new Icon. */
    constructor(image: HTMLImageElement | HTMLVideoElement | string, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, themeProperties?: ThemeProperties) {
        // Icons need a clear background, have no children and don't propagate
        // events
        super(true, false, themeProperties);

        if(typeof image === 'string') {
            if(videoRegex.test(image)) {
                const videoElem = document.createElement('video');
                videoElem.src = image;
                // So that video poster shows. If you're passing your own video
                // element then this won't be automatically set
                videoElem.preload = 'auto';
                image = videoElem;
            }
            else {
                const imgElem = document.createElement('img');
                imgElem.src = image;
                image = imgElem;
            }
        }

        this._image = image;
        this.imageWidth = width;
        this.imageHeight = height;
        this.viewBox = viewBox;
        this.setupVideoEvents();
    }

    /**
     * Setup event listeners for video. Has no effect if {@link image} is not a
     * video
     */
    private setupVideoEvents() {
        if(this.image instanceof HTMLVideoElement) {
            // Add event listeners
            // loadedmetadata is so that we resize the widget when we know the
            // video dimensions
            this.loadedmetadataListener = _event => this._layoutDirty = true;
            this.image.addEventListener('loadedmetadata', this.loadedmetadataListener);
            // canplay is so that the first video frame is always displayed
            this.canplayListener = _event => this._dirty = true;
            this.image.addEventListener('canplay', this.canplayListener);

            if('requestVideoFrameCallback' in this.image) {
                console.warn('requestVideoFrameCallback available; if video playback is choppy or broken, please report it on Github');

                const originalVideo = this.image;
                this.frameCallback = (_now, _metadata) => {
                    // Set dirty flag when a new frame is got so that it is
                    // painted
                    this._dirty = true;
                    console.log('set dirty')

                    if(this.image === originalVideo && this.frameCallback !== null) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        (this.image as any).requestVideoFrameCallback(this.frameCallback);
                    }
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (this.image as any).requestVideoFrameCallback(this.frameCallback)
            } else {
                console.warn('requestVideoFrameCallback not available; video will be played back on every frame when not paused');
            }
        }
    }

    /**
     * The image or video used by this Icon.
     *
     * Sets {@link _image} if changed and sets {@link lastSrc} to null to mark
     * the image as loading so that flickers are minimised.
     *
     * If getting, returns {@link _image}.
     */
    set image(image: HTMLImageElement | HTMLVideoElement) {
        if(image !== this._image) {
            if(this._image instanceof HTMLVideoElement) {
                // Remove old event listeners in video. null checks aren't
                // needed, but adding them anyways so that typescript doesn't
                // complain
                if(this.loadedmetadataListener !== null)
                    this._image.removeEventListener('loadedmetadata', this.loadedmetadataListener);
                if(this.canplayListener !== null)
                    this._image.removeEventListener('canplay', this.canplayListener);
            }

            this._image = image;
            this.lastSrc = null;
            this.loadedmetadataListener = null;
            this.canplayListener = null;
            this.frameCallback = null;
            this.setupVideoEvents();
        }
    }

    get image(): HTMLImageElement | HTMLVideoElement {
        return this._image;
    }

    protected override handlePreLayoutUpdate(_root: Root): void {
        // Icons only needs to be re-drawn if image changed, which is tracked by
        // the image setter, or if the source changed, but not if the icon isn't
        // loaded yet. If this is a playing video, icon only needs to be
        // re-drawn if video is playing
        if(this._image instanceof HTMLVideoElement) {
            if(!this._image.paused && this.frameCallback === null)
                this._dirty = true;
        }
        else if(this._image?.src !== this.lastSrc && this._image?.complete) {
            this._layoutDirty = true;
            this._dirty = true;
        }
    }

    protected override handleResolveDimensions(minWidth: number, maxWidth: number, minHeight: number, maxHeight: number): void {
        // Find dimensions
        let wantedWidth = this.imageWidth;
        if(wantedWidth === null) {
            if(this.viewBox === null) {
                if(this._image instanceof HTMLVideoElement)
                    wantedWidth = this._image.videoWidth;
                else
                    wantedWidth = this._image.naturalWidth;
            }
            else
                wantedWidth = this.viewBox[2];
        }

        this.width = Math.max(Math.min(wantedWidth, maxWidth), minWidth);

        let wantedHeight = this.imageHeight;
        if(wantedHeight === null) {
            if(this.viewBox === null) {
                if(this._image instanceof HTMLVideoElement)
                    wantedHeight = this._image.videoHeight;
                else
                    wantedHeight = this._image.naturalHeight;
            }
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

    protected override handlePainting(ctx: CanvasRenderingContext2D, _forced: boolean): void {
        // Abort if icon isn't ready yet
        if(this._image instanceof HTMLImageElement && !this._image?.complete) {
            this.lastSrc = null;
            return;
        }

        // Mark as not needing to be drawn by setting the source
        this.lastSrc = this._image.src;

        // Translate, rotate and clip if rotation is not 0
        let tdx = this.x + this.offsetX, tdy = this.y + this.offsetY;
        const rotated = this.rotation !== 0;
        if(rotated) {
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.clip();
            ctx.translate(
                this.x + this.offsetX + this.actualWidth / 2,
                this.y + this.offsetY + this.actualHeight / 2,
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
        if(rotated)
            ctx.restore();
    }

    override dryPaint(): void {
        if(this._image instanceof HTMLImageElement && this._image?.complete)
            this.lastSrc = this._image.src;
        else
            this.lastSrc = null;

        super.dryPaint();
    }
}
