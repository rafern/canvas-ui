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
    /** The alignment in {@link Container} for when there is extra space. */
    ContainerAlignment,
    /** The spacing length between widgets in {@link MultiContainer}. */
    MultiContainerSpacing,
    /**
     * The alignment in {@link MultiContainer} for when there is unused space.
     */
    MultiContainerAlignment,
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
    /** The minimum length of a {@link Slider} */
    SliderMinLength,
    /** The thickness of a {@link Slider} */
    SliderThickness,
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
     * The {@link TextHelper._minLabelWidth | minimum width} used for
     * {@link Label}.
     */
    LabelMinWidth,
    /**
     * The {@link TextHelper._minLabelAscent | minimum ascent height} used for
     * {@link Label}.
     */
    LabelMinAscent,
    /**
     * The {@link TextHelper._minLabelDescent | minimum descent height} used for
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
     * The {@link TextHelper._minLabelWidth | minimum width} used for text input
     * widgets like {@link TextInput}.
     */
    InputTextMinWidth,
    /**
     * The {@link TextHelper._minLabelAscent | minimum ascent height} used for
     * text input widgets like {@link TextInput}.
     */
    InputTextMinAscent,
    /**
     * The {@link TextHelper._minLabelDescent | minimum descent height} used for
     * text input widgets like {@link TextInput}.
     */
    InputTextMinDescent,
    /**
     * The {@link Padding} between text and border used for text input widgets
     * like {@link TextInput}.
     */
    InputTextInnerPadding,
    /**
     * The blink rate of text cursors in text input widgets like
     * {@link TextInput}. Value in "blinks" per second.
     */
    BlinkRate,
    /** The thickness of a text cursor in pixels. */
    CursorThickness,
    /**
     * The thickness of a {@link ScrollableViewportWidget}'s scrollbar in
     * pixels.
     */
    ScrollBarThickness,
    /**
     * The minimum length of the filled part of a
     * {@link ScrollableViewportWidget}'s scrollbar in percentage of total
     * length.
     */
    ScrollBarMinPercent,
    /**
     * The minimum length of the filled part of a
     * {@link ScrollableViewportWidget}'s scrollbar in pixels.
     */
    ScrollBarMinPixels,
}
