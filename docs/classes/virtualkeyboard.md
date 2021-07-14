[canvas-ui](../README.md) / VirtualKeyboard

# Class: VirtualKeyboard

A virtual keyboard widget.

Needs a [KeyboardDriver](keyboarddriver.md) so that key events can be queued.

Equivalent to creating a [Column](column.md) of [KeyRow](keyrow.md) with a shared
[KeyContext](../interfaces/keycontext.md).

## Hierarchy

- [`Column`](column.md)

  ↳ **`VirtualKeyboard`**

## Table of contents

### Constructors

- [constructor](virtualkeyboard.md#constructor)

### Properties

- [\_children](virtualkeyboard.md#_children)
- [\_dirty](virtualkeyboard.md#_dirty)
- [\_layoutDirty](virtualkeyboard.md#_layoutdirty)
- [needsClear](virtualkeyboard.md#needsclear)
- [propagatesEvents](virtualkeyboard.md#propagatesevents)
- [resolvedHeight](virtualkeyboard.md#resolvedheight)
- [resolvedWidth](virtualkeyboard.md#resolvedwidth)

### Accessors

- [childCount](virtualkeyboard.md#childcount)
- [children](virtualkeyboard.md#children)
- [dimensions](virtualkeyboard.md#dimensions)
- [dirty](virtualkeyboard.md#dirty)
- [enabled](virtualkeyboard.md#enabled)
- [inheritedTheme](virtualkeyboard.md#inheritedtheme)
- [layoutDirty](virtualkeyboard.md#layoutdirty)
- [theme](virtualkeyboard.md#theme)
- [themeOverride](virtualkeyboard.md#themeoverride)

### Methods

- [add](virtualkeyboard.md#add)
- [clear](virtualkeyboard.md#clear)
- [clearChildren](virtualkeyboard.md#clearchildren)
- [dispatchEvent](virtualkeyboard.md#dispatchevent)
- [forceLayoutDirty](virtualkeyboard.md#forcelayoutdirty)
- [handleEvent](virtualkeyboard.md#handleevent)
- [handlePainting](virtualkeyboard.md#handlepainting)
- [handlePopulateLayout](virtualkeyboard.md#handlepopulatelayout)
- [handlePostLayoutUpdate](virtualkeyboard.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](virtualkeyboard.md#handleprelayoutupdate)
- [handleResolveLayout](virtualkeyboard.md#handleresolvelayout)
- [inheritTheme](virtualkeyboard.md#inherittheme)
- [onFocusDropped](virtualkeyboard.md#onfocusdropped)
- [paint](virtualkeyboard.md#paint)
- [populateLayout](virtualkeyboard.md#populatelayout)
- [postLayoutUpdate](virtualkeyboard.md#postlayoutupdate)
- [preLayoutUpdate](virtualkeyboard.md#prelayoutupdate)
- [remove](virtualkeyboard.md#remove)
- [resolveLayout](virtualkeyboard.md#resolvelayout)
- [setThemeOverride](virtualkeyboard.md#setthemeoverride)
- [updateInheritedTheme](virtualkeyboard.md#updateinheritedtheme)

## Constructors

### constructor

• **new VirtualKeyboard**(`keyboardDriver`, `keyboardTemplate?`, `themeOverride?`)

Create a new VirtualKeyboard.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `keyboardDriver` | [`KeyboardDriver`](keyboarddriver.md) | `undefined` | - |
| `keyboardTemplate` | [`VirtualKeyboardTemplate`](../README.md#virtualkeyboardtemplate) | `undefined` | By default, the virtual keyboard template is [defaultVirtualKeyboardTemplate](../README.md#defaultvirtualkeyboardtemplate) |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` | - |

#### Overrides

[Column](column.md).[constructor](column.md#constructor)

#### Defined in

[widgets/VirtualKeyboard/VirtualKeyboard.ts:70](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/VirtualKeyboard/VirtualKeyboard.ts#L70)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](virtualkeyboard.md#children) for the public iterator getter.

#### Inherited from

[Column](column.md).[_children](column.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[Column](column.md).[_dirty](column.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[Column](column.md).[_layoutDirty](column.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[Column](column.md).[needsClear](column.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[Column](column.md).[propagatesEvents](column.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[Column](column.md).[resolvedHeight](column.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[Column](column.md).[resolvedWidth](column.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L49)

## Accessors

### childCount

• `get` **childCount**(): `number`

Get amount of children of this parent widget.

#### Returns

`number`

#### Defined in

[mixins/Parent.ts:60](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/mixins/Parent.ts#L60)

___

### children

• `get` **children**(): `Iterable`<[`Widget`](widget.md)\>

Get iterator for children of this parent widget. Cannot modify list of
children via this iterator; for read-only purposes only.

#### Returns

`Iterable`<[`Widget`](widget.md)\>

#### Defined in

[mixins/Parent.ts:68](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/mixins/Parent.ts#L68)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](virtualkeyboard.md#resolvedwidth) and [resolvedHeight](virtualkeyboard.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](virtualkeyboard.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](virtualkeyboard.md#_layoutdirty) is set to true
and [_dirty](virtualkeyboard.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](virtualkeyboard.md#_layoutdirty) is set to true
and [_dirty](virtualkeyboard.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L96)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](virtualkeyboard.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](virtualkeyboard.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L180)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](virtualkeyboard.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L202)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](virtualkeyboard.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](virtualkeyboard.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L140)

## Methods

### add

▸ **add**(`children`): [`VirtualKeyboard`](virtualkeyboard.md)

Add child(ren) to this widget.

[_layoutDirty](virtualkeyboard.md#_layoutdirty) and [_dirty](virtualkeyboard.md#_dirty) are set to true and
[updateInheritedTheme](virtualkeyboard.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is pushed to [_children](virtualkeyboard.md#_children). If this is an array of widgets, then each widget is pushed to [_children](virtualkeyboard.md#_children). |

#### Returns

[`VirtualKeyboard`](virtualkeyboard.md)

Returns this so that the method is chainable.

#### Inherited from

[Column](column.md).[add](column.md#add)

#### Defined in

[mixins/MultiParent.ts:21](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/mixins/MultiParent.ts#L21)

___

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

[Column](column.md).[clear](column.md#clear)

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L365)

___

### clearChildren

▸ **clearChildren**(): [`VirtualKeyboard`](virtualkeyboard.md)

Remove all children from this widget.

[_layoutDirty](virtualkeyboard.md#_layoutdirty) and [_dirty](virtualkeyboard.md#_dirty) are set to true.

#### Returns

[`VirtualKeyboard`](virtualkeyboard.md)

Returns this so that the method is chainable.

#### Inherited from

[Column](column.md).[clearChildren](column.md#clearchildren)

#### Defined in

[mixins/MultiParent.ts:74](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/mixins/MultiParent.ts#L74)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](virtualkeyboard.md#handleevent) method is called and its result is
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

[Column](column.md).[dispatchEvent](column.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](virtualkeyboard.md#_layoutdirty) and [_dirty](virtualkeyboard.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[Column](column.md).[forceLayoutDirty](column.md#forcelayoutdirty)

#### Defined in

[widgets/MultiContainer.ts:103](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/MultiContainer.ts#L103)

___

### handleEvent

▸ `Protected` **handleEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

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
| `width` | `number` |
| `height` | `number` |
| `root` | [`Root`](root.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

[Column](column.md).[handleEvent](column.md#handleevent)

#### Defined in

[widgets/MultiContainer.ts:36](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/MultiContainer.ts#L36)

___

### handlePainting

▸ `Protected` **handlePainting**(`x`, `y`, `width`, `height`, `ctx`): `void`

Widget painting callback. By default does nothing. Do painting logic here
when extending Widget. Should be overridden.

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

[Column](column.md).[handlePainting](column.md#handlepainting)

#### Defined in

[widgets/MultiContainer.ts:233](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/MultiContainer.ts#L233)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`layoutCtx`): `void`

The first Widget layout resolution callback. Populates a given
[LayoutContext](layoutcontext.md) with the wanted basis and flex ratio. Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[handlePopulateLayout](column.md#handlepopulatelayout)

#### Defined in

[widgets/MultiContainer.ts:108](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/MultiContainer.ts#L108)

___

### handlePostLayoutUpdate

▸ `Protected` **handlePostLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Does
nothing by default. Should be implemented.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[handlePostLayoutUpdate](column.md#handlepostlayoutupdate)

#### Defined in

[widgets/MultiContainer.ts:92](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/MultiContainer.ts#L92)

___

### handlePreLayoutUpdate

▸ `Protected` **handlePreLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Does
nothing by default. Should be implemented.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[handlePreLayoutUpdate](column.md#handleprelayoutupdate)

#### Defined in

[widgets/MultiContainer.ts:76](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/MultiContainer.ts#L76)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](virtualkeyboard.md#resolvedwidth) and [resolvedHeight](virtualkeyboard.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[handleResolveLayout](column.md#handleresolvelayout)

#### Defined in

[widgets/MultiContainer.ts:145](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/MultiContainer.ts#L145)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](virtualkeyboard.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](virtualkeyboard.md#_layoutdirty) and [_dirty](virtualkeyboard.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[inheritTheme](column.md#inherittheme)

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L158)

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

[Column](column.md).[onFocusDropped](column.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](virtualkeyboard.md#needsclear) is true, calls the [handlePainting](virtualkeyboard.md#handlepainting) method and
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

[Column](column.md).[paint](column.md#paint)

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](virtualkeyboard.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[populateLayout](column.md#populatelayout)

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](virtualkeyboard.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[postLayoutUpdate](column.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](virtualkeyboard.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[preLayoutUpdate](column.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L269)

___

### remove

▸ **remove**(`children`): [`VirtualKeyboard`](virtualkeyboard.md)

Remove child(ren) from this widget.

[_layoutDirty](virtualkeyboard.md#_layoutdirty) and [_dirty](virtualkeyboard.md#_dirty) are set to true and
[updateInheritedTheme](virtualkeyboard.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is removed from [_children](virtualkeyboard.md#_children). If this is an array of widgets, then each widget is removed from [_children](virtualkeyboard.md#_children). |

#### Returns

[`VirtualKeyboard`](virtualkeyboard.md)

Returns this so that the method is chainable.

#### Inherited from

[Column](column.md).[remove](column.md#remove)

#### Defined in

[mixins/MultiParent.ts:46](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/mixins/MultiParent.ts#L46)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](virtualkeyboard.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](virtualkeyboard.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](virtualkeyboard.md#_dirty) is set to true.
[_layoutDirty](virtualkeyboard.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[resolveLayout](column.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](virtualkeyboard.md#_layoutdirty) and
[_dirty](virtualkeyboard.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Column](column.md).[setThemeOverride](column.md#setthemeoverride)

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/widgets/Widget.ts#L116)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

[Column](column.md).[updateInheritedTheme](column.md#updateinheritedtheme)

#### Defined in

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/mixins/Parent.ts#L41)
