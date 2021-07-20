[canvas-ui](../README.md) / RayPointerDriver

# Class: RayPointerDriver

A [PointerDriver](pointerdriver.md) which gets pointer events from raycasts in a 3D
engine's world. This is an abstract class and must be implemented. For an
example, see
[canvas-ui-three](https://github.com/playkostudios/canvas-ui-three)'s
ThreeRayPointerDriver implementation.

## Hierarchy

- [`PointerDriver`](pointerdriver.md)

  ↳ **`RayPointerDriver`**

## Table of contents

### Constructors

- [constructor](raypointerdriver.md#constructor)

### Properties

- [hints](raypointerdriver.md#hints)
- [sources](raypointerdriver.md#sources)
- [states](raypointerdriver.md#states)

### Methods

- [addSource](raypointerdriver.md#addsource)
- [castRay](raypointerdriver.md#castray)
- [getPointerHint](raypointerdriver.md#getpointerhint)
- [handlePointerRay](raypointerdriver.md#handlepointerray)
- [leaveAnyPointer](raypointerdriver.md#leaveanypointer)
- [leavePointer](raypointerdriver.md#leavepointer)
- [movePointer](raypointerdriver.md#movepointer)
- [onDisable](raypointerdriver.md#ondisable)
- [onEnable](raypointerdriver.md#onenable)
- [onFocusCapturerChanged](raypointerdriver.md#onfocuscapturerchanged)
- [onFocusChanged](raypointerdriver.md#onfocuschanged)
- [registerPointer](raypointerdriver.md#registerpointer)
- [setPointerHint](raypointerdriver.md#setpointerhint)
- [unregisterPointer](raypointerdriver.md#unregisterpointer)
- [update](raypointerdriver.md#update)

## Constructors

### constructor

• **new RayPointerDriver**()

#### Inherited from

[PointerDriver](pointerdriver.md).[constructor](pointerdriver.md#constructor)

## Properties

### hints

• `Protected` **hints**: `Map`<`number`, [`PointerHint`](../enums/pointerhint.md)\>

The [hints](../enums/pointerhint.md) for each pointer. The keys are pointer
IDs, while the values are that pointer's hint.

See [getPointerHint](raypointerdriver.md#getpointerhint)

#### Inherited from

[PointerDriver](pointerdriver.md).[hints](pointerdriver.md#hints)

#### Defined in

[drivers/PointerDriver.ts:42](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L42)

___

### sources

• `Protected` `Readonly` **sources**: `Set`<[`RayPointerSource`](../interfaces/raypointersource.md)\>

The sources which this is assigned to

#### Defined in

[drivers/RayPointerDriver.ts:17](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/RayPointerDriver.ts#L17)

___

### states

• `Protected` **states**: `Map`<[`Root`](root.md), `PointerDriverState`\>

The current state for each registered and enabled root. Contains whether
each root is pressing, hovering, which pointer is bound to it and its
event queue

#### Inherited from

[PointerDriver](pointerdriver.md).[states](pointerdriver.md#states)

#### Defined in

[drivers/PointerDriver.ts:33](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L33)

## Methods

### addSource

▸ **addSource**(`source`): `void`

Add a source. Assigns itself to the given source.

#### Parameters

| Name | Type |
| :------ | :------ |
| `source` | [`RayPointerSource`](../interfaces/raypointersource.md) |

#### Returns

`void`

#### Defined in

[drivers/RayPointerDriver.ts:49](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/RayPointerDriver.ts#L49)

___

### castRay

▸ `Protected` `Abstract` **castRay**(`origin`, `direction`): [``null`` \| [`Root`](root.md), `number`, `number`]

Cast a ray in the world and get which root was intersected and where.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `origin` | [`number`, `number`, `number`] | The world position where the ray is starting |
| `direction` | [`number`, `number`, `number`] | A normalised vector representing the ray's direction. Not a euler rotation nor a quaternion |

#### Returns

[``null`` \| [`Root`](root.md), `number`, `number`]

Returns a 3-tuple containing, in this order, the intersected root or null if none intersected, the normalised x axis of the intersection and the normalised y axis of the intersection. If no root was intersected, use bogus values for x and y

#### Defined in

[drivers/RayPointerDriver.ts:26](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/RayPointerDriver.ts#L26)

___

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

#### Inherited from

[PointerDriver](pointerdriver.md).[getPointerHint](pointerdriver.md#getpointerhint)

#### Defined in

[drivers/PointerDriver.ts:240](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L240)

___

### handlePointerRay

▸ **handlePointerRay**(`pointer`, `pressing`, `origin`, `direction`): `void`

Receive a ray from a [RayPointerSource](../interfaces/raypointersource.md).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pointer` | `number` | The source's pointer ID, given when setting the source's sink |
| `pressing` | ``null`` \| `boolean` | Is the pointer being pressed? If null, the previous pressing state is used |
| `origin` | [`number`, `number`, `number`] | The world position where the ray is starting |
| `direction` | [`number`, `number`, `number`] | A normalised vector representing the ray's direction. Not a euler rotation nor a quaternion |

#### Returns

`void`

#### Defined in

[drivers/RayPointerDriver.ts:36](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/RayPointerDriver.ts#L36)

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

#### Inherited from

[PointerDriver](pointerdriver.md).[leaveAnyPointer](pointerdriver.md#leaveanypointer)

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

#### Inherited from

[PointerDriver](pointerdriver.md).[leavePointer](pointerdriver.md#leavepointer)

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

#### Inherited from

[PointerDriver](pointerdriver.md).[movePointer](pointerdriver.md#movepointer)

#### Defined in

[drivers/PointerDriver.ts:105](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L105)

___

### onDisable

▸ **onDisable**(`root`): `void`

Dispatches a leave event for the disabled root and deletes the state of
the disabled root from [states](raypointerdriver.md#states).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[PointerDriver](pointerdriver.md).[onDisable](pointerdriver.md#ondisable)

#### Defined in

[drivers/PointerDriver.ts:261](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L261)

___

### onEnable

▸ **onEnable**(`root`): `void`

Creates a state for the enabled root in [states](raypointerdriver.md#states).

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[PointerDriver](pointerdriver.md).[onEnable](pointerdriver.md#onenable)

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

#### Inherited from

[PointerDriver](pointerdriver.md).[onFocusCapturerChanged](pointerdriver.md#onfocuscapturerchanged)

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

#### Inherited from

[PointerDriver](pointerdriver.md).[onFocusChanged](pointerdriver.md#onfocuschanged)

#### Defined in

[drivers/PointerDriver.ts:293](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L293)

___

### registerPointer

▸ **registerPointer**(): `number`

Register a new pointer.

#### Returns

`number`

Returns [nextPointerID](pointerdriver.md#nextpointerid) and increments it

#### Inherited from

[PointerDriver](pointerdriver.md).[registerPointer](pointerdriver.md#registerpointer)

#### Defined in

[drivers/PointerDriver.ts:67](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L67)

___

### setPointerHint

▸ `Protected` **setPointerHint**(`pointer`, `hint`): `boolean`

Set a pointer's [hint](../enums/pointerhint.md).

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointer` | `number` |
| `hint` | [`PointerHint`](../enums/pointerhint.md) |

#### Returns

`boolean`

Returns true if the pointer hint changed, else, false

#### Overrides

[PointerDriver](pointerdriver.md).[setPointerHint](pointerdriver.md#setpointerhint)

#### Defined in

[drivers/RayPointerDriver.ts:56](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/RayPointerDriver.ts#L56)

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

#### Inherited from

[PointerDriver](pointerdriver.md).[unregisterPointer](pointerdriver.md#unregisterpointer)

#### Defined in

[drivers/PointerDriver.ts:80](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L80)

___

### update

▸ **update**(`root`): `void`

Dispatches all queued events (found in [states](raypointerdriver.md#states)) for the root and
clears its event queue

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Inherited from

[PointerDriver](pointerdriver.md).[update](pointerdriver.md#update)

#### Defined in

[drivers/PointerDriver.ts:279](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L279)
