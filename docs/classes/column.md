[canvas-ui](../README.md) / Column

# Class: Column

A vertical [MultiContainer](multicontainer.md).

## Hierarchy

- [`MultiContainer`](multicontainer.md)

  ↳ **`Column`**

  ↳↳ [`VirtualKeyboard`](virtualkeyboard.md)

## Table of contents

### Constructors

- [constructor](column.md#constructor)

### Properties

- [\_children](column.md#_children)
- [\_dirty](column.md#_dirty)
- [\_layoutDirty](column.md#_layoutdirty)
- [needsClear](column.md#needsclear)
- [propagatesEvents](column.md#propagatesevents)
- [resolvedHeight](column.md#resolvedheight)
- [resolvedWidth](column.md#resolvedwidth)

### Accessors

- [childCount](column.md#childcount)
- [children](column.md#children)
- [dimensions](column.md#dimensions)
- [dirty](column.md#dirty)
- [enabled](column.md#enabled)
- [inheritedTheme](column.md#inheritedtheme)
- [layoutDirty](column.md#layoutdirty)
- [theme](column.md#theme)
- [themeOverride](column.md#themeoverride)

### Methods

- [add](column.md#add)
- [clear](column.md#clear)
- [clearChildren](column.md#clearchildren)
- [dispatchEvent](column.md#dispatchevent)
- [forceLayoutDirty](column.md#forcelayoutdirty)
- [handleEvent](column.md#handleevent)
- [handlePainting](column.md#handlepainting)
- [handlePopulateLayout](column.md#handlepopulatelayout)
- [handlePostLayoutUpdate](column.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](column.md#handleprelayoutupdate)
- [handleResolveLayout](column.md#handleresolvelayout)
- [inheritTheme](column.md#inherittheme)
- [onFocusDropped](column.md#onfocusdropped)
- [paint](column.md#paint)
- [populateLayout](column.md#populatelayout)
- [postLayoutUpdate](column.md#postlayoutupdate)
- [preLayoutUpdate](column.md#prelayoutupdate)
- [remove](column.md#remove)
- [resolveLayout](column.md#resolvelayout)
- [setThemeOverride](column.md#setthemeoverride)
- [updateInheritedTheme](column.md#updateinheritedtheme)

## Constructors

### constructor

• **new Column**(`themeOverride?`)

Create a new Column.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[MultiContainer](multicontainer.md).[constructor](multicontainer.md#constructor)

#### Defined in

[widgets/Column.ts:9](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Column.ts#L9)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](column.md#children) for the public iterator getter.

#### Inherited from

[MultiContainer](multicontainer.md).[_children](multicontainer.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[MultiContainer](multicontainer.md).[_dirty](multicontainer.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[MultiContainer](multicontainer.md).[_layoutDirty](multicontainer.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[MultiContainer](multicontainer.md).[needsClear](multicontainer.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[MultiContainer](multicontainer.md).[propagatesEvents](multicontainer.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[MultiContainer](multicontainer.md).[resolvedHeight](multicontainer.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[MultiContainer](multicontainer.md).[resolvedWidth](multicontainer.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L49)

## Accessors

### childCount

• `get` **childCount**(): `number`

Get amount of children of this parent widget.

#### Returns

`number`

#### Defined in

[mixins/Parent.ts:60](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Parent.ts#L60)

___

### children

• `get` **children**(): `Iterable`<[`Widget`](widget.md)\>

Get iterator for children of this parent widget. Cannot modify list of
children via this iterator; for read-only purposes only.

#### Returns

`Iterable`<[`Widget`](widget.md)\>

#### Defined in

[mixins/Parent.ts:68](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Parent.ts#L68)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](column.md#resolvedwidth) and [resolvedHeight](column.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](column.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](column.md#_layoutdirty) is set to true
and [_dirty](column.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](column.md#_layoutdirty) is set to true
and [_dirty](column.md#_dirty) is set to true if enabled or false if not enabled.

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

If setting, calls [inheritTheme](column.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](column.md#inherittheme).

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

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](column.md#_layoutdirty).

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

If setting, calls [setThemeOverride](column.md#setthemeoverride).

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

If setting, calls [setThemeOverride](column.md#setthemeoverride).

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

### add

▸ **add**(`children`): [`Column`](column.md)

Add child(ren) to this widget.

[_layoutDirty](column.md#_layoutdirty) and [_dirty](column.md#_dirty) are set to true and
[updateInheritedTheme](column.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is pushed to [_children](column.md#_children). If this is an array of widgets, then each widget is pushed to [_children](column.md#_children). |

#### Returns

[`Column`](column.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiContainer](multicontainer.md).[add](multicontainer.md#add)

#### Defined in

[mixins/MultiParent.ts:24](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/MultiParent.ts#L24)

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

[MultiContainer](multicontainer.md).[clear](multicontainer.md#clear)

#### Defined in

[widgets/Widget.ts:366](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L366)

___

### clearChildren

▸ **clearChildren**(): [`Column`](column.md)

Remove all children from this widget.

[_layoutDirty](column.md#_layoutdirty) and [_dirty](column.md#_dirty) are set to true.

#### Returns

[`Column`](column.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiContainer](multicontainer.md).[clearChildren](multicontainer.md#clearchildren)

#### Defined in

[mixins/MultiParent.ts:80](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/MultiParent.ts#L80)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](column.md#handleevent) method is called and its result is
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

[MultiContainer](multicontainer.md).[dispatchEvent](multicontainer.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:242](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L242)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](column.md#_layoutdirty) and [_dirty](column.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[forceLayoutDirty](multicontainer.md#forcelayoutdirty)

#### Defined in

[widgets/MultiContainer.ts:103](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L103)

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

[MultiContainer](multicontainer.md).[handleEvent](multicontainer.md#handleevent)

#### Defined in

[widgets/MultiContainer.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L36)

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

[MultiContainer](multicontainer.md).[handlePainting](multicontainer.md#handlepainting)

#### Defined in

[widgets/MultiContainer.ts:233](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L233)

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

[MultiContainer](multicontainer.md).[handlePopulateLayout](multicontainer.md#handlepopulatelayout)

#### Defined in

[widgets/MultiContainer.ts:108](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L108)

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

[MultiContainer](multicontainer.md).[handlePostLayoutUpdate](multicontainer.md#handlepostlayoutupdate)

#### Defined in

[widgets/MultiContainer.ts:92](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L92)

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

[MultiContainer](multicontainer.md).[handlePreLayoutUpdate](multicontainer.md#handleprelayoutupdate)

#### Defined in

[widgets/MultiContainer.ts:76](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L76)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](column.md#resolvedwidth) and [resolvedHeight](column.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[handleResolveLayout](multicontainer.md#handleresolvelayout)

#### Defined in

[widgets/MultiContainer.ts:145](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L145)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](column.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](column.md#_layoutdirty) and [_dirty](column.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[inheritTheme](multicontainer.md#inherittheme)

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

[MultiContainer](multicontainer.md).[onFocusDropped](multicontainer.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](column.md#needsclear) is true, calls the [handlePainting](column.md#handlepainting) method and
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

[MultiContainer](multicontainer.md).[paint](multicontainer.md#paint)

#### Defined in

[widgets/Widget.ts:392](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L392)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](column.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[populateLayout](multicontainer.md#populatelayout)

#### Defined in

[widgets/Widget.ts:297](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L297)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](column.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[postLayoutUpdate](multicontainer.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:356](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L356)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](column.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[preLayoutUpdate](multicontainer.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:270](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L270)

___

### remove

▸ **remove**(`children`): [`Column`](column.md)

Remove child(ren) from this widget.

[_layoutDirty](column.md#_layoutdirty) and [_dirty](column.md#_dirty) are set to true and
[updateInheritedTheme](column.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is removed from [_children](column.md#_children). If this is an array of widgets, then each widget is removed from [_children](column.md#_children). |

#### Returns

[`Column`](column.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiContainer](multicontainer.md).[remove](multicontainer.md#remove)

#### Defined in

[mixins/MultiParent.ts:52](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/MultiParent.ts#L52)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](column.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](column.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](column.md#_dirty) is set to true.
[_layoutDirty](column.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[resolveLayout](multicontainer.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:310](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L310)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](column.md#_layoutdirty) and
[_dirty](column.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[setThemeOverride](multicontainer.md#setthemeoverride)

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

[MultiContainer](multicontainer.md).[updateInheritedTheme](multicontainer.md#updateinheritedtheme)

#### Defined in

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Parent.ts#L41)