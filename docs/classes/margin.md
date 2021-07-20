[canvas-ui](../README.md) / Margin

# Class: Margin

A [Container](container.md) with center alignment on both axes and default padding,
similar to [Center](../enums/alignment.md#center).

Alignment settings are applied via theme overrides, so no theme override can
be passed to this widget. If you want to override additional theme properties
other than the one overridden here, then use [Container](container.md) instead.

## Hierarchy

- [`Container`](container.md)

  ↳ **`Margin`**

## Table of contents

### Constructors

- [constructor](margin.md#constructor)

### Properties

- [\_backgroundDirty](margin.md#_backgrounddirty)
- [\_children](margin.md#_children)
- [\_dirty](margin.md#_dirty)
- [\_layoutDirty](margin.md#_layoutdirty)
- [needsClear](margin.md#needsclear)
- [propagatesEvents](margin.md#propagatesevents)
- [resolvedHeight](margin.md#resolvedheight)
- [resolvedWidth](margin.md#resolvedwidth)

### Accessors

- [child](margin.md#child)
- [childCount](margin.md#childcount)
- [children](margin.md#children)
- [dimensions](margin.md#dimensions)
- [dirty](margin.md#dirty)
- [enabled](margin.md#enabled)
- [inheritedTheme](margin.md#inheritedtheme)
- [layoutDirty](margin.md#layoutdirty)
- [theme](margin.md#theme)
- [themeOverride](margin.md#themeoverride)

### Methods

- [clear](margin.md#clear)
- [dispatchEvent](margin.md#dispatchevent)
- [forceLayoutDirty](margin.md#forcelayoutdirty)
- [handleEvent](margin.md#handleevent)
- [handlePainting](margin.md#handlepainting)
- [handlePopulateLayout](margin.md#handlepopulatelayout)
- [handlePostLayoutUpdate](margin.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](margin.md#handleprelayoutupdate)
- [handleResolveLayout](margin.md#handleresolvelayout)
- [inheritTheme](margin.md#inherittheme)
- [onFocusDropped](margin.md#onfocusdropped)
- [paint](margin.md#paint)
- [populateLayout](margin.md#populatelayout)
- [postLayoutUpdate](margin.md#postlayoutupdate)
- [preLayoutUpdate](margin.md#prelayoutupdate)
- [resolveLayout](margin.md#resolvelayout)
- [setThemeOverride](margin.md#setthemeoverride)
- [updateInheritedTheme](margin.md#updateinheritedtheme)

## Constructors

### constructor

• **new Margin**(`child`)

Create a new Margin.

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`Widget`](widget.md) |

#### Overrides

[Container](container.md).[constructor](container.md#constructor)

#### Defined in

[widgets/Margin.ts:18](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Margin.ts#L18)

## Properties

### \_backgroundDirty

• `Protected` **\_backgroundDirty**: `boolean` = `true`

Is the container's whole background dirty (including padding)?

#### Inherited from

[Container](container.md).[_backgroundDirty](container.md#_backgrounddirty)

#### Defined in

[widgets/BaseContainer.ts:19](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L19)

___

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](margin.md#children) for the public iterator getter.

#### Inherited from

[Container](container.md).[_children](container.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[Container](container.md).[_dirty](container.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[Container](container.md).[_layoutDirty](container.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[Container](container.md).[needsClear](container.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[Container](container.md).[propagatesEvents](container.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[Container](container.md).[resolvedHeight](container.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[Container](container.md).[resolvedWidth](container.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L49)

## Accessors

### child

• `get` **child**(): [`Widget`](widget.md)

This widget's child.

#### Returns

[`Widget`](widget.md)

#### Defined in

[mixins/SingleParent.ts:22](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/SingleParent.ts#L22)

___

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
[resolvedWidth](margin.md#resolvedwidth) and [resolvedHeight](margin.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](margin.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](margin.md#_layoutdirty) is set to true
and [_dirty](margin.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](margin.md#_layoutdirty) is set to true
and [_dirty](margin.md#_dirty) is set to true if enabled or false if not enabled.

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

If setting, calls [inheritTheme](margin.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](margin.md#inherittheme).

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

Check if the widget's layout is dirty. Returns [_layoutDirty](margin.md#_layoutdirty).

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

If setting, calls [setThemeOverride](margin.md#setthemeoverride).

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

If setting, calls [setThemeOverride](margin.md#setthemeoverride).

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

[Container](container.md).[clear](container.md#clear)

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](margin.md#handleevent) method is called and its result is
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

[Container](container.md).[dispatchEvent](container.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](margin.md#_layoutdirty) and [_dirty](margin.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[Container](container.md).[forceLayoutDirty](container.md#forcelayoutdirty)

#### Defined in

[widgets/BaseContainer.ts:58](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L58)

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

[Container](container.md).[handleEvent](container.md#handleevent)

#### Defined in

[widgets/BaseContainer.ts:28](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L28)

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

[Container](container.md).[handlePainting](container.md#handlepainting)

#### Defined in

[widgets/BaseContainer.ts:142](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L142)

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

[Container](container.md).[handlePopulateLayout](container.md#handlepopulatelayout)

#### Defined in

[widgets/BaseContainer.ts:63](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L63)

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

[Container](container.md).[handlePostLayoutUpdate](container.md#handlepostlayoutupdate)

#### Defined in

[widgets/BaseContainer.ts:48](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L48)

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

[Container](container.md).[handlePreLayoutUpdate](container.md#handleprelayoutupdate)

#### Defined in

[widgets/BaseContainer.ts:38](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L38)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](margin.md#resolvedwidth) and [resolvedHeight](margin.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Container](container.md).[handleResolveLayout](container.md#handleresolvelayout)

#### Defined in

[widgets/BaseContainer.ts:99](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/BaseContainer.ts#L99)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](margin.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](margin.md#_layoutdirty) and [_dirty](margin.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Container](container.md).[inheritTheme](container.md#inherittheme)

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

[Container](container.md).[onFocusDropped](container.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](margin.md#needsclear) is true, calls the [handlePainting](margin.md#handlepainting) method and
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

[Container](container.md).[paint](container.md#paint)

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](margin.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Container](container.md).[populateLayout](container.md#populatelayout)

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](margin.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Container](container.md).[postLayoutUpdate](container.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](margin.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Container](container.md).[preLayoutUpdate](container.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](margin.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](margin.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](margin.md#_dirty) is set to true.
[_layoutDirty](margin.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Container](container.md).[resolveLayout](container.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](margin.md#_layoutdirty) and
[_dirty](margin.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Container](container.md).[setThemeOverride](container.md#setthemeoverride)

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

[Container](container.md).[updateInheritedTheme](container.md#updateinheritedtheme)

#### Defined in

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L41)
