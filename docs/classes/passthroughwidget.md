[canvas-ui](../README.md) / PassthroughWidget

# Class: PassthroughWidget

A [SingleParent](singleparent.md) which contains a single child and does nothing,
passing all events through to its child. Useful for widgets that are only
used for logic, like [ThemeScope](themescope.md).

Since this does nothing on its own, it should not be used on its own.
Instead, extend this class if you are looking for a way to do wrapper widgets
that provide extra logic.

## Hierarchy

- [`SingleParent`](singleparent.md)

  ↳ **`PassthroughWidget`**

  ↳↳ [`ScrollableViewportWidget`](scrollableviewportwidget.md)

  ↳↳ [`ThemeScope`](themescope.md)

## Table of contents

### Constructors

- [constructor](passthroughwidget.md#constructor)

### Properties

- [\_children](passthroughwidget.md#_children)
- [\_dirty](passthroughwidget.md#_dirty)
- [\_layoutDirty](passthroughwidget.md#_layoutdirty)
- [needsClear](passthroughwidget.md#needsclear)
- [propagatesEvents](passthroughwidget.md#propagatesevents)
- [resolvedHeight](passthroughwidget.md#resolvedheight)
- [resolvedWidth](passthroughwidget.md#resolvedwidth)

### Accessors

- [child](passthroughwidget.md#child)
- [childCount](passthroughwidget.md#childcount)
- [children](passthroughwidget.md#children)
- [dimensions](passthroughwidget.md#dimensions)
- [dirty](passthroughwidget.md#dirty)
- [enabled](passthroughwidget.md#enabled)
- [inheritedTheme](passthroughwidget.md#inheritedtheme)
- [layoutDirty](passthroughwidget.md#layoutdirty)
- [theme](passthroughwidget.md#theme)
- [themeOverride](passthroughwidget.md#themeoverride)

### Methods

- [clear](passthroughwidget.md#clear)
- [dispatchEvent](passthroughwidget.md#dispatchevent)
- [forceLayoutDirty](passthroughwidget.md#forcelayoutdirty)
- [handleEvent](passthroughwidget.md#handleevent)
- [handlePainting](passthroughwidget.md#handlepainting)
- [handlePopulateLayout](passthroughwidget.md#handlepopulatelayout)
- [handlePostLayoutUpdate](passthroughwidget.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](passthroughwidget.md#handleprelayoutupdate)
- [handleResolveLayout](passthroughwidget.md#handleresolvelayout)
- [inheritTheme](passthroughwidget.md#inherittheme)
- [onFocusDropped](passthroughwidget.md#onfocusdropped)
- [paint](passthroughwidget.md#paint)
- [populateLayout](passthroughwidget.md#populatelayout)
- [postLayoutUpdate](passthroughwidget.md#postlayoutupdate)
- [preLayoutUpdate](passthroughwidget.md#prelayoutupdate)
- [resolveLayout](passthroughwidget.md#resolvelayout)
- [setThemeOverride](passthroughwidget.md#setthemeoverride)
- [updateInheritedTheme](passthroughwidget.md#updateinheritedtheme)

## Constructors

### constructor

• **new PassthroughWidget**(`child`, `themeOverride?`)

Create a new PassthroughWidget.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `child` | [`Widget`](widget.md) | `undefined` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[SingleParent](singleparent.md).[constructor](singleparent.md#constructor)

#### Defined in

[widgets/PassthroughWidget.ts:19](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/PassthroughWidget.ts#L19)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](passthroughwidget.md#children) for the public iterator getter.

#### Inherited from

[SingleParent](singleparent.md).[_children](singleparent.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[SingleParent](singleparent.md).[_dirty](singleparent.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[SingleParent](singleparent.md).[_layoutDirty](singleparent.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[SingleParent](singleparent.md).[needsClear](singleparent.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[SingleParent](singleparent.md).[propagatesEvents](singleparent.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[SingleParent](singleparent.md).[resolvedHeight](singleparent.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[SingleParent](singleparent.md).[resolvedWidth](singleparent.md#resolvedwidth)

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
[resolvedWidth](passthroughwidget.md#resolvedwidth) and [resolvedHeight](passthroughwidget.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](passthroughwidget.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](passthroughwidget.md#_layoutdirty) is set to true
and [_dirty](passthroughwidget.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](passthroughwidget.md#_layoutdirty) is set to true
and [_dirty](passthroughwidget.md#_dirty) is set to true if enabled or false if not enabled.

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

If setting, calls [inheritTheme](passthroughwidget.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](passthroughwidget.md#inherittheme).

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

Check if the widget's layout is dirty. Returns [_layoutDirty](passthroughwidget.md#_layoutdirty).

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

If setting, calls [setThemeOverride](passthroughwidget.md#setthemeoverride).

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

If setting, calls [setThemeOverride](passthroughwidget.md#setthemeoverride).

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

[SingleParent](singleparent.md).[clear](singleparent.md#clear)

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](passthroughwidget.md#handleevent) method is called and its result is
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

[SingleParent](singleparent.md).[dispatchEvent](singleparent.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](passthroughwidget.md#_layoutdirty) and [_dirty](passthroughwidget.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[SingleParent](singleparent.md).[forceLayoutDirty](singleparent.md#forcelayoutdirty)

#### Defined in

[mixins/Parent.ts:49](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L49)

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

[SingleParent](singleparent.md).[handleEvent](singleparent.md#handleevent)

#### Defined in

[widgets/PassthroughWidget.ts:27](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/PassthroughWidget.ts#L27)

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

[SingleParent](singleparent.md).[handlePainting](singleparent.md#handlepainting)

#### Defined in

[widgets/PassthroughWidget.ts:65](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/PassthroughWidget.ts#L65)

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

[SingleParent](singleparent.md).[handlePopulateLayout](singleparent.md#handlepopulatelayout)

#### Defined in

[widgets/PassthroughWidget.ts:52](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/PassthroughWidget.ts#L52)

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

[SingleParent](singleparent.md).[handlePostLayoutUpdate](singleparent.md#handlepostlayoutupdate)

#### Defined in

[widgets/PassthroughWidget.ts:42](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/PassthroughWidget.ts#L42)

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

[SingleParent](singleparent.md).[handlePreLayoutUpdate](singleparent.md#handleprelayoutupdate)

#### Defined in

[widgets/PassthroughWidget.ts:32](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/PassthroughWidget.ts#L32)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](passthroughwidget.md#resolvedwidth) and [resolvedHeight](passthroughwidget.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Overrides

[SingleParent](singleparent.md).[handleResolveLayout](singleparent.md#handleresolvelayout)

#### Defined in

[widgets/PassthroughWidget.ts:57](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/PassthroughWidget.ts#L57)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](passthroughwidget.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](passthroughwidget.md#_layoutdirty) and [_dirty](passthroughwidget.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[SingleParent](singleparent.md).[inheritTheme](singleparent.md#inherittheme)

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

[SingleParent](singleparent.md).[onFocusDropped](singleparent.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](passthroughwidget.md#needsclear) is true, calls the [handlePainting](passthroughwidget.md#handlepainting) method and
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

[SingleParent](singleparent.md).[paint](singleparent.md#paint)

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](passthroughwidget.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[SingleParent](singleparent.md).[populateLayout](singleparent.md#populatelayout)

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](passthroughwidget.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[SingleParent](singleparent.md).[postLayoutUpdate](singleparent.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](passthroughwidget.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[SingleParent](singleparent.md).[preLayoutUpdate](singleparent.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](passthroughwidget.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](passthroughwidget.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](passthroughwidget.md#_dirty) is set to true.
[_layoutDirty](passthroughwidget.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[SingleParent](singleparent.md).[resolveLayout](singleparent.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](passthroughwidget.md#_layoutdirty) and
[_dirty](passthroughwidget.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[SingleParent](singleparent.md).[setThemeOverride](singleparent.md#setthemeoverride)

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

[SingleParent](singleparent.md).[updateInheritedTheme](singleparent.md#updateinheritedtheme)

#### Defined in

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L41)
