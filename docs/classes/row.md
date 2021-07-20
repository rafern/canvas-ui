[canvas-ui](../README.md) / Row

# Class: Row

A horizontal [MultiContainer](multicontainer.md).

## Hierarchy

- [`MultiContainer`](multicontainer.md)

  ↳ **`Row`**

  ↳↳ [`KeyRow`](keyrow.md)

  ↳↳ [`LabelledCheckbox`](labelledcheckbox.md)

## Table of contents

### Constructors

- [constructor](row.md#constructor)

### Properties

- [\_children](row.md#_children)
- [\_dirty](row.md#_dirty)
- [\_layoutDirty](row.md#_layoutdirty)
- [needsClear](row.md#needsclear)
- [propagatesEvents](row.md#propagatesevents)
- [resolvedHeight](row.md#resolvedheight)
- [resolvedWidth](row.md#resolvedwidth)

### Accessors

- [childCount](row.md#childcount)
- [children](row.md#children)
- [dimensions](row.md#dimensions)
- [dirty](row.md#dirty)
- [enabled](row.md#enabled)
- [inheritedTheme](row.md#inheritedtheme)
- [layoutDirty](row.md#layoutdirty)
- [theme](row.md#theme)
- [themeOverride](row.md#themeoverride)

### Methods

- [add](row.md#add)
- [clear](row.md#clear)
- [clearChildren](row.md#clearchildren)
- [dispatchEvent](row.md#dispatchevent)
- [forceLayoutDirty](row.md#forcelayoutdirty)
- [handleEvent](row.md#handleevent)
- [handlePainting](row.md#handlepainting)
- [handlePopulateLayout](row.md#handlepopulatelayout)
- [handlePostLayoutUpdate](row.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](row.md#handleprelayoutupdate)
- [handleResolveLayout](row.md#handleresolvelayout)
- [inheritTheme](row.md#inherittheme)
- [onFocusDropped](row.md#onfocusdropped)
- [paint](row.md#paint)
- [populateLayout](row.md#populatelayout)
- [postLayoutUpdate](row.md#postlayoutupdate)
- [preLayoutUpdate](row.md#prelayoutupdate)
- [remove](row.md#remove)
- [resolveLayout](row.md#resolvelayout)
- [setThemeOverride](row.md#setthemeoverride)
- [updateInheritedTheme](row.md#updateinheritedtheme)

## Constructors

### constructor

• **new Row**(`themeOverride?`)

Create a new Row.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[MultiContainer](multicontainer.md).[constructor](multicontainer.md#constructor)

#### Defined in

[widgets/Row.ts:9](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Row.ts#L9)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](row.md#children) for the public iterator getter.

#### Inherited from

[MultiContainer](multicontainer.md).[_children](multicontainer.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[MultiContainer](multicontainer.md).[_dirty](multicontainer.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[MultiContainer](multicontainer.md).[_layoutDirty](multicontainer.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[MultiContainer](multicontainer.md).[needsClear](multicontainer.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[MultiContainer](multicontainer.md).[propagatesEvents](multicontainer.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[MultiContainer](multicontainer.md).[resolvedHeight](multicontainer.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[MultiContainer](multicontainer.md).[resolvedWidth](multicontainer.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L49)

## Accessors

### childCount

• `get` **childCount**(): `number`

Get amount of children of this parent widget.

#### Returns

`number`

#### Defined in

[mixins/Parent.ts:60](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L60)

___

### children

• `get` **children**(): `Iterable`<[`Widget`](widget.md)\>

Get iterator for children of this parent widget. Cannot modify list of
children via this iterator; for read-only purposes only.

#### Returns

`Iterable`<[`Widget`](widget.md)\>

#### Defined in

[mixins/Parent.ts:68](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L68)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](row.md#resolvedwidth) and [resolvedHeight](row.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](row.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](row.md#_layoutdirty) is set to true
and [_dirty](row.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](row.md#_layoutdirty) is set to true
and [_dirty](row.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L96)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](row.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](row.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L180)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](row.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L202)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](row.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](row.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L140)

## Methods

### add

▸ **add**(`children`): [`Row`](row.md)

Add child(ren) to this widget.

[_layoutDirty](row.md#_layoutdirty) and [_dirty](row.md#_dirty) are set to true and
[updateInheritedTheme](row.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is pushed to [_children](row.md#_children). If this is an array of widgets, then each widget is pushed to [_children](row.md#_children). |

#### Returns

[`Row`](row.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiContainer](multicontainer.md).[add](multicontainer.md#add)

#### Defined in

[mixins/MultiParent.ts:21](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/MultiParent.ts#L21)

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

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L365)

___

### clearChildren

▸ **clearChildren**(): [`Row`](row.md)

Remove all children from this widget.

[_layoutDirty](row.md#_layoutdirty) and [_dirty](row.md#_dirty) are set to true.

#### Returns

[`Row`](row.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiContainer](multicontainer.md).[clearChildren](multicontainer.md#clearchildren)

#### Defined in

[mixins/MultiParent.ts:74](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/MultiParent.ts#L74)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](row.md#handleevent) method is called and its result is
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

[MultiContainer](multicontainer.md).[dispatchEvent](multicontainer.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](row.md#_layoutdirty) and [_dirty](row.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[forceLayoutDirty](multicontainer.md#forcelayoutdirty)

#### Defined in

[widgets/MultiContainer.ts:103](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/MultiContainer.ts#L103)

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

[widgets/MultiContainer.ts:36](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/MultiContainer.ts#L36)

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

[widgets/MultiContainer.ts:233](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/MultiContainer.ts#L233)

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

[widgets/MultiContainer.ts:108](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/MultiContainer.ts#L108)

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

[widgets/MultiContainer.ts:92](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/MultiContainer.ts#L92)

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

[widgets/MultiContainer.ts:76](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/MultiContainer.ts#L76)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](row.md#resolvedwidth) and [resolvedHeight](row.md#resolvedheight)).Must be
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

[widgets/MultiContainer.ts:145](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/MultiContainer.ts#L145)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](row.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](row.md#_layoutdirty) and [_dirty](row.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[inheritTheme](multicontainer.md#inherittheme)

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L158)

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

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](row.md#needsclear) is true, calls the [handlePainting](row.md#handlepainting) method and
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

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](row.md#handlepopulatelayout). Does nothing if
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

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](row.md#handlepostlayoutupdate) if widget is enabled. Must not be
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

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](row.md#handleprelayoutupdate) if widget is enabled. Must not be
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

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L269)

___

### remove

▸ **remove**(`children`): [`Row`](row.md)

Remove child(ren) from this widget.

[_layoutDirty](row.md#_layoutdirty) and [_dirty](row.md#_dirty) are set to true and
[updateInheritedTheme](row.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is removed from [_children](row.md#_children). If this is an array of widgets, then each widget is removed from [_children](row.md#_children). |

#### Returns

[`Row`](row.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiContainer](multicontainer.md).[remove](multicontainer.md#remove)

#### Defined in

[mixins/MultiParent.ts:46](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/MultiParent.ts#L46)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](row.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](row.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](row.md#_dirty) is set to true.
[_layoutDirty](row.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[resolveLayout](multicontainer.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](row.md#_layoutdirty) and
[_dirty](row.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[MultiContainer](multicontainer.md).[setThemeOverride](multicontainer.md#setthemeoverride)

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L116)

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

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L41)
