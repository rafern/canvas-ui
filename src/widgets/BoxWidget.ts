import type { LayoutContext } from './LayoutContext';
import { Widget } from './Widget';

// XXX I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
export class BoxWidget extends Widget {
    // A widget with simple box layout resolution

    // The wanted box width and height
    private _boxWidth = 0;
    private _boxHeight = 0;

    get boxWidth(): number {
        return this._boxWidth;
    }

    set boxWidth(boxWidth: number) {
        if(this._boxWidth !== boxWidth) {
            this._boxWidth = boxWidth;
            this.layoutDirty = true;
        }
    }

    get boxHeight(): number {
        return this._boxHeight;
    }

    set boxHeight(boxHeight: number) {
        if(this._boxHeight !== boxHeight) {
            this._boxHeight = boxHeight;
            this.layoutDirty = true;
        }
    }

    handlePopulateLayout(layoutCtx: LayoutContext): void {
        layoutCtx.addBasis(this._boxWidth, this._boxHeight);
    }

    handleResolveLayout(_layoutCtx: LayoutContext): void {
        this.resolvedWidth = this._boxWidth;
        this.resolvedHeight = this._boxHeight;
    }
}