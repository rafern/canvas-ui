[canvas-ui](../README.md) / VirtualKeyboardRoot

# Class: VirtualKeyboardRoot

A [Root](root.md) containing a single [VirtualKeyboard](virtualkeyboard.md) widget.
Automatically disables itself if not needed, but [updateVisibility](virtualkeyboardroot.md#updatevisibility)
must be called every frame for this behaviour to occur.

## Hierarchy

- [`Root`](root.md)

  ↳ **`VirtualKeyboardRoot`**

## Table of contents

### Constructors

- [constructor](virtualkeyboardroot.md#constructor)

### Properties

- [\_currentPointerStyle](virtualkeyboardroot.md#_currentpointerstyle)
- [\_enabled](virtualkeyboardroot.md#_enabled)
- [\_foci](virtualkeyboardroot.md#_foci)
- [\_fociCapturers](virtualkeyboardroot.md#_focicapturers)
- [\_mobileTextInUse](virtualkeyboardroot.md#_mobiletextinuse)
- [child](virtualkeyboardroot.md#child)
- [drivers](virtualkeyboardroot.md#drivers)
- [keyboardDriver](virtualkeyboardroot.md#keyboarddriver)
- [pointerStyle](virtualkeyboardroot.md#pointerstyle)
- [pointerStyleHandler](virtualkeyboardroot.md#pointerstylehandler)
- [textInputHandler](virtualkeyboardroot.md#textinputhandler)
- [viewport](virtualkeyboardroot.md#viewport)

### Accessors

- [canvas](virtualkeyboardroot.md#canvas)
- [canvasDimensions](virtualkeyboardroot.md#canvasdimensions)
- [dimensions](virtualkeyboardroot.md#dimensions)
- [enabled](virtualkeyboardroot.md#enabled)
- [hasMobileTextInput](virtualkeyboardroot.md#hasmobiletextinput)
- [maxDimensions](virtualkeyboardroot.md#maxdimensions)
- [usingMobileTextInput](virtualkeyboardroot.md#usingmobiletextinput)

### Methods

- [clearDrivers](virtualkeyboardroot.md#cleardrivers)
- [clearFocus](virtualkeyboardroot.md#clearfocus)
- [dispatchEvent](virtualkeyboardroot.md#dispatchevent)
- [dropFocus](virtualkeyboardroot.md#dropfocus)
- [getFocus](virtualkeyboardroot.md#getfocus)
- [getFocusCapturer](virtualkeyboardroot.md#getfocuscapturer)
- [getTextInput](virtualkeyboardroot.md#gettextinput)
- [paint](virtualkeyboardroot.md#paint)
- [postLayoutUpdate](virtualkeyboardroot.md#postlayoutupdate)
- [preLayoutUpdate](virtualkeyboardroot.md#prelayoutupdate)
- [registerDriver](virtualkeyboardroot.md#registerdriver)
- [requestFocus](virtualkeyboardroot.md#requestfocus)
- [resolveLayout](virtualkeyboardroot.md#resolvelayout)
- [unregisterDriver](virtualkeyboardroot.md#unregisterdriver)
- [updatePointerStyle](virtualkeyboardroot.md#updatepointerstyle)
- [updateVisibility](virtualkeyboardroot.md#updatevisibility)

## Constructors

### constructor

• **new VirtualKeyboardRoot**(`keyboardDriver`, `keyboardTemplate?`, `pointerStyleHandler?`, `theme?`)

Creates a new VirtualKeyboardRoot.

Sets [child](virtualkeyboardroot.md#child) to a new [VirtualKeyboard](virtualkeyboard.md) with the given
keyboard and [keyboard template](../README.md#virtualkeyboardtemplate),
[pointerStyleHandler](virtualkeyboardroot.md#pointerstylehandler) and [child](virtualkeyboardroot.md#child)'s
[inherited theme](widget.md#inheritedtheme).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `keyboardDriver` | [`KeyboardDriver`](keyboarddriver.md) | `undefined` | - |
| `keyboardTemplate` | [`VirtualKeyboardTemplate`](../README.md#virtualkeyboardtemplate) | `undefined` | By default, the virtual keyboard template is [defaultVirtualKeyboardTemplate](../README.md#defaultvirtualkeyboardtemplate) |
| `pointerStyleHandler` | ``null`` \| [`PointerStyleHandler`](../README.md#pointerstylehandler) | `null` | - |
| `theme` | [`Theme`](theme.md) | `undefined` | By default, the theme is [defaultTheme](../README.md#defaulttheme) |

#### Overrides

[Root](root.md).[constructor](root.md#constructor)

#### Defined in

[core/VirtualKeyboardRoot.ts:18](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/VirtualKeyboardRoot.ts#L18)

## Properties

### \_currentPointerStyle

• `Protected` **\_currentPointerStyle**: `string` = `'default'`

The actual current pointer style.

For internal use only.

See [pointerStyle](virtualkeyboardroot.md#pointerstyle)

#### Inherited from

[Root](root.md).[_currentPointerStyle](root.md#_currentpointerstyle)

#### Defined in

[core/Root.ts:43](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L43)

___

### \_enabled

• `Protected` **\_enabled**: `boolean` = `true`

Is the Root enabled? For internal use only.

See [enabled](virtualkeyboardroot.md#enabled)

#### Inherited from

[Root](root.md).[_enabled](root.md#_enabled)

#### Defined in

[core/Root.ts:30](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L30)

___

### \_foci

• `Protected` **\_foci**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Current component foci (event targets for each focus type).

For internal use only.

See [requestFocus](virtualkeyboardroot.md#requestfocus), [dropFocus](virtualkeyboardroot.md#dropfocus), [clearFocus](virtualkeyboardroot.md#clearfocus) and
[getFocus](virtualkeyboardroot.md#getfocus)

#### Inherited from

[Root](root.md).[_foci](root.md#_foci)

#### Defined in

[core/Root.ts:57](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L57)

___

### \_fociCapturers

• `Protected` **\_fociCapturers**: `Map`<[`FocusType`](../enums/focustype.md), ``null`` \| [`Widget`](widget.md)\>

Last capturer of each component focus (event targets for each focus
type).

For internal use only.

See [getFocusCapturer](virtualkeyboardroot.md#getfocuscapturer)

#### Inherited from

[Root](root.md).[_fociCapturers](root.md#_focicapturers)

#### Defined in

[core/Root.ts:69](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L69)

___

### \_mobileTextInUse

• `Protected` **\_mobileTextInUse**: `boolean` = `false`

Is the mobile-friendly text input in use?

For internal use only.

See [hasMobileTextInput](virtualkeyboardroot.md#hasmobiletextinput), [usingMobileTextInput](virtualkeyboardroot.md#usingmobiletextinput) and
[getTextInput](virtualkeyboardroot.md#gettextinput)

#### Inherited from

[Root](root.md).[_mobileTextInUse](root.md#_mobiletextinuse)

#### Defined in

[core/Root.ts:89](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L89)

___

### child

• `Readonly` **child**: [`Widget`](widget.md)

The Root's child; the parent Widget of all widgets in this Root

#### Inherited from

[Root](root.md).[child](root.md#child)

#### Defined in

[core/Root.ts:20](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L20)

___

### drivers

• `Protected` **drivers**: `Set`<[`Driver`](../interfaces/driver.md)\>

The list of drivers registered to this root

#### Inherited from

[Root](root.md).[drivers](root.md#drivers)

#### Defined in

[core/Root.ts:24](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L24)

___

### keyboardDriver

• `Private` `Readonly` **keyboardDriver**: [`KeyboardDriver`](keyboarddriver.md)

The [KeyboardDriver](keyboarddriver.md) used by this root's virtual keyboard.

#### Defined in

[core/VirtualKeyboardRoot.ts:18](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/VirtualKeyboardRoot.ts#L18)

___

### pointerStyle

• **pointerStyle**: `string` = `'default'`

The pointer style this root wants. Will be set on
[postLayoutUpdate](virtualkeyboardroot.md#postlayoutupdate) by [pointerStyleHandler](virtualkeyboardroot.md#pointerstylehandler)

#### Inherited from

[Root](root.md).[pointerStyle](root.md#pointerstyle)

#### Defined in

[core/Root.ts:35](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L35)

___

### pointerStyleHandler

• **pointerStyleHandler**: ``null`` \| [`PointerStyleHandler`](../README.md#pointerstylehandler)

Pointer style handler, decides how to show the given pointer style.
Normally a function which sets the CSS cursor style of the Root's canvas

#### Inherited from

[Root](root.md).[pointerStyleHandler](root.md#pointerstylehandler)

#### Defined in

[core/Root.ts:48](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L48)

___

### textInputHandler

• **textInputHandler**: ``null`` \| [`TextInputHandler`](../README.md#textinputhandler) = `null`

Handler for mobile-friendly text input. If not null, widgets that need
text may call this to get a string.

See [hasMobileTextInput](virtualkeyboardroot.md#hasmobiletextinput), [usingMobileTextInput](virtualkeyboardroot.md#usingmobiletextinput) and
[getTextInput](virtualkeyboardroot.md#gettextinput)

#### Inherited from

[Root](root.md).[textInputHandler](root.md#textinputhandler)

#### Defined in

[core/Root.ts:80](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L80)

___

### viewport

• `Protected` **viewport**: [`Viewport`](viewport.md)

The internal viewport. Manages drawing

#### Inherited from

[Root](root.md).[viewport](root.md#viewport)

#### Defined in

[core/Root.ts:22](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L22)

## Accessors

### canvas

• `get` **canvas**(): `HTMLCanvasElement`

The [viewport](virtualkeyboardroot.md#viewport)'s [canvas](viewport.md#canvas)

#### Returns

`HTMLCanvasElement`

#### Defined in

[core/Root.ts:173](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L173)

___

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

The [viewport](virtualkeyboardroot.md#viewport)'s
[canvasDimensions](viewport.md#canvasdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:121](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L121)

___

### dimensions

• `get` **dimensions**(): [`number`, `number`]

The [child](virtualkeyboardroot.md#child)'s [dimensions](widget.md#dimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:128](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L128)

___

### enabled

• `get` **enabled**(): `boolean`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](virtualkeyboardroot.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](virtualkeyboardroot.md#updatepointerstyle) called with 'default')
and all [foci](virtualkeyboardroot.md#_foci) will be cleared ([clearFocus](virtualkeyboardroot.md#clearfocus)).

See [_enabled](virtualkeyboardroot.md#_enabled)

#### Returns

`boolean`

#### Defined in

[core/Root.ts:141](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L141)

• `set` **enabled**(`newEnabled`): `void`

Is this root enabled? If not enabled, painting, updating or resolving
layout will do nothing. [Drivers](virtualkeyboardroot.md#drivers) will also be notified
by calling [Driver.onEnable](../interfaces/driver.md#onenable) or [Driver.onDisable](../interfaces/driver.md#ondisable), pointer
style will be reset ([updatePointerStyle](virtualkeyboardroot.md#updatepointerstyle) called with 'default')
and all [foci](virtualkeyboardroot.md#_foci) will be cleared ([clearFocus](virtualkeyboardroot.md#clearfocus)).

See [_enabled](virtualkeyboardroot.md#_enabled)

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

Can [getTextInput](virtualkeyboardroot.md#gettextinput) be called? True if [textInputHandler](virtualkeyboardroot.md#textinputhandler) is
not null and [usingMobileTextInput](virtualkeyboardroot.md#usingmobiletextinput) is false.

#### Returns

`boolean`

#### Defined in

[core/Root.ts:446](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L446)

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

The [viewport](virtualkeyboardroot.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

#### Returns

[`number`, `number`]

#### Defined in

[core/Root.ts:109](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L109)

• `set` **maxDimensions**(`maxDimensions`): `void`

The [viewport](virtualkeyboardroot.md#viewport)'s [maxDimensions](viewport.md#maxdimensions)

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

Is [getTextInput](virtualkeyboardroot.md#gettextinput) in use?

See [_mobileTextInUse](virtualkeyboardroot.md#_mobiletextinuse).

#### Returns

`boolean`

#### Defined in

[core/Root.ts:455](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L455)

## Methods

### clearDrivers

▸ **clearDrivers**(): `void`

Unregisters all [drivers](virtualkeyboardroot.md#drivers) from the root, by calling
[unregisterDriver](virtualkeyboardroot.md#unregisterdriver).

#### Returns

`void`

#### Inherited from

[Root](root.md).[clearDrivers](root.md#cleardrivers)

#### Defined in

[core/Root.ts:436](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L436)

___

### clearFocus

▸ **clearFocus**(`focusType`): `void`

Clears the current [focus](virtualkeyboardroot.md#_foci) of a given type. If there was a
focus set, [drivers](virtualkeyboardroot.md#drivers) are notified by calling
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

[core/Root.ts:377](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L377)

___

### dispatchEvent

▸ **dispatchEvent**(`event`): `void`

Dispatches an [Event](event.md) to this root's [child](virtualkeyboardroot.md#child) by calling
[Widget.dispatchEvent](widget.md#dispatchevent). Updates
[foci capturers](virtualkeyboardroot.md#_focicapturers) and notifies [drivers](virtualkeyboardroot.md#drivers) by
calling [Driver.onFocusCapturerChanged](../interfaces/driver.md#onfocuscapturerchanged) if the capturer changes.
Does nothing if root is disabled.

Note that if an event with a focus is dispatched and no widget captures
the event due to the widget not existing anymore or being disabled, the
focus type of the event will be cleared in the root with
[clearFocus](virtualkeyboardroot.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Event`](event.md) |

#### Returns

`void`

#### Inherited from

[Root](root.md).[dispatchEvent](root.md#dispatchevent)

#### Defined in

[core/Root.ts:225](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L225)

___

### dropFocus

▸ **dropFocus**(`focusType`, `widget`): `void`

Clears the current [focus](virtualkeyboardroot.md#_foci) of a given type if it is
currently set to a given widget. Achieved by calling [clearFocus](virtualkeyboardroot.md#clearfocus).

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

[core/Root.ts:364](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L364)

___

### getFocus

▸ **getFocus**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the current [focus](virtualkeyboardroot.md#_foci) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

[Root](root.md).[getFocus](root.md#getfocus)

#### Defined in

[core/Root.ts:392](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L392)

___

### getFocusCapturer

▸ **getFocusCapturer**(`focusType`): ``null`` \| [`Widget`](widget.md)

Gets the last [focus capturer](virtualkeyboardroot.md#_focicapturers) of a given type.

#### Parameters

| Name | Type |
| :------ | :------ |
| `focusType` | [`FocusType`](../enums/focustype.md) |

#### Returns

``null`` \| [`Widget`](widget.md)

#### Inherited from

[Root](root.md).[getFocusCapturer](root.md#getfocuscapturer)

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

If this is already in use ([usingMobileTextInput](virtualkeyboardroot.md#usingmobiletextinput)), returns null, else, returns a string typed by the user.

#### Inherited from

[Root](root.md).[getTextInput](root.md#gettextinput)

#### Defined in

[core/Root.ts:465](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L465)

___

### paint

▸ **paint**(): `boolean`

Paint this root's next frame if needed. Does nothing if root is disabled.

Calls [viewport](virtualkeyboardroot.md#viewport)'s [Viewport.paintToCanvas](viewport.md#painttocanvas) with
[child](virtualkeyboardroot.md#child).

Call this after calling [postLayoutUpdate](virtualkeyboardroot.md#postlayoutupdate).

#### Returns

`boolean`

Returns whether the child was dirty or not. Use this to tell an external 3D library whether to update a mesh's texture or not.

#### Inherited from

[Root](root.md).[paint](root.md#paint)

#### Defined in

[core/Root.ts:205](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L205)

___

### postLayoutUpdate

▸ **postLayoutUpdate**(): `void`

Do a post-layout update; calls [child](virtualkeyboardroot.md#child)'s
[Widget.postLayoutUpdate](widget.md#postlayoutupdate) and [updatePointerStyle](virtualkeyboardroot.md#updatepointerstyle). Does
nothing if root is disabled.

Call this before calling [paint](virtualkeyboardroot.md#paint) and after calling
[resolveLayout](virtualkeyboardroot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[Root](root.md).[postLayoutUpdate](root.md#postlayoutupdate)

#### Defined in

[core/Root.ts:312](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L312)

___

### preLayoutUpdate

▸ **preLayoutUpdate**(): `void`

Do a pre-layout update; calls [drivers](virtualkeyboardroot.md#drivers)' [Driver.update](../interfaces/driver.md#update) and
[child](virtualkeyboardroot.md#child)'s [Widget.preLayoutUpdate](widget.md#prelayoutupdate). Does nothing if root is
disabled.

Call this before calling [resolveLayout](virtualkeyboardroot.md#resolvelayout)

#### Returns

`void`

#### Inherited from

[Root](root.md).[preLayoutUpdate](root.md#prelayoutupdate)

#### Defined in

[core/Root.ts:290](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L290)

___

### registerDriver

▸ **registerDriver**(`driver`): `void`

Registers a [Driver](../interfaces/driver.md) to the root, adding it to the [drivers](virtualkeyboardroot.md#drivers)
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

[core/Root.ts:408](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L408)

___

### requestFocus

▸ **requestFocus**(`focusType`, `widget`): `void`

Sets the current [focus](virtualkeyboardroot.md#_foci) of a given type to a given widget.
If the focus changes, [clearFocus](virtualkeyboardroot.md#clearfocus) is called and [drivers](virtualkeyboardroot.md#drivers)
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

[core/Root.ts:346](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L346)

___

### resolveLayout

▸ **resolveLayout**(): `boolean`

Resolve the layout of this root. Does nothing if root is disabled.

Calls [viewport](virtualkeyboardroot.md#viewport)'s [Viewport.populateChildsLayout](viewport.md#populatechildslayout) and
[resolveChildsLayout](viewport.md#resolvechildslayout) with [child](virtualkeyboardroot.md#child)

Call this before calling [postLayoutUpdate](virtualkeyboardroot.md#postlayoutupdate) and after calling
[preLayoutUpdate](virtualkeyboardroot.md#prelayoutupdate)

#### Returns

`boolean`

#### Inherited from

[Root](root.md).[resolveLayout](root.md#resolvelayout)

#### Defined in

[core/Root.ts:186](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L186)

___

### unregisterDriver

▸ **unregisterDriver**(`driver`): `void`

Unregisters a [Driver](../interfaces/driver.md) from the root, removing it from the
[drivers](virtualkeyboardroot.md#drivers) list and calling [Driver.onDisable](../interfaces/driver.md#ondisable). If the driver
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

[core/Root.ts:423](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L423)

___

### updatePointerStyle

▸ **updatePointerStyle**(`newStyle?`): `void`

Calls [pointerStyleHandler](virtualkeyboardroot.md#pointerstylehandler) if the [pointerStyle](virtualkeyboardroot.md#pointerstyle) has changed
(checked by comparing with [_currentPointerStyle](virtualkeyboardroot.md#_currentpointerstyle)). Also updates
[_currentPointerStyle](virtualkeyboardroot.md#_currentpointerstyle). Can also be optionally supplied a new
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

[core/Root.ts:330](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Root.ts#L330)

___

### updateVisibility

▸ **updateVisibility**(): `void`

Update the visibility of this root; if the keyboard driver has no focused
root, then the root is disabled, else, it is enabled. Call this method
on every frame to automatically enable/disable the root if needed

#### Returns

`void`

#### Defined in

[core/VirtualKeyboardRoot.ts:41](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/VirtualKeyboardRoot.ts#L41)
