[canvas-ui](../README.md) / FlexLayout

# Class: FlexLayout

A mixin class which provides flexbox-like layout resolution.

Flex layout has verticality, a main basis, cross basis and flex ratio.

The main basis corresponds to the vertical basis if the layout is vertical,
else, it corresponds to the horizontal basis.

The cross basis corresponds to the horizontal basis if the layout is
vertical, else, it corresponds to the vertical basis.

Flex ratio always corresponds to the main axis; flex layout can only expand
flexibly in one direction. The flex ratio corresponds to the vertical flex
ratio if the layout is vertical, else, it corresponds to the horizontal flex
ratio.

If there are, for example, two flex widgets, one with a flex ratio of 3 and
another with a flex ratio of 5, then the layout will expand to the widgets'
basis and then the remaining space will be split among the 2 widgets
depending on their flex ratio. In this case, the first widget will get 3/8
(3/(3+5)) of the remaining space, while the second widget will get 5/8
(5/(3+5)) of the remaining space.

An alternative to [mainBasis](flexlayout.md#mainbasis) is [internalMainBasis](flexlayout.md#internalmainbasis). mainBasis
is meant to be set by the user, while internalMainBasis is meant to be set by
the widget every frame. These will be combined into the
[_effectiveMainBasis](flexlayout.md#_effectivemainbasis) which is the maximum of the two. A counterpart
for cross basis also exists.

## Hierarchy

- [`Widget`](widget.md)

  ↳ **`FlexLayout`**

  ↳↳ [`Spacing`](spacing.md)

## Table of contents

### Constructors

- [constructor](flexlayout.md#constructor)

### Properties

- [\_crossBasis](flexlayout.md#_crossbasis)
- [\_dirty](flexlayout.md#_dirty)
- [\_effectiveCrossBasis](flexlayout.md#_effectivecrossbasis)
- [\_effectiveMainBasis](flexlayout.md#_effectivemainbasis)
- [\_flexRatio](flexlayout.md#_flexratio)
- [\_internalCrossBasis](flexlayout.md#_internalcrossbasis)
- [\_internalMainBasis](flexlayout.md#_internalmainbasis)
- [\_layoutDirty](flexlayout.md#_layoutdirty)
- [\_mainBasis](flexlayout.md#_mainbasis)
- [\_vertical](flexlayout.md#_vertical)
- [lastVertical](flexlayout.md#lastvertical)
- [needsClear](flexlayout.md#needsclear)
- [propagatesEvents](flexlayout.md#propagatesevents)
- [resolvedHeight](flexlayout.md#resolvedheight)
- [resolvedWidth](flexlayout.md#resolvedwidth)

### Accessors

- [crossBasis](flexlayout.md#crossbasis)
- [dimensions](flexlayout.md#dimensions)
- [dirty](flexlayout.md#dirty)
- [enabled](flexlayout.md#enabled)
- [flexRatio](flexlayout.md#flexratio)
- [inheritedTheme](flexlayout.md#inheritedtheme)
- [internalCrossBasis](flexlayout.md#internalcrossbasis)
- [internalMainBasis](flexlayout.md#internalmainbasis)
- [layoutDirty](flexlayout.md#layoutdirty)
- [mainBasis](flexlayout.md#mainbasis)
- [theme](flexlayout.md#theme)
- [themeOverride](flexlayout.md#themeoverride)
- [vertical](flexlayout.md#vertical)

### Methods

- [clear](flexlayout.md#clear)
- [dispatchEvent](flexlayout.md#dispatchevent)
- [forceLayoutDirty](flexlayout.md#forcelayoutdirty)
- [handleEvent](flexlayout.md#handleevent)
- [handlePainting](flexlayout.md#handlepainting)
- [handlePopulateLayout](flexlayout.md#handlepopulatelayout)
- [handlePostLayoutUpdate](flexlayout.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](flexlayout.md#handleprelayoutupdate)
- [handleResolveLayout](flexlayout.md#handleresolvelayout)
- [inheritTheme](flexlayout.md#inherittheme)
- [onFocusDropped](flexlayout.md#onfocusdropped)
- [paint](flexlayout.md#paint)
- [populateLayout](flexlayout.md#populatelayout)
- [postLayoutUpdate](flexlayout.md#postlayoutupdate)
- [preLayoutUpdate](flexlayout.md#prelayoutupdate)
- [resolveLayout](flexlayout.md#resolvelayout)
- [setThemeOverride](flexlayout.md#setthemeoverride)
- [updateEffectiveCrossBasis](flexlayout.md#updateeffectivecrossbasis)
- [updateEffectiveMainBasis](flexlayout.md#updateeffectivemainbasis)
- [updateInheritedTheme](flexlayout.md#updateinheritedtheme)

## Constructors

### constructor

• **new FlexLayout**(`themeOverride`, `needsClear`, `propagatesEvents`)

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

### \_crossBasis

• `Private` **\_crossBasis**: `number` = `0`

The current basis added along the cross axis

#### Defined in

[mixins/FlexLayout.ts:41](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L41)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[Widget](widget.md).[_dirty](widget.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L23)

___

### \_effectiveCrossBasis

• `Private` **\_effectiveCrossBasis**: `number` = `0`

The current effective basis added along the cross axis

#### Defined in

[mixins/FlexLayout.ts:49](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L49)

___

### \_effectiveMainBasis

• `Private` **\_effectiveMainBasis**: `number` = `0`

The current effective basis added along the main axis

#### Defined in

[mixins/FlexLayout.ts:47](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L47)

___

### \_flexRatio

• `Private` **\_flexRatio**: `number` = `1`

The current flex ratio of the flexbox

#### Defined in

[mixins/FlexLayout.ts:37](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L37)

___

### \_internalCrossBasis

• `Private` **\_internalCrossBasis**: `number` = `0`

The current internal basis added along the cross axis

#### Defined in

[mixins/FlexLayout.ts:45](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L45)

___

### \_internalMainBasis

• `Private` **\_internalMainBasis**: `number` = `0`

The current internal basis added along the main axis

#### Defined in

[mixins/FlexLayout.ts:43](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L43)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[Widget](widget.md).[_layoutDirty](widget.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L25)

___

### \_mainBasis

• `Private` **\_mainBasis**: `number` = `0`

The current basis added along the main axis

#### Defined in

[mixins/FlexLayout.ts:39](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L39)

___

### \_vertical

• `Private` **\_vertical**: ``null`` \| `boolean` = `null`

Does this flex layout grow vertically? If null, it inherits

#### Defined in

[mixins/FlexLayout.ts:51](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L51)

___

### lastVertical

• **lastVertical**: `boolean` = `true`

Was the last layout vertical or not? Never null. Use this to tell if a
widget is vertical or not when painting.

#### Defined in

[mixins/FlexLayout.ts:56](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L56)

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

### crossBasis

• `get` **crossBasis**(): `number`

The basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:98](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L98)

• `set` **crossBasis**(`crossBasis`): `void`

The basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:102](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L102)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](flexlayout.md#resolvedwidth) and [resolvedHeight](flexlayout.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](flexlayout.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](flexlayout.md#_layoutdirty) is set to true
and [_dirty](flexlayout.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](flexlayout.md#_layoutdirty) is set to true
and [_dirty](flexlayout.md#_dirty) is set to true if enabled or false if not enabled.

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

### flexRatio

• `get` **flexRatio**(): `number`

The flex ratio of the flexbox

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:59](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L59)

• `set` **flexRatio**(`flexRatio`): `void`

The flex ratio of the flexbox

#### Parameters

| Name | Type |
| :------ | :------ |
| `flexRatio` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:63](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L63)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](flexlayout.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](flexlayout.md#inherittheme).

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

### internalCrossBasis

• `get` **internalCrossBasis**(): `number`

The internal basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:122](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L122)

• `set` **internalCrossBasis**(`internalCrossBasis`): `void`

The internal basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalCrossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:126](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L126)

___

### internalMainBasis

• `get` **internalMainBasis**(): `number`

The internal basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:110](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L110)

• `set` **internalMainBasis**(`internalMainBasis`): `void`

The internal basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalMainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:114](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L114)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](flexlayout.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L202)

___

### mainBasis

• `get` **mainBasis**(): `number`

The basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:86](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L86)

• `set` **mainBasis**(`mainBasis`): `void`

The basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:90](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L90)

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

If setting, calls [setThemeOverride](flexlayout.md#setthemeoverride).

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

If setting, calls [setThemeOverride](flexlayout.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/widgets/Widget.ts#L140)

___

### vertical

• `get` **vertical**(): ``null`` \| `boolean`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Returns

``null`` \| `boolean`

#### Defined in

[mixins/FlexLayout.ts:74](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L74)

• `set` **vertical**(`vertical`): `void`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertical` | ``null`` \| `boolean` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:78](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L78)

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
else, the [handleEvent](flexlayout.md#handleevent) method is called and its result is
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

Sets [_layoutDirty](flexlayout.md#_layoutdirty) and [_dirty](flexlayout.md#_dirty) to true.

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

Handles layout population by adding the effective basis and flex ratio to
the [LayoutContext](layoutcontext.md). Also populates [lastVertical](flexlayout.md#lastvertical).

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Overrides

[Widget](widget.md).[handlePopulateLayout](widget.md#handlepopulatelayout)

#### Defined in

[mixins/FlexLayout.ts:167](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L167)

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

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

Handles layout resolution by setting the length to the effective basis
plus this widget's share of the free space, which is dependent on the
flex ratio.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Overrides

[Widget](widget.md).[handleResolveLayout](widget.md#handleresolvelayout)

#### Defined in

[mixins/FlexLayout.ts:212](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L212)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](flexlayout.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](flexlayout.md#_layoutdirty) and [_dirty](flexlayout.md#_dirty) to true if widget is enabled.

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
[needsClear](flexlayout.md#needsclear) is true, calls the [handlePainting](flexlayout.md#handlepainting) method and
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

Wrapper for [handlePopulateLayout](flexlayout.md#handlepopulatelayout). Does nothing if
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
[handlePostLayoutUpdate](flexlayout.md#handlepostlayoutupdate) if widget is enabled. Must not be
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
[handlePreLayoutUpdate](flexlayout.md#handleprelayoutupdate) if widget is enabled. Must not be
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

Wrapper for [handleResolveLayout](flexlayout.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](flexlayout.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](flexlayout.md#_dirty) is set to true.
[_layoutDirty](flexlayout.md#_layoutdirty) is set to false. Must not be overridden.

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

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](flexlayout.md#_layoutdirty) and
[_dirty](flexlayout.md#_dirty) to true if widget is enabled.

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

### updateEffectiveCrossBasis

▸ `Private` **updateEffectiveCrossBasis**(): `void`

Update [_effectiveCrossBasis](flexlayout.md#_effectivecrossbasis).

Sets it to the maximum of [_crossBasis](flexlayout.md#_crossbasis) and
[_internalCrossBasis](flexlayout.md#_internalcrossbasis). If the effective main basis changes,
[_layoutDirty](flexlayout.md#_layoutdirty) is set to true.

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:155](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L155)

___

### updateEffectiveMainBasis

▸ `Private` **updateEffectiveMainBasis**(): `void`

Update [_effectiveMainBasis](flexlayout.md#_effectivemainbasis).

Sets it to the maximum of [_mainBasis](flexlayout.md#_mainbasis) and
[_internalMainBasis](flexlayout.md#_internalmainbasis). If the effective main basis changes,
[_layoutDirty](flexlayout.md#_layoutdirty) is set to true.

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:140](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/mixins/FlexLayout.ts#L140)

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
