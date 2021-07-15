canvas-ui

# canvas-ui

## Table of contents

### Core Enumerations

- [FocusType](enums/focustype.md)

### Driver Enumerations

- [PointerHint](enums/pointerhint.md)

### Mixin Enumerations

- [ClickState](enums/clickstate.md)

### Theme Enumerations

- [Alignment](enums/alignment.md)
- [ThemeProperty](enums/themeproperty.md)

### Core Classes

- [DOMRoot](classes/domroot.md)
- [DOMVirtualKeyboardRoot](classes/domvirtualkeyboardroot.md)
- [LayoutContext](classes/layoutcontext.md)
- [Root](classes/root.md)
- [Viewport](classes/viewport.md)
- [VirtualKeyboardRoot](classes/virtualkeyboardroot.md)

### Driver Classes

- [DOMKeyboardDriver](classes/domkeyboarddriver.md)
- [DOMPointerDriver](classes/dompointerdriver.md)
- [KeyboardDriver](classes/keyboarddriver.md)
- [PointerDriver](classes/pointerdriver.md)
- [RayPointerDriver](classes/raypointerdriver.md)

### Event Classes

- [Event](classes/event.md)
- [KeyEvent](classes/keyevent.md)
- [KeyPress](classes/keypress.md)
- [KeyRelease](classes/keyrelease.md)
- [Leave](classes/leave.md)
- [PointerEvent](classes/pointerevent.md)
- [PointerMove](classes/pointermove.md)
- [PointerPress](classes/pointerpress.md)
- [PointerRelease](classes/pointerrelease.md)

### Mixin Classes

- [BooleanVariable](classes/booleanvariable.md)
- [BoxLayout](classes/boxlayout.md)
- [Clickable](classes/clickable.md)
- [FlexLayout](classes/flexlayout.md)
- [Labelable](classes/labelable.md)
- [MultiParent](classes/multiparent.md)
- [NumberVariable](classes/numbervariable.md)
- [Parent](classes/parent.md)
- [SingleParent](classes/singleparent.md)
- [StringVariable](classes/stringvariable.md)
- [Variable](classes/variable.md)

### Theme Classes

- [DebugTheme](classes/debugtheme.md)
- [Theme](classes/theme.md)

### Widget Classes

- [BackspaceKey](classes/backspacekey.md)
- [BaseContainer](classes/basecontainer.md)
- [BasicKey](classes/basickey.md)
- [BasicTextInput](classes/basictextinput.md)
- [Button](classes/button.md)
- [Center](classes/center.md)
- [Checkbox](classes/checkbox.md)
- [Column](classes/column.md)
- [Container](classes/container.md)
- [EnterKey](classes/enterkey.md)
- [EscapeKey](classes/escapekey.md)
- [FilledButton](classes/filledbutton.md)
- [GlyphKey](classes/glyphkey.md)
- [Icon](classes/icon.md)
- [IconButton](classes/iconbutton.md)
- [KeyRow](classes/keyrow.md)
- [Label](classes/label.md)
- [LabelledCheckbox](classes/labelledcheckbox.md)
- [Margin](classes/margin.md)
- [MultiContainer](classes/multicontainer.md)
- [PassthroughWidget](classes/passthroughwidget.md)
- [Row](classes/row.md)
- [ScrollBar](classes/scrollbar.md)
- [ScrollableViewportWidget](classes/scrollableviewportwidget.md)
- [ShiftKey](classes/shiftkey.md)
- [Slider](classes/slider.md)
- [SpaceKey](classes/spacekey.md)
- [Spacing](classes/spacing.md)
- [TextButton](classes/textbutton.md)
- [TextInput](classes/textinput.md)
- [ThemeScope](classes/themescope.md)
- [ViewportWidget](classes/viewportwidget.md)
- [VirtualKeyboard](classes/virtualkeyboard.md)
- [Widget](classes/widget.md)

### Core Interfaces

- [Driver](interfaces/driver.md)

### Driver Interfaces

- [RayPointerSource](interfaces/raypointersource.md)

### Theme Interfaces

- [Alignment2D](interfaces/alignment2d.md)
- [Padding](interfaces/padding.md)

### Widget Interfaces

- [KeyContext](interfaces/keycontext.md)

### Core Type aliases

- [PointerStyleHandler](README.md#pointerstylehandler)
- [TextInputHandler](README.md#textinputhandler)

### Mixin Type aliases

- [VariableCallback](README.md#variablecallback)

### Validator Type aliases

- [TextValidator](README.md#textvalidator)
- [UnknownValidator](README.md#unknownvalidator)
- [Validator](README.md#validator)

### Widget Type aliases

- [ButtonCallback](README.md#buttoncallback)
- [GlyphKeysTemplate](README.md#glyphkeystemplate)
- [KeyContextCallback](README.md#keycontextcallback)
- [KeyRowTemplate](README.md#keyrowtemplate)
- [KeyTemplateFunction](README.md#keytemplatefunction)
- [TextGetter](README.md#textgetter)
- [VirtualKeyboardTemplate](README.md#virtualkeyboardtemplate)

### Theme Variables

- [defaultTheme](README.md#defaulttheme)

### Widget Variables

- [defaultVirtualKeyboardTemplate](README.md#defaultvirtualkeyboardtemplate)

### Core Functions

- [DefaultTextInputHandler](README.md#defaulttextinputhandler)

### Helper Functions

- [getPointerEventNormPos](README.md#getpointereventnormpos)
- [measureTextDims](README.md#measuretextdims)
- [roundToPower2](README.md#roundtopower2)

### Validator Functions

- [DefaultTextValidator](README.md#defaulttextvalidator)
- [FloatValidator](README.md#floatvalidator)
- [IntValidator](README.md#intvalidator)
- [MakeCompositeValidator](README.md#makecompositevalidator)
- [MakeDefaultTextValidatorWithCallback](README.md#makedefaulttextvalidatorwithcallback)
- [MakeRangeValidator](README.md#makerangevalidator)

## Core Type aliases

### PointerStyleHandler

Ƭ **PointerStyleHandler**: (`newPointerStyle`: `string`) => `void`

#### Type declaration

▸ (`newPointerStyle`): `void`

A function which shows a given pointer style. Normally implemented as a
function which sets the CSS cursor style of a Root's canvas

##### Parameters

| Name | Type |
| :------ | :------ |
| `newPointerStyle` | `string` |

##### Returns

`void`

#### Defined in

[core/PointerStyleHandler.ts:7](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/core/PointerStyleHandler.ts#L7)

___

### TextInputHandler

Ƭ **TextInputHandler**: (`initialInput`: `string`) => `Promise`<`string`\>

#### Type declaration

▸ (`initialInput`): `Promise`<`string`\>

A function which prompts the user for input given an already set input and
returns a promise containing the text typed by the user.

##### Parameters

| Name | Type |
| :------ | :------ |
| `initialInput` | `string` |

##### Returns

`Promise`<`string`\>

#### Defined in

[core/TextInputHandler.ts:7](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/core/TextInputHandler.ts#L7)

___

## Mixin Type aliases

### VariableCallback

Ƭ **VariableCallback**<`V`\>: (`value`: `V`) => `void`

#### Type parameters

| Name |
| :------ |
| `V` |

#### Type declaration

▸ (`value`): `void`

A callback for when the value of a [Variable](classes/variable.md) changes.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

##### Returns

`void`

#### Defined in

[mixins/Variable.ts:8](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Variable.ts#L8)

___

## Validator Type aliases

### TextValidator

Ƭ **TextValidator**<`V`\>: [`Validator`](README.md#validator)<`string`, `V`\>

A [Validator](README.md#validator) which has a string input.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `V` | The type of the output (the transformed input). |

#### Defined in

[validators/Validator.ts:20](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/Validator.ts#L20)

___

### UnknownValidator

Ƭ **UnknownValidator**: [`Validator`](README.md#validator)<`unknown`, `unknown`\>

A [Validator](README.md#validator) which has unknown input and output types.

#### Defined in

[validators/Validator.ts:27](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/Validator.ts#L27)

___

### Validator

Ƭ **Validator**<`U`, `V`\>: (`value`: `U`) => [`boolean`, `V`]

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of the input. |
| `V` | The type of the output (the transformed input). |

#### Type declaration

▸ (`value`): [`boolean`, `V`]

An input validator. A function which checks whether an input is valid and
transforms that input.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `U` |

##### Returns

[`boolean`, `V`]

Returns a tuple containing whether the input is valid and the transformed input. Note that if the input is not valid, then the transformed input will be a bogus value.

#### Defined in

[validators/Validator.ts:11](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/Validator.ts#L11)

___

## Widget Type aliases

### ButtonCallback

Ƭ **ButtonCallback**: () => `void`

#### Type declaration

▸ (): `void`

A function with no input or return values. Used as callbacks for
[Button](classes/button.md).

Note that this has no background fill. If you want one, use
[FilledButton](classes/filledbutton.md) instead.

##### Returns

`void`

#### Defined in

[widgets/Button.ts:18](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Button.ts#L18)

___

### GlyphKeysTemplate

Ƭ **GlyphKeysTemplate**: [`string`, `string`]

A template for multiple [GlyphKey](classes/glyphkey.md) virtual keyboard keys. A 2-tuple of
strings, where each string has the same length. Each character of the string
represents a glyph to add to a keyboard row. The first string of the tuple
has the regular glyphs, while the second string string of the tuple has the
alternative glyphs.

Example:
```typescript
const template: GlyphKeysTemplate = ['qwertyuiop', 'QWERTYUIOP'];
```

#### Defined in

[widgets/VirtualKeyboard/KeyRow.ts:33](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/VirtualKeyboard/KeyRow.ts#L33)

___

### KeyContextCallback

Ƭ **KeyContextCallback**: (`key`: `string`) => `void`

#### Type declaration

▸ (`key`): `void`

A callback function which takes a
[key code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
as an input. Used by virtual keyboard key widgets and stored in a
[KeyContext](interfaces/keycontext.md).

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |

##### Returns

`void`

#### Defined in

[widgets/VirtualKeyboard/KeyContext.ts:9](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/VirtualKeyboard/KeyContext.ts#L9)

___

### KeyRowTemplate

Ƭ **KeyRowTemplate**: ([`GlyphKeysTemplate`](README.md#glyphkeystemplate) \| [`KeyTemplateFunction`](README.md#keytemplatefunction))[]

A template for a single row of virtual keyboard keys. An array of
[GlyphKeysTemplate](README.md#glyphkeystemplate) and [KeyTemplateFunction](README.md#keytemplatefunction).

Example:
const backspaceTemplate: KeyTemplateFunction = (keyContext, themeOverride) => new BackspaceKey(keyContext, themeOverride);
const rowTemplate: KeyRowTemplate = [['`1234567890-=', '~!@#$%^&*()_+'], backspaceTemplate];

#### Defined in

[widgets/VirtualKeyboard/KeyRow.ts:45](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/VirtualKeyboard/KeyRow.ts#L45)

___

### KeyTemplateFunction

Ƭ **KeyTemplateFunction**: (`keyContext`: [`KeyContext`](interfaces/keycontext.md), `themeOverride`: [`Theme`](classes/theme.md) \| ``null``) => [`FilledButton`](classes/filledbutton.md)

#### Type declaration

▸ (`keyContext`, `themeOverride`): [`FilledButton`](classes/filledbutton.md)

A template for a single virtual keyboard key. A function that, when called
given a [KeyContext](interfaces/keycontext.md) and theme override, returns a [FilledButton](classes/filledbutton.md)
which can be used as a virtual keyboard key widget.

Example:
const template: KeyTemplateFunction = (keyContext, themeOverride) => new BackspaceKey(keyContext, themeOverride);

##### Parameters

| Name | Type |
| :------ | :------ |
| `keyContext` | [`KeyContext`](interfaces/keycontext.md) |
| `themeOverride` | [`Theme`](classes/theme.md) \| ``null`` |

##### Returns

[`FilledButton`](classes/filledbutton.md)

#### Defined in

[widgets/VirtualKeyboard/KeyRow.ts:17](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/VirtualKeyboard/KeyRow.ts#L17)

___

### TextGetter

Ƭ **TextGetter**: () => `string`

#### Type declaration

▸ (): `string`

A function which returns a string. An alternative to supplying a
[Label](classes/label.md) with a string if you have a text value that constantly changes.

##### Returns

`string`

#### Defined in

[widgets/Label.ts:14](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Label.ts#L14)

___

### VirtualKeyboardTemplate

Ƭ **VirtualKeyboardTemplate**: [`KeyRowTemplate`](README.md#keyrowtemplate)[]

A template for the keys in a [VirtualKeyboard](classes/virtualkeyboard.md). Each member of the
array contains the template for a row of keys, from top to bottom.

#### Defined in

[widgets/VirtualKeyboard/VirtualKeyboard.ts:19](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/VirtualKeyboard/VirtualKeyboard.ts#L19)

## Theme Variables

### defaultTheme

• `Const` **defaultTheme**: [`Theme`](classes/theme.md)

The default theme. Mostly semi-transparent black backgrounds and azure blue
accents, inspired by material design colours.

#### Defined in

[theme/defaultTheme.ts:13](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/theme/defaultTheme.ts#L13)

___

## Widget Variables

### defaultVirtualKeyboardTemplate

• `Const` **defaultVirtualKeyboardTemplate**: [`VirtualKeyboardTemplate`](README.md#virtualkeyboardtemplate)

The default template for the keys in a [VirtualKeyboard](classes/virtualkeyboard.md); A QWERTY
keyboard with US layout.

#### Defined in

[widgets/VirtualKeyboard/VirtualKeyboard.ts:47](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/VirtualKeyboard/VirtualKeyboard.ts#L47)

## Core Functions

### DefaultTextInputHandler

▸ **DefaultTextInputHandler**(`initialInput`): `Promise`<`string`\>

The default implementation of [TextInputHandler](README.md#textinputhandler).

Creates a new popup div with a CSS ID of 'textInputHandler' and an overlay
div with CSS ID 'textInputHandlerOverlay', adding both to the HTML body.
Resolves the promise once user input is finished by clicking the OK or Cancel
buttons.

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialInput` | `string` |

#### Returns

`Promise`<`string`\>

#### Defined in

[core/DefaultTextInputHandler.ts:11](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/core/DefaultTextInputHandler.ts#L11)

___

## Helper Functions

### getPointerEventNormPos

▸ **getPointerEventNormPos**(`event`, `domElem`): [`number`, `number`]

Extracts the position of a DOM PointerEvent and normalises it. Useful for
implementing mouse input.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `PointerEvent` |
| `domElem` | `HTMLElement` |

#### Returns

[`number`, `number`]

Returns a 2-tuple containing the normalised coordinates; the first
element contains the normalised x axis, and the second element contains the
normalised y axis

#### Defined in

[helpers/getPointerEventNormPos.ts:11](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/helpers/getPointerEventNormPos.ts#L11)

___

### measureTextDims

▸ **measureTextDims**(`text`, `font`): [`number`, `number`, `number`]

Measures the dimensions of a given string of text with a given font.

Note that the first time calling this function is slower than subsequent
calls because a dedicated canvas context must be created.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `font` | `string` |

#### Returns

[`number`, `number`, `number`]

Returns a tuple containing, in this order, the width of the text, the text's ascent length and the text's descent length. The actual height can be found by summing the ascent and descent.

#### Defined in

[helpers/measureTextDims.ts:15](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/helpers/measureTextDims.ts#L15)

___

### roundToPower2

▸ **roundToPower2**(`number`, `roundUp?`): `number`

Rounds a given number up or down to a power of 2. Useful for working with
textures.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `number` | `number` | `undefined` | The number to round |
| `roundUp` | `boolean` | `true` | If true, rounds the number to the smallest power of 2 greater or equal to the input, else, rounds the number to the greatest power of 2 smaller or equal to the input. |

#### Returns

`number`

Returns the rounded number

#### Defined in

[helpers/roundToPower2.ts:14](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/helpers/roundToPower2.ts#L14)

___

## Validator Functions

### DefaultTextValidator

▸ **DefaultTextValidator**(`text`): [`boolean`, `string`]

A [TextValidator](README.md#textvalidator) which does nothing. Always reports a string as valid
and returns the input as the transformed input.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`boolean`, `string`]

#### Defined in

[validators/DefaultTextValidator.ts:10](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/DefaultTextValidator.ts#L10)

___

### FloatValidator

▸ **FloatValidator**(`text`): [`boolean`, `number`]

A [Validator](README.md#validator) which reports an input string as valid if it is a valid
number. If valid, then it transforms the input string into a float.

The transformed input for invalid inputs is NaN.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`boolean`, `number`]

#### Defined in

[validators/FloatValidator.ts:11](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/FloatValidator.ts#L11)

___

### IntValidator

▸ **IntValidator**(`text`): [`boolean`, `number`]

A [Validator](README.md#validator) which reports an input string as valid if it is a valid
integer. If valid, then it transforms the input string into an integer.

The transformed input for invalid inputs is NaN.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

[`boolean`, `number`]

#### Defined in

[validators/IntValidator.ts:11](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/IntValidator.ts#L11)

___

### MakeCompositeValidator

▸ **MakeCompositeValidator**<`U`, `V`\>(`validators`, `defaultValue`, `callback?`): [`Validator`](README.md#validator)<`U`, `V`\>

Creates a new [Validator](README.md#validator) which is a list of validators merged into
one.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `U` | The type of the input. |
| `V` | The type of the output (the transformed input). |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `validators` | [`UnknownValidator`](README.md#unknownvalidator)[] | `undefined` | The list of validators to be merged. The validators will be run in the order of the array. |
| `defaultValue` | `V` | `undefined` | The bogus value that will be returned if the input is invalid |
| `callback` | [`VariableCallback`](README.md#variablecallback)<`V`\> \| ``null`` | `null` | A callback which is called if validation succeeds. If null, no such callback will be called. |

#### Returns

[`Validator`](README.md#validator)<`U`, `V`\>

#### Defined in

[validators/CompositeValidator.ts:16](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/CompositeValidator.ts#L16)

___

### MakeDefaultTextValidatorWithCallback

▸ **MakeDefaultTextValidatorWithCallback**(`callback?`): [`TextValidator`](README.md#textvalidator)<`string`\>

Create a new [TextValidator](README.md#textvalidator) which calls a given callback. Always
reports a string as valid and returns the input as the transformed input,
like [DefaultTextValidator](README.md#defaulttextvalidator).

Note that this is only useful if a callback is supplied. If null is given as
the callback, then this will simply return [DefaultTextValidator](README.md#defaulttextvalidator).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callback` | [`VariableCallback`](README.md#variablecallback)<`string`\> \| ``null`` | `null` |

#### Returns

[`TextValidator`](README.md#textvalidator)<`string`\>

#### Defined in

[validators/DefaultTextValidator.ts:24](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/DefaultTextValidator.ts#L24)

___

### MakeRangeValidator

▸ **MakeRangeValidator**<`V`\>(`min`, `max`): [`Validator`](README.md#validator)<`V`, `V`\>

Creates a [Validator](README.md#validator) which checks whether an input value is within a
specified exclusive range (can't be an inclusive range), always returning the
original input value.

#### Type parameters

| Name | Description |
| :------ | :------ |
| `V` | The type of the input (and output, since it is unchanged). |

#### Parameters

| Name | Type |
| :------ | :------ |
| `min` | `V` |
| `max` | `V` |

#### Returns

[`Validator`](README.md#validator)<`V`, `V`\>

#### Defined in

[validators/RangeValidator.ts:12](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/validators/RangeValidator.ts#L12)
