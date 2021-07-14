[canvas-ui](../README.md) / RayPointerSink

# Interface: RayPointerSink

A sink of rays for [RayPointerSources](raypointersource.md). Handles
pointer rays from multiple sources. [RayPointerDriver](../classes/raypointerdriver.md) implements this.
For 3D engines where a UI root is in world space.

## Implemented by

- [`RayPointerDriver`](../classes/raypointerdriver.md)

## Table of contents

### Methods

- [handlePointerRay](raypointersink.md#handlepointerray)

## Methods

### handlePointerRay

▸ **handlePointerRay**(`pointer`, `pressing`, `origin`, `direction`): `void`

Receive a ray from a [RayPointerSource](raypointersource.md). When implementing this,
cast a ray starting from the given origin and with the given direction.
If the ray intersects with a UI's mesh in the world, queue up a pointer
event accordingly.

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

drivers/RayPointerSink.ts:20
