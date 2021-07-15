[canvas-ui](../README.md) / PointerRelease

# Class: PointerRelease

A pointer release [PointerEvent](pointerevent.md) (pointer button up).

Has a focus type of [FocusType.Pointer](../enums/focustype.md#pointer) and does not need focus.

## Hierarchy

- [`PointerEvent`](pointerevent.md)

  ↳ **`PointerRelease`**

## Table of contents

### Constructors

- [constructor](pointerrelease.md#constructor)

### Properties

- [focusType](pointerrelease.md#focustype)
- [needsFocus](pointerrelease.md#needsfocus)
- [target](pointerrelease.md#target)
- [x](pointerrelease.md#x)
- [y](pointerrelease.md#y)

### Methods

- [cloneWithTarget](pointerrelease.md#clonewithtarget)
- [correctOffset](pointerrelease.md#correctoffset)

## Constructors

### constructor

• **new PointerRelease**(`x`, `y`, `target?`)

Create a new PointerRelease. Sets [x](pointerrelease.md#x), [y](pointerrelease.md#y), [target](pointerrelease.md#target),
[focusType](pointerrelease.md#focustype) to [FocusType.Pointer](../enums/focustype.md#pointer) and [needsFocus](pointerrelease.md#needsfocus) to
false.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `target` | ``null`` \| [`Widget`](widget.md) | `null` |

#### Overrides

[PointerEvent](pointerevent.md).[constructor](pointerevent.md#constructor)

#### Defined in

[events/PointerRelease.ts:12](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/PointerRelease.ts#L12)

## Properties

### focusType

• `Readonly` **focusType**: ``null`` \| [`FocusType`](../enums/focustype.md)

The focus type of this event. Can be null.

If null, this event cannot be focused, since events are focused by their
[FocusType](../enums/focustype.md) as a group.

#### Inherited from

[PointerEvent](pointerevent.md).[focusType](pointerevent.md#focustype)

#### Defined in

[events/Event.ts:19](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/Event.ts#L19)

___

### needsFocus

• `Readonly` **needsFocus**: `boolean`

Can this event be dispatched without a target?

#### Inherited from

[PointerEvent](pointerevent.md).[needsFocus](pointerevent.md#needsfocus)

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/Event.ts#L21)

___

### target

• `Readonly` **target**: ``null`` \| [`Widget`](widget.md)

The target of this event. Can be null

#### Inherited from

[PointerEvent](pointerevent.md).[target](pointerevent.md#target)

#### Defined in

[events/Event.ts:12](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/Event.ts#L12)

___

### x

• `Readonly` **x**: `number`

Pointer event position's X coordinate in pixels. Not an integer.

#### Inherited from

[PointerEvent](pointerevent.md).[x](pointerevent.md#x)

#### Defined in

[events/PointerEvent.ts:16](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/PointerEvent.ts#L16)

___

### y

• `Readonly` **y**: `number`

Pointer event position's Y coordinate in pixels. Not an integer.

#### Inherited from

[PointerEvent](pointerevent.md).[y](pointerevent.md#y)

#### Defined in

[events/PointerEvent.ts:18](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/PointerEvent.ts#L18)

## Methods

### cloneWithTarget

▸ **cloneWithTarget**(`target`): [`PointerRelease`](pointerrelease.md)

Create a new Event with the same properties as this, except with a new
given target.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Returns

[`PointerRelease`](pointerrelease.md)

#### Overrides

[PointerEvent](pointerevent.md).[cloneWithTarget](pointerevent.md#clonewithtarget)

#### Defined in

[events/PointerRelease.ts:26](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/PointerRelease.ts#L26)

___

### correctOffset

▸ **correctOffset**(`xOffset`, `yOffset`): [`PointerRelease`](pointerrelease.md)

Create a new PointerEvent event with the same properties as this, except
with new [x](pointerrelease.md#x) and [y](pointerrelease.md#y) values corrected for a given offset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `xOffset` | `number` |
| `yOffset` | `number` |

#### Returns

[`PointerRelease`](pointerrelease.md)

#### Overrides

[PointerEvent](pointerevent.md).[correctOffset](pointerevent.md#correctoffset)

#### Defined in

[events/PointerRelease.ts:22](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/events/PointerRelease.ts#L22)
