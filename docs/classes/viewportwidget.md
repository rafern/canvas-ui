[canvas-ui](../README.md) / ViewportWidget

# Class: ViewportWidget

A type of container widget which is allowed to be bigger or smaller than its
child.

Allows setting the offset of the child, automatically clips it if neccessary.
Otherwise acts like a [Container](container.md). Implemented by using a
[Viewport](viewport.md); effectively, the child widget is painted to a dedicated
canvas.

## Hierarchy

- [`SingleParent`](singleparent.md)<`this`\> & [`FlexLayout`](flexlayout.md)<`this`\>

  ↳ **`ViewportWidget`**

## Table of contents

### Constructors

- [constructor](viewportwidget.md#constructor)

### Properties

- [\_children](viewportwidget.md#_children)
- [\_dirty](viewportwidget.md#_dirty)
- [\_layoutDirty](viewportwidget.md#_layoutdirty)
- [\_offset](viewportwidget.md#_offset)
- [crossBasisTied](viewportwidget.md#crossbasistied)
- [lastChildLayoutCtx](viewportwidget.md#lastchildlayoutctx)
- [lastVertical](viewportwidget.md#lastvertical)
- [lastViewportDims](viewportwidget.md#lastviewportdims)
- [mainBasisTied](viewportwidget.md#mainbasistied)
- [maxDimensions](viewportwidget.md#maxdimensions)
- [needsClear](viewportwidget.md#needsclear)
- [propagatesEvents](viewportwidget.md#propagatesevents)
- [resolvedHeight](viewportwidget.md#resolvedheight)
- [resolvedWidth](viewportwidget.md#resolvedwidth)
- [viewport](viewportwidget.md#viewport)

### Accessors

- [canvasDimensions](viewportwidget.md#canvasdimensions)
- [child](viewportwidget.md#child)
- [childCount](viewportwidget.md#childcount)
- [children](viewportwidget.md#children)
- [crossBasis](viewportwidget.md#crossbasis)
- [dimensions](viewportwidget.md#dimensions)
- [dirty](viewportwidget.md#dirty)
- [enabled](viewportwidget.md#enabled)
- [flexRatio](viewportwidget.md#flexratio)
- [inheritedTheme](viewportwidget.md#inheritedtheme)
- [internalCrossBasis](viewportwidget.md#internalcrossbasis)
- [internalMainBasis](viewportwidget.md#internalmainbasis)
- [layoutDirty](viewportwidget.md#layoutdirty)
- [mainBasis](viewportwidget.md#mainbasis)
- [offset](viewportwidget.md#offset)
- [theme](viewportwidget.md#theme)
- [themeOverride](viewportwidget.md#themeoverride)
- [vertical](viewportwidget.md#vertical)

### Methods

- [clear](viewportwidget.md#clear)
- [dispatchEvent](viewportwidget.md#dispatchevent)
- [forceLayoutDirty](viewportwidget.md#forcelayoutdirty)
- [getChildCrossBasis](viewportwidget.md#getchildcrossbasis)
- [getChildMainBasis](viewportwidget.md#getchildmainbasis)
- [getMaxCrossBasis](viewportwidget.md#getmaxcrossbasis)
- [getMaxMainBasis](viewportwidget.md#getmaxmainbasis)
- [handleEvent](viewportwidget.md#handleevent)
- [handlePainting](viewportwidget.md#handlepainting)
- [handlePopulateLayout](viewportwidget.md#handlepopulatelayout)
- [handlePostLayoutUpdate](viewportwidget.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](viewportwidget.md#handleprelayoutupdate)
- [handleResolveLayout](viewportwidget.md#handleresolvelayout)
- [inheritTheme](viewportwidget.md#inherittheme)
- [onFocusDropped](viewportwidget.md#onfocusdropped)
- [paint](viewportwidget.md#paint)
- [populateLayout](viewportwidget.md#populatelayout)
- [postLayoutUpdate](viewportwidget.md#postlayoutupdate)
- [preLayoutUpdate](viewportwidget.md#prelayoutupdate)
- [resolveLayout](viewportwidget.md#resolvelayout)
- [setThemeOverride](viewportwidget.md#setthemeoverride)
- [updateInheritedTheme](viewportwidget.md#updateinheritedtheme)

## Constructors

### constructor

• **new ViewportWidget**(`child`, `mainBasisTied?`, `crossBasisTied?`, `themeOverride?`)

Create a new ViewportWidget.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `child` | [`Widget`](widget.md) | `undefined` |
| `mainBasisTied` | `boolean` | `false` |
| `crossBasisTied` | `boolean` | `false` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

Mixin(SingleParent, FlexLayout).constructor

#### Defined in

[widgets/ViewportWidget.ts:50](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L50)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](viewportwidget.md#children) for the public iterator getter.

#### Inherited from

Mixin(SingleParent, FlexLayout).\_children

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

Mixin(SingleParent, FlexLayout).\_dirty

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

Mixin(SingleParent, FlexLayout).\_layoutDirty

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L25)

___

### \_offset

• `Private` **\_offset**: [`number`, `number`]

Offset of [child](viewportwidget.md#child). Positional events will take this into account,
as well as rendering. Useful for implementing scrolling.

#### Defined in

[widgets/ViewportWidget.ts:35](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L35)

___

### crossBasisTied

• **crossBasisTied**: `boolean`

Is the cross basis tied to the child's?

#### Defined in

[widgets/ViewportWidget.ts:28](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L28)

___

### lastChildLayoutCtx

• `Private` **lastChildLayoutCtx**: ``null`` \| [`LayoutContext`](layoutcontext.md) = `null`

Layout context used by [child](viewportwidget.md#child). Can be null if no layout update is
required.

#### Defined in

[widgets/ViewportWidget.ts:40](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L40)

___

### lastVertical

• **lastVertical**: `boolean` = `true`

Was the last layout vertical or not? Never null. Use this to tell if a
widget is vertical or not when painting.

#### Inherited from

Mixin(SingleParent, FlexLayout).lastVertical

#### Defined in

[mixins/FlexLayout.ts:56](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L56)

___

### lastViewportDims

• **lastViewportDims**: [`number`, `number`]

What were the last dimensions of the viewport widget? Useful for
scrolling,

#### Defined in

[widgets/ViewportWidget.ts:50](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L50)

___

### mainBasisTied

• **mainBasisTied**: `boolean`

Is the main basis tied to the child's?

#### Defined in

[widgets/ViewportWidget.ts:26](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L26)

___

### maxDimensions

• **maxDimensions**: [`number`, `number`]

Max dimensions. Not the effective max dimensions; those are set every
frame and are the viewport's max dimensions.

#### Defined in

[widgets/ViewportWidget.ts:45](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L45)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

Mixin(SingleParent, FlexLayout).needsClear

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L31)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

Mixin(SingleParent, FlexLayout).propagatesEvents

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

Mixin(SingleParent, FlexLayout).resolvedHeight

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

Mixin(SingleParent, FlexLayout).resolvedWidth

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L49)

___

### viewport

• `Private` **viewport**: [`Viewport`](viewport.md)

The actual viewport object.

#### Defined in

[widgets/ViewportWidget.ts:30](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L30)

## Accessors

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

Get [viewport](viewportwidget.md#viewport)'s
[canvasDimensions](viewport.md#canvasdimensions).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/ViewportWidget.ts:67](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L67)

___

### child

• `get` **child**(): [`Widget`](widget.md)

This widget's child.

#### Returns

[`Widget`](widget.md)

#### Defined in

[mixins/SingleParent.ts:22](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/SingleParent.ts#L22)

___

### childCount

• `get` **childCount**(): `number`

Get amount of children of this parent widget.

#### Returns

`number`

#### Defined in

[mixins/Parent.ts:60](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/Parent.ts#L60)

___

### children

• `get` **children**(): `Iterable`<[`Widget`](widget.md)\>

Get iterator for children of this parent widget. Cannot modify list of
children via this iterator; for read-only purposes only.

#### Returns

`Iterable`<[`Widget`](widget.md)\>

#### Defined in

[mixins/Parent.ts:68](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/Parent.ts#L68)

___

### crossBasis

• `get` **crossBasis**(): `number`

The basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:98](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L98)

• `set` **crossBasis**(`crossBasis`): `void`

The basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:102](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L102)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](viewportwidget.md#resolvedwidth) and [resolvedHeight](viewportwidget.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](viewportwidget.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](viewportwidget.md#_layoutdirty) is set to true
and [_dirty](viewportwidget.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](viewportwidget.md#_layoutdirty) is set to true
and [_dirty](viewportwidget.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `enabled` | `boolean` |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:96](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L96)

___

### flexRatio

• `get` **flexRatio**(): `number`

The flex ratio of the flexbox

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:59](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L59)

• `set` **flexRatio**(`flexRatio`): `void`

The flex ratio of the flexbox

#### Parameters

| Name | Type |
| :------ | :------ |
| `flexRatio` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:63](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L63)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](viewportwidget.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](viewportwidget.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:180](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L180)

___

### internalCrossBasis

• `get` **internalCrossBasis**(): `number`

The internal basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:122](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L122)

• `set` **internalCrossBasis**(`internalCrossBasis`): `void`

The internal basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalCrossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:126](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L126)

___

### internalMainBasis

• `get` **internalMainBasis**(): `number`

The internal basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:110](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L110)

• `set` **internalMainBasis**(`internalMainBasis`): `void`

The internal basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalMainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:114](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L114)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](viewportwidget.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L202)

___

### mainBasis

• `get` **mainBasis**(): `number`

The basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:86](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L86)

• `set` **mainBasis**(`mainBasis`): `void`

The basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:90](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L90)

___

### offset

• `get` **offset**(): [`number`, `number`]

The offset of [child](viewportwidget.md#child), used for scrolling.

If getting, creates a clone of [_offset](viewportwidget.md#_offset).

If setting, sets each value in [_offset](viewportwidget.md#_offset) to the wanted one, so old
references are still valid. [_dirty](viewportwidget.md#_dirty) is set to true. Nothing
happens if the offset is unchanged.

#### Returns

[`number`, `number`]

#### Defined in

[widgets/ViewportWidget.ts:80](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L80)

• `set` **offset**(`offset`): `void`

The offset of [child](viewportwidget.md#child), used for scrolling.

If getting, creates a clone of [_offset](viewportwidget.md#_offset).

If setting, sets each value in [_offset](viewportwidget.md#_offset) to the wanted one, so old
references are still valid. [_dirty](viewportwidget.md#_dirty) is set to true. Nothing
happens if the offset is unchanged.

#### Parameters

| Name | Type |
| :------ | :------ |
| `offset` | [`number`, `number`] |

#### Returns

`void`

#### Defined in

[widgets/ViewportWidget.ts:84](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L84)

___

### theme

• `get` **theme**(): [`Theme`](theme.md)

The current theme in use by the Widget. If there is no theme, throws an
exception.

#### Returns

[`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:81](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L81)

___

### themeOverride

• `get` **themeOverride**(): ``null`` \| [`Theme`](theme.md)

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](viewportwidget.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:144](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L144)

• `set` **themeOverride**(`theme`): `void`

The theme override used by the Widget. If this is null, the Widget's
theme will be the inherited theme, else, it will be the theme override
with the inherited theme as the fallback. The fallback of the theme
override will be ignored and replaced.

If setting, calls [setThemeOverride](viewportwidget.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L140)

___

### vertical

• `get` **vertical**(): ``null`` \| `boolean`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Returns

``null`` \| `boolean`

#### Defined in

[mixins/FlexLayout.ts:74](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L74)

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

[mixins/FlexLayout.ts:78](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/FlexLayout.ts#L78)

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

Mixin(SingleParent, FlexLayout).clear

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](viewportwidget.md#handleevent) method is called and its result is
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

Mixin(SingleParent, FlexLayout).dispatchEvent

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).forceLayoutDirty

#### Defined in

[mixins/Parent.ts:49](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/Parent.ts#L49)

___

### getChildCrossBasis

▸ `Private` **getChildCrossBasis**(`vertical`): `number`

Get the cross basis of the [child](viewportwidget.md#child)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertical` | `boolean` |

#### Returns

`number`

#### Defined in

[widgets/ViewportWidget.ts:107](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L107)

___

### getChildMainBasis

▸ `Private` **getChildMainBasis**(`vertical`): `number`

Get the main basis of the [child](viewportwidget.md#child)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertical` | `boolean` |

#### Returns

`number`

#### Defined in

[widgets/ViewportWidget.ts:93](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L93)

___

### getMaxCrossBasis

▸ `Private` **getMaxCrossBasis**(`vertical`): `number`

Get the max length along the cross axis of the [child](viewportwidget.md#child)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertical` | `boolean` |

#### Returns

`number`

#### Defined in

[widgets/ViewportWidget.ts:118](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L118)

___

### getMaxMainBasis

▸ `Private` **getMaxMainBasis**(`vertical`): `number`

Get the max length along the main axis of the [child](viewportwidget.md#child)

#### Parameters

| Name | Type |
| :------ | :------ |
| `vertical` | `boolean` |

#### Returns

`number`

#### Defined in

[widgets/ViewportWidget.ts:112](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L112)

___

### handleEvent

▸ `Protected` **handleEvent**(`event`, `_width`, `_height`, `root`): ``null`` \| [`Widget`](widget.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `_width` | `number` |
| `_height` | `number` |
| `root` | [`Root`](root.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Overrides

Mixin(SingleParent, FlexLayout).handleEvent

#### Defined in

[widgets/ViewportWidget.ts:122](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L122)

___

### handlePainting

▸ `Protected` **handlePainting**(`x`, `y`, `width`, `height`, `ctx`): `void`

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

Mixin(SingleParent, FlexLayout).handlePainting

#### Defined in

[widgets/ViewportWidget.ts:243](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L243)

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

Mixin(SingleParent, FlexLayout).handlePopulateLayout

#### Defined in

[widgets/Widget.ts:279](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L279)

___

### handlePostLayoutUpdate

▸ `Protected` **handlePostLayoutUpdate**(`root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

Mixin(SingleParent, FlexLayout).handlePostLayoutUpdate

#### Defined in

[widgets/ViewportWidget.ts:206](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L206)

___

### handlePreLayoutUpdate

▸ `Protected` **handlePreLayoutUpdate**(`root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

Mixin(SingleParent, FlexLayout).handlePreLayoutUpdate

#### Defined in

[widgets/ViewportWidget.ts:153](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/ViewportWidget.ts#L153)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`_layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](viewportwidget.md#resolvedwidth) and [resolvedHeight](viewportwidget.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).handleResolveLayout

#### Defined in

[widgets/Widget.ts:288](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L288)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](viewportwidget.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](viewportwidget.md#_layoutdirty) and [_dirty](viewportwidget.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).inheritTheme

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L158)

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

Mixin(SingleParent, FlexLayout).onFocusDropped

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](viewportwidget.md#needsclear) is true, calls the [handlePainting](viewportwidget.md#handlepainting) method and
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

Mixin(SingleParent, FlexLayout).paint

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](viewportwidget.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).populateLayout

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](viewportwidget.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).postLayoutUpdate

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](viewportwidget.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).preLayoutUpdate

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](viewportwidget.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](viewportwidget.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](viewportwidget.md#_dirty) is set to true.
[_layoutDirty](viewportwidget.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).resolveLayout

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](viewportwidget.md#_layoutdirty) and
[_dirty](viewportwidget.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).setThemeOverride

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/widgets/Widget.ts#L116)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

#### Returns

`void`

#### Inherited from

Mixin(SingleParent, FlexLayout).updateInheritedTheme

#### Defined in

[mixins/Parent.ts:41](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/mixins/Parent.ts#L41)
