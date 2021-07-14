[canvas-ui](../README.md) / Checkbox

# Class: Checkbox

A checkbox widget; can be ticked or unticked.

## Hierarchy

- [`BoxLayout`](boxlayout.md)<`this`\> & [`Clickable`](clickable.md)<`this`\> & [`BooleanVariable`](booleanvariable.md)<`this`\>

  ↳ **`Checkbox`**

## Table of contents

### Constructors

- [constructor](checkbox.md#constructor)

### Properties

- [\_dirty](checkbox.md#_dirty)
- [\_layoutDirty](checkbox.md#_layoutdirty)
- [callback](checkbox.md#callback)
- [clickState](checkbox.md#clickstate)
- [clickStateChanged](checkbox.md#clickstatechanged)
- [lastClickState](checkbox.md#lastclickstate)
- [needsClear](checkbox.md#needsclear)
- [pointerPos](checkbox.md#pointerpos)
- [propagatesEvents](checkbox.md#propagatesevents)
- [resolvedHeight](checkbox.md#resolvedheight)
- [resolvedWidth](checkbox.md#resolvedwidth)
- [startingPointerPos](checkbox.md#startingpointerpos)
- [wasClick](checkbox.md#wasclick)

### Accessors

- [boxHeight](checkbox.md#boxheight)
- [boxWidth](checkbox.md#boxwidth)
- [dimensions](checkbox.md#dimensions)
- [dirty](checkbox.md#dirty)
- [enabled](checkbox.md#enabled)
- [inheritedTheme](checkbox.md#inheritedtheme)
- [layoutDirty](checkbox.md#layoutdirty)
- [theme](checkbox.md#theme)
- [themeOverride](checkbox.md#themeoverride)
- [value](checkbox.md#value)

### Methods

- [clear](checkbox.md#clear)
- [dispatchEvent](checkbox.md#dispatchevent)
- [forceLayoutDirty](checkbox.md#forcelayoutdirty)
- [getBoxRect](checkbox.md#getboxrect)
- [getNormalInRect](checkbox.md#getnormalinrect)
- [handleClickEvent](checkbox.md#handleclickevent)
- [handleEvent](checkbox.md#handleevent)
- [handlePainting](checkbox.md#handlepainting)
- [handlePopulateLayout](checkbox.md#handlepopulatelayout)
- [handlePostLayoutUpdate](checkbox.md#handlepostlayoutupdate)
- [handlePreLayoutUpdate](checkbox.md#handleprelayoutupdate)
- [handleResolveLayout](checkbox.md#handleresolvelayout)
- [inheritTheme](checkbox.md#inherittheme)
- [isNormalInRect](checkbox.md#isnormalinrect)
- [isPointInRect](checkbox.md#ispointinrect)
- [onFocusDropped](checkbox.md#onfocusdropped)
- [paint](checkbox.md#paint)
- [populateLayout](checkbox.md#populatelayout)
- [postLayoutUpdate](checkbox.md#postlayoutupdate)
- [preLayoutUpdate](checkbox.md#prelayoutupdate)
- [resolveLayout](checkbox.md#resolvelayout)
- [setThemeOverride](checkbox.md#setthemeoverride)
- [setValue](checkbox.md#setvalue)
- [updateInheritedTheme](checkbox.md#updateinheritedtheme)

## Constructors

### constructor

• **new Checkbox**(`callback?`, `initialValue?`, `themeOverride?`)

Create a new Checkbox.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `callback` | ``null`` \| [`VariableCallback`](../README.md#variablecallback)<`boolean`\> | `null` | An optional callback called when the checkbox is ticked or unticked. If null, then no callback is called. |
| `initialValue` | `boolean` | `false` | - |
| `themeOverride` | ``null`` \| [`Theme`](theme.md) | `null` | - |

#### Overrides

Mixin(BoxLayout, Clickable, BooleanVariable).constructor

#### Defined in

[widgets/Checkbox.ts:15](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Checkbox.ts#L15)

## Properties

### \_dirty

• `Protected` **\_dirty**: `boolean` = `true`

Widget will only be painted if dirty is true.

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).\_dirty

#### Defined in

[widgets/Widget.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L23)

___

### \_layoutDirty

• `Protected` **\_layoutDirty**: `boolean` = `true`

Widget will only have the layout resolved if layoutDirty is true.

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).\_layoutDirty

#### Defined in

[widgets/Widget.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L25)

___

### callback

• `Protected` **callback**: ``null`` \| [`VariableCallback`](../README.md#variablecallback)<`boolean`\> = `null`

The callback for when the value is changed.

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).callback

#### Defined in

[mixins/Variable.ts:29](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Variable.ts#L29)

___

### clickState

• `Protected` **clickState**: [`ClickState`](../enums/clickstate.md)

The current click state

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).clickState

#### Defined in

[mixins/Clickable.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L36)

___

### clickStateChanged

• `Protected` **clickStateChanged**: `boolean` = `false`

Did the last click event handle result in a click state change?

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).clickStateChanged

#### Defined in

[mixins/Clickable.ts:38](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L38)

___

### lastClickState

• `Protected` **lastClickState**: [`ClickState`](../enums/clickstate.md)

Last click state

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).lastClickState

#### Defined in

[mixins/Clickable.ts:34](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L34)

___

### needsClear

• `Readonly` **needsClear**: `boolean`

Widget will have its background automatically cleared when painting if
needsClear is true. The background fill style used is
[ThemeProperty.CanvasFill](../enums/themeproperty.md#canvasfill).

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).needsClear

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

Mixin(BoxLayout, Clickable, BooleanVariable).pointerPos

#### Defined in

[mixins/Clickable.ts:47](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L47)

___

### propagatesEvents

• `Readonly` **propagatesEvents**: `boolean`

Widget will get targetted events even if the target is not itself if it
this is true. Useful for implementing container widgets.

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).propagatesEvents

#### Defined in

[widgets/Widget.ts:36](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L36)

___

### resolvedHeight

• `Protected` **resolvedHeight**: `number` = `0`

The wanted height after layout resolution.

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).resolvedHeight

#### Defined in

[widgets/Widget.ts:51](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L51)

___

### resolvedWidth

• `Protected` **resolvedWidth**: `number` = `0`

The wanted width after layout resolution.

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).resolvedWidth

#### Defined in

[widgets/Widget.ts:49](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L49)

___

### startingPointerPos

• `Protected` **startingPointerPos**: ``null`` \| [`number`, `number`] = `null`

Like [pointerPos](checkbox.md#pointerpos), but only updated when a hold state begins.

Useful for implementing draggable widgets.

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).startingPointerPos

#### Defined in

[mixins/Clickable.ts:53](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L53)

___

### wasClick

• `Protected` **wasClick**: `boolean` = `false`

Did the last click state change result in a click?

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).wasClick

#### Defined in

[mixins/Clickable.ts:40](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L40)

## Accessors

### boxHeight

• `get` **boxHeight**(): `number`

The wanted box height. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxHeight](boxlayout.md#_boxheight) and sets
[_layoutDirty](checkbox.md#_layoutdirty) to true when changed.

#### Returns

`number`

#### Defined in

[mixins/BoxLayout.ts:38](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/BoxLayout.ts#L38)

• `set` **boxHeight**(`boxHeight`): `void`

The wanted box height. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxHeight](boxlayout.md#_boxheight) and sets
[_layoutDirty](checkbox.md#_layoutdirty) to true when changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `boxHeight` | `number` |

#### Returns

`void`

#### Defined in

[mixins/BoxLayout.ts:42](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/BoxLayout.ts#L42)

___

### boxWidth

• `get` **boxWidth**(): `number`

The wanted box width. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxWidth](boxlayout.md#_boxwidth) and sets
[_layoutDirty](checkbox.md#_layoutdirty) to true when changed.

#### Returns

`number`

#### Defined in

[mixins/BoxLayout.ts:21](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/BoxLayout.ts#L21)

• `set` **boxWidth**(`boxWidth`): `void`

The wanted box width. Set this every frame on
[Widget.handlePreLayoutUpdate](widget.md#handleprelayoutupdate) or when handling events in
[Widget.handleEvent](widget.md#handleevent). Updates [_boxWidth](boxlayout.md#_boxwidth) and sets
[_layoutDirty](checkbox.md#_layoutdirty) to true when changed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `boxWidth` | `number` |

#### Returns

`void`

#### Defined in

[mixins/BoxLayout.ts:25](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/BoxLayout.ts#L25)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

Get the resolved dimensions. Returns a 2-tuple containing
[resolvedWidth](checkbox.md#resolvedwidth) and [resolvedHeight](checkbox.md#resolvedheight).

#### Returns

[`number`, `number`]

#### Defined in

[widgets/Widget.ts:192](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L192)

___

### dirty

• `get` **dirty**(): `boolean`

Check if the widget is dirty. Returns [_dirty](checkbox.md#_dirty).

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:197](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L197)

___

### enabled

• `get` **enabled**(): `boolean`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](checkbox.md#_layoutdirty) is set to true
and [_dirty](checkbox.md#_dirty) is set to true if enabled or false if not enabled.

If getting, [_enabled](domroot.md#_enabled) is returned.

#### Returns

`boolean`

#### Defined in

[widgets/Widget.ts:105](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L105)

• `set` **enabled**(`enabled`): `void`

Is this widget enabled? If it isn't, it will act as if it doesn't exist.

If changed, [_enabled](domroot.md#_enabled) is set, [_layoutDirty](checkbox.md#_layoutdirty) is set to true
and [_dirty](checkbox.md#_dirty) is set to true if enabled or false if not enabled.

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

### inheritedTheme

• `get` **inheritedTheme**(): ``null`` \| [`Theme`](theme.md)

The inherited theme of this widget.

If setting, calls [inheritTheme](checkbox.md#inherittheme).

If getting, returns [_inheritedTheme](widget.md#_inheritedtheme).

#### Returns

``null`` \| [`Theme`](theme.md)

#### Defined in

[widgets/Widget.ts:184](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L184)

• `set` **inheritedTheme**(`theme`): `void`

The inherited theme of this widget.

If setting, calls [inheritTheme](checkbox.md#inherittheme).

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

Check if the widget's layout is dirty. Returns [_layoutDirty](checkbox.md#_layoutdirty).

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

If setting, calls [setThemeOverride](checkbox.md#setthemeoverride).

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

If setting, calls [setThemeOverride](checkbox.md#setthemeoverride).

If getting, returns [_themeOverride](widget.md#_themeoverride).

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Defined in

[widgets/Widget.ts:140](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L140)

___

### value

• `get` **value**(): `V`

The current value.

If getting, throws an exception if [_value](variable.md#_value) is undefined.

If setting, [setValue](checkbox.md#setvalue) is called.

#### Returns

`V`

#### Defined in

[mixins/Variable.ts:45](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Variable.ts#L45)

• `set` **value**(`value`): `void`

The current value.

If getting, throws an exception if [_value](variable.md#_value) is undefined.

If setting, [setValue](checkbox.md#setvalue) is called.

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `V` |

#### Returns

`void`

#### Defined in

[mixins/Variable.ts:52](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Variable.ts#L52)

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

Mixin(BoxLayout, Clickable, BooleanVariable).clear

#### Defined in

[widgets/Widget.ts:366](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L366)

___

### dispatchEvent

▸ **dispatchEvent**(`event`, `width`, `height`, `root`): ``null`` \| [`Widget`](widget.md)

Called when an event is passed to the Widget. Checks if the target
matches the Widget, unless the Widget propagates events, or if the event
is a [PointerEvent](pointerevent.md) and is in the bounds of the Widget. If neither
of the conditions are true, the event is not captured (null is returned),
else, the [handleEvent](checkbox.md#handleevent) method is called and its result is
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

Mixin(BoxLayout, Clickable, BooleanVariable).dispatchEvent

#### Defined in

[widgets/Widget.ts:242](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L242)

___

### forceLayoutDirty

▸ **forceLayoutDirty**(): `void`

Forcefully mark layout as dirty. If overridden, original must be called.
Call only when absolutely neccessary, such as in a resize. If
implementing a container widget, children should also have their layout
forced as dirty.

Sets [_layoutDirty](checkbox.md#_layoutdirty) and [_dirty](checkbox.md#_dirty) to true.

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).forceLayoutDirty

#### Defined in

[widgets/Widget.ts:339](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L339)

___

### getBoxRect

▸ `Private` **getBoxRect**(`x`, `y`, `width`, `height`): [`number`, `number`, `number`, `number`]

Get the rectangle where the checkbox will be painted.

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |
| `width` | `number` |
| `height` | `number` |

#### Returns

[`number`, `number`, `number`, `number`]

Returns a 4-tuple containing, in this order, the left edge's
offset, the width, the top edge's offset and the height.

#### Defined in

[widgets/Checkbox.ts:38](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Checkbox.ts#L38)

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

Mixin(BoxLayout, Clickable, BooleanVariable).getNormalInRect

#### Defined in

[mixins/Clickable.ts:66](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L66)

___

### handleClickEvent

▸ `Protected` **handleClickEvent**(`event`, `root`, `clickArea`): `void`

Updates the current [clickState](checkbox.md#clickstate) given an event, as well as
[focus](domroot.md#_foci), [pointerStyle](domroot.md#pointerstyle), [wasClick](checkbox.md#wasclick) and
[clickStateChanged](checkbox.md#clickstatechanged) flags.

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `root` | [`Root`](root.md) |
| `clickArea` | [`number`, `number`, `number`, `number`] |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).handleClickEvent

#### Defined in

[mixins/Clickable.ts:122](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Clickable.ts#L122)

___

### handleEvent

▸ `Protected` **handleEvent**(`event`, `width`, `height`, `root`): [`Checkbox`](checkbox.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |
| `width` | `number` |
| `height` | `number` |
| `root` | [`Root`](root.md) |

#### Returns

[`Checkbox`](checkbox.md)

#### Overrides

Mixin(BoxLayout, Clickable, BooleanVariable).handleEvent

#### Defined in

[widgets/Checkbox.ts:50](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Checkbox.ts#L50)

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

Mixin(BoxLayout, Clickable, BooleanVariable).handlePainting

#### Defined in

[widgets/Checkbox.ts:67](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Checkbox.ts#L67)

___

### handlePopulateLayout

▸ `Protected` **handlePopulateLayout**(`layoutCtx`): `void`

Handles layout population by adding [boxWidth](checkbox.md#boxwidth) and
[boxHeight](checkbox.md#boxheight) to the [LayoutContext](layoutcontext.md)'s basis

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).handlePopulateLayout

#### Defined in

[mixins/BoxLayout.ts:53](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/BoxLayout.ts#L53)

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

Mixin(BoxLayout, Clickable, BooleanVariable).handlePostLayoutUpdate

#### Defined in

[widgets/Widget.ts:349](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L349)

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

Mixin(BoxLayout, Clickable, BooleanVariable).handlePreLayoutUpdate

#### Defined in

[widgets/Checkbox.ts:60](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Checkbox.ts#L60)

___

### handleResolveLayout

▸ `Protected` **handleResolveLayout**(`_layoutCtx`): `void`

Handles layout resolution by setting [resolvedWidth](checkbox.md#resolvedwidth) to
[boxWidth](checkbox.md#boxwidth) and [resolvedHeight](checkbox.md#resolvedheight) to [boxHeight](checkbox.md#boxheight)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).handleResolveLayout

#### Defined in

[mixins/BoxLayout.ts:61](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/BoxLayout.ts#L61)

___

### inheritTheme

▸ `Protected` **inheritTheme**(`theme`): `void`

Set the inherited theme of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Theme override has priority over inherited theme. Inherited theme should
be propagated to children so they also have a theme.

Calls [updateInheritedTheme](checkbox.md#updateinheritedtheme) and [updateTheme](widget.md#updatetheme) and sets
[_layoutDirty](checkbox.md#_layoutdirty) and [_dirty](checkbox.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).inheritTheme

#### Defined in

[widgets/Widget.ts:158](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L158)

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

Mixin(BoxLayout, Clickable, BooleanVariable).isNormalInRect

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

Mixin(BoxLayout, Clickable, BooleanVariable).isPointInRect

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

Mixin(BoxLayout, Clickable, BooleanVariable).onFocusDropped

#### Defined in

[widgets/Widget.ts:211](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L211)

___

### paint

▸ **paint**(`x`, `y`, `width`, `height`, `ctx`): `void`

Called when the Widget is dirty and the Root is being rendered. Does
nothing if dirty flag is not set, else, clears the background if
[needsClear](checkbox.md#needsclear) is true, calls the [handlePainting](checkbox.md#handlepainting) method and
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

Mixin(BoxLayout, Clickable, BooleanVariable).paint

#### Defined in

[widgets/Widget.ts:392](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L392)

___

### populateLayout

▸ **populateLayout**(`layoutCtx`): `void`

Wrapper for [handlePopulateLayout](checkbox.md#handlepopulatelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).populateLayout

#### Defined in

[widgets/Widget.ts:297](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L297)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(`root`): `void`

Generic update method which is called after layout is resolved. Calls
[handlePostLayoutUpdate](checkbox.md#handlepostlayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).postLayoutUpdate

#### Defined in

[widgets/Widget.ts:356](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L356)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(`root`): `void`

Generic update method which is called before layout is resolved. Calls
[handlePreLayoutUpdate](checkbox.md#handleprelayoutupdate) if widget is enabled. Must not be
overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).preLayoutUpdate

#### Defined in

[widgets/Widget.ts:270](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L270)

___

### resolveLayout

▸ **resolveLayout**(`layoutCtx`): `void`

Wrapper for [handleResolveLayout](checkbox.md#handleresolvelayout). Does nothing if
[_enabled](domroot.md#_enabled) is false or [_layoutDirty](checkbox.md#_layoutdirty) is false. If the
resolved dimensions change, [_dirty](checkbox.md#_dirty) is set to true.
[_layoutDirty](checkbox.md#_layoutdirty) is set to false. Must not be overridden.

#### Parameters

| Name | Type |
| :------ | :------ |
| `layoutCtx` | [`LayoutContext`](layoutcontext.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).resolveLayout

#### Defined in

[widgets/Widget.ts:310](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L310)

___

### setThemeOverride

▸ `Protected` **setThemeOverride**(`theme`): `void`

Set the theme override of this widget. Should not be overridden, but can
be. If overridden, the original method should still be called.

Calls [updateTheme](widget.md#updatetheme) and sets [_layoutDirty](checkbox.md#_layoutdirty) and
[_dirty](checkbox.md#_dirty) to true if widget is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `theme` | ``null`` \| [`Theme`](theme.md) |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).setThemeOverride

#### Defined in

[widgets/Widget.ts:116](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L116)

___

### setValue

▸ **setValue**(`value`, `doCallback?`): `void`

Sets [_value](variable.md#_value). Does nothing if the value is already the one
specified.

[_dirty](checkbox.md#_dirty) is set to true if the value has changed.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `boolean` | `undefined` | - |
| `doCallback` | `boolean` | `true` | If true, then [callback](checkbox.md#callback) is called if the value has changed. |

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).setValue

#### Defined in

[mixins/Variable.ts:65](https://github.com/playkostudios/canvas-ui/blob/2407796/src/mixins/Variable.ts#L65)

___

### updateInheritedTheme

▸ `Protected` **updateInheritedTheme**(): `void`

Called when the inherited theme of this Widget is updated. Can be
overridden. Does nothing by default.

#### Returns

`void`

#### Inherited from

Mixin(BoxLayout, Clickable, BooleanVariable).updateInheritedTheme

#### Defined in

[widgets/Widget.ts:65](https://github.com/playkostudios/canvas-ui/blob/2407796/src/widgets/Widget.ts#L65)