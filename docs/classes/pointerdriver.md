[canvas-ui](../README.md) / PointerDriver

# Class: PointerDriver

A generic pointer [driver](../interfaces/driver.md).

Does nothing on its own, but provides an API for sending pointer events to
registered roots and (un)registering pointers.

## Hierarchy

- **`PointerDriver`**

  ↳ [`DOMPointerDriver`](dompointerdriver.md)

  ↳ [`RayPointerDriver`](raypointerdriver.md)

## Implements

- [`Driver`](../interfaces/driver.md)

## Table of contents

### Constructors

- [constructor](pointerdriver.md#constructor)

### Properties

- [hints](pointerdriver.md#hints)
- [nextPointerID](pointerdriver.md#nextpointerid)
- [states](pointerdriver.md#states)

### Methods

- [getPointerHint](pointerdriver.md#getpointerhint)
- [leaveAnyPointer](pointerdriver.md#leaveanypointer)
- [leavePointer](pointerdriver.md#leavepointer)
- [movePointer](pointerdriver.md#movepointer)
- [onDisable](pointerdriver.md#ondisable)
- [onEnable](pointerdriver.md#onenable)
- [onFocusCapturerChanged](pointerdriver.md#onfocuscapturerchanged)
- [onFocusChanged](pointerdriver.md#onfocuschanged)
- [registerPointer](pointerdriver.md#registerpointer)
- [setPointerHint](pointerdriver.md#setpointerhint)
- [unassignPointer](pointerdriver.md#unassignpointer)
- [unregisterPointer](pointerdriver.md#unregisterpointer)
- [update](pointerdriver.md#update)

## Constructors

### constructor

• **new PointerDriver**()

## Properties

### hints

• `Protected` **hints**: `Map`<`number`, [`PointerHint`](../enums/pointerhint.md)\>

The [hints](../enums/pointerhint.md) for each pointer. The keys are pointer
IDs, while the values are that pointer's hint.

See [getPointerHint](pointerdriver.md#getpointerhint)

#### Defined in

[drivers/PointerDriver.ts:42](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L42)

___

### nextPointerID

• `Private` **nextPointerID**: `number` = `0`

The next available pointer ID. See [registerPointer](pointerdriver.md#registerpointer)

#### Defined in

[drivers/PointerDriver.ts:35](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L35)

___

### states

• `Protected` **states**: `Map`<[`Root`](root.md), `PointerDriverState`\>

The current state for each registered and enabled root. Contains whether
each root is pressing, hovering, which pointer is bound to it and its
event queue

#### Defined in

[drivers/PointerDriver.ts:33](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L33)

## Methods

### getPointerHint

▸ **getPointerHint**(`pointer`): [`PointerHint`](../enums/pointerhint.md)

Get a pointer's [hint](../enums/pointerhint.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointer` | `number` | The registered pointer ID |

#### Returns

[`PointerHint`](../enums/pointerhint.md)

Returns the given pointer ID's hint. If the pointer ID is not registered, [PointerHint.None](../enums/pointerhint.md#none) is returned.

#### Defined in

[drivers/PointerDriver.ts:240](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L240)

___

### leaveAnyPointer

▸ **leaveAnyPointer**(`pointer`): `void`

Queue up a [Leave](leave.md) event to any root with the given pointer
assigned. Event will only be queued if the root was being hovered.
Pointer will also be unassigned from root.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointer` | `number` | The registered pointer ID |

#### Returns

`void`

#### Defined in

[drivers/PointerDriver.ts:210](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L210)

___

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

[drivers/PointerDriver.ts:187](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L187)

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

[drivers/PointerDriver.ts:105](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L105)

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

[drivers/PointerDriver.ts:261](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L261)

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

[drivers/PointerDriver.ts:247](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L247)

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

[drivers/PointerDriver.ts:296](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L296)

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

[drivers/PointerDriver.ts:293](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L293)

___

### registerPointer

▸ **registerPointer**(): `number`

Register a new pointer.

#### Returns

`number`

Returns [nextPointerID](pointerdriver.md#nextpointerid) and increments it

#### Defined in

[drivers/PointerDriver.ts:67](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L67)

___

### setPointerHint

▸ `Protected` **setPointerHint**(`pointer`, `hint`): `boolean`

Set a pointer's [hint](../enums/pointerhint.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointer` | `number` | The registered pointer ID |
| `hint` | [`PointerHint`](../enums/pointerhint.md) | The new pointer hint |

#### Returns

`boolean`

Returns true if the pointer hint changed, else, false

#### Defined in

[drivers/PointerDriver.ts:222](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L222)

___

### unassignPointer

▸ `Private` **unassignPointer**(`root`, `state`): `void`

Unassign a pointer from a given root and its state.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |
| `state` | `PointerDriverState` |

#### Returns

`void`

#### Defined in

[drivers/PointerDriver.ts:45](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L45)

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

[drivers/PointerDriver.ts:80](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L80)

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

[drivers/PointerDriver.ts:279](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L279)
