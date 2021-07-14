[canvas-ui](../README.md) / EnterKey

# Class: EnterKey

A [BasicKey](basickey.md) which emits 'Enter' key presses.

## Hierarchy

- [`BasicKey`](basickey.md)

  ↳ **`EnterKey`**

## Table of contents

### Constructors

- [constructor](enterkey.md#constructor)

### Properties

- [\_backgroundDirty](enterkey.md#_backgrounddirty)
- [\_children](enterkey.md#_children)
- [\_dirty](enterkey.md#_dirty)
- [\_layoutDirty](enterkey.md#_layoutdirty)
- [callback](enterkey.md#callback)
- [clickState](enterkey.md#clickstate)
- [clickStateChanged](enterkey.md#clickstatechanged)
- [lastClickState](enterkey.md#lastclickstate)
- [needsClear](enterkey.md#needsclear)
- [pointerPos](enterkey.md#pointerpos)
- [propagatesEvents](enterkey.md#propagatesevents)
- [resolvedHeight](enterkey.md#resolvedheight)
- [resolvedWidth](enterkey.md#resolvedwidth)
- [startingPointerPos](enterkey.md#startingpointerpos)
- [wasClick](enterkey.md#wasclick)

### Accessors

- [child](enterkey.md#child)
- [childCount](enterkey.md#childcount)
- [children](enterkey.md#children)
- [dimensions](enterkey.md#dimensions)
- [dirty](enterkey.md#dirty)
- [enabled](enterkey.md#enabled)
- [forced](enterkey.md#forced)
- [inheritedTheme](enterkey.md#inheritedtheme)
- [layoutDirty](enterkey.md#layoutdirty)
- [theme](enterkey.md#theme)
- [themeOverride](enterkey.md#themeoverride)

### Methods

- [clear](enterkey.md#clear)
- [dispatchEvent](enterkey.md#dispatchevent)
- [forceLayoutDirty](enterkey.md#forcelayoutdirty)
- [getNormalInRect](enterkey.md#getnormalinrect)
- [handleClickEvent](enterkey.md#handleclickevent)
- [handleEvent](enterkey.md#handleevent)
- [handlePainting](enterkey.md#handlepainting)
- [handlePopulateLayout](enterkey.md#handlepopulatelayout)
- [handlePostLayoutUpdate](enterkey.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](enterkey.md#handleprelayoutupdate)
- [handleResolveLayout](enterkey.md#handleresolvelayout)
- [inheritTheme](enterkey.md#inherittheme)
- [isNormalInRect](enterkey.md#isnormalinrect)
- [isPointInRect](enterkey.md#ispointinrect)
- [onFocusDropped](enterkey.md#onfocusdropped)
- [paint](enterkey.md#paint)
- [populateLayout](enterkey.md#populatelayout)
- [postLayoutUpdate](enterkey.md#postlayoutupdate)
- [preLayoutUpdate](enterkey.md#prelayoutupdate)
- [resolveLayout](enterkey.md#resolvelayout)
- [setThemeOverride](enterkey.md#setthemeoverride)
- [updateInheritedTheme](enterkey.md#updateinheritedtheme)

## Constructors

### constructor

• **new EnterKey**(`keyContext`, `themeOverride?`)

Create a new EnterKey.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `keyContext` | [`KeyContext`](../interfaces/keycontext.md) | `undefined` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[BasicKey](basickey.md).[constructor](basickey.md#constructor)

#### Defined in

[widgets/VirtualKeyboard/EnterKey.ts:10](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/VirtualKeyboard/EnterKey.ts#L10)

## Properties

### \_backgroundDirty

• `Protected` **\_backgroundDirty**: `boolean` = `true`

Is the container's whole background dirty (including padding)?

#### Inherited from

[BasicKey](basickey.md).[_backgroundDirty](basickey.md#_backgrounddirty)

#### Defined in

[widgets/BaseContainer.ts:19](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/BaseContainer.ts#L19)

___

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](enterkey.md#children) for the public iterator getter.

#### Inherited from

[BasicKey](basickey.md).[_children](basickey.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[BasicKey](basickey.md).[_dirty](basickey.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[BasicKey](basickey.md).[_layoutDirty](basickey.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L25)

___

### callback

• **callback**: ``null`` \| [`ButtonCallback`](../README.md#buttoncallback)

The callback for clicking this button. If null, the button is not
clickable but will still absorb events.

#### Inherited from

[BasicKey](basickey.md).[callback](basickey.md#callback)

#### Defined in

[widgets/Button.ts:31](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Button.ts#L31)

___

### clickState

• `Protected` **clickState**: [`ClickState`](../enums/clickstate.md)

The current click state

#### Inherited from

[BasicKey](basickey.md).[clickState](basickey.md#clickstate)

#### Defined in

[mixins/Clickable.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L36)

___

### clickStateChanged

• `Protected` **clickStateChanged**: `boolean` = `false`

Did the last click event handle result in a click state change?

#### Inherited from

[BasicKey](basickey.md).[clickStateChanged](basickey.md#clickstatechanged)

#### Defined in

[mixins/Clickable.ts:38](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L38)

___

### lastClickState

• `Protected` **lastClickState**: [`ClickState`](../enums/clickstate.md)

Last click state

#### Inherited from

[BasicKey](basickey.md).[lastClickState](basickey.md#lastclickstate)

#### Defined in

[mixins/Clickable.ts:34](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L34)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[BasicKey](basickey.md).[needsClear](basickey.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L31)

___

### pointerPos

• `Protected` **pointerPos**: ``null`` \| [`number`, `number`] = `null`

Last pointer position in normalised coordinates ([0,0] to [1,1]). If
there is no last pointer position, such as after a leave event, this will
be null. If pointer position was outside box, it will be beyond the [0,0]
to [1,1] range.

#### Inherited from

[BasicKey](basickey.md).[pointerPos](basickey.md#pointerpos)

#### Defined in

[mixins/Clickable.ts:47](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L47)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[BasicKey](basickey.md).[propagatesEvents](basickey.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[BasicKey](basickey.md).[resolvedHeight](basickey.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[BasicKey](basickey.md).[resolvedWidth](basickey.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L49)

___

### startingPointerPos

• `Protected` **startingPointerPos**: ``null`` \| [`number`, `number`] = `null`

Like [pointerPos](enterkey.md#pointerpos), but only updated when a hold state begins.

Useful for implementing draggable widgets.

#### Inherited from

[BasicKey](basickey.md).[startingPointerPos](basickey.md#startingpointerpos)

#### Defined in

[mixins/Clickable.ts:53](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L53)

___

### wasClick

• `Protected` **wasClick**: `boolean` = `false`

Did the last click state change result in a click?

#### Inherited from

[BasicKey](basickey.md).[wasClick](basickey.md#wasclick)

#### Defined in

[mixins/Clickable.ts:40](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L40)

## Accessors

### child

• `get` **child**(): [`Widget`](widget.md)

This widget's child.

#### Returns

[`Widget`](widget.md)

#### Defined in

[mixins/SingleParent.ts:24](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/SingleParent.ts#L24)

___

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
[resolvedWidth](enterkey.md#resolvedwidth) and [resolvedHeight](enterkey.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](enterkey.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](enterkey.md#_layoutdirty) is set to true
and [_dirty](enterkey.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](enterkey.md#_layoutdirty) is set to true
and [_dirty](enterkey.md#_dirty) is set to true if enabled or false if not enabled.

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

### forced

• `get` **forced**(): `boolean`

#### Returns

`boolean`

#### Defined in

[widgets/FilledButton.ts:70](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/FilledButton.ts#L70)

• `set` **forced**(`forced`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `forced` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/FilledButton.ts:63](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/FilledButton.ts#L63)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](enterkey.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](enterkey.md#inherittheme).

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

Check if the widget's layout is dirty. Returns [_layoutDirty](enterkey.md#_layoutdirty).

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

If setting, calls [setThemeOverride](enterkey.md#setthemeoverride).

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

If setting, calls [setThemeOverride](enterkey.md#setthemeoverride).

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

[BasicKey](basickey.md).[clear](basickey.md#clear)

#### Defined in

[widgets/Widget.ts:366](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L366)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](enterkey.md#handleevent) method is called and its result is
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

[BasicKey](basickey.md).[dispatchEvent](basickey.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:242](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L242)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](enterkey.md#_layoutdirty) and [_dirty](enterkey.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[forceLayoutDirty](basickey.md#forcelayoutdirty)

#### Defined in

[widgets/Widget.ts:339](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L339)

___

### getNormalInRect

▸ `Protected` **getNormalInRect**(`pX`, `pY`, `rLeft`, `rRight`, `rTop`, `rBottom`): [`number`, `number`]

Normalise pointer coordinates inside a rectangle

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pX` | `number` | Pointer X coordinate, in pixels |
| `pY` | `number` | Pointer Y coordinate, in pixels |
| `rLeft` | `number` | Rectangle's left coordinate, in pixels |
| `rRight` | `number` | Rectangle's right coordinate, in pixels |
| `rTop` | `number` | Rectangle's top coordinate, in pixels |
| `rBottom` | `number` | Rectangle's bottom coordinate, in pixels |

#### Returns

[`number`, `number`]

Returns normalised coordinates

#### Inherited from

[BasicKey](basickey.md).[getNormalInRect](basickey.md#getnormalinrect)

#### Defined in

[mixins/Clickable.ts:66](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L66)

___

### handleClickEvent

▸ `Protected` **handleClickEvent**(`event`, `root`, `clickArea`): `void`

Updates the current [clickState](enterkey.md#clickstate) given an event, as well as
[focus](domroot.md#_foci), [pointerStyle](domroot.md#pointerstyle), [wasClick](enterkey.md#wasclick) and
[clickStateChanged](enterkey.md#clickstatechanged) flags.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `root` | [`Root`](root.md) |
| `clickArea` | [`number`, `number`, `number`, `number`] |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[handleClickEvent](basickey.md#handleclickevent)

#### Defined in

[mixins/Clickable.ts:122](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L122)

___

### handleEvent

▸ `Protected` **handleEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

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

[BasicKey](basickey.md).[handleEvent](basickey.md#handleevent)

#### Defined in

[widgets/FilledButton.ts:118](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/FilledButton.ts#L118)

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

[BasicKey](basickey.md).[handlePainting](basickey.md#handlepainting)

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

[BasicKey](basickey.md).[handlePopulateLayout](basickey.md#handlepopulatelayout)

#### Defined in

[widgets/Widget.ts:280](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L280)

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

[BasicKey](basickey.md).[handlePostLayoutUpdate](basickey.md#handlepostlayoutupdate)

#### Defined in

[widgets/FilledButton.ts:111](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/FilledButton.ts#L111)

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

[BasicKey](basickey.md).[handlePreLayoutUpdate](basickey.md#handleprelayoutupdate)

#### Defined in

[widgets/Widget.ts:263](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L263)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`_layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](enterkey.md#resolvedwidth) and [resolvedHeight](enterkey.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[handleResolveLayout](basickey.md#handleresolvelayout)

#### Defined in

[widgets/Widget.ts:289](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L289)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](enterkey.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](enterkey.md#_layoutdirty) and [_dirty](enterkey.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[inheritTheme](basickey.md#inherittheme)

#### Defined in

[widgets/FilledButton.ts:96](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/FilledButton.ts#L96)

___

### isNormalInRect

▸ `Protected` **isNormalInRect**(`pX`, `pY`): `boolean`

Check if a normalised point is inside a rectangle.

Since the coordinates are normalised, you don't have to define the
coordinates of the rectangle, which may seem counterintuitive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pX` | `number` | Pointer X coordinate, normalised |
| `pY` | `number` | Pointer Y coordinate, normalised |

#### Returns

`boolean`

Returns true if [pX, pY] is inside the rectangle, else, false

#### Inherited from

[BasicKey](basickey.md).[isNormalInRect](basickey.md#isnormalinrect)

#### Defined in

[mixins/Clickable.ts:95](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L95)

___

### isPointInRect

▸ `Protected` **isPointInRect**(`pX`, `pY`, `rLeft`, `rRight`, `rTop`, `rBottom`): `boolean`

Check if a point, in pixels, is inside a rectangle.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pX` | `number` | Pointer X coordinate, in pixels |
| `pY` | `number` | Pointer Y coordinate, in pixels |
| `rLeft` | `number` | Rectangle's left coordinate, in pixels |
| `rRight` | `number` | Rectangle's right coordinate, in pixels |
| `rTop` | `number` | Rectangle's top coordinate, in pixels |
| `rBottom` | `number` | Rectangle's bottom coordinate, in pixels |

#### Returns

`boolean`

Returns true if [pX, pY] is inside the rectangle, else, false

#### Inherited from

[BasicKey](basickey.md).[isPointInRect](basickey.md#ispointinrect)

#### Defined in

[mixins/Clickable.ts:81](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L81)

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

[BasicKey](basickey.md).[onFocusDropped](basickey.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](enterkey.md#needsclear) is true, calls the [handlePainting](enterkey.md#handlepainting) method and
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

[BasicKey](basickey.md).[paint](basickey.md#paint)

#### Defined in

[widgets/Widget.ts:392](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L392)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](enterkey.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[populateLayout](basickey.md#populatelayout)

#### Defined in

[widgets/Widget.ts:297](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L297)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](enterkey.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[postLayoutUpdate](basickey.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:356](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L356)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](enterkey.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[preLayoutUpdate](basickey.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:270](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L270)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](enterkey.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](enterkey.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](enterkey.md#_dirty) is set to true.
[_layoutDirty](enterkey.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[resolveLayout](basickey.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:310](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L310)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](enterkey.md#_layoutdirty) and
[_dirty](enterkey.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[setThemeOverride](basickey.md#setthemeoverride)

#### Defined in

[widgets/FilledButton.ts:74](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/FilledButton.ts#L74)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

[BasicKey](basickey.md).[updateInheritedTheme](basickey.md#updateinheritedtheme)

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L65)