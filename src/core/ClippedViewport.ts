import { BaseViewport } from "./BaseViewport";

export class ClippedViewport extends BaseViewport {
    get context(): CanvasRenderingContext2D {
        if(this.parent === null)
            throw 'asdasdsad'; // TODO

        return this.parent.context;
    }

    get effectiveScale(): [scaleX: number, scaleY: number] {
        if(this.parent === null)
            throw 'asdasdsad'; // TODO

        return this.parent.effectiveScale;
    }

    resolveLayout(): boolean {
        ;
    }

    paint(force: boolean): boolean {
        const wasDirty = this.child.dirty;

        const ctx = this.context;
        ctx.save();
        ctx.beginPath();
        ctx.rect(...this.rect);
        ctx.clip();
        this.child.paint(force);
        ctx.restore();

        return wasDirty;
    }
}