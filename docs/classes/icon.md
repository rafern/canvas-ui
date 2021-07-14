[canvas-ui](../README.md) / Icon

# Class: Icon

A widget which displays a given image.

## Hierarchy

- [`BoxLayout`](boxlayout.md)

  ↳ **`Icon`**

## Table of contents

### Constructors

- [constructor](icon.md#constructor)

### Properties

- [\_dirty](icon.md#_dirty)
- [\_image](icon.md#_image)
- [\_layoutDirty](icon.md#_layoutdirty)
- [\_rotation](icon.md#_rotation)
- [height](icon.md#height)
- [lastSrc](icon.md#lastsrc)
- [needsClear](icon.md#needsclear)
- [propagatesEvents](icon.md#propagatesevents)
- [resolvedHeight](icon.md#resolvedheight)
- [resolvedWidth](icon.md#resolvedwidth)
- [viewBox](icon.md#viewbox)
- [width](icon.md#width)

### Accessors

- [boxHeight](icon.md#boxheight)
- [boxWidth](icon.md#boxwidth)
- [dimensions](icon.md#dimensions)
- [dirty](icon.md#dirty)
- [enabled](icon.md#enabled)
- [image](icon.md#image)
- [inheritedTheme](icon.md#inheritedtheme)
- [layoutDirty](icon.md#layoutdirty)
- [rotation](icon.md#rotation)
- [theme](icon.md#theme)
- [themeOverride](icon.md#themeoverride)

### Methods

- [clear](icon.md#clear)
- [dispatchEvent](icon.md#dispatchevent)
- [forceLayoutDirty](icon.md#forcelayoutdirty)
- [getIconRect](icon.md#geticonrect)
- [handleEvent](icon.md#handleevent)
- [handlePainting](icon.md#handlepainting)
- [handlePopulateLayout](icon.md#handlepopulatelayout)
- [handlePostLayoutUpdate](icon.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](icon.md#handleprelayoutupdate)
- [handleResolveLayout](icon.md#handleresolvelayout)
- [inheritTheme](icon.md#inherittheme)
- [onFocusDropped](icon.md#onfocusdropped)
- [paint](icon.md#paint)
- [populateLayout](icon.md#populatelayout)
- [postLayoutUpdate](icon.md#postlayoutupdate)
- [preLayoutUpdate](icon.md#prelayoutupdate)
- [resolveLayout](icon.md#resolvelayout)
- [setThemeOverride](icon.md#setthemeoverride)
- [updateDimensions](icon.md#updatedimensions)
- [updateInheritedTheme](icon.md#updateinheritedtheme)

## Constructors

### constructor

• **new Icon**(`image`, `width?`, `height?`, `viewBox?`, `themeOverride?`)

Create a new Icon.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | `undefined` |
| `width` | ``null`` \| `number` | `null` |
| `height` | ``null`` \| `number` | `null` |
| `viewBox` | ``null`` \| [`number`, `number`, `number`, `number`] | `null` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[BoxLayout](boxlayout.md).[constructor](boxlayout.md#constructor)

#### Defined in

[widgets/Icon.ts:34](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L34)

## Properties

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[BoxLayout](boxlayout.md).[_dirty](boxlayout.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L23)

___

### \_image

• `Private` **\_image**: `HTMLImageElement`

The current image used by the icon.

#### Defined in

[widgets/Icon.ts:12](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L12)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[BoxLayout](boxlayout.md).[_layoutDirty](boxlayout.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L25)

___

### \_rotation

• `Private` **\_rotation**: `number` = `0`

The current image rotation in radians.

#### Defined in

[widgets/Icon.ts:19](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L19)

___

### height

• **height**: ``null`` \| `number`

The wanted height. If null, the image's height will be used, taking
[viewBox](icon.md#viewbox) into account.

#### Defined in

[widgets/Icon.ts:34](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L34)

___

### lastSrc

• `Private` **lastSrc**: ``null`` \| `string` = `null`

The last source that the current image was using. Used for tracking if
the image source changed and if the image is fully loaded.

#### Defined in

[widgets/Icon.ts:17](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L17)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[BoxLayout](boxlayout.md).[needsClear](boxlayout.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[BoxLayout](boxlayout.md).[propagatesEvents](boxlayout.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[BoxLayout](boxlayout.md).[resolvedHeight](boxlayout.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[BoxLayout](boxlayout.md).[resolvedWidth](boxlayout.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L49)

___

### viewBox

• **viewBox**: ``null`` \| [`number`, `number`, `number`, `number`]

The view box of this Icon, useful if the image used for the icon is a
spritesheet. If null, the entire image will be used.

#### Defined in

[widgets/Icon.ts:24](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L24)

___

### width

• **width**: ``null`` \| `number`

The wanted width. If null, the image's width will be used, taking
[viewBox](icon.md#viewbox) into account.

#### Defined in

[widgets/Icon.ts:29](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L29)

## Accessors

### boxHeight

• `get` **boxHeight**(): `number`

The wanted box height. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxHeight](boxlayout.md#_boxheight) and sets
[_layoutDirty](icon.md#_layoutdirty) to true when changed.

#### Returns

`number`

#### Defined in

[mixins/BoxLayout.ts:38](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L38)

• `set` **boxHeight**(`boxHeight`): `void`

The wanted box height. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxHeight](boxlayout.md#_boxheight) and sets
[_layoutDirty](icon.md#_layoutdirty) to true when changed.

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
[_layoutDirty](icon.md#_layoutdirty) to true when changed.

#### Returns

`number`

#### Defined in

[mixins/BoxLayout.ts:21](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L21)

• `set` **boxWidth**(`boxWidth`): `void`

The wanted box width. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxWidth](boxlayout.md#_boxwidth) and sets
[_layoutDirty](icon.md#_layoutdirty) to true when changed.

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
[resolvedWidth](icon.md#resolvedwidth) and [resolvedHeight](icon.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](icon.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](icon.md#_layoutdirty) is set to true
and [_dirty](icon.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](icon.md#_layoutdirty) is set to true
and [_dirty](icon.md#_dirty) is set to true if enabled or false if not enabled.

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

### image

• `get` **image**(): `HTMLImageElement`

The image used by this Icon.

Sets [_image](icon.md#_image) if changed and sets [lastSrc](icon.md#lastsrc) to null to mark
the image as loading so that flickers are minimised.

If getting, returns [_image](icon.md#_image).

#### Returns

`HTMLImageElement`

#### Defined in

[widgets/Icon.ts:94](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L94)

• `set` **image**(`image`): `void`

The image used by this Icon.

Sets [_image](icon.md#_image) if changed and sets [lastSrc](icon.md#lastsrc) to null to mark
the image as loading so that flickers are minimised.

If getting, returns [_image](icon.md#_image).

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `HTMLImageElement` |

#### Returns

`void`

#### Defined in

[widgets/Icon.ts:87](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L87)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](icon.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](icon.md#inherittheme).

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

Check if the widget's layout is dirty. Returns [_layoutDirty](icon.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L202)

___

### rotation

• `get` **rotation**(): `number`

This icon's rotation. Useful for implementing spinners.

Sets [_rotation](icon.md#_rotation) if changed and sets [_dirty](icon.md#_dirty) to true.

If getting, returns [_rotation](icon.md#_rotation).

#### Returns

`number`

#### Defined in

[widgets/Icon.ts:144](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L144)

• `set` **rotation**(`rotation`): `void`

This icon's rotation. Useful for implementing spinners.

Sets [_rotation](icon.md#_rotation) if changed and sets [_dirty](icon.md#_dirty) to true.

If getting, returns [_rotation](icon.md#_rotation).

#### Parameters

| Name | Type |
| :------ | :------ |
| `rotation` | `number` |

#### Returns

`void`

#### Defined in

[widgets/Icon.ts:137](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L137)

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

If setting, calls [setThemeOverride](icon.md#setthemeoverride).

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

If setting, calls [setThemeOverride](icon.md#setthemeoverride).

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

[BoxLayout](boxlayout.md).[clear](boxlayout.md#clear)

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](icon.md#handleevent) method is called and its result is
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

[BoxLayout](boxlayout.md).[dispatchEvent](boxlayout.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](icon.md#_layoutdirty) and [_dirty](icon.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[forceLayoutDirty](boxlayout.md#forcelayoutdirty)

#### Defined in

[widgets/Widget.ts:338](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L338)

___

### getIconRect

▸ `Private` **getIconRect**(`x`, `y`, `width`, `height`): [`number`, `number`, `number`, `number`]

Get the rectangle where the icon will be painted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |

#### Returns

[`number`, `number`, `number`, `number`]

Returns a 4-tuple containing, in this order, the left edge's offset, the top edge's offset, the width and the height.

#### Defined in

[widgets/Icon.ts:103](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L103)

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

[BoxLayout](boxlayout.md).[handleEvent](boxlayout.md#handleevent)

#### Defined in

[widgets/Widget.ts:223](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L223)

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

[BoxLayout](boxlayout.md).[handlePainting](boxlayout.md#handlepainting)

#### Defined in

[widgets/Icon.ts:148](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L148)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`layoutCtx`): `void`

Handles layout population by adding [boxWidth](icon.md#boxwidth) and
[boxHeight](icon.md#boxheight) to the [LayoutContext](layoutcontext.md)'s basis

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[handlePopulateLayout](boxlayout.md#handlepopulatelayout)

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

[BoxLayout](boxlayout.md).[handlePostLayoutUpdate](boxlayout.md#handlepostlayoutupdate)

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

#### Overrides

[BoxLayout](boxlayout.md).[handlePreLayoutUpdate](boxlayout.md#handleprelayoutupdate)

#### Defined in

[widgets/Icon.ts:119](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L119)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`_layoutCtx`): `void`

Handles layout resolution by setting [resolvedWidth](icon.md#resolvedwidth) to
[boxWidth](icon.md#boxwidth) and [resolvedHeight](icon.md#resolvedheight) to [boxHeight](icon.md#boxheight)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[handleResolveLayout](boxlayout.md#handleresolvelayout)

#### Defined in

[mixins/BoxLayout.ts:61](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/BoxLayout.ts#L61)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](icon.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](icon.md#_layoutdirty) and [_dirty](icon.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[inheritTheme](boxlayout.md#inherittheme)

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

[BoxLayout](boxlayout.md).[onFocusDropped](boxlayout.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](icon.md#needsclear) is true, calls the [handlePainting](icon.md#handlepainting) method and
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

[BoxLayout](boxlayout.md).[paint](boxlayout.md#paint)

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](icon.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[populateLayout](boxlayout.md#populatelayout)

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](icon.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[postLayoutUpdate](boxlayout.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](icon.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[preLayoutUpdate](boxlayout.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](icon.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](icon.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](icon.md#_dirty) is set to true.
[_layoutDirty](icon.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[resolveLayout](boxlayout.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](icon.md#_layoutdirty) and
[_dirty](icon.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[setThemeOverride](boxlayout.md#setthemeoverride)

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L116)

___

### updateDimensions

▸ `Private` **updateDimensions**(): `void`

Update [boxWidth](icon.md#boxwidth) and [boxHeight](icon.md#boxheight).

If [width](icon.md#width) is not set, then [_image](icon.md#_image)'s width is used. The
same applies for height.

#### Returns

`void`

#### Defined in

[widgets/Icon.ts:55](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Icon.ts#L55)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

[BoxLayout](boxlayout.md).[updateInheritedTheme](boxlayout.md#updateinheritedtheme)

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L65)
