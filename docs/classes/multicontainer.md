[canvas-ui](../README.md) / MultiContainer

# Class: MultiContainer

A [MultiParent](multiparent.md) which automatically paints children, adds spacing,
propagates events and handles layout.

Note that there is no padding. Put this inside a [Margin](margin.md) if padding is
needed.

## Hierarchy

- [`MultiParent`](multiparent.md)

  ↳ **`MultiContainer`**

  ↳↳ [`Column`](column.md)

  ↳↳ [`Row`](row.md)

## Table of contents

### Constructors

- [constructor](multicontainer.md#constructor)

### Properties

- [\_children](multicontainer.md#_children)
- [\_dirty](multicontainer.md#_dirty)
- [\_layoutDirty](multicontainer.md#_layoutdirty)
- [backgroundDirty](multicontainer.md#backgrounddirty)
- [innerContext](multicontainer.md#innercontext)
- [needsClear](multicontainer.md#needsclear)
- [propagatesEvents](multicontainer.md#propagatesevents)
- [resolvedHeight](multicontainer.md#resolvedheight)
- [resolvedWidth](multicontainer.md#resolvedwidth)
- [vertical](multicontainer.md#vertical)

### Accessors

- [childCount](multicontainer.md#childcount)
- [children](multicontainer.md#children)
- [dimensions](multicontainer.md#dimensions)
- [dirty](multicontainer.md#dirty)
- [enabled](multicontainer.md#enabled)
- [inheritedTheme](multicontainer.md#inheritedtheme)
- [layoutDirty](multicontainer.md#layoutdirty)
- [theme](multicontainer.md#theme)
- [themeOverride](multicontainer.md#themeoverride)

### Methods

- [add](multicontainer.md#add)
- [clear](multicontainer.md#clear)
- [clearChildren](multicontainer.md#clearchildren)
- [dispatchEvent](multicontainer.md#dispatchevent)
- [forceLayoutDirty](multicontainer.md#forcelayoutdirty)
- [handleEvent](multicontainer.md#handleevent)
- [handlePainting](multicontainer.md#handlepainting)
- [handlePopulateLayout](multicontainer.md#handlepopulatelayout)
- [handlePostLayoutUpdate](multicontainer.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](multicontainer.md#handleprelayoutupdate)
- [handleResolveLayout](multicontainer.md#handleresolvelayout)
- [inheritTheme](multicontainer.md#inherittheme)
- [onFocusDropped](multicontainer.md#onfocusdropped)
- [paint](multicontainer.md#paint)
- [populateLayout](multicontainer.md#populatelayout)
- [postLayoutUpdate](multicontainer.md#postlayoutupdate)
- [preLayoutUpdate](multicontainer.md#prelayoutupdate)
- [remove](multicontainer.md#remove)
- [resolveLayout](multicontainer.md#resolvelayout)
- [setThemeOverride](multicontainer.md#setthemeoverride)
- [updateInheritedTheme](multicontainer.md#updateinheritedtheme)

## Constructors

### constructor

• **new MultiContainer**(`vertical`, `themeOverride?`)

Create a MultiContainer.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `vertical` | `boolean` | `undefined` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[MultiParent](multiparent.md).[constructor](multiparent.md#constructor)

#### Defined in

[widgets/MultiContainer.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L25)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](multicontainer.md#children) for the public iterator getter.

#### Inherited from

[MultiParent](multiparent.md).[_children](multiparent.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[MultiParent](multiparent.md).[_dirty](multiparent.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[MultiParent](multiparent.md).[_layoutDirty](multiparent.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L25)

___

### backgroundDirty

• `Private` **backgroundDirty**: `boolean` = `true`

Is the container's whole background dirty (including spacing)?

#### Defined in

[widgets/MultiContainer.ts:21](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L21)

___

### innerContext

• `Private` **innerContext**: ``null`` \| [`LayoutContext`](layoutcontext.md) = `null`

Temporary layout context for layout resolution.

#### Defined in

[widgets/MultiContainer.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[MultiParent](multiparent.md).[needsClear](multiparent.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[MultiParent](multiparent.md).[propagatesEvents](multiparent.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[MultiParent](multiparent.md).[resolvedHeight](multiparent.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[MultiParent](multiparent.md).[resolvedWidth](multiparent.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L49)

___

### vertical

• `Private` **vertical**: `boolean`

Is this container vertical?

#### Defined in

[widgets/MultiContainer.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L23)

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
[resolvedWidth](multicontainer.md#resolvedwidth) and [resolvedHeight](multicontainer.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](multicontainer.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](multicontainer.md#_layoutdirty) is set to true
and [_dirty](multicontainer.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](multicontainer.md#_layoutdirty) is set to true
and [_dirty](multicontainer.md#_dirty) is set to true if enabled or false if not enabled.

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

If setting, calls [inheritTheme](multicontainer.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](multicontainer.md#inherittheme).

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

Check if the widget's layout is dirty. Returns [_layoutDirty](multicontainer.md#_layoutdirty).

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

If setting, calls [setThemeOverride](multicontainer.md#setthemeoverride).

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

If setting, calls [setThemeOverride](multicontainer.md#setthemeoverride).

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

▸ **add**(`children`): [`MultiContainer`](multicontainer.md)

Add child(ren) to this widget.

[_layoutDirty](multicontainer.md#_layoutdirty) and [_dirty](multicontainer.md#_dirty) are set to true and
[updateInheritedTheme](multicontainer.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is pushed to [_children](multicontainer.md#_children). If this is an array of widgets, then each widget is pushed to [_children](multicontainer.md#_children). |

#### Returns

[`MultiContainer`](multicontainer.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiParent](multiparent.md).[add](multiparent.md#add)

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

[MultiParent](multiparent.md).[clear](multiparent.md#clear)

#### Defined in

[widgets/Widget.ts:366](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L366)

___

### clearChildren

▸ **clearChildren**(): [`MultiContainer`](multicontainer.md)

Remove all children from this widget.

[_layoutDirty](multicontainer.md#_layoutdirty) and [_dirty](multicontainer.md#_dirty) are set to true.

#### Returns

[`MultiContainer`](multicontainer.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiParent](multiparent.md).[clearChildren](multiparent.md#clearchildren)

#### Defined in

[mixins/MultiParent.ts:80](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/MultiParent.ts#L80)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](multicontainer.md#handleevent) method is called and its result is
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

[MultiParent](multiparent.md).[dispatchEvent](multiparent.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:242](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L242)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](multicontainer.md#_layoutdirty) and [_dirty](multicontainer.md#_dirty) to true.

#### Returns

`void`

#### Overrides

[MultiParent](multiparent.md).[forceLayoutDirty](multiparent.md#forcelayoutdirty)

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

#### Overrides

[MultiParent](multiparent.md).[handleEvent](multiparent.md#handleevent)

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

#### Overrides

[MultiParent](multiparent.md).[handlePainting](multiparent.md#handlepainting)

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

#### Overrides

[MultiParent](multiparent.md).[handlePopulateLayout](multiparent.md#handlepopulatelayout)

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

#### Overrides

[MultiParent](multiparent.md).[handlePostLayoutUpdate](multiparent.md#handlepostlayoutupdate)

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

#### Overrides

[MultiParent](multiparent.md).[handlePreLayoutUpdate](multiparent.md#handleprelayoutupdate)

#### Defined in

[widgets/MultiContainer.ts:76](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L76)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](multicontainer.md#resolvedwidth) and [resolvedHeight](multicontainer.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Overrides

[MultiParent](multiparent.md).[handleResolveLayout](multiparent.md#handleresolvelayout)

#### Defined in

[widgets/MultiContainer.ts:145](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/MultiContainer.ts#L145)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](multicontainer.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](multicontainer.md#_layoutdirty) and [_dirty](multicontainer.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[MultiParent](multiparent.md).[inheritTheme](multiparent.md#inherittheme)

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

[MultiParent](multiparent.md).[onFocusDropped](multiparent.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](multicontainer.md#needsclear) is true, calls the [handlePainting](multicontainer.md#handlepainting) method and
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

[MultiParent](multiparent.md).[paint](multiparent.md#paint)

#### Defined in

[widgets/Widget.ts:392](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L392)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](multicontainer.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[MultiParent](multiparent.md).[populateLayout](multiparent.md#populatelayout)

#### Defined in

[widgets/Widget.ts:297](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L297)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](multicontainer.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[MultiParent](multiparent.md).[postLayoutUpdate](multiparent.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:356](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L356)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](multicontainer.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[MultiParent](multiparent.md).[preLayoutUpdate](multiparent.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:270](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L270)

___

### remove

▸ **remove**(`children`): [`MultiContainer`](multicontainer.md)

Remove child(ren) from this widget.

[_layoutDirty](multicontainer.md#_layoutdirty) and [_dirty](multicontainer.md#_dirty) are set to true and
[updateInheritedTheme](multicontainer.md#updateinheritedtheme) is called so that new children inherit this
widget's theme.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `children` | [`Widget`](widget.md) \| [`Widget`](widget.md)[] | If this is a widget, then it is removed from [_children](multicontainer.md#_children). If this is an array of widgets, then each widget is removed from [_children](multicontainer.md#_children). |

#### Returns

[`MultiContainer`](multicontainer.md)

Returns this so that the method is chainable.

#### Inherited from

[MultiParent](multiparent.md).[remove](multiparent.md#remove)

#### Defined in

[mixins/MultiParent.ts:52](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/MultiParent.ts#L52)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](multicontainer.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](multicontainer.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](multicontainer.md#_dirty) is set to true.
[_layoutDirty](multicontainer.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[MultiParent](multiparent.md).[resolveLayout](multiparent.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:310](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L310)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](multicontainer.md#_layoutdirty) and
[_dirty](multicontainer.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[MultiParent](multiparent.md).[setThemeOverride](multiparent.md#setthemeoverride)

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

[MultiParent](multiparent.md).[updateInheritedTheme](multiparent.md#updateinheritedtheme)

#### Defined in

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Parent.ts#L41)
