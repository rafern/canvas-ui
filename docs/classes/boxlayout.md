[canvas-ui](../README.md) / BoxLayout

# Class: BoxLayout

A mixin class which provides simple box layout resolution.

## Hierarchy

- [`Widget`](widget.md)

  ↳ **`BoxLayout`**

  ↳↳ [`Icon`](icon.md)

## Table of contents

### Constructors

- [constructor](boxlayout.md#constructor)

### Properties

- [\_boxHeight](boxlayout.md#_boxheight)
- [\_boxWidth](boxlayout.md#_boxwidth)
- [\_dirty](boxlayout.md#_dirty)
- [\_layoutDirty](boxlayout.md#_layoutdirty)
- [needsClear](boxlayout.md#needsclear)
- [propagatesEvents](boxlayout.md#propagatesevents)
- [resolvedHeight](boxlayout.md#resolvedheight)
- [resolvedWidth](boxlayout.md#resolvedwidth)

### Accessors

- [boxHeight](boxlayout.md#boxheight)
- [boxWidth](boxlayout.md#boxwidth)
- [dimensions](boxlayout.md#dimensions)
- [dirty](boxlayout.md#dirty)
- [enabled](boxlayout.md#enabled)
- [inheritedTheme](boxlayout.md#inheritedtheme)
- [layoutDirty](boxlayout.md#layoutdirty)
- [theme](boxlayout.md#theme)
- [themeOverride](boxlayout.md#themeoverride)

### Methods

- [clear](boxlayout.md#clear)
- [dispatchEvent](boxlayout.md#dispatchevent)
- [forceLayoutDirty](boxlayout.md#forcelayoutdirty)
- [handleEvent](boxlayout.md#handleevent)
- [handlePainting](boxlayout.md#handlepainting)
- [handlePopulateLayout](boxlayout.md#handlepopulatelayout)
- [handlePostLayoutUpdate](boxlayout.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](boxlayout.md#handleprelayoutupdate)
- [handleResolveLayout](boxlayout.md#handleresolvelayout)
- [inheritTheme](boxlayout.md#inherittheme)
- [onFocusDropped](boxlayout.md#onfocusdropped)
- [paint](boxlayout.md#paint)
- [populateLayout](boxlayout.md#populatelayout)
- [postLayoutUpdate](boxlayout.md#postlayoutupdate)
- [preLayoutUpdate](boxlayout.md#prelayoutupdate)
- [resolveLayout](boxlayout.md#resolvelayout)
- [setThemeOverride](boxlayout.md#setthemeoverride)
- [updateInheritedTheme](boxlayout.md#updateinheritedtheme)

## Constructors

### constructor

• **new BoxLayout**(`themeOverride`, `needsClear`, `propagatesEvents`)

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

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L51)

## Properties

### \_boxHeight

• `Private` **\_boxHeight**: `number` = `0`

The wanted box height

#### Defined in

[mixins/BoxLayout.ts:13](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L13)

___

### \_boxWidth

• `Private` **\_boxWidth**: `number` = `0`

The wanted box width

#### Defined in

[mixins/BoxLayout.ts:11](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L11)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[Widget](widget.md).[_dirty](widget.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[Widget](widget.md).[_layoutDirty](widget.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L25)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[Widget](widget.md).[needsClear](widget.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[Widget](widget.md).[propagatesEvents](widget.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[Widget](widget.md).[resolvedHeight](widget.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[Widget](widget.md).[resolvedWidth](widget.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L49)

## Accessors

### boxHeight

• `get` **boxHeight**(): `number`

The wanted box height. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxHeight](boxlayout.md#_boxheight) and sets
[_layoutDirty](boxlayout.md#_layoutdirty) to true when changed.

#### Returns

`number`

#### Defined in

[mixins/BoxLayout.ts:38](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L38)

• `set` **boxHeight**(`boxHeight`): `void`

The wanted box height. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxHeight](boxlayout.md#_boxheight) and sets
[_layoutDirty](boxlayout.md#_layoutdirty) to true when changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `boxHeight` | `number` |

#### Returns

`void`

#### Defined in

[mixins/BoxLayout.ts:42](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L42)

___

### boxWidth

• `get` **boxWidth**(): `number`

The wanted box width. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxWidth](boxlayout.md#_boxwidth) and sets
[_layoutDirty](boxlayout.md#_layoutdirty) to true when changed.

#### Returns

`number`

#### Defined in

[mixins/BoxLayout.ts:21](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L21)

• `set` **boxWidth**(`boxWidth`): `void`

The wanted box width. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxWidth](boxlayout.md#_boxwidth) and sets
[_layoutDirty](boxlayout.md#_layoutdirty) to true when changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `boxWidth` | `number` |

#### Returns

`void`

#### Defined in

[mixins/BoxLayout.ts:25](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L25)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](boxlayout.md#resolvedwidth) and [resolvedHeight](boxlayout.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](boxlayout.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](boxlayout.md#_layoutdirty) is set to true
and [_dirty](boxlayout.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](boxlayout.md#_layoutdirty) is set to true
and [_dirty](boxlayout.md#_dirty) is set to true if enabled or false if not enabled.

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

If setting, calls [inheritTheme](boxlayout.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](boxlayout.md#inherittheme).

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

Check if the widget's layout is dirty. Returns [_layoutDirty](boxlayout.md#_layoutdirty).

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

If setting, calls [setThemeOverride](boxlayout.md#setthemeoverride).

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

If setting, calls [setThemeOverride](boxlayout.md#setthemeoverride).

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

[Widget](widget.md).[clear](widget.md#clear)

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](boxlayout.md#handleevent) method is called and its result is
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

[Widget](widget.md).[dispatchEvent](widget.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](boxlayout.md#_layoutdirty) and [_dirty](boxlayout.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[forceLayoutDirty](widget.md#forcelayoutdirty)

#### Defined in

[widgets/Widget.ts:338](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L338)

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

[widgets/Widget.ts:223](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L223)

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

[widgets/Widget.ts:383](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L383)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`layoutCtx`): `void`

Handles layout population by adding [boxWidth](boxlayout.md#boxwidth) and
[boxHeight](boxlayout.md#boxheight) to the [LayoutContext](layoutcontext.md)'s basis

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Overrides

[Widget](widget.md).[handlePopulateLayout](widget.md#handlepopulatelayout)

#### Defined in

[mixins/BoxLayout.ts:53](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L53)

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

[widgets/Widget.ts:348](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L348)

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

[widgets/Widget.ts:262](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L262)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`_layoutCtx`): `void`

Handles layout resolution by setting [resolvedWidth](boxlayout.md#resolvedwidth) to
[boxWidth](boxlayout.md#boxwidth) and [resolvedHeight](boxlayout.md#resolvedheight) to [boxHeight](boxlayout.md#boxheight)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Overrides

[Widget](widget.md).[handleResolveLayout](widget.md#handleresolvelayout)

#### Defined in

[mixins/BoxLayout.ts:61](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L61)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](boxlayout.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](boxlayout.md#_layoutdirty) and [_dirty](boxlayout.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[inheritTheme](widget.md#inherittheme)

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L158)

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

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](boxlayout.md#needsclear) is true, calls the [handlePainting](boxlayout.md#handlepainting) method and
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

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](boxlayout.md#handlepopulatelayout). Does nothing if
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

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](boxlayout.md#handlepostlayoutupdate) if widget is enabled. Must not be
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

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](boxlayout.md#handleprelayoutupdate) if widget is enabled. Must not be
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

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](boxlayout.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](boxlayout.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](boxlayout.md#_dirty) is set to true.
[_layoutDirty](boxlayout.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[resolveLayout](widget.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](boxlayout.md#_layoutdirty) and
[_dirty](boxlayout.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Widget](widget.md).[setThemeOverride](widget.md#setthemeoverride)

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L116)

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

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L65)
