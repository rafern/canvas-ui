[canvas-ui](../README.md) / ScrollBar

# Class: ScrollBar

A scrollbar flexbox widget which can be both vertical and horizontal.

## Hierarchy

- [`FlexLayout`](flexlayout.md)<`this`\> & [`Clickable`](clickable.md)<`this`\> & [`NumberVariable`](numbervariable.md)<`this`\>

  ↳ **`ScrollBar`**

## Table of contents

### Constructors

- [constructor](scrollbar.md#constructor)

### Properties

- [\_barLength](scrollbar.md#_barlength)
- [\_dirty](scrollbar.md#_dirty)
- [\_end](scrollbar.md#_end)
- [\_layoutDirty](scrollbar.md#_layoutdirty)
- [callback](scrollbar.md#callback)
- [clickState](scrollbar.md#clickstate)
- [clickStateChanged](scrollbar.md#clickstatechanged)
- [dragValue](scrollbar.md#dragvalue)
- [lastClickState](scrollbar.md#lastclickstate)
- [lastVertical](scrollbar.md#lastvertical)
- [needsClear](scrollbar.md#needsclear)
- [pointerPos](scrollbar.md#pointerpos)
- [propagatesEvents](scrollbar.md#propagatesevents)
- [resolvedHeight](scrollbar.md#resolvedheight)
- [resolvedWidth](scrollbar.md#resolvedwidth)
- [startingPointerPos](scrollbar.md#startingpointerpos)
- [wasClick](scrollbar.md#wasclick)

### Accessors

- [barLength](scrollbar.md#barlength)
- [crossBasis](scrollbar.md#crossbasis)
- [dimensions](scrollbar.md#dimensions)
- [dirty](scrollbar.md#dirty)
- [enabled](scrollbar.md#enabled)
- [end](scrollbar.md#end)
- [flexRatio](scrollbar.md#flexratio)
- [inheritedTheme](scrollbar.md#inheritedtheme)
- [internalCrossBasis](scrollbar.md#internalcrossbasis)
- [internalMainBasis](scrollbar.md#internalmainbasis)
- [layoutDirty](scrollbar.md#layoutdirty)
- [mainBasis](scrollbar.md#mainbasis)
- [theme](scrollbar.md#theme)
- [themeOverride](scrollbar.md#themeoverride)
- [value](scrollbar.md#value)
- [vertical](scrollbar.md#vertical)

### Methods

- [clear](scrollbar.md#clear)
- [dispatchEvent](scrollbar.md#dispatchevent)
- [forceLayoutDirty](scrollbar.md#forcelayoutdirty)
- [getBarRect](scrollbar.md#getbarrect)
- [getNormalInRect](scrollbar.md#getnormalinrect)
- [handleClickEvent](scrollbar.md#handleclickevent)
- [handleEvent](scrollbar.md#handleevent)
- [handlePainting](scrollbar.md#handlepainting)
- [handlePopulateLayout](scrollbar.md#handlepopulatelayout)
- [handlePostLayoutUpdate](scrollbar.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](scrollbar.md#handleprelayoutupdate)
- [handleResolveLayout](scrollbar.md#handleresolvelayout)
- [inheritTheme](scrollbar.md#inherittheme)
- [isNormalInRect](scrollbar.md#isnormalinrect)
- [isPointInRect](scrollbar.md#ispointinrect)
- [onFocusDropped](scrollbar.md#onfocusdropped)
- [paint](scrollbar.md#paint)
- [populateLayout](scrollbar.md#populatelayout)
- [postLayoutUpdate](scrollbar.md#postlayoutupdate)
- [preLayoutUpdate](scrollbar.md#prelayoutupdate)
- [resolveLayout](scrollbar.md#resolvelayout)
- [setThemeOverride](scrollbar.md#setthemeoverride)
- [setValue](scrollbar.md#setvalue)
- [updateInheritedTheme](scrollbar.md#updateinheritedtheme)

## Constructors

### constructor

• **new ScrollBar**(`callback?`, `end?`, `barLength?`, `initialValue?`, `themeOverride?`)

Create a new ScrollBar

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callback` | ``null`` \| [`VariableCallback`](../README.md#variablecallback)<`number`\> | `null` |
| `end` | `number` | `100` |
| `barLength` | `number` | `100` |
| `initialValue` | `number` | `0` |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Overrides

Mixin(FlexLayout, Clickable, NumberVariable).constructor

#### Defined in

[widgets/ScrollBar.ts:24](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L24)

## Properties

### \_barLength

• `Private` **\_barLength**: `number`

The scrollbar's bar length, in ratios similar to flex ratio.

#### Defined in

[widgets/ScrollBar.ts:22](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L22)

___

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).\_dirty

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L23)

___

### \_end

• `Private` **\_end**: `number`

The scrollbar's end. Maximum value will be
max(min(end - [barLength](scrollbar.md#barlength), [value](scrollbar.md#value)), 0).

#### Defined in

[widgets/ScrollBar.ts:20](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L20)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).\_layoutDirty

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L25)

___

### callback

• `Protected` **callback**: ``null`` \| [`VariableCallback`](../README.md#variablecallback)<`number`\> = `null`

The callback for when the value is changed.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).callback

#### Defined in

[mixins/Variable.ts:29](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Variable.ts#L29)

___

### clickState

• `Protected` **clickState**: [`ClickState`](../enums/clickstate.md)

The current click state

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).clickState

#### Defined in

[mixins/Clickable.ts:36](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L36)

___

### clickStateChanged

• `Protected` **clickStateChanged**: `boolean` = `false`

Did the last click event handle result in a click state change?

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).clickStateChanged

#### Defined in

[mixins/Clickable.ts:38](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L38)

___

### dragValue

• `Private` **dragValue**: `number`

What was the value when dragging began?

#### Defined in

[widgets/ScrollBar.ts:24](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L24)

___

### lastClickState

• `Protected` **lastClickState**: [`ClickState`](../enums/clickstate.md)

Last click state

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).lastClickState

#### Defined in

[mixins/Clickable.ts:34](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L34)

___

### lastVertical

• **lastVertical**: `boolean` = `true`

Was the last layout vertical or not? Never null. Use this to tell if a
widget is vertical or not when painting.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).lastVertical

#### Defined in

[mixins/FlexLayout.ts:56](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L56)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).needsClear

#### Defined in

[widgets/Widget.ts:31](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L31)

___

### pointerPos

• `Protected` **pointerPos**: ``null`` \| [`number`, `number`] = `null`

Last pointer position in normalised coordinates ([0,0] to [1,1]). If
there is no last pointer position, such as after a leave event, this will
be null. If pointer position was outside box, it will be beyond the [0,0]
to [1,1] range.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).pointerPos

#### Defined in

[mixins/Clickable.ts:47](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L47)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).propagatesEvents

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).resolvedHeight

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).resolvedWidth

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L49)

___

### startingPointerPos

• `Protected` **startingPointerPos**: ``null`` \| [`number`, `number`] = `null`

Like [pointerPos](scrollbar.md#pointerpos), but only updated when a hold state begins.

Useful for implementing draggable widgets.

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).startingPointerPos

#### Defined in

[mixins/Clickable.ts:53](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L53)

___

### wasClick

• `Protected` **wasClick**: `boolean` = `false`

Did the last click state change result in a click?

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).wasClick

#### Defined in

[mixins/Clickable.ts:40](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L40)

## Accessors

### barLength

• `get` **barLength**(): `number`

The scrollbar's bar length; the length of the viewable zone along the
scrollable axis. For example, if this is a vertical scrollbar, this value
would be the resolved height of the viewport wrapping the widget being
scrolled.

Tied to [_barLength](scrollbar.md#_barlength). If changed, [_dirty](scrollbar.md#_dirty) is set to true.

#### Returns

`number`

#### Defined in

[widgets/ScrollBar.ts:65](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L65)

• `set` **barLength**(`barLength`): `void`

The scrollbar's bar length; the length of the viewable zone along the
scrollable axis. For example, if this is a vertical scrollbar, this value
would be the resolved height of the viewport wrapping the widget being
scrolled.

Tied to [_barLength](scrollbar.md#_barlength). If changed, [_dirty](scrollbar.md#_dirty) is set to true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `barLength` | `number` |

#### Returns

`void`

#### Defined in

[widgets/ScrollBar.ts:69](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L69)

___

### crossBasis

• `get` **crossBasis**(): `number`

The basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:98](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L98)

• `set` **crossBasis**(`crossBasis`): `void`

The basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `crossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:102](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L102)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](scrollbar.md#resolvedwidth) and [resolvedHeight](scrollbar.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](scrollbar.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](scrollbar.md#_layoutdirty) is set to true
and [_dirty](scrollbar.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](scrollbar.md#_layoutdirty) is set to true
and [_dirty](scrollbar.md#_dirty) is set to true if enabled or false if not enabled.

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

### end

• `get` **end**(): `number`

The scrollbar's end; the length of the scrollable axis. For example, if
this is a vertical scrollbar, this value would be the resolved height of
the widget being scrolled.

Tied to [_end](scrollbar.md#_end). If changed, [_dirty](scrollbar.md#_dirty) is set to true.

#### Returns

`number`

#### Defined in

[widgets/ScrollBar.ts:46](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L46)

• `set` **end**(`end`): `void`

The scrollbar's end; the length of the scrollable axis. For example, if
this is a vertical scrollbar, this value would be the resolved height of
the widget being scrolled.

Tied to [_end](scrollbar.md#_end). If changed, [_dirty](scrollbar.md#_dirty) is set to true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `end` | `number` |

#### Returns

`void`

#### Defined in

[widgets/ScrollBar.ts:50](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L50)

___

### flexRatio

• `get` **flexRatio**(): `number`

The flex ratio of the flexbox

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:59](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L59)

• `set` **flexRatio**(`flexRatio`): `void`

The flex ratio of the flexbox

#### Parameters

| Name | Type |
| :------ | :------ |
| `flexRatio` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:63](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L63)

___

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](scrollbar.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](scrollbar.md#inherittheme).

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

### internalCrossBasis

• `get` **internalCrossBasis**(): `number`

The internal basis added along the cross axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:122](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L122)

• `set` **internalCrossBasis**(`internalCrossBasis`): `void`

The internal basis added along the cross axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalCrossBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:126](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L126)

___

### internalMainBasis

• `get` **internalMainBasis**(): `number`

The internal basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:110](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L110)

• `set` **internalMainBasis**(`internalMainBasis`): `void`

The internal basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `internalMainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:114](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L114)

___

### layoutDirty

• `get` **layoutDirty**(): `boolean`

Check if the widget's layout is dirty. Returns [_layoutDirty](scrollbar.md#_layoutdirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:202](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L202)

___

### mainBasis

• `get` **mainBasis**(): `number`

The basis added along the main axis

#### Returns

`number`

#### Defined in

[mixins/FlexLayout.ts:86](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L86)

• `set` **mainBasis**(`mainBasis`): `void`

The basis added along the main axis

#### Parameters

| Name | Type |
| :------ | :------ |
| `mainBasis` | `number` |

#### Returns

`void`

#### Defined in

[mixins/FlexLayout.ts:90](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L90)

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

If setting, calls [setThemeOverride](scrollbar.md#setthemeoverride).

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

If setting, calls [setThemeOverride](scrollbar.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L140)

___

### value

• `get` **value**(): `V`

The current value.

If getting, throws an exception if [_value](variable.md#_value) is undefined.

If setting, [setValue](scrollbar.md#setvalue) is called.

#### Returns

`V`

#### Defined in

[mixins/Variable.ts:45](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Variable.ts#L45)

• `set` **value**(`value`): `void`

The current value.

If getting, throws an exception if [_value](variable.md#_value) is undefined.

If setting, [setValue](scrollbar.md#setvalue) is called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

#### Returns

`void`

#### Defined in

[mixins/Variable.ts:52](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Variable.ts#L52)

___

### vertical

• `get` **vertical**(): ``null`` \| `boolean`

Does this flex layout grow vertically? If null, it inherits the
verticality of the layout context when populating/resolving layout.

#### Returns

``null`` \| `boolean`

#### Defined in

[mixins/FlexLayout.ts:74](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L74)

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

[mixins/FlexLayout.ts:78](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L78)

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

Mixin(FlexLayout, Clickable, NumberVariable).clear

#### Defined in

[widgets/Widget.ts:365](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L365)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](scrollbar.md#handleevent) method is called and its result is
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

Mixin(FlexLayout, Clickable, NumberVariable).dispatchEvent

#### Defined in

[widgets/Widget.ts:241](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L241)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](scrollbar.md#_layoutdirty) and [_dirty](scrollbar.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).forceLayoutDirty

#### Defined in

[widgets/Widget.ts:338](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L338)

___

### getBarRect

▸ `Private` **getBarRect**(`x`, `y`, `width`, `height`): [`number`, `number`, `number`, `number`]

Get the rectangle where the scrollbar will be painted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |

#### Returns

[`number`, `number`, `number`, `number`]

Returns a 4-tuple containing, in this order, the left edge's offset, the width, the top edge's offset and the height.

#### Defined in

[widgets/ScrollBar.ts:88](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L88)

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

Mixin(FlexLayout, Clickable, NumberVariable).getNormalInRect

#### Defined in

[mixins/Clickable.ts:66](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L66)

___

### handleClickEvent

▸ `Protected` **handleClickEvent**(`event`, `root`, `clickArea`): `void`

Updates the current [clickState](scrollbar.md#clickstate) given an event, as well as
[focus](domroot.md#_foci), [pointerStyle](domroot.md#pointerstyle), [wasClick](scrollbar.md#wasclick) and
[clickStateChanged](scrollbar.md#clickstatechanged) flags.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `root` | [`Root`](root.md) |
| `clickArea` | [`number`, `number`, `number`, `number`] |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).handleClickEvent

#### Defined in

[mixins/Clickable.ts:122](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L122)

___

### handleEvent

▸ `Protected` **handleEvent**(`event`, `width`, `height`, `root`): [`ScrollBar`](scrollbar.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `width` | `number` |
| `height` | `number` |
| `root` | [`Root`](root.md) |

#### Returns

[`ScrollBar`](scrollbar.md)

#### Overrides

Mixin(FlexLayout, Clickable, NumberVariable).handleEvent

#### Defined in

[widgets/ScrollBar.ts:101](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L101)

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

Mixin(FlexLayout, Clickable, NumberVariable).handlePainting

#### Defined in

[widgets/ScrollBar.ts:158](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L158)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`layoutCtx`): `void`

Handles layout population by adding the effective basis and flex ratio to
the [LayoutContext](layoutcontext.md). Also populates [lastVertical](scrollbar.md#lastvertical).

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).handlePopulateLayout

#### Defined in

[mixins/FlexLayout.ts:167](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L167)

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

Mixin(FlexLayout, Clickable, NumberVariable).handlePostLayoutUpdate

#### Defined in

[widgets/Widget.ts:348](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L348)

___

### handlePreLayoutUpdate

▸ `Protected` **handlePreLayoutUpdate**(`_root`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

Mixin(FlexLayout, Clickable, NumberVariable).handlePreLayoutUpdate

#### Defined in

[widgets/ScrollBar.ts:152](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L152)

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

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).handleResolveLayout

#### Defined in

[mixins/FlexLayout.ts:212](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/FlexLayout.ts#L212)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](scrollbar.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](scrollbar.md#_layoutdirty) and [_dirty](scrollbar.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).inheritTheme

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L158)

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

Mixin(FlexLayout, Clickable, NumberVariable).isNormalInRect

#### Defined in

[mixins/Clickable.ts:95](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L95)

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

Mixin(FlexLayout, Clickable, NumberVariable).isPointInRect

#### Defined in

[mixins/Clickable.ts:81](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/mixins/Clickable.ts#L81)

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

Mixin(FlexLayout, Clickable, NumberVariable).onFocusDropped

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](scrollbar.md#needsclear) is true, calls the [handlePainting](scrollbar.md#handlepainting) method and
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

Mixin(FlexLayout, Clickable, NumberVariable).paint

#### Defined in

[widgets/Widget.ts:391](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L391)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](scrollbar.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).populateLayout

#### Defined in

[widgets/Widget.ts:296](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L296)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](scrollbar.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).postLayoutUpdate

#### Defined in

[widgets/Widget.ts:355](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L355)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](scrollbar.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).preLayoutUpdate

#### Defined in

[widgets/Widget.ts:269](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L269)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](scrollbar.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](scrollbar.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](scrollbar.md#_dirty) is set to true.
[_layoutDirty](scrollbar.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).resolveLayout

#### Defined in

[widgets/Widget.ts:309](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L309)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](scrollbar.md#_layoutdirty) and
[_dirty](scrollbar.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).setThemeOverride

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L116)

___

### setValue

▸ **setValue**(`value`, `doCallback?`): `void`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `value` | `number` | `undefined` |
| `doCallback` | `boolean` | `true` |

#### Returns

`void`

#### Overrides

Mixin(FlexLayout, Clickable, NumberVariable).setValue

#### Defined in

[widgets/ScrollBar.ts:76](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/ScrollBar.ts#L76)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

Mixin(FlexLayout, Clickable, NumberVariable).updateInheritedTheme

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/widgets/Widget.ts#L65)
