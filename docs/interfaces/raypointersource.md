[canvas-ui](../README.md) / RayPointerSource

# Interface: RayPointerSource

A source of rays for a single [RayPointerSink](raypointersink.md), such as
[RayPointerDriver](../classes/raypointerdriver.md). Used so that different kinds of ray sources (such
as a raycasting mouse or raycasting XR controllers) can be used in the same
driver without having to extend the driver for each type of source.

## Table of contents

### Methods

- [clearSink](raypointersource.md#clearsink)
- [setSink](raypointersource.md#setsink)

## Methods

### clearSink

▸ **clearSink**(): `void`

Clear assigned sink. Rays will no longer be sent.

#### Returns

`void`

#### Defined in

drivers/RayPointerSource.ts:20

___

### setSink

▸ **setSink**(`sink`, `pointer`): `void`

Assign a sink to this source. Rays will be sent to this sink.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sink` | [`RayPointerSink`](raypointersink.md) | The new sink |
| `pointer` | `number` | The pointer ID to use when sending rays. Keep track of this |

#### Returns

`void`

#### Defined in

drivers/RayPointerSource.ts:18
