import { Widget } from '../widgets/Widget';
/**
 * A mixin class for widgets that contain labels (text).
 *
 * Contains utilities for measuring text dimensions and converting between
 * offsets in pixels and text indices.
 *
 * @category Mixin
 */
export declare class Labelable extends Widget {
    /** The current string of text */
    protected _text: string;
    /** The current font used for rendering text */
    protected _font: string;
    /** The current minimum text width */
    protected _minLabelWidth: number;
    /** The current minimum text ascent height */
    protected _minLabelAscent: number;
    /** The current minimum text descent height */
    protected _minLabelDescent: number;
    /**
     * The current text width corrected for minimum width. May be outdated.
     */
    private _labelWidth;
    /**
     * The current text ascent height corrected for minimum ascent height. May
     * be outdated.
     */
    private _labelAscent;
    /**
     * The current text descent height corrected for minimum descent height.
     * May be outdated.
     */
    private _labelDescent;
    /** Does the label need to be re-measured? */
    private labelDirty;
    /**
     * Update {@link _labelWidth}, {@link _labelAscent} and
     * {@link _labelDescent}. Sets {@link labelDirty} to false. Does nothing if
     * label is not dirty.
     */
    private updateTextDims;
    /**
     * Get the horizontal offset, in pixels, of the beginning of a character at
     * a given index.
     *
     * See {@link findIndexOffsetFromOffset} for the opposite.
     *
     * @returns Returns the horizontal offset, in pixels. Note that this is not
     * neccessarily an integer.
     */
    protected findOffsetFromIndex(index: number): number;
    /**
     * Get the index and horizontal offset, in pixels, of the beginning of a
     * character at a given offset.
     *
     * See {@link findOffsetFromIndex} for the opposite.
     *
     * @returns Returns a tuple containing the index of the character at the
     * offset and the horizontal offset, in pixels. Note that this is not
     * neccessarily an integer.
     *
     * Note that the returned offset is not the same as the input offset. The
     * returned offset is exactly at the beginning of the character. This is
     * useful for implementing selectable text.
     */
    protected findIndexOffsetFromOffset(offset: number): [number, number];
    /** Sets {@link labelDirty} and {@link _layoutDirty} to true. */
    private setLabelDirty;
    /** The current label width. Re-measures text if neccessary. */
    get labelWidth(): number;
    /** The current label ascent height. Re-measures text if neccessary. */
    get labelAscent(): number;
    /** The current label descent height. Re-measures text if neccessary. */
    get labelDescent(): number;
    /**
     * The current label height. Re-measures text if neccessary. Equivalent to
     * adding up {@link labelAscent} and {@link labelDescent}.
     */
    get labelHeight(): number;
    /**
     * Sets {@link _text} if the value is different. If it is different, also
     * sets {@link _dirty} to true and calls {@link setLabelDirty}.
     */
    protected setText(text: string): void;
    /**
     * Sets {@link _font} if the value is different. If it is different, also
     * sets {@link _dirty} to true and calls {@link setLabelDirty}.
     */
    protected setFont(font: string): void;
    /**
     * Sets {@link _minLabelWidth} if the value is different. If it is
     * different, also calls {@link setLabelDirty}.
     */
    protected setMinLabelWidth(minLabelWidth: number): void;
    /**
     * Sets {@link _minLabelAscent} if the value is different. If it is
     * different, also calls {@link setLabelDirty}.
     */
    protected setMinLabelAscent(minLabelAscent: number): void;
    /**
     * Sets {@link _minLabelDescent} if the value is different. If it is
     * different, also calls {@link setLabelDirty}.
     */
    protected setMinLabelDescent(minLabelDescent: number): void;
}
