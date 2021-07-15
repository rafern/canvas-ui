[canvas-ui](../README.md) / DOMKeyboardDriver

# Class: DOMKeyboardDriver

A [KeyboardDriver](keyboarddriver.md) which listens for key events from HTML DOM elements.

Note that if a DOM element is unfocused in the DOM to an unbound DOM element,
the root focus is cleared. If this creates issues, other DOM elements can be
bound without listening for key events.

## Hierarchy

- [`KeyboardDriver`](keyboarddriver.md)

  ↳ **`DOMKeyboardDriver`**

## Table of contents

### Constructors

- [constructor](domkeyboarddriver.md#constructor)

### Properties

- [domElems](domkeyboarddriver.md#domelems)

### Methods

- [bindDOMElem](domkeyboarddriver.md#binddomelem)
- [changeFocusedRoot](domkeyboarddriver.md#changefocusedroot)
- [clearFocus](domkeyboarddriver.md#clearfocus)
- [getFocusedRoot](domkeyboarddriver.md#getfocusedroot)
- [isKeyDown](domkeyboarddriver.md#iskeydown)
- [keyDown](domkeyboarddriver.md#keydown)
- [keyPress](domkeyboarddriver.md#keypress)
- [keyUp](domkeyboarddriver.md#keyup)
- [onDisable](domkeyboarddriver.md#ondisable)
- [onEnable](domkeyboarddriver.md#onenable)
- [onFocusCapturerChanged](domkeyboarddriver.md#onfocuscapturerchanged)
- [onFocusChanged](domkeyboarddriver.md#onfocuschanged)
- [shouldClearFocus](domkeyboarddriver.md#shouldclearfocus)
- [update](domkeyboarddriver.md#update)

## Constructors

### constructor

• **new DOMKeyboardDriver**()

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[constructor](keyboarddriver.md#constructor)

## Properties

### domElems

• `Private` **domElems**: `Set`<`EventTarget`\>

The list of HTML DOM elements bound to this keyboard driver

#### Defined in

[drivers/DOMKeyboardDriver.ts:14](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/DOMKeyboardDriver.ts#L14)

## Methods

### bindDOMElem

▸ **bindDOMElem**(`domElem`, `listenToKeys?`): `void`

Bind an HTML DOM element to this keyboard driver.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `domElem` | `HTMLElement` | `undefined` | - |
| `listenToKeys` | `boolean` | `true` | If true, event listeners will be added to listen for keys. blur event listeners are always added no matter what. |

#### Returns

`void`

#### Defined in

[drivers/DOMKeyboardDriver.ts:21](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/DOMKeyboardDriver.ts#L21)

___

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

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[changeFocusedRoot](keyboarddriver.md#changefocusedroot)

#### Defined in

[drivers/KeyboardDriver.ts:49](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L49)

___

### clearFocus

▸ **clearFocus**(): `void`

Clear the current [root focus](keyboarddriver.md#focus). Calls
[changeFocusedRoot](domkeyboarddriver.md#changefocusedroot) with null.

#### Returns

`void`

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[clearFocus](keyboarddriver.md#clearfocus)

#### Defined in

[drivers/KeyboardDriver.ts:70](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L70)

___

### getFocusedRoot

▸ **getFocusedRoot**(): ``null`` \| [`Root`](root.md)

Get the current [root focus](keyboarddriver.md#focus).

#### Returns

``null`` \| [`Root`](root.md)

Returns [focus](keyboarddriver.md#focus)

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[getFocusedRoot](keyboarddriver.md#getfocusedroot)

#### Defined in

[drivers/KeyboardDriver.ts:62](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L62)

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

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[isKeyDown](keyboarddriver.md#iskeydown)

#### Defined in

[drivers/KeyboardDriver.ts:119](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L119)

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

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[keyDown](keyboarddriver.md#keydown)

#### Defined in

[drivers/KeyboardDriver.ts:79](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L79)

___

### keyPress

▸ **keyPress**(`key`): `void`

Calls [keyDown](domkeyboarddriver.md#keydown) followed by [keyUp](domkeyboarddriver.md#keyup). If the key was already
down before calling ([isKeyDown](domkeyboarddriver.md#iskeydown)), keyUp is not called.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `key` | `string` | Must follow the [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) Web API. |

#### Returns

`void`

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[keyPress](keyboarddriver.md#keypress)

#### Defined in

[drivers/KeyboardDriver.ts:105](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L105)

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

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[keyUp](keyboarddriver.md#keyup)

#### Defined in

[drivers/KeyboardDriver.ts:91](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L91)

___

### onDisable

▸ **onDisable**(`root`): `void`

Removes disabled root from [eventQueues](keyboarddriver.md#eventqueues). If the root was the
[focus](keyboarddriver.md#focus), then [the focus is cleared](domkeyboarddriver.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[onDisable](keyboarddriver.md#ondisable)

#### Defined in

[drivers/KeyboardDriver.ts:135](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L135)

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

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[onEnable](keyboarddriver.md#onenable)

#### Defined in

[drivers/KeyboardDriver.ts:126](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L126)

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

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[onFocusCapturerChanged](keyboarddriver.md#onfocuscapturerchanged)

#### Defined in

[drivers/KeyboardDriver.ts:182](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L182)

___

### onFocusChanged

▸ **onFocusChanged**(`root`, `focusType`, `newFocus`): `void`

Does nothing if the new focus type is not a [FocusType.Keyboard](../enums/focustype.md#keyboard).
If the focus comes from a root which is not the
[root focus](keyboarddriver.md#focus), then the root focus is
[changed to the new root](domkeyboarddriver.md#changefocusedroot). If it comes from the
current root focus and there is no new focused widget (the root's
keyboard focus was cleared), then the root focus is
[cleared](domkeyboarddriver.md#clearfocus).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `newFocus` | ``null`` \| [`Widget`](widget.md) |

#### Returns

`void`

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[onFocusChanged](keyboarddriver.md#onfocuschanged)

#### Defined in

[drivers/KeyboardDriver.ts:169](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L169)

___

### shouldClearFocus

▸ **shouldClearFocus**(`newTarget`): `boolean`

Check if the [root focus](keyboarddriver.md#focus) should be cleared given that the
HTML DOM focus has been lost to another HTML DOM element

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newTarget` | ``null`` \| `EventTarget` | The HTML DOM element to which the focus has been lost to |

#### Returns

`boolean`

#### Defined in

[drivers/DOMKeyboardDriver.ts:55](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/DOMKeyboardDriver.ts#L55)

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

#### Inherited from

[KeyboardDriver](keyboarddriver.md).[update](keyboarddriver.md#update)

#### Defined in

[drivers/KeyboardDriver.ts:147](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/KeyboardDriver.ts#L147)
