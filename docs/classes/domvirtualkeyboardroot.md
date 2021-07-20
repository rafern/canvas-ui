[canvas-ui](../README.md) / DOMVirtualKeyboardRoot

# Class: DOMVirtualKeyboardRoot

A [DOMRoot](domroot.md) with similar functionality to [VirtualKeyboardRoot](virtualkeyboardroot.md).
In this version
[updateVisibility](virtualkeyboardroot.md#updatevisibility) doesn't
exist. Instead, just call [update](domvirtualkeyboardroot.md#update) like in DOMRoot.

## Hierarchy

- [`DOMRoot`](domroot.md)

  ↳ **`DOMVirtualKeyboardRoot`**

## Table of contents

### Constructors

- [constructor](domvirtualkeyboardroot.md#constructor)

### Properties

- [\_currentPointerStyle](domvirtualkeyboardroot.md#_currentpointerstyle)
- [\_enabled](domvirtualkeyboardroot.md#_enabled)
- [\_foci](domvirtualkeyboardroot.md#_foci)
- [\_fociCapturers](domvirtualkeyboardroot.md#_focicapturers)
- [\_mobileTextInUse](domvirtualkeyboardroot.md#_mobiletextinuse)
- [child](domvirtualkeyboardroot.md#child)
- [domElem](domvirtualkeyboardroot.md#domelem)
- [drivers](domvirtualkeyboardroot.md#drivers)
- [keyboardDriver](domvirtualkeyboardroot.md#keyboarddriver)
- [pointerStyle](domvirtualkeyboardroot.md#pointerstyle)
- [pointerStyleHandler](domvirtualkeyboardroot.md#pointerstylehandler)
- [textInputHandler](domvirtualkeyboardroot.md#textinputhandler)
- [viewport](domvirtualkeyboardroot.md#viewport)

### Accessors

- [canvas](domvirtualkeyboardroot.md#canvas)
- [canvasDimensions](domvirtualkeyboardroot.md#canvasdimensions)
- [dimensions](domvirtualkeyboardroot.md#dimensions)
- [enabled](domvirtualkeyboardroot.md#enabled)
- [hasMobileTextInput](domvirtualkeyboardroot.md#hasmobiletextinput)
- [maxDimensions](domvirtualkeyboardroot.md#maxdimensions)
- [usingMobileTextInput](domvirtualkeyboardroot.md#usingmobiletextinput)

### Methods

- [clearDrivers](domvirtualkeyboardroot.md#cleardrivers)
- [clearFocus](domvirtualkeyboardroot.md#clearfocus)
- [dispatchEvent](domvirtualkeyboardroot.md#dispatchevent)
- [dropFocus](domvirtualkeyboardroot.md#dropfocus)
- [getFocus](domvirtualkeyboardroot.md#getfocus)
- [getFocusCapturer](domvirtualkeyboardroot.md#getfocuscapturer)
- [getTextInput](domvirtualkeyboardroot.md#gettextinput)
- [paint](domvirtualkeyboardroot.md#paint)
- [postLayoutUpdate](domvirtualkeyboardroot.md#postlayoutupdate)
- [preLayoutUpdate](domvirtualkeyboardroot.md#prelayoutupdate)
- [registerDriver](domvirtualkeyboardroot.md#registerdriver)
- [requestFocus](domvirtualkeyboardroot.md#requestfocus)
- [resolveLayout](domvirtualkeyboardroot.md#resolvelayout)
- [unregisterDriver](domvirtualkeyboardroot.md#unregisterdriver)
- [update](domvirtualkeyboardroot.md#update)
- [updatePointerStyle](domvirtualkeyboardroot.md#updatepointerstyle)

## Constructors

### constructor

• **new DOMVirtualKeyboardRoot**(`keyboardDriver`, `keyboardTemplate?`, `theme?`)

Creates a new VirtualKeyboardRoot.

Sets [child](domvirtualkeyboardroot.md#child) to a new [VirtualKeyboard](virtualkeyboard.md) with the given
keyboard and [keyboard template](../README.md#virtualkeyboardtemplate) and
[child](domvirtualkeyboardroot.md#child)'s [inherited theme](widget.md#inheritedtheme). Also
sets up a [pointerStyleHandler](domvirtualkeyboardroot.md#pointerstylehandler) which simply sets the CSS cursor
style of [domElem](domvirtualkeyboardroot.md#domelem). Creates [domElem](domvirtualkeyboardroot.md#domelem) and
[domCanvasContext](domroot.md#domcanvascontext).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `keyboardDriver` | [`KeyboardDriver`](keyboarddriver.md) | - |
| `keyboardTemplate` | [`VirtualKeyboardTemplate`](../README.md#virtualkeyboardtemplate) | By default, the virtual keyboard template is [defaultVirtualKeyboardTemplate](../README.md#defaultvirtualkeyboardtemplate) |
| `theme` | [`Theme`](theme.md) | By default, the theme is [defaultTheme](../README.md#defaulttheme). |

#### Overrides

[DOMRoot](domroot.md).[constructor](domroot.md#constructor)

#### Defined in

[core/DOMVirtualKeyboardRoot.ts:18](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/DOMVirtualKeyboardRoot.ts#L18)

## Properties

### \_currentPointerStyle

• `Protected` **\_currentPointerStyle**: `string` = `'default'`

The actual current pointer style.

For internal use only.

See [pointerStyle](domvirtualkeyboardroot.md#pointerstyle)

#### Inherited from

[DOMRoot](domroot.md).[_currentPointerStyle](domroot.md#_currentpointerstyle)

#### Defined in

[core/Root.ts:43](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L43)

___

### \_enabled

• `Protected` **\_enabled**: `boolean` = `true`

Is the Root enabled? For internal use only.

See [enabled](domvirtualkeyboardroot.md#enabled)

#### Inherited from

[DOMRoot](domroot.md).[_enabled](domroot.md#_enabled)

#### Defined in

[core/Root.ts:30](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L30)

___

### \_foci

• `Protected` **\_foci**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Current component foci (event targets for each focus type).

For internal use only.

See [requestFocus](domvirtualkeyboardroot.md#requestfocus), [dropFocus](domvirtualkeyboardroot.md#dropfocus), [clearFocus](domvirtualkeyboardroot.md#clearfocus) and
[getFocus](domvirtualkeyboardroot.md#getfocus)

#### Inherited from

[DOMRoot](domroot.md).[_foci](domroot.md#_foci)

#### Defined in

[core/Root.ts:57](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L57)

___

### \_fociCapturers

• `Protected` **\_fociCapturers**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Last capturer of each component focus (event targets for each focus
type).

For internal use only.

See [getFocusCapturer](domvirtualkeyboardroot.md#getfocuscapturer)

#### Inherited from

[DOMRoot](domroot.md).[_fociCapturers](domroot.md#_focicapturers)

#### Defined in

[core/Root.ts:69](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L69)

___

### \_mobileTextInUse

• `Protected` **\_mobileTextInUse**: `boolean` = `false`

Is the mobile-friendly text input in use?

For internal use only.

See [hasMobileTextInput](domvirtualkeyboardroot.md#hasmobiletextinput), [usingMobileTextInput](domvirtualkeyboardroot.md#usingmobiletextinput) and
[getTextInput](domvirtualkeyboardroot.md#gettextinput)

#### Inherited from

[DOMRoot](domroot.md).[_mobileTextInUse](domroot.md#_mobiletextinuse)

#### Defined in

[core/Root.ts:89](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L89)

___

### child

• `Readonly` **child**: [`Widget`](widget.md)

The Root's child; the parent Widget of all widgets in this Root

#### Inherited from

[DOMRoot](domroot.md).[child](domroot.md#child)

#### Defined in

[core/Root.ts:20](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L20)

___

### domElem

• `Readonly` **domElem**: `HTMLCanvasElement`

This root's canvas element. Add this to the HTML body

#### Inherited from

[DOMRoot](domroot.md).[domElem](domroot.md#domelem)

#### Defined in

[core/DOMRoot.ts:17](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/DOMRoot.ts#L17)

___

### drivers

• `Protected` **drivers**: `Set`<[`Driver`](../interfaces/driver.md)\>

The list of drivers registered to this root

#### Inherited from

[DOMRoot](domroot.md).[drivers](domroot.md#drivers)

#### Defined in

[core/Root.ts:24](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L24)

___

### keyboardDriver

• `Private` `Readonly` **keyboardDriver**: [`KeyboardDriver`](keyboarddriver.md)

The [KeyboardDriver](keyboarddriver.md) used by this root's virtual keyboard.

#### Defined in

[core/DOMVirtualKeyboardRoot.ts:18](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/DOMVirtualKeyboardRoot.ts#L18)

___

### pointerStyle

• **pointerStyle**: `string` = `'default'`

The pointer style this root wants. Will be set on
[postLayoutUpdate](domvirtualkeyboardroot.md#postlayoutupdate) by [pointerStyleHandler](domvirtualkeyboardroot.md#pointerstylehandler)

#### Inherited from

[DOMRoot](domroot.md).[pointerStyle](domroot.md#pointerstyle)

#### Defined in

[core/Root.ts:35](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L35)

___

### pointerStyleHandler

• **pointerStyleHandler**: ``null`` \| [`PointerStyleHandler`](../README.md#pointerstylehandler)

Pointer style handler, decides how to show the given pointer style.
Normally a function which sets the CSS cursor style of the Root's canvas

#### Inherited from

[DOMRoot](domroot.md).[pointerStyleHandler](domroot.md#pointerstylehandler)

#### Defined in

[core/Root.ts:48](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L48)

___

### textInputHandler

• **textInputHandler**: ``null`` \| [`TextInputHandler`](../README.md#textinputhandler) = `null`

Handler for mobile-friendly text input. If not null, widgets that need
text may call this to get a string.

See [hasMobileTextInput](domvirtualkeyboardroot.md#hasmobiletextinput), [usingMobileTextInput](domvirtualkeyboardroot.md#usingmobiletextinput) and
[getTextInput](domvirtualkeyboardroot.md#gettextinput)

#### Inherited from

[DOMRoot](domroot.md).[textInputHandler](domroot.md#textinputhandler)

#### Defined in

[core/Root.ts:80](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L80)

___

### viewport

• `Protected` **viewport**: [`Viewport`](viewport.md)

The internal viewport. Manages drawing

#### Inherited from

[DOMRoot](domroot.md).[viewport](domroot.md#viewport)

#### Defined in

[core/Root.ts:22](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L22)

## Accessors

### canvas

• `get` **canvas**(): `HTMLCanvasElement`

The [viewport](domvirtualkeyboardroot.md#viewport)'s [canvas](viewport.md#canvas)

#### Returns

`HTMLCanvasElement`

#### Defined in

[core/Root.ts:173](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L173)

___

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

The [viewport](domvirtualkeyboardroot.md#viewport)'s
[canvasDimensions](viewport.md#canvasdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:121](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L121)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

The [child](domvirtualkeyboardroot.md#child)'s [dimensions](widget.md#dimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:128](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L128)

___

### enabled

• `get` **enabled**(): `boolean`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](domvirtualkeyboardroot.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](domvirtualkeyboardroot.md#updatepointerstyle) called with 'default')
and all [foci](domvirtualkeyboardroot.md#_foci) will be cleared ([clearFocus](domvirtualkeyboardroot.md#clearfocus)).

See [_enabled](domvirtualkeyboardroot.md#_enabled)

#### Returns

`boolean`

#### Defined in

[core/Root.ts:141](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L141)

• `set` **enabled**(`newEnabled`): `void`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](domvirtualkeyboardroot.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](domvirtualkeyboardroot.md#updatepointerstyle) called with 'default')
and all [foci](domvirtualkeyboardroot.md#_foci) will be cleared ([clearFocus](domvirtualkeyboardroot.md#clearfocus)).

See [_enabled](domvirtualkeyboardroot.md#_enabled)

#### Parameters

| Name | Type |
| :------ | :------ |
| `newEnabled` | `boolean` |

#### Returns

`void`

#### Defined in

[core/Root.ts:145](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L145)

___

### hasMobileTextInput

• `get` **hasMobileTextInput**(): `boolean`

Can [getTextInput](domvirtualkeyboardroot.md#gettextinput) be called? True if [textInputHandler](domvirtualkeyboardroot.md#textinputhandler) is
not null and [usingMobileTextInput](domvirtualkeyboardroot.md#usingmobiletextinput) is false.

#### Returns

`boolean`

#### Defined in

[core/Root.ts:446](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L446)

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

The [viewport](domvirtualkeyboardroot.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:109](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L109)

• `set` **maxDimensions**(`maxDimensions`): `void`

The [viewport](domvirtualkeyboardroot.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxDimensions` | [`number`, `number`] |

#### Returns

`void`

#### Defined in

[core/Root.ts:113](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L113)

___

### usingMobileTextInput

• `get` **usingMobileTextInput**(): `boolean`

Is [getTextInput](domvirtualkeyboardroot.md#gettextinput) in use?

See [_mobileTextInUse](domvirtualkeyboardroot.md#_mobiletextinuse).

#### Returns

`boolean`

#### Defined in

[core/Root.ts:455](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L455)

## Methods

### clearDrivers

▸ **clearDrivers**(): `void`

Unregisters all [drivers](domvirtualkeyboardroot.md#drivers) from the root, by calling
[unregisterDriver](domvirtualkeyboardroot.md#unregisterdriver).

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[clearDrivers](domroot.md#cleardrivers)

#### Defined in

[core/Root.ts:436](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L436)

___

### clearFocus

▸ **clearFocus**(`focusType`): `void`

Clears the current [focus](domvirtualkeyboardroot.md#_foci) of a given type. If there was a
focus set, [drivers](domvirtualkeyboardroot.md#drivers) are notified by calling
[Driver.onFocusChanged](../interfaces/driver.md#onfocuschanged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[clearFocus](domroot.md#clearfocus)

#### Defined in

[core/Root.ts:377](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L377)

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

Dispatches an [Event](event.md) to this root's [child](domvirtualkeyboardroot.md#child) by calling
[Widget.dispatchEvent](widget.md#dispatchevent). Updates
[foci capturers](domvirtualkeyboardroot.md#_focicapturers) and notifies [drivers](domvirtualkeyboardroot.md#drivers) by
calling [Driver.onFocusCapturerChanged](../interfaces/driver.md#onfocuscapturerchanged) if the capturer changes.
Does nothing if root is disabled.

Note that if an event with a focus is dispatched and no widget captures
the event due to the widget not existing anymore or being disabled, the
focus type of the event will be cleared in the root with
[clearFocus](domvirtualkeyboardroot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[dispatchEvent](domroot.md#dispatchevent)

#### Defined in

[core/Root.ts:225](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L225)

___

### dropFocus

▸ **dropFocus**(`focusType`, `widget`): `void`

Clears the current [focus](domvirtualkeyboardroot.md#_foci) of a given type if it is
currently set to a given widget. Achieved by calling [clearFocus](domvirtualkeyboardroot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `widget` | [`Widget`](widget.md) |

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[dropFocus](domroot.md#dropfocus)

#### Defined in

[core/Root.ts:364](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L364)

___

### getFocus

▸ **getFocus**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the current [focus](domvirtualkeyboardroot.md#_foci) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

[DOMRoot](domroot.md).[getFocus](domroot.md#getfocus)

#### Defined in

[core/Root.ts:392](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L392)

___

### getFocusCapturer

▸ **getFocusCapturer**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the last [focus capturer](domvirtualkeyboardroot.md#_focicapturers) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

[DOMRoot](domroot.md).[getFocusCapturer](domroot.md#getfocuscapturer)

#### Defined in

[core/Root.ts:399](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L399)

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

If this is already in use ([usingMobileTextInput](domvirtualkeyboardroot.md#usingmobiletextinput)), returns null, else, returns a string typed by the user.

#### Inherited from

[DOMRoot](domroot.md).[getTextInput](domroot.md#gettextinput)

#### Defined in

[core/Root.ts:465](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L465)

___

### paint

▸ **paint**(): `boolean`

Paint this root's next frame if needed. Does nothing if root is disabled.

Calls [viewport](domvirtualkeyboardroot.md#viewport)'s [Viewport.paintToCanvas](viewport.md#painttocanvas) with
[child](domvirtualkeyboardroot.md#child).

Call this after calling [postLayoutUpdate](domvirtualkeyboardroot.md#postlayoutupdate).

#### Returns

`boolean`

Returns whether the child was dirty or not. Use this to tell an external 3D library whether to update a mesh's texture or not.

#### Inherited from

[DOMRoot](domroot.md).[paint](domroot.md#paint)

#### Defined in

[core/Root.ts:205](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L205)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(): `void`

Do a post-layout update; calls [child](domvirtualkeyboardroot.md#child)'s
[Widget.postLayoutUpdate](widget.md#postlayoutupdate) and [updatePointerStyle](domvirtualkeyboardroot.md#updatepointerstyle). Does
nothing if root is disabled.

Call this before calling [paint](domvirtualkeyboardroot.md#paint) and after calling
[resolveLayout](domvirtualkeyboardroot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[postLayoutUpdate](domroot.md#postlayoutupdate)

#### Defined in

[core/Root.ts:312](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L312)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(): `void`

Do a pre-layout update; calls [drivers](domvirtualkeyboardroot.md#drivers)' [Driver.update](../interfaces/driver.md#update) and
[child](domvirtualkeyboardroot.md#child)'s [Widget.preLayoutUpdate](widget.md#prelayoutupdate). Does nothing if root is
disabled.

Call this before calling [resolveLayout](domvirtualkeyboardroot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[preLayoutUpdate](domroot.md#prelayoutupdate)

#### Defined in

[core/Root.ts:290](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L290)

___

### registerDriver

▸ **registerDriver**(`driver`): `void`

Registers a [Driver](../interfaces/driver.md) to the root, adding it to the [drivers](domvirtualkeyboardroot.md#drivers)
list and calling [Driver.onEnable](../interfaces/driver.md#onenable). If the driver was already
registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`Driver`](../interfaces/driver.md) |

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[registerDriver](domroot.md#registerdriver)

#### Defined in

[core/Root.ts:408](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L408)

___

### requestFocus

▸ **requestFocus**(`focusType`, `widget`): `void`

Sets the current [focus](domvirtualkeyboardroot.md#_foci) of a given type to a given widget.
If the focus changes, [clearFocus](domvirtualkeyboardroot.md#clearfocus) is called and [drivers](domvirtualkeyboardroot.md#drivers)
are notified by calling [Driver.onFocusChanged](../interfaces/driver.md#onfocuschanged).

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `widget` | [`Widget`](widget.md) |

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[requestFocus](domroot.md#requestfocus)

#### Defined in

[core/Root.ts:346](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L346)

___

### resolveLayout

▸ **resolveLayout**(): `boolean`

Resolve the layout of this root. Does nothing if root is disabled.

Calls [viewport](domvirtualkeyboardroot.md#viewport)'s [Viewport.populateChildsLayout](viewport.md#populatechildslayout) and
[resolveChildsLayout](viewport.md#resolvechildslayout) with [child](domvirtualkeyboardroot.md#child)

Call this before calling [postLayoutUpdate](domvirtualkeyboardroot.md#postlayoutupdate) and after calling
[preLayoutUpdate](domvirtualkeyboardroot.md#prelayoutupdate)

#### Returns

`boolean`

#### Inherited from

[DOMRoot](domroot.md).[resolveLayout](domroot.md#resolvelayout)

#### Defined in

[core/Root.ts:186](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L186)

___

### unregisterDriver

▸ **unregisterDriver**(`driver`): `void`

Unregisters a [Driver](../interfaces/driver.md) from the root, removing it from the
[drivers](domvirtualkeyboardroot.md#drivers) list and calling [Driver.onDisable](../interfaces/driver.md#ondisable). If the driver
was not registered, nothing happens.

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`Driver`](../interfaces/driver.md) |

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[unregisterDriver](domroot.md#unregisterdriver)

#### Defined in

[core/Root.ts:423](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L423)

___

### update

▸ **update**(): `void`

Update DOMRoot.

If root is disabled, [domElem](domvirtualkeyboardroot.md#domelem)'s display style is set to 'none',
hiding it.

Calls [preLayoutUpdate](domvirtualkeyboardroot.md#prelayoutupdate), [resolveLayout](domvirtualkeyboardroot.md#resolvelayout),
[postLayoutUpdate](domvirtualkeyboardroot.md#postlayoutupdate) and [paint](domvirtualkeyboardroot.md#paint).

Also updates the visibility of this root; if the keyboard driver has no
focused root, then the root is disabled, else, it is enabled.

#### Returns

`void`

#### Overrides

[DOMRoot](domroot.md).[update](domroot.md#update)

#### Defined in

[core/DOMVirtualKeyboardRoot.ts:50](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/DOMVirtualKeyboardRoot.ts#L50)

___

### updatePointerStyle

▸ **updatePointerStyle**(`newStyle?`): `void`

Calls [pointerStyleHandler](domvirtualkeyboardroot.md#pointerstylehandler) if the [pointerStyle](domvirtualkeyboardroot.md#pointerstyle) has changed
(checked by comparing with [_currentPointerStyle](domvirtualkeyboardroot.md#_currentpointerstyle)). Also updates
[_currentPointerStyle](domvirtualkeyboardroot.md#_currentpointerstyle). Can also be optionally supplied a new
pointer style.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `newStyle` | ``null`` \| `string` | `null` |

#### Returns

`void`

#### Inherited from

[DOMRoot](domroot.md).[updatePointerStyle](domroot.md#updatepointerstyle)

#### Defined in

[core/Root.ts:330](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L330)
