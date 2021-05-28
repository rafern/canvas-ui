import type { LayoutContext } from './LayoutContext';
import { Widget } from './Widget';

// FIXME protected and private members were turned public due to a declaration
// emission bug:
// https://github.com/Microsoft/TypeScript/issues/17744
// FIXME I would make this class abstract, but that would prevent Mixins from
// working (see issue TypeScript#29653)
export class BoxWidget extends Widget {
    // A widget with simple box layout resolution

    // The wanted box width and height
    #boxWidth = 0;
    #boxHeight = 0;

    get boxWidth(): number {
        return this.#boxWidth;
    }

    set boxWidth(boxWidth: number) {
        if(this.#boxWidth !== boxWidth) {
            this.#boxWidth = boxWidth;
            this.layoutDirty = true;
        }
    }

    get boxHeight(): number {
        return this.#boxHeight;
    }

    set boxHeight(boxHeight: number) {
        if(this.#boxHeight !== boxHeight) {
            this.#boxHeight = boxHeight;
            this.layoutDirty = true;
        }
    }

    handlePopulateLayout(layoutCtx: LayoutContext): void {
        layoutCtx.addBasis(this.#boxWidth, this.#boxHeight);
    }

    handleResolveLayout(_layoutCtx: LayoutContext): void {
        this.resolvedWidth = this.#boxWidth;
        this.resolvedHeight = this.#boxHeight;
    }
}