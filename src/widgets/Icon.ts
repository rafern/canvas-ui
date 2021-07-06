import { /* tree-shaking no-side-effects-when-called */ Mixin } from 'ts-mixer';
import { Clickable } from '../mixins/Clickable';
import { BoxLayout } from '../mixins/BoxLayout';
import { FocusType } from '../core/FocusType';
import type { Event } from '../events/Event';
import type { Theme } from '../theme/Theme';
import type { Root } from '../core/Root';
import type { Widget } from './Widget';

export type IconCallback = () => void;

export class Icon extends Mixin(BoxLayout, Clickable) {
    // The current image used by the icon
    private _image: HTMLImageElement;
    // The last source that the current image was using
    private lastSrc: string | null = null;
    // The image rotation in radians
    private _rotation = 0;
    // The callback for clicking this Icon. If null, the Icon is not clickable
    callback: IconCallback | null;
    // The view box of this Icon, if the image used for the icon is a
    // spritesheet. If null, the entire image will be used
    viewBox: [number, number, number, number] | null;
    // The wanted width and height. If null, the width or height of the image
    // will be used, taking into account the viewBox
    width: number | null;
    height: number | null;

    // A widget that renders an image. Optionally, this can act as a button by
    // having a callback set. Aspect ratio of the wanted size is preserved.
    // viewBox may be passed to only draw a section of the image. It can also
    // be transformed
    constructor(image: HTMLImageElement, width: number | null = null, height: number | null = null, viewBox: [number, number, number, number] | null = null, callback: IconCallback | null = null, themeOverride: Theme | null = null) {
        // Icons need a clear background, have no children and don't propagate
        // events
        super(themeOverride, true, false);

        this._image = image;
        this.width = width;
        this.height = height;
        this.viewBox = viewBox;
        this.callback = callback;
        this.updateDimensions();
    }

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

    setImage(image: HTMLImageElement): void {
        if(image !== this._image) {
            this._image = image;
            this.lastSrc = null;
        }
    }

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

    protected override handleEvent(event: Event, width: number, height: number, root: Root): Widget | null {
        // If there is a callback, check if icon was pressed and do callback if
        // so
        if(this.callback === null) {
            // Drop pointer focus on this component since there is no callback
            root.dropFocus(FocusType.Pointer, this);
            return this;
        }

        const [x, y, w, h] = this.getIconRect(0, 0, width, height);
        this.handleClickEvent(event, root, [x, x + w, y, y + h]);
        if(this.clickStateChanged && this.wasClick) {
            try {
                this.callback();
            }
            catch(e) {
                console.error('Exception in Icon callback', e);
            }
        }

        return this;
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

    get rotation(): number {
        return this._rotation;
    }

    set rotation(rotation: number) {
        if(rotation !== this._rotation) {
            this._rotation = rotation;
            this._dirty = true;
        }
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
