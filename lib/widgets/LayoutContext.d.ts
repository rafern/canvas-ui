export declare class LayoutContext {
    maxWidth: number;
    maxHeight: number;
    vertical: boolean;
    hBasis: number;
    vBasis: number;
    hFlex: number;
    vFlex: number;
    sizeChanged: boolean;
    constructor(maxWidth: number, maxHeight: number, vertical: boolean);
    clone(): LayoutContext;
    addBasis(hBasis: number, vBasis: number): void;
}
