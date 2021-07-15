[canvas-ui](../README.md) / ScrollableViewportWidget

# Class: ScrollableViewportWidget

A wrapper for a [ViewportWidget](viewportwidget.md) which can be scrolled with
[ScrollBar](scrollbar.md).

To avoid an ugly looking layout, scrollbars are automatically hidden if they
are not needed. However, you can only tell if a scrollbar is needed after
layout is resolved. This creates problems, because scrollbars also contribute
to the layout, resulting in scrollbar hiding/showing being one frame late and
potentially introducing flickering. An alternative will be provided in the
future, but for now, use [vScrollHide](scrollableviewportwidget.md#vscrollhide) and [hScrollHide](scrollableviewportwidget.md#hscrollhide) to
force-hide each scrollbar if you know they aren't needed to avoid flickering
or other layout issues.

## Hierarchy

- [`PassthroughWidget`](passthroughwidget.md)

  ↳ **`ScrollableViewportWidget`**

## Table of contents

### Constructors

- [constructor](scrollableviewportwidget.md#constructor)

### Properties

- [\_children](scrollableviewportwidget.md#_children)
- [\_dirty](scrollableviewportwidget.md#_dirty)
- [\_layoutDirty](scrollableviewportwidget.md#_layoutdirty)
- [hScroll](scrollableviewportwidget.md#hscroll)
- [hScrollHide](scrollableviewportwidget.md#hscrollhide)
- [needsClear](scrollableviewportwidget.md#needsclear)
- [propagatesEvents](scrollableviewportwidget.md#propagatesevents)
- [resolvedHeight](scrollableviewportwidget.md#resolvedheight)
- [resolvedWidth](scrollableviewportwidget.md#resolvedwidth)
- [vScroll](scrollableviewportwidget.md#vscroll)
- [vScrollHide](scrollableviewportwidget.md#vscrollhide)
- [viewport](scrollableviewportwidget.md#viewport)

### Accessors

- [child](scrollableviewportwidget.md#child)
- [childCount](scrollableviewportwidget.md#childcount)
- [children](scrollableviewportwidget.md#children)
- [containedChild](scrollableviewportwidget.md#containedchild)
- [crossBasis](scrollableviewportwidget.md#crossbasis)
- [dimensions](scrollableviewportwidget.md#dimensions)
- [dirty](scrollableviewportwidget.md#dirty)
- [enabled](scrollableviewportwidget.md#enabled)
- [flexRatio](scrollableviewportwidget.md#flexratio)
- [inheritedTheme](scrollableviewportwidget.md#inheritedtheme)
- [layoutDirty](scrollableviewportwidget.md#layoutdirty)
- [mainBasis](scrollableviewportwidget.md#mainbasis)
- [maxDimensions](scrollableviewportwidget.md#maxdimensions)
- [theme](scrollableviewportwidget.md#theme)
- [themeOverride](scrollableviewportwidget.md#themeoverride)

### Methods

- [clear](scrollableviewportwidget.md#clear)
- [dispatchEvent](scrollableviewportwidget.md#dispatchevent)
- [forceLayoutDirty](scrollableviewportwidget.md#forcelayoutdirty)
- [handleEvent](scrollableviewportwidget.md#handleevent)
- [handlePainting](scrollableviewportwidget.md#handlepainting)
- [handlePopulateLayout](scrollableviewportwidget.md#handlepopulatelayout)
- [handlePostLayoutUpdate](scrollableviewportwidget.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](scrollableviewportwidget.md#handleprelayoutupdate)
- [handleResolveLayout](scrollableviewportwidget.md#handleresolvelayout)
- [inheritTheme](scrollableviewportwidget.md#inherittheme)
- [onFocusDropped](scrollableviewportwidget.md#onfocusdropped)
- [paint](scrollableviewportwidget.md#paint)
- [populateLayout](scrollableviewportwidget.md#populatelayout)
- [postLayoutUpdate](scrollableviewportwidget.md#postlayoutupdate)
- [preLayoutUpdate](scrollableviewportwidget.md#prelayoutupdate)
- [resetScroll](scrollableviewportwidget.md#resetscroll)
- [resolveLayout](scrollableviewportwidget.md#resolvelayout)
- [setThemeOverride](scrollableviewportwidget.md#setthemeoverride)
- [updateInheritedTheme](scrollableviewportwidget.md#updateinheritedtheme)

## Constructors

### constructor

• **new ScrollableViewportWidget**(`child`, `vertical`, `mainBasisTied?`, `crossBasisTied?`, `themeOverride?`)

Create a new ScrollableViewportWidget.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `child` | [`Widget`](widget.md) | `undefined` |
| `vertical` | `boolean` | `undefined` |
| `mainBasisTied` | `boolean` | `false` |
| `crossBasisTied` | `boolean` | `false` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[PassthroughWidget](passthroughwidget.md).[constructor](passthroughwidget.md#constructor)

#### Defined in

[widgets/ScrollableViewportWidget.ts:64](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L64)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](scrollableviewportwidget.md#children) for the public iterator getter.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[_children](passthroughwidget.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[_dirty](passthroughwidget.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[_layoutDirty](passthroughwidget.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L25)

___

### hScroll

• `Private` `Readonly` **hScroll**: [`ScrollBar`](scrollbar.md)

A reference to the created horizontal [ScrollBar](scrollbar.md) for easy access.

#### Defined in

[widgets/ScrollableViewportWidget.ts:36](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L36)

___

### hScrollHide

• **hScrollHide**: `boolean`

Hide the horizontal scroll bar?

Used to work around the current limitation of flickering scrollbars. If
you know a scrollbar should be disabled, such as when loading, set this
to true to avoid flickering caused by layout changes.

#### Defined in

[widgets/ScrollableViewportWidget.ts:64](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L64)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[needsClear](passthroughwidget.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[propagatesEvents](passthroughwidget.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[resolvedHeight](passthroughwidget.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[resolvedWidth](passthroughwidget.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L49)

___

### vScroll

• `Private` `Readonly` **vScroll**: [`ScrollBar`](scrollbar.md)

A reference to the created vertical [ScrollBar](scrollbar.md) for easy access.

#### Defined in

[widgets/ScrollableViewportWidget.ts:32](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L32)

___

### vScrollHide

• **vScrollHide**: `boolean`

Hide the vertical scroll bar?

Used to work around the current limitation of flickering scrollbars. If
you know a scrollbar should be disabled, such as when loading, set this
to true to avoid flickering caused by layout changes.

#### Defined in

[widgets/ScrollableViewportWidget.ts:56](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L56)

___

### viewport

• `Private` `Readonly` **viewport**: [`ViewportWidget`](viewportwidget.md)

A reference to the created [ViewportWidget](viewportwidget.md) for easy access.

#### Defined in

[widgets/ScrollableViewportWidget.ts:28](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L28)

## Accessors

### child

• `get` **child**(): [`Widget`](widget.md)

This widget's child.

#### Returns

[`Widget`](widget.md)

#### Defined in

[mixins/SingleParent.ts:22](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/SingleParent.ts#L22)

___

### childCount

• `get` **childCount**(): `number`

Get amount of children of this parent widget.

#### Returns

`number`

#### Defined in

[mixins/Parent.ts:60](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Parent.ts#L60)

___

### children

• `get` **children**(): `Iterable`<[`Widget`](widget.md)\>

Get iterator for children of this parent widget. Cannot modify list of
children via this iterator; for read-only purposes only.

#### Returns

`Iterable`<[`Widget`](widget.md)\>

#### Defined in

[mixins/Parent.ts:68](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Parent.ts#L68)

___

### containedChild

• `get` **containedChild**(): [`Widget`](widget.md)

The [viewport](scrollableviewportwidget.md#viewport)'s [child](viewportwidget.md#child)

#### Returns

[`Widget`](widget.md)

#### Defined in

[widgets/ScrollableViewportWidget.ts:136](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L136)

___

### crossBasis

• `get` **crossBasis**(): `number`

The [viewport](scrollableviewportwidget.md#viewport)'s [crossBasis](viewportwidget.md#crossbasis)

#### Returns

`number`

#### Defined in

[widgets/ScrollableViewportWidget.ts:127](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L127)

• `set` **crossBasis**(`crossBasis`): `void`

The [viewport](scrollableviewportwidget.md#viewport)'s [crossBasis](viewportwidget.md#crossbasis)

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossBasis` | `number` |

#### Returns

`void`

#### Defined in

[widgets/ScrollableViewportWidget.ts:131](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L131)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](scrollableviewportwidget.md#resolvedwidth) and [resolvedHeight](scrollableviewportwidget.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](scrollableviewportwidget.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](scrollableviewportwidget.md#_layoutdirty) is set to true
and [_dirty](scrollableviewportwidget.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](scrollableviewportwidget.md#_layoutdirty) is set to true
and [_dirty](scrollableviewportwidget.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L96)

___

### flexRatio

• `get` **flexRatio**(): `number`

The [viewport](scrollableviewportwidget.md#viewport)'s [flexRatio](viewportwidget.md#flexratio)

#### Returns

`number`

#### Defined in

[widgets/ScrollableViewportWidget.ts:109](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L109)

• `set` **flexRatio**(`flexRatio`): `void`

The [viewport](scrollableviewportwidget.md#viewport)'s [flexRatio](viewportwidget.md#flexratio)

#### Parameters

| Name | Type |
| :------ | :------ |
| `flexRatio` | `number` |

#### Returns

`void`

#### Defined in

[widgets/ScrollableViewportWidget.ts:113](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L113)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](scrollableviewportwidget.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](scrollableviewportwidget.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L180)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](scrollableviewportwidget.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L202)

___

### mainBasis

• `get` **mainBasis**(): `number`

The [viewport](scrollableviewportwidget.md#viewport)'s [mainBasis](viewportwidget.md#mainbasis)

#### Returns

`number`

#### Defined in

[widgets/ScrollableViewportWidget.ts:118](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L118)

• `set` **mainBasis**(`mainBasis`): `void`

The [viewport](scrollableviewportwidget.md#viewport)'s [mainBasis](viewportwidget.md#mainbasis)

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainBasis` | `number` |

#### Returns

`void`

#### Defined in

[widgets/ScrollableViewportWidget.ts:122](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L122)

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

The [viewport](scrollableviewportwidget.md#viewport)'s
[maxDimensions](viewportwidget.md#maxdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[widgets/ScrollableViewportWidget.ts:100](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L100)

• `set` **maxDimensions**(`maxDimensions`): `void`

The [viewport](scrollableviewportwidget.md#viewport)'s
[maxDimensions](viewportwidget.md#maxdimensions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxDimensions` | [`number`, `number`] |

#### Returns

`void`

#### Defined in

[widgets/ScrollableViewportWidget.ts:104](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L104)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](scrollableviewportwidget.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](scrollableviewportwidget.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L140)

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

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](scrollableviewportwidget.md#handleevent) method is called and its result is
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

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](scrollableviewportwidget.md#_layoutdirty) and [_dirty](scrollableviewportwidget.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[forceLayoutDirty](passthroughwidget.md#forcelayoutdirty)

#### Defined in

[mixins/Parent.ts:49](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Parent.ts#L49)

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

[widgets/PassthroughWidget.ts:27](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/PassthroughWidget.ts#L27)

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

[widgets/PassthroughWidget.ts:65](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/PassthroughWidget.ts#L65)

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

[widgets/PassthroughWidget.ts:52](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/PassthroughWidget.ts#L52)

___

### handlePostLayoutUpdate

▸ **handlePostLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Does
nothing by default. Should be implemented.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

[PassthroughWidget](passthroughwidget.md).[handlePostLayoutUpdate](passthroughwidget.md#handlepostlayoutupdate)

#### Defined in

[widgets/ScrollableViewportWidget.ts:166](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L166)

___

### handlePreLayoutUpdate

▸ **handlePreLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Does
nothing by default. Should be implemented.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

[PassthroughWidget](passthroughwidget.md).[handlePreLayoutUpdate](passthroughwidget.md#handleprelayoutupdate)

#### Defined in

[widgets/ScrollableViewportWidget.ts:146](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L146)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](scrollableviewportwidget.md#resolvedwidth) and [resolvedHeight](scrollableviewportwidget.md#resolvedheight)).Must be
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

[widgets/PassthroughWidget.ts:57](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/PassthroughWidget.ts#L57)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](scrollableviewportwidget.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](scrollableviewportwidget.md#_layoutdirty) and [_dirty](scrollableviewportwidget.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[inheritTheme](passthroughwidget.md#inherittheme)

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L158)

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

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](scrollableviewportwidget.md#needsclear) is true, calls the [handlePainting](scrollableviewportwidget.md#handlepainting) method and
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

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](scrollableviewportwidget.md#handlepopulatelayout). Does nothing if
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

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](scrollableviewportwidget.md#handlepostlayoutupdate) if widget is enabled. Must not be
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

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](scrollableviewportwidget.md#handleprelayoutupdate) if widget is enabled. Must not be
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

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L269)

___

### resetScroll

▸ **resetScroll**(): `void`

Reset both scroll offsets to 0.

#### Returns

`void`

#### Defined in

[widgets/ScrollableViewportWidget.ts:141](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollableViewportWidget.ts#L141)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](scrollableviewportwidget.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](scrollableviewportwidget.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](scrollableviewportwidget.md#_dirty) is set to true.
[_layoutDirty](scrollableviewportwidget.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[resolveLayout](passthroughwidget.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](scrollableviewportwidget.md#_layoutdirty) and
[_dirty](scrollableviewportwidget.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[PassthroughWidget](passthroughwidget.md).[setThemeOverride](passthroughwidget.md#setthemeoverride)

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L116)

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

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Parent.ts#L41)
