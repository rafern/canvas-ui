[canvas-ui](../README.md) / Labelable

# Class: Labelable

A mixin class for widgets that contain labels (text).

Contains utilities for measuring text dimensions and converting between
offsets in pixels and text indices.

## Hierarchy

- [`Widget`](widget.md)

  ↳ **`Labelable`**

## Table of contents

### Constructors

- [constructor](labelable.md#constructor)

### Properties

- [\_dirty](labelable.md#_dirty)
- [\_font](labelable.md#_font)
- [\_labelAscent](labelable.md#_labelascent)
- [\_labelDescent](labelable.md#_labeldescent)
- [\_labelWidth](labelable.md#_labelwidth)
- [\_layoutDirty](labelable.md#_layoutdirty)
- [\_minLabelAscent](labelable.md#_minlabelascent)
- [\_minLabelDescent](labelable.md#_minlabeldescent)
- [\_minLabelWidth](labelable.md#_minlabelwidth)
- [\_text](labelable.md#_text)
- [labelDirty](labelable.md#labeldirty)
- [needsClear](labelable.md#needsclear)
- [propagatesEvents](labelable.md#propagatesevents)
- [resolvedHeight](labelable.md#resolvedheight)
- [resolvedWidth](labelable.md#resolvedwidth)

### Accessors

- [dimensions](labelable.md#dimensions)
- [dirty](labelable.md#dirty)
- [enabled](labelable.md#enabled)
- [inheritedTheme](labelable.md#inheritedtheme)
- [labelAscent](labelable.md#labelascent)
- [labelDescent](labelable.md#labeldescent)
- [labelHeight](labelable.md#labelheight)
- [labelWidth](labelable.md#labelwidth)
- [layoutDirty](labelable.md#layoutdirty)
- [theme](labelable.md#theme)
- [themeOverride](labelable.md#themeoverride)

### Methods

- [clear](labelable.md#clear)
- [dispatchEvent](labelable.md#dispatchevent)
- [findIndexOffsetFromOffset](labelable.md#findindexoffsetfromoffset)
- [findOffsetFromIndex](labelable.md#findoffsetfromindex)
- [forceLayoutDirty](labelable.md#forcelayoutdirty)
- [handleEvent](labelable.md#handleevent)
- [handlePainting](labelable.md#handlepainting)
- [handlePopulateLayout](labelable.md#handlepopulatelayout)
- [handlePostLayoutUpdate](labelable.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](labelable.md#handleprelayoutupdate)
- [handleResolveLayout](labelable.md#handleresolvelayout)
- [inheritTheme](labelable.md#inherittheme)
- [onFocusDropped](labelable.md#onfocusdropped)
- [paint](labelable.md#paint)
- [populateLayout](labelable.md#populatelayout)
- [postLayoutUpdate](labelable.md#postlayoutupdate)
- [preLayoutUpdate](labelable.md#prelayoutupdate)
- [resolveLayout](labelable.md#resolvelayout)
- [setFont](labelable.md#setfont)
- [setLabelDirty](labelable.md#setlabeldirty)
- [setMinLabelAscent](labelable.md#setminlabelascent)
- [setMinLabelDescent](labelable.md#setminlabeldescent)
- [setMinLabelWidth](labelable.md#setminlabelwidth)
- [setText](labelable.md#settext)
- [setThemeOverride](labelable.md#setthemeoverride)
- [updateInheritedTheme](labelable.md#updateinheritedtheme)
- [updateTextDims](labelable.md#updatetextdims)

## Constructors

### constructor

• **new Labelable**(`themeOverride`, `needsClear`, `propagatesEvents`)

Create a new Widget.

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) |
| `needsClear` | `boolean` |
| `propagatesEvents` | `boolean` |

#### Inherited from

[Widget](widget.md).[constructor](widget.md#constructor)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L51)

## Properties

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[Widget](widget.md).[_dirty](widget.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L23)

___

### \_font

• `Protected` **\_font**: `string` = `''`

The current font used for rendering text

#### Defined in

[mixins/Labelable.ts:16](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L16)

___

### \_labelAscent

• `Private` **\_labelAscent**: `number` = `0`

The current text ascent height corrected for minimum ascent height. May
be outdated.

#### Defined in

[mixins/Labelable.ts:32](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L32)

___

### \_labelDescent

• `Private` **\_labelDescent**: `number` = `0`

The current text descent height corrected for minimum descent height.
May be outdated.

#### Defined in

[mixins/Labelable.ts:37](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L37)

___

### \_labelWidth

• `Private` **\_labelWidth**: `number` = `0`

The current text width corrected for minimum width. May be outdated.

#### Defined in

[mixins/Labelable.ts:27](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L27)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[Widget](widget.md).[_layoutDirty](widget.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L25)

___

### \_minLabelAscent

• `Protected` **\_minLabelAscent**: `number` = `0`

The current minimum text ascent height

#### Defined in

[mixins/Labelable.ts:20](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L20)

___

### \_minLabelDescent

• `Protected` **\_minLabelDescent**: `number` = `0`

The current minimum text descent height

#### Defined in

[mixins/Labelable.ts:22](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L22)

___

### \_minLabelWidth

• `Protected` **\_minLabelWidth**: `number` = `0`

The current minimum text width

#### Defined in

[mixins/Labelable.ts:18](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L18)

___

### \_text

• `Protected` **\_text**: `string` = `''`

The current string of text

#### Defined in

[mixins/Labelable.ts:14](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L14)

___

### labelDirty

• `Private` **labelDirty**: `boolean` = `true`

Does the label need to be re-measured?

#### Defined in

[mixins/Labelable.ts:40](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L40)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[Widget](widget.md).[needsClear](widget.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[Widget](widget.md).[propagatesEvents](widget.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[Widget](widget.md).[resolvedHeight](widget.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[Widget](widget.md).[resolvedWidth](widget.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L49)

## Accessors

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](labelable.md#resolvedwidth) and [resolvedHeight](labelable.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](labelable.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](labelable.md#_layoutdirty) is set to true
and [_dirty](labelable.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](labelable.md#_layoutdirty) is set to true
and [_dirty](labelable.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L96)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](labelable.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](labelable.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L180)

___

### labelAscent

• `get` **labelAscent**(): `number`

The current label ascent height. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:143](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L143)

___

### labelDescent

• `get` **labelDescent**(): `number`

The current label descent height. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:149](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L149)

___

### labelHeight

• `get` **labelHeight**(): `number`

The current label height. Re-measures text if neccessary. Equivalent to
adding up [labelAscent](labelable.md#labelascent) and [labelDescent](labelable.md#labeldescent).

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:158](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L158)

___

### labelWidth

• `get` **labelWidth**(): `number`

The current label width. Re-measures text if neccessary.

#### Returns

`number`

#### Defined in

[mixins/Labelable.ts:137](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L137)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](labelable.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L202)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](labelable.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](labelable.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L140)

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

[Widget](widget.md).[clear](widget.md#clear)

#### Defined in

[widgets/Widget.ts:366](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L366)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](labelable.md#handleevent) method is called and its result is
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

Returns the widget that captured the event or null if none
captured the event.

#### Inherited from

[Widget](widget.md).[dispatchEvent](widget.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:242](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L242)

___

### findIndexOffsetFromOffset

▸ `Protected` **findIndexOffsetFromOffset**(`offset`): [`number`, `number`]

Get the index and horizontal offset, in pixels, of the beginning of a
character at a given offset.

See [findOffsetFromIndex](labelable.md#findoffsetfromindex) for the opposite.

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | `number` |

#### Returns

[`number`, `number`]

Returns a tuple containing the index of the character at the
offset and the horizontal offset, in pixels. Note that this is not
neccessarily an integer.

Note that the returned offset is not the same as the input offset. The
returned offset is exactly at the beginning of the character. This is
useful for implementing selectable text.

#### Defined in

[mixins/Labelable.ts:96](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L96)

___

### findOffsetFromIndex

▸ `Protected` **findOffsetFromIndex**(`index`): `number`

Get the horizontal offset, in pixels, of the beginning of a character at
a given index.

See [findIndexOffsetFromOffset](labelable.md#findindexoffsetfromoffset) for the opposite.

#### Parameters

| Name | Type |
| :------ | :------ |
| `index` | `number` |

#### Returns

`number`

Returns the horizontal offset, in pixels. Note that this is not
neccessarily an integer.

#### Defined in

[mixins/Labelable.ts:72](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L72)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](labelable.md#_layoutdirty) and [_dirty](labelable.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[forceLayoutDirty](widget.md#forcelayoutdirty)

#### Defined in

[widgets/Widget.ts:339](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L339)

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

[Widget](widget.md).[handleEvent](widget.md#handleevent)

#### Defined in

[widgets/Widget.ts:223](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L223)

___

### handlePainting

▸ `Protected` **handlePainting**(`_x`, `_y`, `_width`, `_height`, `_ctx`): `void`

Widget painting callback. By default does nothing. Do painting logic here
when extending Widget. Should be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_x` | `number` |
| `_y` | `number` |
| `_width` | `number` |
| `_height` | `number` |
| `_ctx` | `CanvasRenderingContext2D` |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[handlePainting](widget.md#handlepainting)

#### Defined in

[widgets/Widget.ts:384](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L384)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`_layoutCtx`): `void`

The first Widget layout resolution callback. Populates a given
[LayoutContext](layoutcontext.md) with the wanted basis and flex ratio. Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[handlePopulateLayout](widget.md#handlepopulatelayout)

#### Defined in

[widgets/Widget.ts:280](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L280)

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

[Widget](widget.md).[handlePostLayoutUpdate](widget.md#handlepostlayoutupdate)

#### Defined in

[widgets/Widget.ts:349](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L349)

___

### handlePreLayoutUpdate

▸ `Protected` **handlePreLayoutUpdate**(`_root`): `void`

Generic update method which is called before layout is resolved. Does
nothing by default. Should be implemented.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[handlePreLayoutUpdate](widget.md#handleprelayoutupdate)

#### Defined in

[widgets/Widget.ts:263](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L263)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`_layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](labelable.md#resolvedwidth) and [resolvedHeight](labelable.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[handleResolveLayout](widget.md#handleresolvelayout)

#### Defined in

[widgets/Widget.ts:289](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L289)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](labelable.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](labelable.md#_layoutdirty) and [_dirty](labelable.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[inheritTheme](widget.md#inherittheme)

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L158)

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

[Widget](widget.md).[onFocusDropped](widget.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](labelable.md#needsclear) is true, calls the [handlePainting](labelable.md#handlepainting) method and
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

[Widget](widget.md).[paint](widget.md#paint)

#### Defined in

[widgets/Widget.ts:392](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L392)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](labelable.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[populateLayout](widget.md#populatelayout)

#### Defined in

[widgets/Widget.ts:297](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L297)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](labelable.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[postLayoutUpdate](widget.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:356](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L356)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](labelable.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[preLayoutUpdate](widget.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:270](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L270)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](labelable.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](labelable.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](labelable.md#_dirty) is set to true.
[_layoutDirty](labelable.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[resolveLayout](widget.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:310](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L310)

___

### setFont

▸ `Protected` **setFont**(`font`): `void`

Sets [_font](labelable.md#_font) if the value is different. If it is different, also
sets [_dirty](labelable.md#_dirty) to true and calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `font` | `string` |

#### Returns

`void`

#### Defined in

[mixins/Labelable.ts:179](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L179)

___

### setLabelDirty

▸ `Private` **setLabelDirty**(): `void`

Sets [labelDirty](labelable.md#labeldirty) and [_layoutDirty](labelable.md#_layoutdirty) to true.

#### Returns

`void`

#### Defined in

[mixins/Labelable.ts:131](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L131)

___

### setMinLabelAscent

▸ `Protected` **setMinLabelAscent**(`minLabelAscent`): `void`

Sets [_minLabelAscent](labelable.md#_minlabelascent) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelAscent` | `number` |

#### Returns

`void`

#### Defined in

[mixins/Labelable.ts:202](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L202)

___

### setMinLabelDescent

▸ `Protected` **setMinLabelDescent**(`minLabelDescent`): `void`

Sets [_minLabelDescent](labelable.md#_minlabeldescent) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelDescent` | `number` |

#### Returns

`void`

#### Defined in

[mixins/Labelable.ts:213](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L213)

___

### setMinLabelWidth

▸ `Protected` **setMinLabelWidth**(`minLabelWidth`): `void`

Sets [_minLabelWidth](labelable.md#_minlabelwidth) if the value is different. If it is
different, also calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `minLabelWidth` | `number` |

#### Returns

`void`

#### Defined in

[mixins/Labelable.ts:191](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L191)

___

### setText

▸ `Protected` **setText**(`text`): `void`

Sets [_text](labelable.md#_text) if the value is different. If it is different, also
sets [_dirty](labelable.md#_dirty) to true and calls [setLabelDirty](labelable.md#setlabeldirty).

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`void`

#### Defined in

[mixins/Labelable.ts:167](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L167)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](labelable.md#_layoutdirty) and
[_dirty](labelable.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[setThemeOverride](widget.md#setthemeoverride)

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L116)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[updateInheritedTheme](widget.md#updateinheritedtheme)

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L65)

___

### updateTextDims

▸ `Private` **updateTextDims**(): `void`

Update [_labelWidth](labelable.md#_labelwidth), [_labelAscent](labelable.md#_labelascent) and
[_labelDescent](labelable.md#_labeldescent). Sets [labelDirty](labelable.md#labeldirty) to false. Does nothing if
label is not dirty.

#### Returns

`void`

#### Defined in

[mixins/Labelable.ts:47](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Labelable.ts#L47)
