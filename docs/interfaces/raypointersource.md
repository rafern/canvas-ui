[canvas-ui](../README.md) / RayPointerSource

# Interface: RayPointerSource

A source of rays for a [RayPointerDriver](../classes/raypointerdriver.md). Used so that different kinds
of ray sources (such as a raycasting mouse or raycasting XR controllers) can
be used in the same driver without having to extend the driver for each type
of source.

## Table of contents

### Methods

- [clearRayPointerDriver](raypointersource.md#clearraypointerdriver)
- [onPointerHintChanged](raypointersource.md#onpointerhintchanged)
- [setRayPointerDriver](raypointersource.md#setraypointerdriver)

## Methods

### clearRayPointerDriver

▸ **clearRayPointerDriver**(): `void`

Clear assigned [RayPointerDriver](../classes/raypointerdriver.md). Rays will no longer be sent

#### Returns

`void`

#### Defined in

[drivers/RayPointerSource.ts:20](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/RayPointerSource.ts#L20)

___

### onPointerHintChanged

▸ **onPointerHintChanged**(`pointer`, `hint`): `void`

Called when a pointer has their hint changed

#### Parameters

| Name | Type |
| :------ | :------ |
| `pointer` | `number` |
| `hint` | [`PointerHint`](../enums/pointerhint.md) |

#### Returns

`void`

#### Defined in

[drivers/RayPointerSource.ts:22](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/RayPointerSource.ts#L22)

___

### setRayPointerDriver

▸ **setRayPointerDriver**(`driver`): `void`

The [RayPointerDriver](../classes/raypointerdriver.md) assigned to this source. Register all
pointers needed by this source here. Don't call this directly, instead,
use [RayPointerDriver.addSource](../classes/raypointerdriver.md#addsource)

#### Parameters

| Name | Type |
| :------ | :------ |
| `driver` | [`RayPointerDriver`](../classes/raypointerdriver.md) |

#### Returns

`void`

#### Defined in

[drivers/RayPointerSource.ts:18](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/drivers/RayPointerSource.ts#L18)
