import { Widget } from '../widgets/Widget';
export declare class Labelable extends Widget {
    protected _text: string;
    protected _font: string;
    protected _minLabelWidth: number;
    protected _minLabelAscent: number;
    protected _minLabelDescent: number;
    private _labelWidth;
    private _labelAscent;
    private _labelDescent;
    private labelDirty;
    private updateTextDims;
    protected findOffsetFromIndex(index: number): number;
    protected findIndexOffsetFromOffset(offset: number): [number, number];
    private setLabelDirty;
    get labelWidth(): number;
    get labelAscent(): number;
    get labelDescent(): number;
    get labelHeight(): number;
    protected setText(text: string): void;
    protected setFont(font: string): void;
    protected setMinLabelWidth(minLabelWidth: number): void;
    protected setMinLabelAscent(minLabelAscent: number): void;
    protected setMinLabelDescent(minLabelDescent: number): void;
}
