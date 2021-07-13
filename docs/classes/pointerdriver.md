[canvas-ui](../README.md) / PointerDriver

# Class: PointerDriver

A generic pointer [driver](../interfaces/driver.md).

Does nothing on its own, but provides an API for sending pointer events to
registered roots and (un)registering pointers.

## Hierarchy

- **`PointerDriver`**

  ↳ [`DOMPointerDriver`](dompointerdriver.md)

## Implements

- [`Driver`](../interfaces/driver.md)

## Table of contents

### Constructors

- [constructor](pointerdriver.md#constructor)

### Properties

- [nextPointerID](pointerdriver.md#nextpointerid)
- [states](pointerdriver.md#states)

### Methods

- [leavePointer](pointerdriver.md#leavepointer)
- [movePointer](pointerdriver.md#movepointer)
- [onDisable](pointerdriver.md#ondisable)
- [onEnable](pointerdriver.md#onenable)
- [onFocusCapturerChanged](pointerdriver.md#onfocuscapturerchanged)
- [onFocusChanged](pointerdriver.md#onfocuschanged)
- [registerPointer](pointerdriver.md#registerpointer)
- [unregisterPointer](pointerdriver.md#unregisterpointer)
- [update](pointerdriver.md#update)

## Constructors

### constructor

• **new PointerDriver**()

## Properties

### nextPointerID

• `Private` **nextPointerID**: `number` = `0`

The next available pointer ID. See [registerPointer](pointerdriver.md#registerpointer)

#### Defined in

[drivers/PointerDriver.ts:34](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L34)

___

### states

• `Protected` **states**: `Map`<[`Root`](root.md), `PointerDriverState`\>

The current state for each registered and enabled root. Contains whether
each root is pressing, hovering, which pointer is bound to it and its
event queue

#### Defined in

[drivers/PointerDriver.ts:32](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L32)

## Methods

### leavePointer

▸ **leavePointer**(`root`, `pointer`): `void`

Queue up a [Leave](leave.md) event to a given root. Event will only be queued
if the root was being hovered.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `root` | [`Root`](root.md) | - |
| `pointer` | `number` | The registered pointer ID |

#### Returns

`void`

#### Defined in

[drivers/PointerDriver.ts:145](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L145)

___

### movePointer

▸ **movePointer**(`root`, `pointer`, `xNorm`, `yNorm`, `pressing?`): `void`

Queue up a pointer event to a given root. The type of
[PointerEvent](pointerevent.md) is decided automatically based on the root's state
and whether its pressing or not.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `root` | [`Root`](root.md) | `undefined` | - |
| `pointer` | `number` | `undefined` | The registered pointer ID |
| `xNorm` | `number` | `undefined` | The normalised (non-integer range from 0 to 1) X coordinate of the pointer event. 0 is the left edge of the root, while 1 is the right edge of the root. |
| `yNorm` | `number` | `undefined` | The normalised (non-integer range from 0 to 1) Y coordinate of the pointer event. 0 is the top edge of the root, while 1 is the bottom edge of the root. |
| `pressing` | ``null`` \| `boolean` | `null` | Is the pointer pressed?  If null, the last pressing state is used, meaning that the pressing state has not changed. Useful if getting pointer movement in an event based environment where you only know when a pointer press occurs, but not if the pointer is pressed or not |

#### Returns

`void`

#### Defined in

[drivers/PointerDriver.ts:87](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L87)

___

### onDisable

▸ **onDisable**(`root`): `void`

Dispatches a leave event for the disabled root and deletes the state of
the disabled root from [states](pointerdriver.md#states).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[onDisable](../interfaces/driver.md#ondisable)

#### Defined in

[drivers/PointerDriver.ts:176](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L176)

___

### onEnable

▸ **onEnable**(`root`): `void`

Creates a state for the enabled root in [states](pointerdriver.md#states).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[onEnable](../interfaces/driver.md#onenable)

#### Defined in

[drivers/PointerDriver.ts:162](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L162)

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

[drivers/PointerDriver.ts:205](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L205)

___

### onFocusChanged

▸ **onFocusChanged**(`_root`, `_focusType`, `_newFocus`): `void`

Hook called by [Root.requestFocus](root.md#requestfocus) and [Root.clearFocus](root.md#clearfocus)

#### Parameters

| Name | Type |
| :------ | :------ |
| `_root` | [`Root`](root.md) |
| `_focusType` | [`FocusType`](../enums/focustype.md) |
| `_newFocus` | ``null`` \| [`Widget`](widget.md) |

#### Returns

`void`

#### Implementation of

[Driver](../interfaces/driver.md).[onFocusChanged](../interfaces/driver.md#onfocuschanged)

#### Defined in

[drivers/PointerDriver.ts:202](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L202)

___

### registerPointer

▸ **registerPointer**(): `number`

Register a new pointer.

#### Returns

`number`

Returns [nextPointerID](pointerdriver.md#nextpointerid) and increments it

#### Defined in

[drivers/PointerDriver.ts:41](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L41)

___

### unregisterPointer

▸ **unregisterPointer**(`pointer`): `void`

Unregister a pointer.

If a root has this pointer bound to it, the pointer is unbound from the
root, a Leave event is queued to the root and the hovering and pressing
state of the root is set to false.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointer` | `number` |

#### Returns

`void`

#### Defined in

[drivers/PointerDriver.ts:52](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L52)

___

### update

▸ **update**(`root`): `void`

Dispatches all queued events (found in [states](pointerdriver.md#states)) for the root and
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

[drivers/PointerDriver.ts:188](https://github.com/playkostudios/canvas-ui/blob/2407796/src/drivers/PointerDriver.ts#L188)
