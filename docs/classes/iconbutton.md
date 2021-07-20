[canvas-ui](../README.md) / IconButton

# Class: IconButton

A [Button](button.md) with an [Icon](icon.md) inside a [Margin](margin.md).

## Hierarchy

- [`Button`](button.md)

  ↳ **`IconButton`**

## Table of contents

### Constructors

- [constructor](iconbutton.md#constructor)

### Properties

- [\_children](iconbutton.md#_children)
- [\_dirty](iconbutton.md#_dirty)
- [\_lastLayoutCtx](iconbutton.md#_lastlayoutctx)
- [\_layoutDirty](iconbutton.md#_layoutdirty)
- [callback](iconbutton.md#callback)
- [clickState](iconbutton.md#clickstate)
- [clickStateChanged](iconbutton.md#clickstatechanged)
- [lastClickState](iconbutton.md#lastclickstate)
- [lastVertical](iconbutton.md#lastvertical)
- [needsClear](iconbutton.md#needsclear)
- [pointerPos](iconbutton.md#pointerpos)
- [propagatesEvents](iconbutton.md#propagatesevents)
- [resolvedHeight](iconbutton.md#resolvedheight)
- [resolvedWidth](iconbutton.md#resolvedwidth)
- [startingPointerPos](iconbutton.md#startingpointerpos)
- [wasClick](iconbutton.md#wasclick)

### Accessors

- [child](iconbutton.md#child)
- [childCount](iconbutton.md#childcount)
- [children](iconbutton.md#children)
- [crossBasis](iconbutton.md#crossbasis)
- [dimensions](iconbutton.md#dimensions)
- [dirty](iconbutton.md#dirty)
- [enabled](iconbutton.md#enabled)
- [flexRatio](iconbutton.md#flexratio)
- [inheritedTheme](iconbutton.md#inheritedtheme)
- [internalCrossBasis](iconbutton.md#internalcrossbasis)
- [internalMainBasis](iconbutton.md#internalmainbasis)
- [layoutDirty](iconbutton.md#layoutdirty)
- [mainBasis](iconbutton.md#mainbasis)
- [theme](iconbutton.md#theme)
- [themeOverride](iconbutton.md#themeoverride)
- [vertical](iconbutton.md#vertical)

### Methods

- [clear](iconbutton.md#clear)
- [dispatchEvent](iconbutton.md#dispatchevent)
- [forceLayoutDirty](iconbutton.md#forcelayoutdirty)
- [getNormalInRect](iconbutton.md#getnormalinrect)
- [handleClickEvent](iconbutton.md#handleclickevent)
- [handleEvent](iconbutton.md#handleevent)
- [handlePainting](iconbutton.md#handlepainting)
- [handlePopulateLayout](iconbutton.md#handlepopulatelayout)
- [handlePostLayoutUpdate](iconbutton.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](iconbutton.md#handleprelayoutupdate)
- [handleResolveLayout](iconbutton.md#handleresolvelayout)
- [inheritTheme](iconbutton.md#inherittheme)
- [isNormalInRect](iconbutton.md#isnormalinrect)
- [isPointInRect](iconbutton.md#ispointinrect)
- [onFocusDropped](iconbutton.md#onfocusdropped)
- [paint](iconbutton.md#paint)
- [populateLayout](iconbutton.md#populatelayout)
- [postLayoutUpdate](iconbutton.md#postlayoutupdate)
- [preLayoutUpdate](iconbutton.md#prelayoutupdate)
- [resolveLayout](iconbutton.md#resolvelayout)
- [setThemeOverride](iconbutton.md#setthemeoverride)
- [updateInheritedTheme](iconbutton.md#updateinheritedtheme)

## Constructors

### constructor

• **new IconButton**(`image`, `width?`, `height?`, `viewBox?`, `callback?`, `flexRatio?`, `mainBasis?`, `crossBasis?`, `vertical?`, `themeOverride?`)

Create a new IconButton.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `image` | `HTMLImageElement` | `undefined` |
| `width` | ``null`` \| `number` | `null` |
| `height` | ``null`` \| `number` | `null` |
| `viewBox` | ``null`` \| [`number`, `number`, `number`, `number`] | `null` |
| `callback` | ``null`` \| () => `void` | `null` |
| `flexRatio` | `number` | `0` |
| `mainBasis` | `number` | `0` |
| `crossBasis` | `number` | `0` |
| `vertical` | ``null`` \| `boolean` | `null` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

[Button](button.md).[constructor](button.md#constructor)

#### Defined in

[widgets/IconButton.ts:11](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/IconButton.ts#L11)

## Properties

### \_children

• `Protected` `Readonly` **\_children**: [`Widget`](widget.md)[]

This widget's children. Note that this is marked as readonly so that it
cannot be accidentally replaced with a new array. This way, references to
this array are always valid. If you want to clear this array, set the
length to zero instead of creating a new instance. readonly still means
that you can add/remove elements to/from the array.

See [children](iconbutton.md#children) for the public iterator getter.

#### Inherited from

[Button](button.md).[_children](button.md#_children)

#### Defined in

[mixins/Parent.ts:29](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Parent.ts#L29)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

[Button](button.md).[_dirty](button.md#_dirty)

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L23)

___

### \_lastLayoutCtx

• `Protected` **\_lastLayoutCtx**: ``null`` \| [`LayoutContext`](layoutcontext.md) = `null`

Last layout context used for child

#### Inherited from

[Button](button.md).[_lastLayoutCtx](button.md#_lastlayoutctx)

#### Defined in

[widgets/FlexContainer.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/FlexContainer.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

[Button](button.md).[_layoutDirty](button.md#_layoutdirty)

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L25)

___

### callback

• **callback**: ``null`` \| () => `void`

The callback for clicking this button. If null, the button is not
clickable but will still absorb events.

#### Inherited from

[Button](button.md).[callback](button.md#callback)

#### Defined in

[widgets/Button.ts:20](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Button.ts#L20)

___

### clickState

• `Protected` **clickState**: [`ClickState`](../enums/clickstate.md)

The current click state

#### Inherited from

[Button](button.md).[clickState](button.md#clickstate)

#### Defined in

[mixins/Clickable.ts:36](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L36)

___

### clickStateChanged

• `Protected` **clickStateChanged**: `boolean` = `false`

Did the last click event handle result in a click state change?

#### Inherited from

[Button](button.md).[clickStateChanged](button.md#clickstatechanged)

#### Defined in

[mixins/Clickable.ts:38](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L38)

___

### lastClickState

• `Protected` **lastClickState**: [`ClickState`](../enums/clickstate.md)

Last click state

#### Inherited from

[Button](button.md).[lastClickState](button.md#lastclickstate)

#### Defined in

[mixins/Clickable.ts:34](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L34)

___

### lastVertical

• **lastVertical**: `boolean` = `true`

Was the last layout vertical or not? Never null. Use this to tell if a
widget is vertical or not when painting.

#### Inherited from

[Button](button.md).[lastVertical](button.md#lastvertical)

#### Defined in

[mixins/FlexLayout.ts:56](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L56)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

[Button](button.md).[needsClear](button.md#needsclear)

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L31)

___

### pointerPos

• `Protected` **pointerPos**: ``null`` \| [`number`, `number`] = `null`

Last pointer position in normalised coordinates ([0,0] to [1,1]). If
there is no last pointer position, such as after a leave event, this will
be null. If pointer position was outside box, it will be beyond the [0,0]
to [1,1] range.

#### Inherited from

[Button](button.md).[pointerPos](button.md#pointerpos)

#### Defined in

[mixins/Clickable.ts:47](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L47)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

[Button](button.md).[propagatesEvents](button.md#propagatesevents)

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

[Button](button.md).[resolvedHeight](button.md#resolvedheight)

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

[Button](button.md).[resolvedWidth](button.md#resolvedwidth)

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L49)

___

### startingPointerPos

• `Protected` **startingPointerPos**: ``null`` \| [`number`, `number`] = `null`

Like [pointerPos](iconbutton.md#pointerpos), but only updated when a hold state begins.

Useful for implementing draggable widgets.

#### Inherited from

[Button](button.md).[startingPointerPos](button.md#startingpointerpos)

#### Defined in

[mixins/Clickable.ts:53](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L53)

___

### wasClick

• `Protected` **wasClick**: `boolean` = `false`

Did the last click state change result in a click?

#### Inherited from

[Button](button.md).[wasClick](button.md#wasclick)

#### Defined in

[mixins/Clickable.ts:40](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L40)

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

### crossBasis

• `get` **crossBasis**(): `number`

The basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:98](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L98)

• `set` **crossBasis**(`crossBasis`): `void`

The basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:102](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L102)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](iconbutton.md#resolvedwidth) and [resolvedHeight](iconbutton.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](iconbutton.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](iconbutton.md#_layoutdirty) is set to true
and [_dirty](iconbutton.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](iconbutton.md#_layoutdirty) is set to true
and [_dirty](iconbutton.md#_dirty) is set to true if enabled or false if not enabled.

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

### flexRatio

• `get` **flexRatio**(): `number`

The flex ratio of the flexbox

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:59](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L59)

• `set` **flexRatio**(`flexRatio`): `void`

The flex ratio of the flexbox

#### Parameters

| Name | Type |
| :------ | :------ |
| `flexRatio` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:63](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L63)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](iconbutton.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](iconbutton.md#inherittheme).

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

### internalCrossBasis

• `get` **internalCrossBasis**(): `number`

The internal basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:122](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L122)

• `set` **internalCrossBasis**(`internalCrossBasis`): `void`

The internal basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalCrossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:126](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L126)

___

### internalMainBasis

• `get` **internalMainBasis**(): `number`

The internal basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:110](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L110)

• `set` **internalMainBasis**(`internalMainBasis`): `void`

The internal basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalMainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:114](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L114)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](iconbutton.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L202)

___

### mainBasis

• `get` **mainBasis**(): `number`

The basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:86](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L86)

• `set` **mainBasis**(`mainBasis`): `void`

The basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:90](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L90)

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

If setting, calls [setThemeOverride](iconbutton.md#setthemeoverride).

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

If setting, calls [setThemeOverride](iconbutton.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L140)

___

### vertical

• `get` **vertical**(): ``null`` \| `boolean`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Returns

``null`` \| `boolean`

#### Defined in

[mixins/FlexLayout.ts:74](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L74)

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

[mixins/FlexLayout.ts:78](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/FlexLayout.ts#L78)

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

[Button](button.md).[clear](button.md#clear)

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](iconbutton.md#handleevent) method is called and its result is
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

[Button](button.md).[dispatchEvent](button.md#dispatchevent)

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](iconbutton.md#_layoutdirty) and [_dirty](iconbutton.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

[Button](button.md).[forceLayoutDirty](button.md#forcelayoutdirty)

#### Defined in

[widgets/Widget.ts:338](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L338)

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

[Button](button.md).[getNormalInRect](button.md#getnormalinrect)

#### Defined in

[mixins/Clickable.ts:66](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L66)

___

### handleClickEvent

▸ `Protected` **handleClickEvent**(`event`, `root`, `clickArea`): `void`

Updates the current [clickState](iconbutton.md#clickstate) given an event, as well as
[focus](domroot.md#_foci), [pointerStyle](domroot.md#pointerstyle), [wasClick](iconbutton.md#wasclick) and
[clickStateChanged](iconbutton.md#clickstatechanged) flags.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `root` | [`Root`](root.md) |
| `clickArea` | [`number`, `number`, `number`, `number`] |

#### Returns

`void`

#### Inherited from

[Button](button.md).[handleClickEvent](button.md#handleclickevent)

#### Defined in

[mixins/Clickable.ts:122](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L122)

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

[Button](button.md).[handleEvent](button.md#handleevent)

#### Defined in

[widgets/Button.ts:28](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Button.ts#L28)

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

[Button](button.md).[handlePainting](button.md#handlepainting)

#### Defined in

[widgets/Widget.ts:383](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L383)

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

[Button](button.md).[handlePopulateLayout](button.md#handlepopulatelayout)

#### Defined in

[widgets/Widget.ts:279](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L279)

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

[Button](button.md).[handlePostLayoutUpdate](button.md#handlepostlayoutupdate)

#### Defined in

[widgets/Widget.ts:348](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L348)

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

[Button](button.md).[handlePreLayoutUpdate](button.md#handleprelayoutupdate)

#### Defined in

[widgets/Widget.ts:262](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L262)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`_layoutCtx`): `void`

The second Widget layout resolution callback. Resolves the layout of this
widget (sets [resolvedWidth](iconbutton.md#resolvedwidth) and [resolvedHeight](iconbutton.md#resolvedheight)).Must be
implemented. If called and not implemented, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Button](button.md).[handleResolveLayout](button.md#handleresolvelayout)

#### Defined in

[widgets/Widget.ts:288](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L288)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](iconbutton.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](iconbutton.md#_layoutdirty) and [_dirty](iconbutton.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Button](button.md).[inheritTheme](button.md#inherittheme)

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L158)

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

[Button](button.md).[isNormalInRect](button.md#isnormalinrect)

#### Defined in

[mixins/Clickable.ts:95](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L95)

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

[Button](button.md).[isPointInRect](button.md#ispointinrect)

#### Defined in

[mixins/Clickable.ts:81](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/mixins/Clickable.ts#L81)

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

[Button](button.md).[onFocusDropped](button.md#onfocusdropped)

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](iconbutton.md#needsclear) is true, calls the [handlePainting](iconbutton.md#handlepainting) method and
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

[Button](button.md).[paint](button.md#paint)

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](iconbutton.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Button](button.md).[populateLayout](button.md#populatelayout)

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](iconbutton.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Button](button.md).[postLayoutUpdate](button.md#postlayoutupdate)

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](iconbutton.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[Button](button.md).[preLayoutUpdate](button.md#prelayoutupdate)

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](iconbutton.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](iconbutton.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](iconbutton.md#_dirty) is set to true.
[_layoutDirty](iconbutton.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

[Button](button.md).[resolveLayout](button.md#resolvelayout)

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](iconbutton.md#_layoutdirty) and
[_dirty](iconbutton.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

[Button](button.md).[setThemeOverride](button.md#setthemeoverride)

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

[Button](button.md).[updateInheritedTheme](button.md#updateinheritedtheme)

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/widgets/Widget.ts#L65)
