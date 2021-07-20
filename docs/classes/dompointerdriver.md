[canvas-ui](../README.md) / DOMPointerDriver

# Class: DOMPointerDriver

A [PointerDriver](pointerdriver.md) which listens for pointer events from HTML DOM
elements. Each HTML DOM element is bound to a specific root, which synergizes
well with DOMRoot.

## Hierarchy

- [`PointerDriver`](pointerdriver.md)

  ↳ **`DOMPointerDriver`**

## Table of contents

### Constructors

- [constructor](dompointerdriver.md#constructor)

### Properties

- [domElems](dompointerdriver.md#domelems)
- [hints](dompointerdriver.md#hints)
- [mousePointerID](dompointerdriver.md#mousepointerid)
- [states](dompointerdriver.md#states)

### Methods

- [addListeners](dompointerdriver.md#addlisteners)
- [bindDOMElem](dompointerdriver.md#binddomelem)
- [getPointerHint](dompointerdriver.md#getpointerhint)
- [leaveAnyPointer](dompointerdriver.md#leaveanypointer)
- [leavePointer](dompointerdriver.md#leavepointer)
- [movePointer](dompointerdriver.md#movepointer)
- [onDisable](dompointerdriver.md#ondisable)
- [onEnable](dompointerdriver.md#onenable)
- [onFocusCapturerChanged](dompointerdriver.md#onfocuscapturerchanged)
- [onFocusChanged](dompointerdriver.md#onfocuschanged)
- [registerPointer](dompointerdriver.md#registerpointer)
- [removeListeners](dompointerdriver.md#removelisteners)
- [setPointerHint](dompointerdriver.md#setpointerhint)
- [unregisterPointer](dompointerdriver.md#unregisterpointer)
- [update](dompointerdriver.md#update)

## Constructors

### constructor

• **new DOMPointerDriver**()

Create a new DOMPointerDriver.

Automatically registers a pointer to be used by the mouse.

#### Overrides

[PointerDriver](pointerdriver.md).[constructor](pointerdriver.md#constructor)

#### Defined in

[drivers/DOMPointerDriver.ts:25](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L25)

## Properties

### domElems

• `Private` **domElems**: `WeakMap`<[`Root`](root.md), `RootDOMBind`\>

The HTML DOM element and listeners that each root is bound to

#### Defined in

[drivers/DOMPointerDriver.ts:23](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L23)

___

### hints

• `Protected` **hints**: `Map`<`number`, [`PointerHint`](../enums/pointerhint.md)\>

The [hints](../enums/pointerhint.md) for each pointer. The keys are pointer
IDs, while the values are that pointer's hint.

See [getPointerHint](dompointerdriver.md#getpointerhint)

#### Inherited from

[PointerDriver](pointerdriver.md).[hints](pointerdriver.md#hints)

#### Defined in

[drivers/PointerDriver.ts:42](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L42)

___

### mousePointerID

• `Private` **mousePointerID**: `number`

The pointer ID of the mouse. Registered in constructor

#### Defined in

[drivers/DOMPointerDriver.ts:25](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L25)

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

### addListeners

▸ `Private` **addListeners**(`root`, `rootBind`): `void`

Add pointer event listeners to root's DOM element.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |
| `rootBind` | `RootDOMBind` |

#### Returns

`void`

#### Defined in

[drivers/DOMPointerDriver.ts:67](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L67)

___

### bindDOMElem

▸ **bindDOMElem**(`root`, `domElem`): `void`

Bind an HTML DOM element to a specific root.

If the root was already registered, [removeListeners](dompointerdriver.md#removelisteners) is called.
Populates [domElems](dompointerdriver.md#domelems) with the new bind. Calls [addListeners](dompointerdriver.md#addlisteners)
if root is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |
| `domElem` | `HTMLElement` |

#### Returns

`void`

#### Defined in

[drivers/DOMPointerDriver.ts:45](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L45)

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

Calls [PointerDriver.onDisable](pointerdriver.md#ondisable) and [removeListeners](dompointerdriver.md#removelisteners) to each
bound root.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

[PointerDriver](pointerdriver.md).[onDisable](pointerdriver.md#ondisable)

#### Defined in

[drivers/DOMPointerDriver.ts:136](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L136)

___

### onEnable

▸ **onEnable**(`root`): `void`

Calls [PointerDriver.onEnable](pointerdriver.md#onenable) and [addListeners](dompointerdriver.md#addlisteners) to each
bound root.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](root.md) |

#### Returns

`void`

#### Overrides

[PointerDriver](pointerdriver.md).[onEnable](pointerdriver.md#onenable)

#### Defined in

[drivers/DOMPointerDriver.ts:122](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L122)

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

### removeListeners

▸ `Private` **removeListeners**(`rootBind`): `void`

Remove pointer event listeners from root's DOM element and unset tracked
listeners in root's bind.

#### Parameters

| Name | Type |
| :------ | :------ |
| `rootBind` | `RootDOMBind` |

#### Returns

`void`

#### Defined in

[drivers/DOMPointerDriver.ts:99](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/DOMPointerDriver.ts#L99)

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

#### Inherited from

[PointerDriver](pointerdriver.md).[setPointerHint](pointerdriver.md#setpointerhint)

#### Defined in

[drivers/PointerDriver.ts:222](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/drivers/PointerDriver.ts#L222)

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

Dispatches all queued events (found in [states](dompointerdriver.md#states)) for the root and
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
