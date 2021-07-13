[canvas-ui](../README.md) / KeyboardDriver

# Class: KeyboardDriver

A generic keyboard [driver](../interfaces/driver.md).

Does nothing on its own, but provides an API for sending keyboard events to
registered roots.

## Hierarchy

- **`KeyboardDriver`**

  ↳ [`DOMKeyboardDriver`](domkeyboarddriver.md)

## Implements

- [`Driver`](../interfaces/driver.md)

## Table of contents

### Constructors

- [constructor](keyboarddriver.md#constructor)

### Properties

- [eventQueues](keyboarddriver.md#eventqueues)
- [focus](keyboarddriver.md#focus)
- [keysDown](keyboarddriver.md#keysdown)

### Methods

- [changeFocusedRoot](keyboarddriver.md#changefocusedroot)
- [clearFocus](keyboarddriver.md#clearfocus)
- [getEventQueue](keyboarddriver.md#geteventqueue)
- [getFocusedRoot](keyboarddriver.md#getfocusedroot)
- [isKeyDown](keyboarddriver.md#iskeydown)
- [keyDown](keyboarddriver.md#keydown)
- [keyPress](keyboarddriver.md#keypress)
- [keyUp](keyboarddriver.md#keyup)
- [onDisable](keyboarddriver.md#ondisable)
- [onEnable](keyboarddriver.md#onenable)
- [onFocusCapturerChanged](keyboarddriver.md#onfocuscapturerchanged)
- [onFocusChanged](keyboarddriver.md#onfocuschanged)
- [update](keyboarddriver.md#update)

## Constructors

### constructor

• **new KeyboardDriver**()

## Properties

### eventQueues

• `Private` **eventQueues**: `Map`<[`Root`](root.md), [`KeyEvent`](keyevent.md)[]\>

The list of key down/up events that haven't been dispatched yet.

#### Defined in

[drivers/KeyboardDriver.ts:19](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L19)

___

### focus

• `Private` **focus**: ``null`` \| [`Root`](root.md) = `null`

The currently focused root. New keyboard events will go to this root

#### Defined in

[drivers/KeyboardDriver.ts:23](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L23)

___

### keysDown

• `Private` **keysDown**: `Set`<`string`\>

A set containing the keys currently down.

#### Defined in

[drivers/KeyboardDriver.ts:21](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L21)

## Methods

### changeFocusedRoot

▸ `Protected` **changeFocusedRoot**(`root`): `void`

Changes the current [root focus](keyboarddriver.md#focus).

If there was a previous root focus, that root's [Root.clearFocus](root.md#clearfocus)
is called with [FocusType.Keyboard](../enums/focustype.md#keyboard).

[keysDown](keyboarddriver.md#keysdown) is cleared.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | ``null`` \| [`Root`](root.md) |

#### Returns

`void`

#### Defined in

[drivers/KeyboardDriver.ts:49](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L49)

___

### clearFocus

▸ **clearFocus**(): `void`

Clear the current [root focus](keyboarddriver.md#focus). Calls
[changeFocusedRoot](keyboarddriver.md#changefocusedroot) with null.

#### Returns

`void`

#### Defined in

[drivers/KeyboardDriver.ts:70](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L70)

___

### getEventQueue

▸ `Private` **getEventQueue**(`root`): ``null`` \| [`KeyEvent`](keyevent.md)[]

Get the [event queue](keyboarddriver.md#eventqueues) of a given root. If this driver
is not registered to the given root or the given root is disabled, making
it not present in eventQueues, then null is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | ``null`` \| [`Root`](root.md) |

#### Returns

``null`` \| [`KeyEvent`](keyevent.md)[]

#### Defined in

[drivers/KeyboardDriver.ts:30](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L30)

___

### getFocusedRoot

▸ **getFocusedRoot**(): ``null`` \| [`Root`](root.md)

Get the current [root focus](keyboarddriver.md#focus).

#### Returns

``null`` \| [`Root`](root.md)

Returns [focus](keyboarddriver.md#focus)

#### Defined in

[drivers/KeyboardDriver.ts:62](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L62)

___

### isKeyDown

▸ **isKeyDown**(`key`): `boolean`

Check if a key is pressed.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Must follow the [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) Web API. |

#### Returns

`boolean`

Returns true if key was in [keysDown](keyboarddriver.md#keysdown)

#### Defined in

[drivers/KeyboardDriver.ts:127](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L127)

___

### keyDown

▸ **keyDown**(`key`): `void`

Push a new [KeyPress](keypress.md) event to [eventQueues](keyboarddriver.md#eventqueues).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Must follow the [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) Web API. |

#### Returns

`void`

#### Defined in

[drivers/KeyboardDriver.ts:81](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L81)

___

### keyPress

▸ **keyPress**(`key`): `void`

Calls [keyDown](keyboarddriver.md#keydown) followed by [keyUp](keyboarddriver.md#keyup). If the key was already
down before calling ([isKeyDown](keyboarddriver.md#iskeydown)), keyUp is not called.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Must follow the [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) Web API. |

#### Returns

`void`

#### Defined in

[drivers/KeyboardDriver.ts:111](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L111)

___

### keyUp

▸ **keyUp**(`key`): `void`

Push a new [KeyRelease](keyrelease.md) event to [eventQueues](keyboarddriver.md#eventqueues).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Must follow the [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) Web API. |

#### Returns

`void`

#### Defined in

[drivers/KeyboardDriver.ts:95](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L95)

___

### onDisable

▸ **onDisable**(`root`): `void`

Removes disabled root from [eventQueues](keyboarddriver.md#eventqueues). If the root was the
[focus](keyboarddriver.md#focus), then [the focus is cleared](keyboarddriver.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[onDisable](../interfaces/driver.md#ondisable)

#### Defined in

[drivers/KeyboardDriver.ts:143](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L143)

___

### onEnable

▸ **onEnable**(`root`): `void`

Adds enabled root to [eventQueues](keyboarddriver.md#eventqueues).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[onEnable](../interfaces/driver.md#onenable)

#### Defined in

[drivers/KeyboardDriver.ts:134](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L134)

___

### onFocusCapturerChanged

▸ **onFocusCapturerChanged**(`_root`, `_focusType`, `_oldCapturer`, `_newCapturer`): `void`

Hook called by [Root.dispatchEvent](root.md#dispatchevent)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | [`Root`](root.md) |
| `_focusType` | [`FocusType`](../enums/focustype.md) |
| `_oldCapturer` | ``null`` \| [`Widget`](widget.md) |
| `_newCapturer` | ``null`` \| [`Widget`](widget.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[onFocusCapturerChanged](../interfaces/driver.md#onfocuscapturerchanged)

#### Defined in

[drivers/KeyboardDriver.ts:190](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L190)

___

### onFocusChanged

▸ **onFocusChanged**(`root`, `focusType`, `newFocus`): `void`

Does nothing if the new focus type is not a [FocusType.Keyboard](../enums/focustype.md#keyboard).
If the focus comes from a root which is not the
[root focus](keyboarddriver.md#focus), then the root focus is
[changed to the new root](keyboarddriver.md#changefocusedroot). If it comes from the
current root focus and there is no new focused widget (the root's
keyboard focus was cleared), then the root focus is
[cleared](keyboarddriver.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `newFocus` | ``null`` \| [`Widget`](widget.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[onFocusChanged](../interfaces/driver.md#onfocuschanged)

#### Defined in

[drivers/KeyboardDriver.ts:177](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L177)

___

### update

▸ **update**(`root`): `void`

Dispatches all {@link eventQueue | queued events } for the root and
clears its event queue

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[update](../interfaces/driver.md#update)

#### Defined in

[drivers/KeyboardDriver.ts:155](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/KeyboardDriver.ts#L155)
