/**
 * A type of property in a {@link Theme}. Used as keys.
 *
 * @category Theme
 */
export declare enum ThemeProperty {
    /**
     * The canvas background
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     */
    CanvasFill = 0,
    /** The {@link Padding} used in {@link Container}. */
    ContainerPadding = 1,
    /** The spacing length between widgets in {@link MultiContainer}. */
    ContainerSpacing = 2,
    /** The alignment in {@link Container} for when there is extra space. */
    ContainerAlignment = 3,
    /**
     * The primary
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Usually a saturated colour used for filling boxes that need to stand out.
     */
    PrimaryFill = 4,
    /**
     * The accent
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Usually a saturated colour more saturated than {@link PrimaryFill} used
     * for highlighting boxes which use PrimaryFill.
     */
    AccentFill = 5,
    /**
     * The background
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Used for widgets with a background (as in, a background above the canvas
     * background).
     */
    BackgroundFill = 6,
    /**
     * The background glow
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}.
     * Used for highlighting boxes which use {@link BackgroundFill}.
     */
    BackgroundGlowFill = 7,
    /** The minimum length of a {@link Slider} */
    SliderMinLength = 8,
    /** The thickness of a {@link Slider} */
    SliderThickness = 9,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font | font style}
     * used for body text (most regular text).
     */
    BodyTextFont = 10,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for body text (most regular text).
     */
    BodyTextFill = 11,
    /**
     * The {@link TextHelper._minLabelWidth | minimum width} used for
     * {@link Label}.
     */
    LabelMinWidth = 12,
    /**
     * The {@link TextHelper._minLabelAscent | minimum ascent height} used for
     * {@link Label}.
     */
    LabelMinAscent = 13,
    /**
     * The {@link TextHelper._minLabelDescent | minimum descent height} used for
     * {@link Label}.
     */
    LabelMinDescent = 14,
    /** The length in pixels used for {@link Checkbox}. */
    CheckboxLength = 15,
    /**
     * The {@link Padding} used for {@link Checkbox} between the accent box
     * shown when ticked and the background box.
     */
    CheckboxInnerPadding = 16,
    /**
     * The background
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for input widgets like {@link TextInput}.
     */
    InputBackgroundFill = 17,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font | font style}
     * used for text in input widgets like {@link TextInput}.
     */
    InputTextFont = 18,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for text in input widgets like {@link TextInput}.
     */
    InputTextFill = 19,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for text in input widgets like {@link TextInput} when disabled.
     */
    InputTextFillDisabled = 20,
    /**
     * The
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle | fill style}
     * used for text in input widgets like {@link TextInput} when invalid.
     */
    InputTextFillInvalid = 21,
    /**
     * The {@link TextHelper._minLabelWidth | minimum width} used for text input
     * widgets like {@link TextInput}.
     */
    InputTextMinWidth = 22,
    /**
     * The {@link TextHelper._minLabelAscent | minimum ascent height} used for
     * text input widgets like {@link TextInput}.
     */
    InputTextMinAscent = 23,
    /**
     * The {@link TextHelper._minLabelDescent | minimum descent height} used for
     * text input widgets like {@link TextInput}.
     */
    InputTextMinDescent = 24,
    /**
     * The {@link Padding} between text and border used for text input widgets
     * like {@link TextInput}.
     */
    InputTextInnerPadding = 25,
    /**
     * The blink rate of text cursors in text input widgets like
     * {@link TextInput}. Value in "blinks" per second.
     */
    BlinkRate = 26,
    /** The thickness of a text cursor in pixels. */
    CursorThickness = 27,
    /** The thickness of a {@link ScrollBar} in pixels. */
    ScrollBarThickness = 28
}
