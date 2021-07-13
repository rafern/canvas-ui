[canvas-ui](../README.md) / ThemeProperty

# Enumeration: ThemeProperty

A type of property in a [Theme](../classes/theme.md). Used as keys.

## Table of contents

### Enumeration members

- [AccentFill](themeproperty.md#accentfill)
- [BackgroundFill](themeproperty.md#backgroundfill)
- [BackgroundGlowFill](themeproperty.md#backgroundglowfill)
- [BlinkRate](themeproperty.md#blinkrate)
- [BodyTextFill](themeproperty.md#bodytextfill)
- [BodyTextFont](themeproperty.md#bodytextfont)
- [CanvasFill](themeproperty.md#canvasfill)
- [CheckboxInnerPadding](themeproperty.md#checkboxinnerpadding)
- [CheckboxLength](themeproperty.md#checkboxlength)
- [ContainerAlignment](themeproperty.md#containeralignment)
- [ContainerPadding](themeproperty.md#containerpadding)
- [ContainerSpacing](themeproperty.md#containerspacing)
- [CursorPadding](themeproperty.md#cursorpadding)
- [CursorThickness](themeproperty.md#cursorthickness)
- [InputBackgroundFill](themeproperty.md#inputbackgroundfill)
- [InputTextFill](themeproperty.md#inputtextfill)
- [InputTextFillDisabled](themeproperty.md#inputtextfilldisabled)
- [InputTextFillInvalid](themeproperty.md#inputtextfillinvalid)
- [InputTextFlexRatio](themeproperty.md#inputtextflexratio)
- [InputTextFont](themeproperty.md#inputtextfont)
- [InputTextMinAscent](themeproperty.md#inputtextminascent)
- [InputTextMinDescent](themeproperty.md#inputtextmindescent)
- [InputTextMinWidth](themeproperty.md#inputtextminwidth)
- [LabelMinAscent](themeproperty.md#labelminascent)
- [LabelMinDescent](themeproperty.md#labelmindescent)
- [LabelMinWidth](themeproperty.md#labelminwidth)
- [PrimaryFill](themeproperty.md#primaryfill)
- [ScrollBarThickness](themeproperty.md#scrollbarthickness)
- [SliderCrossBasis](themeproperty.md#slidercrossbasis)
- [SliderFlexRatio](themeproperty.md#sliderflexratio)
- [SliderMainBasis](themeproperty.md#slidermainbasis)

## Enumeration members

### AccentFill

• **AccentFill** = `5`

The accent
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle).
Usually a saturated colour more saturated than [PrimaryFill](themeproperty.md#primaryfill) used
for highlighting boxes which use PrimaryFill.

#### Defined in

[theme/ThemeProperty.ts:30](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L30)

___

### BackgroundFill

• **BackgroundFill** = `6`

The background
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle).
Used for widgets with a background (as in, a background above the canvas
background).

#### Defined in

[theme/ThemeProperty.ts:37](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L37)

___

### BackgroundGlowFill

• **BackgroundGlowFill** = `7`

The background glow
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle).
Used for highlighting boxes which use [BackgroundFill](themeproperty.md#backgroundfill).

#### Defined in

[theme/ThemeProperty.ts:43](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L43)

___

### BlinkRate

• **BlinkRate** = `27`

The blink rate of text cursors in text input widgets like
[TextInput](../classes/textinput.md). Value in "blinks" per second.

#### Defined in

[theme/ThemeProperty.ts:140](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L140)

___

### BodyTextFill

• **BodyTextFill** = `12`

The
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
used for body text (most regular text).

#### Defined in

[theme/ThemeProperty.ts:63](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L63)

___

### BodyTextFont

• **BodyTextFont** = `11`

The
[font style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font)
used for body text (most regular text).

#### Defined in

[theme/ThemeProperty.ts:57](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L57)

___

### CanvasFill

• **CanvasFill** = `0`

The canvas background
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle).

#### Defined in

[theme/ThemeProperty.ts:11](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L11)

___

### CheckboxInnerPadding

• **CheckboxInnerPadding** = `17`

The [Padding](../interfaces/padding.md) used for [Checkbox](../classes/checkbox.md) between the accent box
shown when ticked and the background box.

#### Defined in

[theme/ThemeProperty.ts:85](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L85)

___

### CheckboxLength

• **CheckboxLength** = `16`

The length in pixels used for [Checkbox](../classes/checkbox.md).

#### Defined in

[theme/ThemeProperty.ts:80](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L80)

___

### ContainerAlignment

• **ContainerAlignment** = `3`

The alignment in [Container](../classes/container.md) for when there is extra space.

#### Defined in

[theme/ThemeProperty.ts:17](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L17)

___

### ContainerPadding

• **ContainerPadding** = `1`

The [Padding](../interfaces/padding.md) used in [Container](../classes/container.md).

#### Defined in

[theme/ThemeProperty.ts:13](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L13)

___

### ContainerSpacing

• **ContainerSpacing** = `2`

The spacing length between widgets in [MultiContainer](../classes/multicontainer.md).

#### Defined in

[theme/ThemeProperty.ts:15](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L15)

___

### CursorPadding

• **CursorPadding** = `28`

The length of empty space around a text cursor in pixels.

#### Defined in

[theme/ThemeProperty.ts:142](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L142)

___

### CursorThickness

• **CursorThickness** = `29`

The thickness of a text cursor in pixels.

#### Defined in

[theme/ThemeProperty.ts:144](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L144)

___

### InputBackgroundFill

• **InputBackgroundFill** = `18`

The background
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
used for input widgets like [TextInput](../classes/textinput.md).

#### Defined in

[theme/ThemeProperty.ts:91](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L91)

___

### InputTextFill

• **InputTextFill** = `20`

The
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
used for text in input widgets like [TextInput](../classes/textinput.md).

#### Defined in

[theme/ThemeProperty.ts:103](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L103)

___

### InputTextFillDisabled

• **InputTextFillDisabled** = `21`

The
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
used for text in input widgets like [TextInput](../classes/textinput.md) when disabled.

#### Defined in

[theme/ThemeProperty.ts:109](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L109)

___

### InputTextFillInvalid

• **InputTextFillInvalid** = `22`

The
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
used for text in input widgets like [TextInput](../classes/textinput.md) when invalid.

#### Defined in

[theme/ThemeProperty.ts:115](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L115)

___

### InputTextFlexRatio

• **InputTextFlexRatio** = `23`

The [flex ratio](../classes/flexlayout.md#flexratio) used for text input widgets
like [TextInput](../classes/textinput.md).

#### Defined in

[theme/ThemeProperty.ts:120](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L120)

___

### InputTextFont

• **InputTextFont** = `19`

The
[font style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font)
used for text in input widgets like [TextInput](../classes/textinput.md).

#### Defined in

[theme/ThemeProperty.ts:97](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L97)

___

### InputTextMinAscent

• **InputTextMinAscent** = `25`

The [minimum ascent height](../classes/labelable.md#_minlabelascent) used for
text input widgets like [TextInput](../classes/textinput.md).

#### Defined in

[theme/ThemeProperty.ts:130](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L130)

___

### InputTextMinDescent

• **InputTextMinDescent** = `26`

The [minimum descent height](../classes/labelable.md#_minlabeldescent) used for
text input widgets like [TextInput](../classes/textinput.md).

#### Defined in

[theme/ThemeProperty.ts:135](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L135)

___

### InputTextMinWidth

• **InputTextMinWidth** = `24`

The [minimum width](../classes/labelable.md#_minlabelwidth) used for text input
widgets like [TextInput](../classes/textinput.md).

#### Defined in

[theme/ThemeProperty.ts:125](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L125)

___

### LabelMinAscent

• **LabelMinAscent** = `14`

The [minimum ascent height](../classes/labelable.md#_minlabelascent) used for
[Label](../classes/label.md).

#### Defined in

[theme/ThemeProperty.ts:73](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L73)

___

### LabelMinDescent

• **LabelMinDescent** = `15`

The [minimum descent height](../classes/labelable.md#_minlabeldescent) used for
[Label](../classes/label.md).

#### Defined in

[theme/ThemeProperty.ts:78](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L78)

___

### LabelMinWidth

• **LabelMinWidth** = `13`

The [minimum width](../classes/labelable.md#_minlabelwidth) used for
[Label](../classes/label.md).

#### Defined in

[theme/ThemeProperty.ts:68](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L68)

___

### PrimaryFill

• **PrimaryFill** = `4`

The primary
[fill style](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle).
Usually a saturated colour used for filling boxes that need to stand out.

#### Defined in

[theme/ThemeProperty.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L23)

___

### ScrollBarThickness

• **ScrollBarThickness** = `30`

The thickness of a [ScrollBar](../classes/scrollbar.md) in pixels.

#### Defined in

[theme/ThemeProperty.ts:146](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L146)

___

### SliderCrossBasis

• **SliderCrossBasis** = `10`

The [cross basis](../classes/flexlayout.md#crossbasis) used for [Slider](../classes/slider.md)

#### Defined in

[theme/ThemeProperty.ts:51](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L51)

___

### SliderFlexRatio

• **SliderFlexRatio** = `8`

The [flex ratio](../classes/flexlayout.md#flexratio) used for [Slider](../classes/slider.md)

#### Defined in

[theme/ThemeProperty.ts:45](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L45)

___

### SliderMainBasis

• **SliderMainBasis** = `9`

The [main basis](../classes/flexlayout.md#mainbasis) used for [Slider](../classes/slider.md)

#### Defined in

[theme/ThemeProperty.ts:47](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/ThemeProperty.ts#L47)
