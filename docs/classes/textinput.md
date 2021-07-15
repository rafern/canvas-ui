[canvas-ui](../README.md) / TextInput

# Class: TextInput<V\>

A flexbox widget that allows for a single line of text input.

Supports obscuring the text with [hideText](textinput.md#hidetext), which shows all characters
as black circles like in password fields, text validation and toggling
editing.

If a [TextInputHandler](../README.md#textinputhandler) is set, then that will be used instead of
keyboard input for mobile compatibility.

## Type parameters

| Name | Description |
| :------ | :------ |
| `V` | The type of [value](textinput.md#value); the type of the transformed value returned by the validator. |

## Hierarchy

- [`FlexLayout`](flexlayout.md)<`this`\> & [`Labelable`](labelable.md)<`this`\> & [`StringVariable`](stringvariable.md)<`this`\>

  ↳ **`TextInput`**

  ↳↳ [`BasicTextInput`](basictextinput.md)

## Table of contents

### Constructors

- [constructor](textinput.md#constructor)

### Properties

- [\_dirty](textinput.md#_dirty)
- [\_editingEnabled](textinput.md#_editingenabled)
- [\_font](textinput.md#_font)
- [\_hideText](textinput.md#_hidetext)
- [\_layoutDirty](textinput.md#_layoutdirty)
- [\_minLabelAscent](textinput.md#_minlabelascent)
- [\_minLabelDescent](textinput.md#_minlabeldescent)
- [\_minLabelWidth](textinput.md#_minlabelwidth)
- [\_text](textinput.md#_text)
- [\_valid](textinput.md#_valid)
- [\_validValue](textinput.md#_validvalue)
- [blinkStart](textinput.md#blinkstart)
- [blinkWasOn](textinput.md#blinkwason)
- [callback](textinput.md#callback)
- [cursorOffset](textinput.md#cursoroffset)
- [cursorOffsetDirty](textinput.md#cursoroffsetdirty)
- [cursorPos](textinput.md#cursorpos)
- [lastVertical](textinput.md#lastvertical)
- [needsClear](textinput.md#needsclear)
- [propagatesEvents](textinput.md#propagatesevents)
- [resolvedHeight](textinput.md#resolvedheight)
- [resolvedWidth](textinput.md#resolvedwidth)

### Accessors

- [blinkOn](textinput.md#blinkon)
- [crossBasis](textinput.md#crossbasis)
- [dimensions](textinput.md#dimensions)
- [dirty](textinput.md#dirty)
- [editingEnabled](textinput.md#editingenabled)
- [enabled](textinput.md#enabled)
- [flexRatio](textinput.md#flexratio)
- [hideText](textinput.md#hidetext)
- [inheritedTheme](textinput.md#inheritedtheme)
- [internalCrossBasis](textinput.md#internalcrossbasis)
- [internalMainBasis](textinput.md#internalmainbasis)
- [labelAscent](textinput.md#labelascent)
- [labelDescent](textinput.md#labeldescent)
- [labelHeight](textinput.md#labelheight)
- [labelWidth](textinput.md#labelwidth)
- [layoutDirty](textinput.md#layoutdirty)
- [mainBasis](textinput.md#mainbasis)
- [text](textinput.md#text)
- [theme](textinput.md#theme)
- [themeOverride](textinput.md#themeoverride)
- [valid](textinput.md#valid)
- [validValue](textinput.md#validvalue)
- [value](textinput.md#value)
- [vertical](textinput.md#vertical)

### Methods

- [clear](textinput.md#clear)
- [deleteText](textinput.md#deletetext)
- [dispatchEvent](textinput.md#dispatchevent)
- [findIndexOffsetFromOffset](textinput.md#findindexoffsetfromoffset)
- [findOffsetFromIndex](textinput.md#findoffsetfromindex)
- [forceLayoutDirty](textinput.md#forcelayoutdirty)
- [handleEvent](textinput.md#handleevent)
- [handlePainting](textinput.md#handlepainting)
- [handlePopulateLayout](textinput.md#handlepopulatelayout)
- [handlePostLayoutUpdate](textinput.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](textinput.md#handleprelayoutupdate)
- [handleResolveLayout](textinput.md#handleresolvelayout)
- [inheritTheme](textinput.md#inherittheme)
- [insertText](textinput.md#inserttext)
- [moveCursor](textinput.md#movecursor)
- [moveCursorTo](textinput.md#movecursorto)
- [onFocusDropped](textinput.md#onfocusdropped)
- [paint](textinput.md#paint)
- [populateLayout](textinput.md#populatelayout)
- [postLayoutUpdate](textinput.md#postlayoutupdate)
- [preLayoutUpdate](textinput.md#prelayoutupdate)
- [resolveLayout](textinput.md#resolvelayout)
- [setFont](textinput.md#setfont)
- [setMinLabelAscent](textinput.md#setminlabelascent)
- [setMinLabelDescent](textinput.md#setminlabeldescent)
- [setMinLabelWidth](textinput.md#setminlabelwidth)
- [setText](textinput.md#settext)
- [setThemeOverride](textinput.md#setthemeoverride)
- [setValue](textinput.md#setvalue)
- [updateInheritedTheme](textinput.md#updateinheritedtheme)

## Constructors

### constructor

• **new TextInput**<`V`\>(`validator`, `initialValue?`, `themeOverride?`)

Create a new TextInput.

#### Type parameters

| Name |
| :------ |
| `V` |

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `validator` | [`TextValidator`](../README.md#textvalidator)<`V`\> | `undefined` |
| `initialValue` | `string` | `''` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

Mixin(FlexLayout, Labelable, StringVariable).constructor

#### Defined in

[widgets/TextInput.ts:54](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L54)

## Properties

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).\_dirty

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L23)

___

### \_editingEnabled

• `Private` **\_editingEnabled**: `boolean` = `true`

Is editing enabled?

#### Defined in

[widgets/TextInput.ts:48](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L48)

___

### \_font

• `Protected` **\_font**: `string` = `''`

The current font used for rendering text

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).\_font

#### Defined in

[mixins/Labelable.ts:16](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L16)

___

### \_hideText

• `Private` **\_hideText**: `boolean` = `false`

Is the text hidden?

#### Defined in

[widgets/TextInput.ts:50](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L50)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).\_layoutDirty

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L25)

___

### \_minLabelAscent

• `Protected` **\_minLabelAscent**: `number` = `0`

The current minimum text ascent height

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).\_minLabelAscent

#### Defined in

[mixins/Labelable.ts:20](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L20)

___

### \_minLabelDescent

• `Protected` **\_minLabelDescent**: `number` = `0`

The current minimum text descent height

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).\_minLabelDescent

#### Defined in

[mixins/Labelable.ts:22](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L22)

___

### \_minLabelWidth

• `Protected` **\_minLabelWidth**: `number` = `0`

The current minimum text width

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).\_minLabelWidth

#### Defined in

[mixins/Labelable.ts:18](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L18)

___

### \_text

• `Protected` **\_text**: `string` = `''`

The current string of text

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).\_text

#### Defined in

[mixins/Labelable.ts:14](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L14)

___

### \_valid

• `Private` **\_valid**: `boolean`

Is the text valid?

#### Defined in

[widgets/TextInput.ts:52](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L52)

___

### \_validValue

• `Private` **\_validValue**: `V`

Last valid value.

#### Defined in

[widgets/TextInput.ts:54](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L54)

___

### blinkStart

• `Private` **blinkStart**: `number` = `0`

At what timestamp did the blinking start. If 0, then the text cursor is
not blinking.

#### Defined in

[widgets/TextInput.ts:35](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L35)

___

### blinkWasOn

• `Private` **blinkWasOn**: ``null`` \| `boolean` = `null`

Was the cursor shown last frame due to blinking? If null, then the text
cursor is not blinking.

#### Defined in

[widgets/TextInput.ts:40](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L40)

___

### callback

• `Protected` **callback**: ``null`` \| [`VariableCallback`](../README.md#variablecallback)<`string`\> = `null`

The callback for when the value is changed.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).callback

#### Defined in

[mixins/Variable.ts:29](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Variable.ts#L29)

___

### cursorOffset

• `Private` **cursorOffset**: `number` = `0`

Current cursor offset in pixels.

#### Defined in

[widgets/TextInput.ts:44](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L44)

___

### cursorOffsetDirty

• `Private` **cursorOffsetDirty**: `boolean` = `false`

Does the cursor offset need to be updated?

#### Defined in

[widgets/TextInput.ts:46](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L46)

___

### cursorPos

• `Private` **cursorPos**: `number` = `0`

Current cursor position (index, not offset).

#### Defined in

[widgets/TextInput.ts:42](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L42)

___

### lastVertical

• **lastVertical**: `boolean` = `true`

Was the last layout vertical or not? Never null. Use this to tell if a
widget is vertical or not when painting.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).lastVertical

#### Defined in

[mixins/FlexLayout.ts:56](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L56)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).needsClear

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).propagatesEvents

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).resolvedHeight

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).resolvedWidth

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L49)

## Accessors

### blinkOn

• `get` **blinkOn**(): ``null`` \| `boolean`

Is the text cursor shown?

#### Returns

``null`` \| `boolean`

Returns true if the text cursor is shown, false if not shown but the text input is in use, or null if the text cursor is not shown due to the text input not being in use.

#### Defined in

[widgets/TextInput.ts:86](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L86)

___

### crossBasis

• `get` **crossBasis**(): `number`

The basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:98](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L98)

• `set` **crossBasis**(`crossBasis`): `void`

The basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:102](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L102)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](textinput.md#resolvedwidth) and [resolvedHeight](textinput.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](textinput.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L197)

___

### editingEnabled

• `get` **editingEnabled**(): `boolean`

Is editing enabled?

Tied to [_editingEnabled](textinput.md#_editingenabled). If changed, [_dirty](textinput.md#_dirty) is set to
true. If disabled, blinking stops and the cursor position is reset to the
beginning.

#### Returns

`boolean`

#### Defined in

[widgets/TextInput.ts:101](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L101)

• `set` **editingEnabled**(`editingEnabled`): `void`

Is editing enabled?

Tied to [_editingEnabled](textinput.md#_editingenabled). If changed, [_dirty](textinput.md#_dirty) is set to
true. If disabled, blinking stops and the cursor position is reset to the
beginning.

#### Parameters

| Name | Type |
| :------ | :------ |
| `editingEnabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/TextInput.ts:105](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L105)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](textinput.md#_layoutdirty) is set to true
and [_dirty](textinput.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](textinput.md#_layoutdirty) is set to true
and [_dirty](textinput.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L96)

___

### flexRatio

• `get` **flexRatio**(): `number`

The flex ratio of the flexbox

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:59](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L59)

• `set` **flexRatio**(`flexRatio`): `void`

The flex ratio of the flexbox

#### Parameters

| Name | Type |
| :------ | :------ |
| `flexRatio` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:63](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L63)

___

### hideText

• `get` **hideText**(): `boolean`

Is the text hidden?

Tied to [_hideText](textinput.md#_hidetext). If changed, [_dirty](textinput.md#_dirty) and
[cursorOffsetDirty](textinput.md#cursoroffsetdirty) are set to true.

#### Returns

`boolean`

#### Defined in

[widgets/TextInput.ts:126](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L126)

• `set` **hideText**(`hideText`): `void`

Is the text hidden?

Tied to [_hideText](textinput.md#_hidetext). If changed, [_dirty](textinput.md#_dirty) and
[cursorOffsetDirty](textinput.md#cursoroffsetdirty) are set to true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `hideText` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/TextInput.ts:130](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L130)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](textinput.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](textinput.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L180)

___

### internalCrossBasis

• `get` **internalCrossBasis**(): `number`

The internal basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:122](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L122)

• `set` **internalCrossBasis**(`internalCrossBasis`): `void`

The internal basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalCrossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:126](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L126)

___

### internalMainBasis

• `get` **internalMainBasis**(): `number`

The internal basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:110](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L110)

• `set` **internalMainBasis**(`internalMainBasis`): `void`

The internal basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalMainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:114](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L114)

___

### labelAscent

• `get` **labelAscent**(): `number`

The current label ascent height. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:136](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L136)

___

### labelDescent

• `get` **labelDescent**(): `number`

The current label descent height. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:142](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L142)

___

### labelHeight

• `get` **labelHeight**(): `number`

The current label height. Re-measures text if neccessary. Equivalent to
adding up [labelAscent](textinput.md#labelascent) and [labelDescent](textinput.md#labeldescent).

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:151](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L151)

___

### labelWidth

• `get` **labelWidth**(): `number`

The current label width. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:130](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L130)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](textinput.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L202)

___

### mainBasis

• `get` **mainBasis**(): `number`

The basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:86](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L86)

• `set` **mainBasis**(`mainBasis`): `void`

The basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:90](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L90)

___

### text

• `get` **text**(): `string`

Get the text as it is shown. If the text is hidden, all characters are
replaced with a black circle.

#### Returns

`string`

#### Defined in

[widgets/TextInput.ts:145](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L145)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](textinput.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](textinput.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L140)

___

### valid

• `get` **valid**(): `boolean`

Is the current value in the text input valid?

#### Returns

`boolean`

#### Defined in

[widgets/TextInput.ts:153](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L153)

___

### validValue

• `get` **validValue**(): `V`

The last valid value, transformed by the validator.

#### Returns

`V`

#### Defined in

[widgets/TextInput.ts:158](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L158)

___

### value

• `get` **value**(): `V`

The current value.

If getting, throws an exception if [_value](variable.md#_value) is undefined.

If setting, [setValue](textinput.md#setvalue) is called.

#### Returns

`V`

#### Defined in

[mixins/Variable.ts:45](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Variable.ts#L45)

• `set` **value**(`value`): `void`

The current value.

If getting, throws an exception if [_value](variable.md#_value) is undefined.

If setting, [setValue](textinput.md#setvalue) is called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

#### Returns

`void`

#### Defined in

[mixins/Variable.ts:52](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Variable.ts#L52)

___

### vertical

• `get` **vertical**(): ``null`` \| `boolean`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Returns

``null`` \| `boolean`

#### Defined in

[mixins/FlexLayout.ts:74](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L74)

• `set` **vertical**(`vertical`): `void`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertical` | ``null`` \| `boolean` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:78](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L78)

## Methods

### clear

▸ `Protected` **clear**(`x`, `y`, `width`, `height`, `ctx`): `void`

Paiting utility: clears background of widget. Should not be overridden.

The background fill style used is [ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).clear

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L365)

___

### deleteText

▸ **deleteText**(`delta`): `void`

Deletes a certain amount of characters in a given direction from the
current cursor index. Calls [moveCursorTo](textinput.md#movecursorto) afterwards if
neccessary.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delta` | `number` | The amount and direction of the deletion. For example, if 5, then 5 characters are deleted after the cursor. If -5, then 5 characters are deleted before the cursor and the cursor is moved 5 indices left. |

#### Returns

`void`

#### Defined in

[widgets/TextInput.ts:203](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L203)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](textinput.md#handleevent) method is called and its result is
returned. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `width` | `number` |
| `height` | `number` |
| `root` | [`Root`](root.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

Returns the widget that captured the event or null if none captured the event.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).dispatchEvent

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L241)

___

### findIndexOffsetFromOffset

▸ `Protected` **findIndexOffsetFromOffset**(`offset`): [`number`, `number`]

Get the index and horizontal offset, in pixels, of the beginning of a
character at a given offset.

See [findOffsetFromIndex](textinput.md#findoffsetfromindex) for the opposite.

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

[`number`, `number`]

Returns a tuple containing the index of the character at the offset and the horizontal offset, in pixels. Note that this is not neccessarily an integer. Note that the returned offset is not the same as the input offset. The returned offset is exactly at the beginning of the character. This is useful for implementing selectable text.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).findIndexOffsetFromOffset

#### Defined in

[mixins/Labelable.ts:89](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L89)

___

### findOffsetFromIndex

▸ `Protected` **findOffsetFromIndex**(`index`): `number`

Get the horizontal offset, in pixels, of the beginning of a character at
a given index.

See [findIndexOffsetFromOffset](textinput.md#findindexoffsetfromoffset) for the opposite.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`number`

Returns the horizontal offset, in pixels. Note that this is not neccessarily an integer.

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).findOffsetFromIndex

#### Defined in

[mixins/Labelable.ts:71](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L71)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](textinput.md#_layoutdirty) and [_dirty](textinput.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).forceLayoutDirty

#### Defined in

[widgets/Widget.ts:338](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L338)

___

### handleEvent

▸ `Protected` **handleEvent**(`event`, `_width`, `_height`, `root`): [`TextInput`](textinput.md)<`V`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `_width` | `number` |
| `_height` | `number` |
| `root` | [`Root`](root.md) |

#### Returns

[`TextInput`](textinput.md)<`V`\>

#### Overrides

Mixin(FlexLayout, Labelable, StringVariable).handleEvent

#### Defined in

[widgets/TextInput.ts:223](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L223)

___

### handlePainting

▸ `Protected` **handlePainting**(`x`, `y`, `width`, `height`, `ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`void`

#### Overrides

Mixin(FlexLayout, Labelable, StringVariable).handlePainting

#### Defined in

[widgets/TextInput.ts:321](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L321)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`layoutCtx`): `void`

Handles layout population by adding the effective basis and flex ratio to
the [LayoutContext](layoutcontext.md). Also populates [lastVertical](textinput.md#lastvertical).

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).handlePopulateLayout

#### Defined in

[mixins/FlexLayout.ts:167](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L167)

___

### handlePostLayoutUpdate

▸ `Protected` **handlePostLayoutUpdate**(`_root`): `void`

Generic update method which is called after layout is resolved. Does
nothing by default. Should be implemented.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).handlePostLayoutUpdate

#### Defined in

[widgets/Widget.ts:348](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L348)

___

### handlePreLayoutUpdate

▸ `Protected` **handlePreLayoutUpdate**(`root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

Mixin(FlexLayout, Labelable, StringVariable).handlePreLayoutUpdate

#### Defined in

[widgets/TextInput.ts:291](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L291)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

Handles layout resolution by setting the length to the effective basis
plus this widget's share of the free space, which is dependent on the
flex ratio.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).handleResolveLayout

#### Defined in

[mixins/FlexLayout.ts:212](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/FlexLayout.ts#L212)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](textinput.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](textinput.md#_layoutdirty) and [_dirty](textinput.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).inheritTheme

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L158)

___

### insertText

▸ **insertText**(`str`): `void`

Insert text at the current cursor index. Calls [moveCursorTo](textinput.md#movecursorto)
afterwards.

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`void`

#### Defined in

[widgets/TextInput.ts:189](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L189)

___

### moveCursor

▸ **moveCursor**(`delta`): `void`

Move the cursor by a given index delta. Calls [moveCursorTo](textinput.md#movecursorto)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `delta` | `number` | The change in index; if a positive number, the cursor will be moved right by that amount, else, the cursor will be moved left by that amount. |

#### Returns

`void`

#### Defined in

[widgets/TextInput.ts:181](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L181)

___

### moveCursorTo

▸ **moveCursorTo**(`index`): `void`

Move the cursor to a given index.

Sets [_dirty](textinput.md#_dirty) and [cursorOffsetDirty](textinput.md#cursoroffsetdirty) to true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`void`

#### Defined in

[widgets/TextInput.ts:167](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L167)

___

### onFocusDropped

▸ **onFocusDropped**(`focusType`, `_root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `_root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

Mixin(FlexLayout, Labelable, StringVariable).onFocusDropped

#### Defined in

[widgets/TextInput.ts:217](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/TextInput.ts#L217)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](textinput.md#needsclear) is true, calls the [handlePainting](textinput.md#handlepainting) method and
unsets the dirty flag. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).paint

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](textinput.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).populateLayout

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](textinput.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).postLayoutUpdate

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](textinput.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).preLayoutUpdate

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](textinput.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](textinput.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](textinput.md#_dirty) is set to true.
[_layoutDirty](textinput.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).resolveLayout

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L309)

___

### setFont

▸ `Protected` **setFont**(`font`): `void`

Sets [_font](textinput.md#_font) if the value is different. If it is different, also
sets [_dirty](textinput.md#_dirty) to true and calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `font` | `string` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).setFont

#### Defined in

[mixins/Labelable.ts:172](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L172)

___

### setMinLabelAscent

▸ `Protected` **setMinLabelAscent**(`minLabelAscent`): `void`

Sets [_minLabelAscent](textinput.md#_minlabelascent) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelAscent` | `number` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).setMinLabelAscent

#### Defined in

[mixins/Labelable.ts:195](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L195)

___

### setMinLabelDescent

▸ `Protected` **setMinLabelDescent**(`minLabelDescent`): `void`

Sets [_minLabelDescent](textinput.md#_minlabeldescent) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelDescent` | `number` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).setMinLabelDescent

#### Defined in

[mixins/Labelable.ts:206](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L206)

___

### setMinLabelWidth

▸ `Protected` **setMinLabelWidth**(`minLabelWidth`): `void`

Sets [_minLabelWidth](textinput.md#_minlabelwidth) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelWidth` | `number` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).setMinLabelWidth

#### Defined in

[mixins/Labelable.ts:184](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L184)

___

### setText

▸ `Protected` **setText**(`text`): `void`

Sets [_text](textinput.md#_text) if the value is different. If it is different, also
sets [_dirty](textinput.md#_dirty) to true and calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).setText

#### Defined in

[mixins/Labelable.ts:160](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Labelable.ts#L160)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](textinput.md#_layoutdirty) and
[_dirty](textinput.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).setThemeOverride

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L116)

___

### setValue

▸ **setValue**(`value`, `doCallback?`): `void`

Sets [_value](variable.md#_value). Does nothing if the value is already the one
specified.

[_dirty](textinput.md#_dirty) is set to true if the value has changed.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `string` | `undefined` | - |
| `doCallback` | `boolean` | `true` | If true, then [callback](textinput.md#callback) is called if the value has changed. |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).setValue

#### Defined in

[mixins/Variable.ts:64](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/mixins/Variable.ts#L64)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable, StringVariable).updateInheritedTheme

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/widgets/Widget.ts#L65)
