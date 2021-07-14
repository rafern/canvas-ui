[canvas-ui](../README.md) / ThemeScope

# Class: ThemeScope

A [PassthroughWidget](passthroughwidget.md) which changes the theme of its child and
completely ignores inherited themes.

Since the new theme replaces the inherited theme, children of the child will
also inherit this theme since inherited themes are propagated down the widget
tree.

## Hierarchy

- [`PassthroughWidget`](passthroughwidget.md)

  ↳ **`ThemeScope`**

## Table of contents

### Constructors

- [constructor](themescope.md#constructor)

### Properties

- [\_children](themescope.md#_children)
- [\_dirty](themescope.md#_dirty)
- [\_layoutDirty](themescope.md#_layoutdirty)
- [needsClear](themescope.md#needsclear)
- [propagatesEvents](themescope.md#propagatesevents)
- [resolvedHeight](themescope.md#resolvedheight)
- [resolvedWidth](themescope.md#resolvedwidth)
- [scopeTheme](themescope.md#scopetheme)

### Accessors

- [child](themescope.md#child)
- [childCount](themescope.md#childcount)
- [children](themescope.md#children)
- [dimensions](themescope.md#dimensions)
- [dirty](themescope.md#dirty)
- [enabled](themescope.md#enabled)
- [inheritedTheme](themescope.md#inheritedtheme)
- [layoutDirty](themescope.md#layoutdirty)
- [theme](themescope.md#theme)
- [themeOverride](themescope.md#themeoverride)

### Methods

- [clear](themescope.md#clear)
- [dispatchEvent](themescope.md#dispatchevent)
- [forceLayoutDirty](themescope.md#forcelayoutdirty)
- [handleEvent](themescope.md#handleevent)
- [handlePainting](themescope.md#handlepainting)
- [handlePopulateLayout](themescope.md#handlepopulatelayout)
- [handlePostLayoutUpdate](themescope.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](themescope.md#handleprelayoutupdate)
- [handleResolveLayout](themescope.md#handleresolvelayout)
- [inheritTheme](themescope.md#inherittheme)
- [onFocusDropped](themescope.md#onfocusdropped)
- [paint](themescope.md#paint)
- [populateLayout](themescope.md#populatelayout)
- [postLayoutUpdate](themescope.md#postlayoutupdate)
- [preLayoutUpdate](themescope.md#prelayoutupdate)
- [resolveLayout](themescope.md#resolvelayout)
- [setThemeOverride](themescope.md#setthemeoverride)
- [updateInheritedTheme](themescope.md#updateinheritedtheme)

## Constructors

### constructor

• **new ThemeScope**(`child`, `themeOverride`)

Create a new ThemeScope.

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`Widget`](widget.md) |
| `themeOverride` | [`Theme`](theme.md) |

#### Overrides

[PassthroughWidget](passthroughwidget.md).[constructor](passthroughwidget.md#constructor)

#### Defined in

[widgets/ThemeScope.ts:17](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/ThemeScope.ts#L17)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](themescope.md#children) for the public iterator getter.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[_children](passthroughwidget.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[_dirty](passthroughwidget.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[_layoutDirty](passthroughwidget.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[needsClear](passthroughwidget.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[propagatesEvents](passthroughwidget.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[resolvedHeight](passthroughwidget.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[resolvedWidth](passthroughwidget.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L49)

___

### scopeTheme

• `Private` **scopeTheme**: [`Theme`](theme.md)

The theme used for the child.

#### Defined in

[widgets/ThemeScope.ts:17](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/ThemeScope.ts#L17)

## Accessors

### child

• `get` **child**(): [`Widget`](widget.md)

This widget's child.

#### Returns

[`Widget`](widget.md)

#### Defined in

[mixins/SingleParent.ts:22](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/SingleParent.ts#L22)

___

### childCount

• `get` **childCount**(): `number`

Get amount of children of this parent widget.

#### Returns

`number`

#### Defined in

[mixins/Parent.ts:60](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/Parent.ts#L60)

___

### children

• `get` **children**(): `Iterable`<[`Widget`](widget.md)\>

Get iterator for children of this parent widget. Cannot modify list of
children via this iterator; for read-only purposes only.

#### Returns

`Iterable`<[`Widget`](widget.md)\>

#### Defined in

[mixins/Parent.ts:68](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/Parent.ts#L68)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](themescope.md#resolvedwidth) and [resolvedHeight](themescope.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](themescope.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](themescope.md#_layoutdirty) is set to true
and [_dirty](themescope.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](themescope.md#_layoutdirty) is set to true
and [_dirty](themescope.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L96)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](themescope.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](themescope.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L180)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](themescope.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L202)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](themescope.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](themescope.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L140)

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

[PassthroughWidget](passthroughwidget.md).[clear](passthroughwidget.md#clear)

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](themescope.md#handleevent) method is called and its result is
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

[PassthroughWidget](passthroughwidget.md).[dispatchEvent](passthroughwidget.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](themescope.md#_layoutdirty) and [_dirty](themescope.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[forceLayoutDirty](passthroughwidget.md#forcelayoutdirty)

#### Defined in

[mixins/Parent.ts:49](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/Parent.ts#L49)

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

[PassthroughWidget](passthroughwidget.md).[handleEvent](passthroughwidget.md#handleevent)

#### Defined in

[widgets/PassthroughWidget.ts:27](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/PassthroughWidget.ts#L27)

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

[PassthroughWidget](passthroughwidget.md).[handlePainting](passthroughwidget.md#handlepainting)

#### Defined in

[widgets/PassthroughWidget.ts:65](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/PassthroughWidget.ts#L65)

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

[PassthroughWidget](passthroughwidget.md).[handlePopulateLayout](passthroughwidget.md#handlepopulatelayout)

#### Defined in

[widgets/PassthroughWidget.ts:52](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/PassthroughWidget.ts#L52)

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

[PassthroughWidget](passthroughwidget.md).[handlePostLayoutUpdate](passthroughwidget.md#handlepostlayoutupdate)

#### Defined in

[widgets/PassthroughWidget.ts:42](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/PassthroughWidget.ts#L42)

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

[PassthroughWidget](passthroughwidget.md).[handlePreLayoutUpdate](passthroughwidget.md#handleprelayoutupdate)

#### Defined in

[widgets/PassthroughWidget.ts:32](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/PassthroughWidget.ts#L32)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](themescope.md#resolvedwidth) and [resolvedHeight](themescope.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[handleResolveLayout](passthroughwidget.md#handleresolvelayout)

#### Defined in

[widgets/PassthroughWidget.ts:57](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/PassthroughWidget.ts#L57)

___

### inheritTheme

▸ **inheritTheme**(`_theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](themescope.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](themescope.md#_layoutdirty) and [_dirty](themescope.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_theme` | [`Theme`](theme.md) |

#### Returns

`void`

#### Overrides

[PassthroughWidget](passthroughwidget.md).[inheritTheme](passthroughwidget.md#inherittheme)

#### Defined in

[widgets/ThemeScope.ts:30](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/ThemeScope.ts#L30)

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

[PassthroughWidget](passthroughwidget.md).[onFocusDropped](passthroughwidget.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](themescope.md#needsclear) is true, calls the [handlePainting](themescope.md#handlepainting) method and
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

[PassthroughWidget](passthroughwidget.md).[paint](passthroughwidget.md#paint)

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](themescope.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[populateLayout](passthroughwidget.md#populatelayout)

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](themescope.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[postLayoutUpdate](passthroughwidget.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](themescope.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[preLayoutUpdate](passthroughwidget.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](themescope.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](themescope.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](themescope.md#_dirty) is set to true.
[_layoutDirty](themescope.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[resolveLayout](passthroughwidget.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ **setThemeOverride**(`scopeTheme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](themescope.md#_layoutdirty) and
[_dirty](themescope.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `scopeTheme` | [`Theme`](theme.md) |

#### Returns

`void`

#### Overrides

[PassthroughWidget](passthroughwidget.md).[setThemeOverride](passthroughwidget.md#setthemeoverride)

#### Defined in

[widgets/ThemeScope.ts:25](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/ThemeScope.ts#L25)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[updateInheritedTheme](passthroughwidget.md#updateinheritedtheme)

#### Defined in

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/Parent.ts#L41)
