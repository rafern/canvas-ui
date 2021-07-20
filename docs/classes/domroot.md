[canvas-ui](../README.md) / DOMRoot

# Class: DOMRoot

Like Root, but for easy use in an HTML page.

Instead of calling each individual update method, simply call [update](domroot.md#update)
on every animation frame. [Drivers](../interfaces/driver.md) still need to be manually
registered.

## Hierarchy

- [`Root`](root.md)

  ↳ **`DOMRoot`**

  ↳↳ [`DOMVirtualKeyboardRoot`](domvirtualkeyboardroot.md)

## Table of contents

### Constructors

- [constructor](domroot.md#constructor)

### Properties

- [\_currentPointerStyle](domroot.md#_currentpointerstyle)
- [\_enabled](domroot.md#_enabled)
- [\_foci](domroot.md#_foci)
- [\_fociCapturers](domroot.md#_focicapturers)
- [\_mobileTextInUse](domroot.md#_mobiletextinuse)
- [child](domroot.md#child)
- [domCanvasContext](domroot.md#domcanvascontext)
- [domElem](domroot.md#domelem)
- [drivers](domroot.md#drivers)
- [pointerStyle](domroot.md#pointerstyle)
- [pointerStyleHandler](domroot.md#pointerstylehandler)
- [textInputHandler](domroot.md#textinputhandler)
- [viewport](domroot.md#viewport)

### Accessors

- [canvas](domroot.md#canvas)
- [canvasDimensions](domroot.md#canvasdimensions)
- [dimensions](domroot.md#dimensions)
- [enabled](domroot.md#enabled)
- [hasMobileTextInput](domroot.md#hasmobiletextinput)
- [maxDimensions](domroot.md#maxdimensions)
- [usingMobileTextInput](domroot.md#usingmobiletextinput)

### Methods

- [clearDrivers](domroot.md#cleardrivers)
- [clearFocus](domroot.md#clearfocus)
- [dispatchEvent](domroot.md#dispatchevent)
- [dropFocus](domroot.md#dropfocus)
- [getFocus](domroot.md#getfocus)
- [getFocusCapturer](domroot.md#getfocuscapturer)
- [getTextInput](domroot.md#gettextinput)
- [paint](domroot.md#paint)
- [postLayoutUpdate](domroot.md#postlayoutupdate)
- [preLayoutUpdate](domroot.md#prelayoutupdate)
- [registerDriver](domroot.md#registerdriver)
- [requestFocus](domroot.md#requestfocus)
- [resolveLayout](domroot.md#resolvelayout)
- [unregisterDriver](domroot.md#unregisterdriver)
- [update](domroot.md#update)
- [updatePointerStyle](domroot.md#updatepointerstyle)

## Constructors

### constructor

• **new DOMRoot**(`child`, `theme?`)

Create a new DOMRoot.

Sets [child](domroot.md#child) and [child](domroot.md#child)'s
[inherited theme](widget.md#inheritedtheme). Also sets up a
[pointerStyleHandler](domroot.md#pointerstylehandler) which simply sets the CSS cursor style of
[domElem](domroot.md#domelem). Creates [domElem](domroot.md#domelem) and [domCanvasContext](domroot.md#domcanvascontext).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `child` | [`Widget`](widget.md) | - |
| `theme` | [`Theme`](theme.md) | If none supplied, then the default theme found in [Theme.constructor](theme.md#constructor) is used |

#### Overrides

[Root](root.md).[constructor](root.md#constructor)

#### Defined in

[core/DOMRoot.ts:18](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/DOMRoot.ts#L18)

## Properties

### \_currentPointerStyle

• `Protected` **\_currentPointerStyle**: `string` = `'default'`

The actual current pointer style.

For internal use only.

See [pointerStyle](domroot.md#pointerstyle)

#### Inherited from

[Root](root.md).[_currentPointerStyle](root.md#_currentpointerstyle)

#### Defined in

[core/Root.ts:42](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L42)

___

### \_enabled

• `Protected` **\_enabled**: `boolean` = `true`

Is the Root enabled? For internal use only.

See [enabled](domroot.md#enabled)

#### Inherited from

[Root](root.md).[_enabled](root.md#_enabled)

#### Defined in

[core/Root.ts:29](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L29)

___

### \_foci

• `Protected` **\_foci**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Current component foci (event targets for each focus type).

For internal use only.

See [requestFocus](domroot.md#requestfocus), [dropFocus](domroot.md#dropfocus), [clearFocus](domroot.md#clearfocus) and
[getFocus](domroot.md#getfocus)

#### Inherited from

[Root](root.md).[_foci](root.md#_foci)

#### Defined in

[core/Root.ts:56](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L56)

___

### \_fociCapturers

• `Protected` **\_fociCapturers**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Last capturer of each component focus (event targets for each focus
type).

For internal use only.

See [getFocusCapturer](domroot.md#getfocuscapturer)

#### Inherited from

[Root](root.md).[_fociCapturers](root.md#_focicapturers)

#### Defined in

[core/Root.ts:68](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L68)

___

### \_mobileTextInUse

• `Protected` **\_mobileTextInUse**: `boolean` = `false`

Is the mobile-friendly text input in use?

For internal use only.

See [hasMobileTextInput](domroot.md#hasmobiletextinput), [usingMobileTextInput](domroot.md#usingmobiletextinput) and
[getTextInput](domroot.md#gettextinput)

#### Inherited from

[Root](root.md).[_mobileTextInUse](root.md#_mobiletextinuse)

#### Defined in

[core/Root.ts:88](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L88)

___

### child

• `Readonly` **child**: [`Widget`](widget.md)

The Root's child; the parent Widget of all widgets in this Root

#### Inherited from

[Root](root.md).[child](root.md#child)

#### Defined in

[core/Root.ts:19](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L19)

___

### domCanvasContext

• `Private` **domCanvasContext**: `CanvasRenderingContext2D`

This root's canvas element's context. Used for painting

#### Defined in

[core/DOMRoot.ts:18](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/DOMRoot.ts#L18)

___

### domElem

• `Readonly` **domElem**: `HTMLCanvasElement`

This root's canvas element. Add this to the HTML body

#### Defined in

[core/DOMRoot.ts:16](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/DOMRoot.ts#L16)

___

### drivers

• `Protected` **drivers**: `Set`<[`Driver`](../interfaces/driver.md)\>

The list of drivers registered to this root

#### Inherited from

[Root](root.md).[drivers](root.md#drivers)

#### Defined in

[core/Root.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L23)

___

### pointerStyle

• **pointerStyle**: `string` = `'default'`

The pointer style this root wants. Will be set on
[postLayoutUpdate](domroot.md#postlayoutupdate) by [pointerStyleHandler](domroot.md#pointerstylehandler)

#### Inherited from

[Root](root.md).[pointerStyle](root.md#pointerstyle)

#### Defined in

[core/Root.ts:34](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L34)

___

### pointerStyleHandler

• **pointerStyleHandler**: ``null`` \| [`PointerStyleHandler`](../README.md#pointerstylehandler)

Pointer style handler, decides how to show the given pointer style.
Normally a function which sets the CSS cursor style of the Root's canvas

#### Inherited from

[Root](root.md).[pointerStyleHandler](root.md#pointerstylehandler)

#### Defined in

[core/Root.ts:47](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L47)

___

### textInputHandler

• **textInputHandler**: ``null`` \| [`TextInputHandler`](../README.md#textinputhandler) = `null`

Handler for mobile-friendly text input. If not null, widgets that need
text may call this to get a string.

See [hasMobileTextInput](domroot.md#hasmobiletextinput), [usingMobileTextInput](domroot.md#usingmobiletextinput) and
[getTextInput](domroot.md#gettextinput)

#### Inherited from

[Root](root.md).[textInputHandler](root.md#textinputhandler)

#### Defined in

[core/Root.ts:79](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L79)

___

### viewport

• `Protected` **viewport**: [`Viewport`](viewport.md)

The internal viewport. Manages drawing

#### Inherited from

[Root](root.md).[viewport](root.md#viewport)

#### Defined in

[core/Root.ts:21](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L21)

## Accessors

### canvas

• `get` **canvas**(): `HTMLCanvasElement`

The [viewport](domroot.md#viewport)'s [canvas](viewport.md#canvas)

#### Returns

`HTMLCanvasElement`

#### Defined in

[core/Root.ts:172](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L172)

___

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

The [viewport](domroot.md#viewport)'s
[canvasDimensions](viewport.md#canvasdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:120](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L120)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

The [child](domroot.md#child)'s [dimensions](widget.md#dimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:127](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L127)

___

### enabled

• `get` **enabled**(): `boolean`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](domroot.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](domroot.md#updatepointerstyle) called with 'default')
and all [foci](domroot.md#_foci) will be cleared ([clearFocus](domroot.md#clearfocus)).

See [_enabled](domroot.md#_enabled)

#### Returns

`boolean`

#### Defined in

[core/Root.ts:140](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L140)

• `set` **enabled**(`newEnabled`): `void`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](domroot.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](domroot.md#updatepointerstyle) called with 'default')
and all [foci](domroot.md#_foci) will be cleared ([clearFocus](domroot.md#clearfocus)).

See [_enabled](domroot.md#_enabled)

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

Can [getTextInput](domroot.md#gettextinput) be called? True if [textInputHandler](domroot.md#textinputhandler) is
not null and [usingMobileTextInput](domroot.md#usingmobiletextinput) is false.

#### Returns

`boolean`

#### Defined in

[core/Root.ts:445](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L445)

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

The [viewport](domroot.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:108](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L108)

• `set` **maxDimensions**(`maxDimensions`): `void`

The [viewport](domroot.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

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

Is [getTextInput](domroot.md#gettextinput) in use?

See [_mobileTextInUse](domroot.md#_mobiletextinuse).

#### Returns

`boolean`

#### Defined in

[core/Root.ts:454](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L454)

## Methods

### clearDrivers

▸ **clearDrivers**(): `void`

Unregisters all [drivers](domroot.md#drivers) from the root, by calling
[unregisterDriver](domroot.md#unregisterdriver).

#### Returns

`void`

#### Inherited from

[Root](root.md).[clearDrivers](root.md#cleardrivers)

#### Defined in

[core/Root.ts:435](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L435)

___

### clearFocus

▸ **clearFocus**(`focusType`): `void`

Clears the current [focus](domroot.md#_foci) of a given type. If there was a
focus set, [drivers](domroot.md#drivers) are notified by calling
[Driver.onFocusChanged](../interfaces/driver.md#onfocuschanged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

`void`

#### Inherited from

[Root](root.md).[clearFocus](root.md#clearfocus)

#### Defined in

[core/Root.ts:376](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L376)

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

Dispatches an [Event](event.md) to this root's [child](domroot.md#child) by calling
[Widget.dispatchEvent](widget.md#dispatchevent). Updates
[foci capturers](domroot.md#_focicapturers) and notifies [drivers](domroot.md#drivers) by
calling [Driver.onFocusCapturerChanged](../interfaces/driver.md#onfocuscapturerchanged) if the capturer changes.
Does nothing if root is disabled.

Note that if an event with a focus is dispatched and no widget captures
the event due to the widget not existing anymore or being disabled, the
focus type of the event will be cleared in the root with
[clearFocus](domroot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |

#### Returns

`void`

#### Inherited from

[Root](root.md).[dispatchEvent](root.md#dispatchevent)

#### Defined in

[core/Root.ts:224](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L224)

___

### dropFocus

▸ **dropFocus**(`focusType`, `widget`): `void`

Clears the current [focus](domroot.md#_foci) of a given type if it is
currently set to a given widget. Achieved by calling [clearFocus](domroot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `widget` | [`Widget`](widget.md) |

#### Returns

`void`

#### Inherited from

[Root](root.md).[dropFocus](root.md#dropfocus)

#### Defined in

[core/Root.ts:363](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L363)

___

### getFocus

▸ **getFocus**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the current [focus](domroot.md#_foci) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

[Root](root.md).[getFocus](root.md#getfocus)

#### Defined in

[core/Root.ts:391](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L391)

___

### getFocusCapturer

▸ **getFocusCapturer**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the last [focus capturer](domroot.md#_focicapturers) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

[Root](root.md).[getFocusCapturer](root.md#getfocuscapturer)

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

If this is already in use ([usingMobileTextInput](domroot.md#usingmobiletextinput)), returns null, else, returns a string typed by the user.

#### Inherited from

[Root](root.md).[getTextInput](root.md#gettextinput)

#### Defined in

[core/Root.ts:464](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L464)

___

### paint

▸ **paint**(): `boolean`

Paint this root's next frame if needed. Does nothing if root is disabled.

Calls [viewport](domroot.md#viewport)'s [Viewport.paintToCanvas](viewport.md#painttocanvas) with
[child](domroot.md#child).

Call this after calling [postLayoutUpdate](domroot.md#postlayoutupdate).

#### Returns

`boolean`

Returns whether the child was dirty or not. Use this to tell an external 3D library whether to update a mesh's texture or not.

#### Inherited from

[Root](root.md).[paint](root.md#paint)

#### Defined in

[core/Root.ts:204](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L204)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(): `void`

Do a post-layout update; calls [child](domroot.md#child)'s
[Widget.postLayoutUpdate](widget.md#postlayoutupdate) and [updatePointerStyle](domroot.md#updatepointerstyle). Does
nothing if root is disabled.

Call this before calling [paint](domroot.md#paint) and after calling
[resolveLayout](domroot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[Root](root.md).[postLayoutUpdate](root.md#postlayoutupdate)

#### Defined in

[core/Root.ts:311](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L311)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(): `void`

Do a pre-layout update; calls [drivers](domroot.md#drivers)' [Driver.update](../interfaces/driver.md#update) and
[child](domroot.md#child)'s [Widget.preLayoutUpdate](widget.md#prelayoutupdate). Does nothing if root is
disabled.

Call this before calling [resolveLayout](domroot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[Root](root.md).[preLayoutUpdate](root.md#prelayoutupdate)

#### Defined in

[core/Root.ts:289](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L289)

___

### registerDriver

▸ **registerDriver**(`driver`): `void`

Registers a [Driver](../interfaces/driver.md) to the root, adding it to the [drivers](domroot.md#drivers)
list and calling [Driver.onEnable](../interfaces/driver.md#onenable). If the driver was already
registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`Driver`](../interfaces/driver.md) |

#### Returns

`void`

#### Inherited from

[Root](root.md).[registerDriver](root.md#registerdriver)

#### Defined in

[core/Root.ts:407](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L407)

___

### requestFocus

▸ **requestFocus**(`focusType`, `widget`): `void`

Sets the current [focus](domroot.md#_foci) of a given type to a given widget.
If the focus changes, [clearFocus](domroot.md#clearfocus) is called and [drivers](domroot.md#drivers)
are notified by calling [Driver.onFocusChanged](../interfaces/driver.md#onfocuschanged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `widget` | [`Widget`](widget.md) |

#### Returns

`void`

#### Inherited from

[Root](root.md).[requestFocus](root.md#requestfocus)

#### Defined in

[core/Root.ts:345](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L345)

___

### resolveLayout

▸ **resolveLayout**(): `boolean`

Resolve the layout of this root. Does nothing if root is disabled.

Calls [viewport](domroot.md#viewport)'s [Viewport.populateChildsLayout](viewport.md#populatechildslayout) and
[resolveChildsLayout](viewport.md#resolvechildslayout) with [child](domroot.md#child)

Call this before calling [postLayoutUpdate](domroot.md#postlayoutupdate) and after calling
[preLayoutUpdate](domroot.md#prelayoutupdate)

#### Returns

`boolean`

#### Inherited from

[Root](root.md).[resolveLayout](root.md#resolvelayout)

#### Defined in

[core/Root.ts:185](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L185)

___

### unregisterDriver

▸ **unregisterDriver**(`driver`): `void`

Unregisters a [Driver](../interfaces/driver.md) from the root, removing it from the
[drivers](domroot.md#drivers) list and calling [Driver.onDisable](../interfaces/driver.md#ondisable). If the driver
was not registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`Driver`](../interfaces/driver.md) |

#### Returns

`void`

#### Inherited from

[Root](root.md).[unregisterDriver](root.md#unregisterdriver)

#### Defined in

[core/Root.ts:422](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L422)

___

### update

▸ **update**(): `void`

Update DOMRoot.

If root is disabled, [domElem](domroot.md#domelem)'s display style is set to 'none',
hiding it.

Calls [preLayoutUpdate](domroot.md#prelayoutupdate), [resolveLayout](domroot.md#resolvelayout),
[postLayoutUpdate](domroot.md#postlayoutupdate) and [paint](domroot.md#paint).

#### Returns

`void`

#### Defined in

[core/DOMRoot.ts:59](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/DOMRoot.ts#L59)

___

### updatePointerStyle

▸ **updatePointerStyle**(`newStyle?`): `void`

Calls [pointerStyleHandler](domroot.md#pointerstylehandler) if the [pointerStyle](domroot.md#pointerstyle) has changed
(checked by comparing with [_currentPointerStyle](domroot.md#_currentpointerstyle)). Also updates
[_currentPointerStyle](domroot.md#_currentpointerstyle). Can also be optionally supplied a new
pointer style.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newStyle` | ``null`` \| `string` | `null` |

#### Returns

`void`

#### Inherited from

[Root](root.md).[updatePointerStyle](root.md#updatepointerstyle)

#### Defined in

[core/Root.ts:329](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/core/Root.ts#L329)
