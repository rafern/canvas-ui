[canvas-ui](../README.md) / Root

# Class: Root

A Root is the parent of all widgets, but not a widget itself. It contains a
single child and manages dimensions and input handling

## Hierarchy

- **`Root`**

  ↳ [`DOMRoot`](domroot.md)

  ↳ [`VirtualKeyboardRoot`](virtualkeyboardroot.md)

## Table of contents

### Constructors

- [constructor](root.md#constructor)

### Properties

- [\_currentPointerStyle](root.md#_currentpointerstyle)
- [\_enabled](root.md#_enabled)
- [\_foci](root.md#_foci)
- [\_fociCapturers](root.md#_focicapturers)
- [\_mobileTextInUse](root.md#_mobiletextinuse)
- [child](root.md#child)
- [drivers](root.md#drivers)
- [pointerStyle](root.md#pointerstyle)
- [pointerStyleHandler](root.md#pointerstylehandler)
- [textInputHandler](root.md#textinputhandler)
- [viewport](root.md#viewport)

### Accessors

- [canvas](root.md#canvas)
- [canvasDimensions](root.md#canvasdimensions)
- [dimensions](root.md#dimensions)
- [enabled](root.md#enabled)
- [hasMobileTextInput](root.md#hasmobiletextinput)
- [maxDimensions](root.md#maxdimensions)
- [usingMobileTextInput](root.md#usingmobiletextinput)

### Methods

- [clearDrivers](root.md#cleardrivers)
- [clearFocus](root.md#clearfocus)
- [dispatchEvent](root.md#dispatchevent)
- [dropFocus](root.md#dropfocus)
- [getFocus](root.md#getfocus)
- [getFocusCapturer](root.md#getfocuscapturer)
- [getTextInput](root.md#gettextinput)
- [paint](root.md#paint)
- [postLayoutUpdate](root.md#postlayoutupdate)
- [preLayoutUpdate](root.md#prelayoutupdate)
- [registerDriver](root.md#registerdriver)
- [requestFocus](root.md#requestfocus)
- [resolveLayout](root.md#resolvelayout)
- [unregisterDriver](root.md#unregisterdriver)
- [updatePointerStyle](root.md#updatepointerstyle)

## Constructors

### constructor

• **new Root**(`child`, `pointerStyleHandler?`, `theme?`)

Creates a new Root.

Sets [child](root.md#child), [pointerStyleHandler](root.md#pointerstylehandler) and [child](root.md#child)'s
[inherited theme](widget.md#inheritedtheme).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `child` | [`Widget`](widget.md) | `undefined` | - |
| `pointerStyleHandler` | ``null`` \| [`PointerStyleHandler`](../README.md#pointerstylehandler) | `null` | - |
| `theme` | [`Theme`](theme.md) | `undefined` | If none supplied, then the default theme found in [Theme.constructor](theme.md#constructor) is used |

#### Defined in

[core/Root.ts:88](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L88)

## Properties

### \_currentPointerStyle

• `Protected` **\_currentPointerStyle**: `string` = `'default'`

The actual current pointer style.

For internal use only.

See [pointerStyle](root.md#pointerstyle)

#### Defined in

[core/Root.ts:42](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L42)

___

### \_enabled

• `Protected` **\_enabled**: `boolean` = `true`

Is the Root enabled? For internal use only.

See [enabled](root.md#enabled)

#### Defined in

[core/Root.ts:29](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L29)

___

### \_foci

• `Protected` **\_foci**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Current component foci (event targets for each focus type).

For internal use only.

See [requestFocus](root.md#requestfocus), [dropFocus](root.md#dropfocus), [clearFocus](root.md#clearfocus) and
[getFocus](root.md#getfocus)

#### Defined in

[core/Root.ts:56](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L56)

___

### \_fociCapturers

• `Protected` **\_fociCapturers**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Last capturer of each component focus (event targets for each focus
type).

For internal use only.

See [getFocusCapturer](root.md#getfocuscapturer)

#### Defined in

[core/Root.ts:68](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L68)

___

### \_mobileTextInUse

• `Protected` **\_mobileTextInUse**: `boolean` = `false`

Is the mobile-friendly text input in use?

For internal use only.

See [hasMobileTextInput](root.md#hasmobiletextinput), [usingMobileTextInput](root.md#usingmobiletextinput) and
[getTextInput](root.md#gettextinput)

#### Defined in

[core/Root.ts:88](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L88)

___

### child

• `Readonly` **child**: [`Widget`](widget.md)

The Root's child; the parent Widget of all widgets in this Root

#### Defined in

[core/Root.ts:19](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L19)

___

### drivers

• `Protected` **drivers**: `Set`<[`Driver`](../interfaces/driver.md)\>

The list of drivers registered to this root

#### Defined in

[core/Root.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L23)

___

### pointerStyle

• **pointerStyle**: `string` = `'default'`

The pointer style this root wants. Will be set on
[postLayoutUpdate](root.md#postlayoutupdate) by [pointerStyleHandler](root.md#pointerstylehandler)

#### Defined in

[core/Root.ts:34](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L34)

___

### pointerStyleHandler

• **pointerStyleHandler**: ``null`` \| [`PointerStyleHandler`](../README.md#pointerstylehandler)

Pointer style handler, decides how to show the given pointer style.
Normally a function which sets the CSS cursor style of the Root's canvas

#### Defined in

[core/Root.ts:47](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L47)

___

### textInputHandler

• **textInputHandler**: ``null`` \| [`TextInputHandler`](../README.md#textinputhandler) = `null`

Handler for mobile-friendly text input. If not null, widgets that need
text may call this to get a string.

See [hasMobileTextInput](root.md#hasmobiletextinput), [usingMobileTextInput](root.md#usingmobiletextinput) and
[getTextInput](root.md#gettextinput)

#### Defined in

[core/Root.ts:79](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L79)

___

### viewport

• `Protected` **viewport**: [`Viewport`](viewport.md)

The internal viewport. Manages drawing

#### Defined in

[core/Root.ts:21](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L21)

## Accessors

### canvas

• `get` **canvas**(): `HTMLCanvasElement`

The [viewport](root.md#viewport)'s [canvas](viewport.md#canvas)

#### Returns

`HTMLCanvasElement`

#### Defined in

[core/Root.ts:172](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L172)

___

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

The [viewport](root.md#viewport)'s
[canvasDimensions](viewport.md#canvasdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:120](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L120)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

The [child](root.md#child)'s [dimensions](widget.md#dimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:127](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L127)

___

### enabled

• `get` **enabled**(): `boolean`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](root.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](root.md#updatepointerstyle) called with 'default')
and all [foci](root.md#_foci) will be cleared ([clearFocus](root.md#clearfocus)).

See [_enabled](root.md#_enabled)

#### Returns

`boolean`

#### Defined in

[core/Root.ts:140](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L140)

• `set` **enabled**(`newEnabled`): `void`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](root.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](root.md#updatepointerstyle) called with 'default')
and all [foci](root.md#_foci) will be cleared ([clearFocus](root.md#clearfocus)).

See [_enabled](root.md#_enabled)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newEnabled` | `boolean` |

#### Returns

`void`

#### Defined in

[core/Root.ts:144](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L144)

___

### hasMobileTextInput

• `get` **hasMobileTextInput**(): `boolean`

Can [getTextInput](root.md#gettextinput) be called? True if [textInputHandler](root.md#textinputhandler) is
not null and [usingMobileTextInput](root.md#usingmobiletextinput) is false.

#### Returns

`boolean`

#### Defined in

[core/Root.ts:445](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L445)

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

The [viewport](root.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:108](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L108)

• `set` **maxDimensions**(`maxDimensions`): `void`

The [viewport](root.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxDimensions` | [`number`, `number`] |

#### Returns

`void`

#### Defined in

[core/Root.ts:112](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L112)

___

### usingMobileTextInput

• `get` **usingMobileTextInput**(): `boolean`

Is [getTextInput](root.md#gettextinput) in use?

See [_mobileTextInUse](root.md#_mobiletextinuse).

#### Returns

`boolean`

#### Defined in

[core/Root.ts:454](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L454)

## Methods

### clearDrivers

▸ **clearDrivers**(): `void`

Unregisters all [drivers](root.md#drivers) from the root, by calling
[unregisterDriver](root.md#unregisterdriver).

#### Returns

`void`

#### Defined in

[core/Root.ts:435](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L435)

___

### clearFocus

▸ **clearFocus**(`focusType`): `void`

Clears the current [focus](root.md#_foci) of a given type. If there was a
focus set, [drivers](root.md#drivers) are notified by calling
[Driver.onFocusChanged](../interfaces/driver.md#onfocuschanged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

`void`

#### Defined in

[core/Root.ts:376](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L376)

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

Dispatches an [Event](event.md) to this root's [child](root.md#child) by calling
[Widget.dispatchEvent](widget.md#dispatchevent). Updates
[foci capturers](root.md#_focicapturers) and notifies [drivers](root.md#drivers) by
calling [Driver.onFocusCapturerChanged](../interfaces/driver.md#onfocuscapturerchanged) if the capturer changes.
Does nothing if root is disabled.

Note that if an event with a focus is dispatched and no widget captures
the event due to the widget not existing anymore or being disabled, the
focus type of the event will be cleared in the root with
[clearFocus](root.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |

#### Returns

`void`

#### Defined in

[core/Root.ts:224](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L224)

___

### dropFocus

▸ **dropFocus**(`focusType`, `widget`): `void`

Clears the current [focus](root.md#_foci) of a given type if it is
currently set to a given widget. Achieved by calling [clearFocus](root.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `widget` | [`Widget`](widget.md) |

#### Returns

`void`

#### Defined in

[core/Root.ts:363](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L363)

___

### getFocus

▸ **getFocus**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the current [focus](root.md#_foci) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Defined in

[core/Root.ts:391](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L391)

___

### getFocusCapturer

▸ **getFocusCapturer**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the last [focus capturer](root.md#_focicapturers) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Defined in

[core/Root.ts:398](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L398)

___

### getTextInput

▸ **getTextInput**(`initialInput?`): `Promise`<``null`` \| `string`\>

Get text input from the user. Used for mobile where keyboard events are
hard to get.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `initialInput` | `string` | `''` |

#### Returns

`Promise`<``null`` \| `string`\>

If this is already in use ([usingMobileTextInput](root.md#usingmobiletextinput)), returns null, else, returns a string typed by the user.

#### Defined in

[core/Root.ts:464](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L464)

___

### paint

▸ **paint**(): `boolean`

Paint this root's next frame if needed. Does nothing if root is disabled.

Calls [viewport](root.md#viewport)'s [Viewport.paintToCanvas](viewport.md#painttocanvas) with
[child](root.md#child).

Call this after calling [postLayoutUpdate](root.md#postlayoutupdate).

#### Returns

`boolean`

Returns whether the child was dirty or not. Use this to tell an external 3D library whether to update a mesh's texture or not.

#### Defined in

[core/Root.ts:204](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L204)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(): `void`

Do a post-layout update; calls [child](root.md#child)'s
[Widget.postLayoutUpdate](widget.md#postlayoutupdate) and [updatePointerStyle](root.md#updatepointerstyle). Does
nothing if root is disabled.

Call this before calling [paint](root.md#paint) and after calling
[resolveLayout](root.md#resolvelayout)

#### Returns

`void`

#### Defined in

[core/Root.ts:311](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L311)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(): `void`

Do a pre-layout update; calls [drivers](root.md#drivers)' [Driver.update](../interfaces/driver.md#update) and
[child](root.md#child)'s [Widget.preLayoutUpdate](widget.md#prelayoutupdate). Does nothing if root is
disabled.

Call this before calling [resolveLayout](root.md#resolvelayout)

#### Returns

`void`

#### Defined in

[core/Root.ts:289](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L289)

___

### registerDriver

▸ **registerDriver**(`driver`): `void`

Registers a [Driver](../interfaces/driver.md) to the root, adding it to the [drivers](root.md#drivers)
list and calling [Driver.onEnable](../interfaces/driver.md#onenable). If the driver was already
registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`Driver`](../interfaces/driver.md) |

#### Returns

`void`

#### Defined in

[core/Root.ts:407](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L407)

___

### requestFocus

▸ **requestFocus**(`focusType`, `widget`): `void`

Sets the current [focus](root.md#_foci) of a given type to a given widget.
If the focus changes, [clearFocus](root.md#clearfocus) is called and [drivers](root.md#drivers)
are notified by calling [Driver.onFocusChanged](../interfaces/driver.md#onfocuschanged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `widget` | [`Widget`](widget.md) |

#### Returns

`void`

#### Defined in

[core/Root.ts:345](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L345)

___

### resolveLayout

▸ **resolveLayout**(): `boolean`

Resolve the layout of this root. Does nothing if root is disabled.

Calls [viewport](root.md#viewport)'s [Viewport.populateChildsLayout](viewport.md#populatechildslayout) and
[resolveChildsLayout](viewport.md#resolvechildslayout) with [child](root.md#child)

Call this before calling [postLayoutUpdate](root.md#postlayoutupdate) and after calling
[preLayoutUpdate](root.md#prelayoutupdate)

#### Returns

`boolean`

#### Defined in

[core/Root.ts:185](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L185)

___

### unregisterDriver

▸ **unregisterDriver**(`driver`): `void`

Unregisters a [Driver](../interfaces/driver.md) from the root, removing it from the
[drivers](root.md#drivers) list and calling [Driver.onDisable](../interfaces/driver.md#ondisable). If the driver
was not registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`Driver`](../interfaces/driver.md) |

#### Returns

`void`

#### Defined in

[core/Root.ts:422](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L422)

___

### updatePointerStyle

▸ **updatePointerStyle**(`newStyle?`): `void`

Calls [pointerStyleHandler](root.md#pointerstylehandler) if the [pointerStyle](root.md#pointerstyle) has changed
(checked by comparing with [_currentPointerStyle](root.md#_currentpointerstyle)). Also updates
[_currentPointerStyle](root.md#_currentpointerstyle). Can also be optionally supplied a new
pointer style.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newStyle` | ``null`` \| `string` | `null` |

#### Returns

`void`

#### Defined in

[core/Root.ts:329](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L329)
