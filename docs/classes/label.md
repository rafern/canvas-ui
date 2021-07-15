[canvas-ui](../README.md) / Label

# Class: Label

A flexbox widget which displays line of text.

## Hierarchy

- [`FlexLayout`](flexlayout.md)<`this`\> & [`Labelable`](labelable.md)<`this`\>

  ↳ **`Label`**

## Table of contents

### Constructors

- [constructor](label.md#constructor)

### Properties

- [\_dirty](label.md#_dirty)
- [\_font](label.md#_font)
- [\_layoutDirty](label.md#_layoutdirty)
- [\_minLabelAscent](label.md#_minlabelascent)
- [\_minLabelDescent](label.md#_minlabeldescent)
- [\_minLabelWidth](label.md#_minlabelwidth)
- [\_text](label.md#_text)
- [lastVertical](label.md#lastvertical)
- [needsClear](label.md#needsclear)
- [propagatesEvents](label.md#propagatesevents)
- [resolvedHeight](label.md#resolvedheight)
- [resolvedWidth](label.md#resolvedwidth)
- [textGetter](label.md#textgetter)

### Accessors

- [crossBasis](label.md#crossbasis)
- [currentText](label.md#currenttext)
- [dimensions](label.md#dimensions)
- [dirty](label.md#dirty)
- [enabled](label.md#enabled)
- [flexRatio](label.md#flexratio)
- [inheritedTheme](label.md#inheritedtheme)
- [internalCrossBasis](label.md#internalcrossbasis)
- [internalMainBasis](label.md#internalmainbasis)
- [labelAscent](label.md#labelascent)
- [labelDescent](label.md#labeldescent)
- [labelHeight](label.md#labelheight)
- [labelWidth](label.md#labelwidth)
- [layoutDirty](label.md#layoutdirty)
- [mainBasis](label.md#mainbasis)
- [text](label.md#text)
- [theme](label.md#theme)
- [themeOverride](label.md#themeoverride)
- [vertical](label.md#vertical)

### Methods

- [clear](label.md#clear)
- [dispatchEvent](label.md#dispatchevent)
- [findIndexOffsetFromOffset](label.md#findindexoffsetfromoffset)
- [findOffsetFromIndex](label.md#findoffsetfromindex)
- [forceLayoutDirty](label.md#forcelayoutdirty)
- [handleEvent](label.md#handleevent)
- [handlePainting](label.md#handlepainting)
- [handlePopulateLayout](label.md#handlepopulatelayout)
- [handlePostLayoutUpdate](label.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](label.md#handleprelayoutupdate)
- [handleResolveLayout](label.md#handleresolvelayout)
- [inheritTheme](label.md#inherittheme)
- [onFocusDropped](label.md#onfocusdropped)
- [paint](label.md#paint)
- [populateLayout](label.md#populatelayout)
- [postLayoutUpdate](label.md#postlayoutupdate)
- [preLayoutUpdate](label.md#prelayoutupdate)
- [resolveLayout](label.md#resolvelayout)
- [setFont](label.md#setfont)
- [setMinLabelAscent](label.md#setminlabelascent)
- [setMinLabelDescent](label.md#setminlabeldescent)
- [setMinLabelWidth](label.md#setminlabelwidth)
- [setText](label.md#settext)
- [setThemeOverride](label.md#setthemeoverride)
- [updateInheritedTheme](label.md#updateinheritedtheme)

## Constructors

### constructor

• **new Label**(`text`, `themeOverride?`)

Create a new Label.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `text` | `string` \| [`TextGetter`](../README.md#textgetter) | `undefined` | The text source of the label. Has the same behaviour as setting [text](label.md#text). |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` | - |

#### Overrides

Mixin(FlexLayout, Labelable).constructor

#### Defined in

[widgets/Label.ts:27](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Label.ts#L27)

## Properties

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

Mixin(FlexLayout, Labelable).\_dirty

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L23)

___

### \_font

• `Protected` **\_font**: `string` = `''`

The current font used for rendering text

#### Inherited from

Mixin(FlexLayout, Labelable).\_font

#### Defined in

[mixins/Labelable.ts:16](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L16)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

Mixin(FlexLayout, Labelable).\_layoutDirty

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L25)

___

### \_minLabelAscent

• `Protected` **\_minLabelAscent**: `number` = `0`

The current minimum text ascent height

#### Inherited from

Mixin(FlexLayout, Labelable).\_minLabelAscent

#### Defined in

[mixins/Labelable.ts:20](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L20)

___

### \_minLabelDescent

• `Protected` **\_minLabelDescent**: `number` = `0`

The current minimum text descent height

#### Inherited from

Mixin(FlexLayout, Labelable).\_minLabelDescent

#### Defined in

[mixins/Labelable.ts:22](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L22)

___

### \_minLabelWidth

• `Protected` **\_minLabelWidth**: `number` = `0`

The current minimum text width

#### Inherited from

Mixin(FlexLayout, Labelable).\_minLabelWidth

#### Defined in

[mixins/Labelable.ts:18](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L18)

___

### \_text

• `Protected` **\_text**: `string` = `''`

The current string of text

#### Inherited from

Mixin(FlexLayout, Labelable).\_text

#### Defined in

[mixins/Labelable.ts:14](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L14)

___

### lastVertical

• **lastVertical**: `boolean` = `true`

Was the last layout vertical or not? Never null. Use this to tell if a
widget is vertical or not when painting.

#### Inherited from

Mixin(FlexLayout, Labelable).lastVertical

#### Defined in

[mixins/FlexLayout.ts:56](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L56)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

Mixin(FlexLayout, Labelable).needsClear

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

Mixin(FlexLayout, Labelable).propagatesEvents

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

Mixin(FlexLayout, Labelable).resolvedHeight

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

Mixin(FlexLayout, Labelable).resolvedWidth

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L49)

___

### textGetter

• `Private` **textGetter**: ``null`` \| [`TextGetter`](../README.md#textgetter) = `null`

The text getter. If this is not null, text will be updated with the
return value of this callback, every update.

#### Defined in

[widgets/Label.ts:27](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Label.ts#L27)

## Accessors

### crossBasis

• `get` **crossBasis**(): `number`

The basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:98](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L98)

• `set` **crossBasis**(`crossBasis`): `void`

The basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:102](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L102)

___

### currentText

• `get` **currentText**(): `string`

Gets [_text](label.md#_text). If you want to get the current text source, then use
[text](label.md#text) instead.

#### Returns

`string`

#### Defined in

[widgets/Label.ts:81](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Label.ts#L81)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](label.md#resolvedwidth) and [resolvedHeight](label.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](label.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](label.md#_layoutdirty) is set to true
and [_dirty](label.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](label.md#_layoutdirty) is set to true
and [_dirty](label.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L96)

___

### flexRatio

• `get` **flexRatio**(): `number`

The flex ratio of the flexbox

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:59](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L59)

• `set` **flexRatio**(`flexRatio`): `void`

The flex ratio of the flexbox

#### Parameters

| Name | Type |
| :------ | :------ |
| `flexRatio` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:63](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L63)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](label.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](label.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L180)

___

### internalCrossBasis

• `get` **internalCrossBasis**(): `number`

The internal basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:122](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L122)

• `set` **internalCrossBasis**(`internalCrossBasis`): `void`

The internal basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalCrossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:126](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L126)

___

### internalMainBasis

• `get` **internalMainBasis**(): `number`

The internal basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:110](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L110)

• `set` **internalMainBasis**(`internalMainBasis`): `void`

The internal basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalMainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:114](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L114)

___

### labelAscent

• `get` **labelAscent**(): `number`

The current label ascent height. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:136](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L136)

___

### labelDescent

• `get` **labelDescent**(): `number`

The current label descent height. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:142](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L142)

___

### labelHeight

• `get` **labelHeight**(): `number`

The current label height. Re-measures text if neccessary. Equivalent to
adding up [labelAscent](label.md#labelascent) and [labelDescent](label.md#labeldescent).

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:151](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L151)

___

### labelWidth

• `get` **labelWidth**(): `number`

The current label width. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:130](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L130)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](label.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L202)

___

### mainBasis

• `get` **mainBasis**(): `number`

The basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:86](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L86)

• `set` **mainBasis**(`mainBasis`): `void`

The basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:90](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L90)

___

### text

• `get` **text**(): `string` \| [`TextGetter`](../README.md#textgetter)

This label's text source. If you want to get the current text string,
then use [currentText](label.md#currenttext) instead.

When setting, if text is a [TextGetter](../README.md#textgetter), then [textGetter](label.md#textgetter) is
set, else, [setText](label.md#settext) is called.

When getting, if [textGetter](label.md#textgetter) is set, then it is returned, else,
[_text](label.md#_text) is returned.

#### Returns

`string` \| [`TextGetter`](../README.md#textgetter)

#### Defined in

[widgets/Label.ts:70](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Label.ts#L70)

• `set` **text**(`text`): `void`

This label's text source. If you want to get the current text string,
then use [currentText](label.md#currenttext) instead.

When setting, if text is a [TextGetter](../README.md#textgetter), then [textGetter](label.md#textgetter) is
set, else, [setText](label.md#settext) is called.

When getting, if [textGetter](label.md#textgetter) is set, then it is returned, else,
[_text](label.md#_text) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` \| [`TextGetter`](../README.md#textgetter) |

#### Returns

`void`

#### Defined in

[widgets/Label.ts:61](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Label.ts#L61)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](label.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](label.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L140)

___

### vertical

• `get` **vertical**(): ``null`` \| `boolean`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Returns

``null`` \| `boolean`

#### Defined in

[mixins/FlexLayout.ts:74](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L74)

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

[mixins/FlexLayout.ts:78](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L78)

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

Mixin(FlexLayout, Labelable).clear

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](label.md#handleevent) method is called and its result is
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

Mixin(FlexLayout, Labelable).dispatchEvent

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L241)

___

### findIndexOffsetFromOffset

▸ `Protected` **findIndexOffsetFromOffset**(`offset`): [`number`, `number`]

Get the index and horizontal offset, in pixels, of the beginning of a
character at a given offset.

See [findOffsetFromIndex](label.md#findoffsetfromindex) for the opposite.

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

[`number`, `number`]

Returns a tuple containing the index of the character at the offset and the horizontal offset, in pixels. Note that this is not neccessarily an integer. Note that the returned offset is not the same as the input offset. The returned offset is exactly at the beginning of the character. This is useful for implementing selectable text.

#### Inherited from

Mixin(FlexLayout, Labelable).findIndexOffsetFromOffset

#### Defined in

[mixins/Labelable.ts:89](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L89)

___

### findOffsetFromIndex

▸ `Protected` **findOffsetFromIndex**(`index`): `number`

Get the horizontal offset, in pixels, of the beginning of a character at
a given index.

See [findIndexOffsetFromOffset](label.md#findindexoffsetfromoffset) for the opposite.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`number`

Returns the horizontal offset, in pixels. Note that this is not neccessarily an integer.

#### Inherited from

Mixin(FlexLayout, Labelable).findOffsetFromIndex

#### Defined in

[mixins/Labelable.ts:71](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L71)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](label.md#_layoutdirty) and [_dirty](label.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).forceLayoutDirty

#### Defined in

[widgets/Widget.ts:338](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L338)

___

### handleEvent

▸ `Protected` **handleEvent**(`event`, `_width`, `_height`, `_root`): ``null`` \| [`Widget`](widget.md)

Widget event handling callback. If the event is to be captured, the
capturer is returned, else, null. By default, this will do nothing and
capture the event if it is targetted at itself or is a
[PointerEvent](pointerevent.md). Should be overridden.

If overriding, return the widget that has captured the event (could be
this, for example, or a child widget if implementing a container), or
null if no widget captured the event.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `_width` | `number` |
| `_height` | `number` |
| `_root` | [`Root`](root.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

Mixin(FlexLayout, Labelable).handleEvent

#### Defined in

[widgets/Widget.ts:223](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L223)

___

### handlePainting

▸ `Protected` **handlePainting**(`x`, `y`, `_width`, `height`, `ctx`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `_width` | `number` |
| `height` | `number` |
| `ctx` | `CanvasRenderingContext2D` |

#### Returns

`void`

#### Overrides

Mixin(FlexLayout, Labelable).handlePainting

#### Defined in

[widgets/Label.ts:99](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Label.ts#L99)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`layoutCtx`): `void`

Handles layout population by adding the effective basis and flex ratio to
the [LayoutContext](layoutcontext.md). Also populates [lastVertical](label.md#lastvertical).

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).handlePopulateLayout

#### Defined in

[mixins/FlexLayout.ts:167](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L167)

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

Mixin(FlexLayout, Labelable).handlePostLayoutUpdate

#### Defined in

[widgets/Widget.ts:348](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L348)

___

### handlePreLayoutUpdate

▸ `Protected` **handlePreLayoutUpdate**(`_root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

Mixin(FlexLayout, Labelable).handlePreLayoutUpdate

#### Defined in

[widgets/Label.ts:85](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Label.ts#L85)

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

Mixin(FlexLayout, Labelable).handleResolveLayout

#### Defined in

[mixins/FlexLayout.ts:212](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L212)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](label.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](label.md#_layoutdirty) and [_dirty](label.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).inheritTheme

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L158)

___

### onFocusDropped

▸ **onFocusDropped**(`_focusType`, `_root`): `void`

Called when a focus type owned by this Widget has been dropped. Does
nothing by default. Can be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_focusType` | [`FocusType`](../enums/focustype.md) |
| `_root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).onFocusDropped

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](label.md#needsclear) is true, calls the [handlePainting](label.md#handlepainting) method and
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

Mixin(FlexLayout, Labelable).paint

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](label.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).populateLayout

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](label.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).postLayoutUpdate

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](label.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).preLayoutUpdate

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](label.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](label.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](label.md#_dirty) is set to true.
[_layoutDirty](label.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).resolveLayout

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L309)

___

### setFont

▸ `Protected` **setFont**(`font`): `void`

Sets [_font](label.md#_font) if the value is different. If it is different, also
sets [_dirty](label.md#_dirty) to true and calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `font` | `string` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).setFont

#### Defined in

[mixins/Labelable.ts:172](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L172)

___

### setMinLabelAscent

▸ `Protected` **setMinLabelAscent**(`minLabelAscent`): `void`

Sets [_minLabelAscent](label.md#_minlabelascent) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelAscent` | `number` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).setMinLabelAscent

#### Defined in

[mixins/Labelable.ts:195](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L195)

___

### setMinLabelDescent

▸ `Protected` **setMinLabelDescent**(`minLabelDescent`): `void`

Sets [_minLabelDescent](label.md#_minlabeldescent) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelDescent` | `number` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).setMinLabelDescent

#### Defined in

[mixins/Labelable.ts:206](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L206)

___

### setMinLabelWidth

▸ `Protected` **setMinLabelWidth**(`minLabelWidth`): `void`

Sets [_minLabelWidth](label.md#_minlabelwidth) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelWidth` | `number` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).setMinLabelWidth

#### Defined in

[mixins/Labelable.ts:184](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L184)

___

### setText

▸ `Protected` **setText**(`text`): `void`

Sets [_text](label.md#_text) if the value is different. If it is different, also
sets [_dirty](label.md#_dirty) to true and calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).setText

#### Defined in

[mixins/Labelable.ts:160](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Labelable.ts#L160)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](label.md#_layoutdirty) and
[_dirty](label.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).setThemeOverride

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L116)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Labelable).updateInheritedTheme

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L65)
