/**
 * A type of property in a {@link Theme}. Used as keys.
 *
 * @category Theme
 */
export enum ThemeProperty {
    /**
     * The canvas background
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     */
    CanvasFill,
    /** The {@link Padding} used in {@link Container}. */
    ContainerPadding,
    /** The spacing length between widgets in {@link MultiContainer}. */
    ContainerSpacing,
    /** The alignment in {@link Container} for when there is extra space. */
    ContainerAlignment,
    /**
     * The primary
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Usually a saturated colour used for filling boxes that need to stand out.
     */
    PrimaryFill,
    /**
     * The accent
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Usually a saturated colour more saturated than {@link PrimaryFill} used
     * for highlighting boxes which use PrimaryFill.
     */
    AccentFill,
    /**
     * The background
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Used for widgets with a background (as in, a background above the canvas
     * background).
     */
    BackgroundFill,
    /**
     * The background glow
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Used for highlighting boxes which use {@link BackgroundFill}.
     */
    BackgroundGlowFill,
    /** The {@link FlexLayout.flexRatio | flex ratio} used for {@link Slider} */
    SliderFlexRatio,
    /** The {@link FlexLayout.mainBasis | main basis} used for {@link Slider} */
    SliderMainBasis,
    /**
     * The {@link FlexLayout.crossBasis | cross basis} used for {@link Slider}
     */
    SliderCrossBasis,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font | font style}
     * used for body text (most regular text).
     */
    BodyTextFont,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for body text (most regular text).
     */
    BodyTextFill,
    /**
     * The {@link Labelable._minLabelWidth | minimum width} used for
     * {@link Label}.
     */
    LabelMinWidth,
    /**
     * The {@link Labelable._minLabelAscent | minimum ascent height} used for
     * {@link Label}.
     */
    LabelMinAscent,
    /**
     * The {@link Labelable._minLabelDescent | minimum descent height} used for
     * {@link Label}.
     */
    LabelMinDescent,
    /** The length in pixels used for {@link Checkbox}. */
    CheckboxLength,
    /**
     * The {@link Padding} used for {@link Checkbox} between the accent box
     * shown when ticked and the background box.
     */
    CheckboxInnerPadding,
    /**
     * The background
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for input widgets like {@link TextInput}.
     */
    InputBackgroundFill,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font | font style}
     * used for text in input widgets like {@link TextInput}.
     */
    InputTextFont,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for text in input widgets like {@link TextInput}.
     */
    InputTextFill,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for text in input widgets like {@link TextInput} when disabled.
     */
    InputTextFillDisabled,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for text in input widgets like {@link TextInput} when invalid.
     */
    InputTextFillInvalid,
    /**
     * The {@link FlexLayout.flexRatio | flex ratio} used for text input widgets
     * like {@link TextInput}.
     */
    InputTextFlexRatio,
    /**
     * The {@link Labelable._minLabelWidth | minimum width} used for text input
     * widgets like {@link TextInput}.
     */
    InputTextMinWidth,
    /**
     * The {@link Labelable._minLabelAscent | minimum ascent height} used for
     * text input widgets like {@link TextInput}.
     */
    InputTextMinAscent,
    /**
     * The {@link Labelable._minLabelDescent | minimum descent height} used for
     * text input widgets like {@link TextInput}.
     */
    InputTextMinDescent,
    /**
     * The blink rate of text cursors in text input widgets like
     * {@link TextInput}. Value in "blinks" per second.
     */
    BlinkRate,
    /** The length of empty space around a text cursor in pixels. */
    CursorPadding,
    /** The thickness of a text cursor in pixels. */
    CursorThickness,
    /** The thickness of a {@link ScrollBar} in pixels. */
    ScrollBarThickness,
}
