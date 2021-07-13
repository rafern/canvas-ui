[canvas-ui](../README.md) / PointerPress

# Class: PointerPress

A pointer press [PointerEvent](pointerevent.md) (pointer button down).

Has no focus type and does not need focus.

## Hierarchy

- [`PointerEvent`](pointerevent.md)

  ↳ **`PointerPress`**

## Table of contents

### Constructors

- [constructor](pointerpress.md#constructor)

### Properties

- [focusType](pointerpress.md#focustype)
- [needsFocus](pointerpress.md#needsfocus)
- [target](pointerpress.md#target)
- [x](pointerpress.md#x)
- [y](pointerpress.md#y)

### Methods

- [cloneWithTarget](pointerpress.md#clonewithtarget)
- [correctOffset](pointerpress.md#correctoffset)

## Constructors

### constructor

• **new PointerPress**(`x`, `y`, `target?`)

Create a new PointerMove. Sets [x](pointerpress.md#x), [y](pointerpress.md#y), [target](pointerpress.md#target),
[focusType](pointerpress.md#focustype) to null and [needsFocus](pointerpress.md#needsfocus) to false.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `target` | ``null`` \| [`Widget`](widget.md) | `null` |

#### Overrides

[PointerEvent](pointerevent.md).[constructor](pointerevent.md#constructor)

#### Defined in

[events/PointerPress.ts:11](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/PointerPress.ts#L11)

## Properties

### focusType

• `Readonly` **focusType**: ``null`` \| [`FocusType`](../enums/focustype.md)

The focus type of this event. Can be null.

If null, this event cannot be focused, since events are focused by their
[FocusType](../enums/focustype.md) as a group.

#### Inherited from

[PointerEvent](pointerevent.md).[focusType](pointerevent.md#focustype)

#### Defined in

[events/Event.ts:19](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/Event.ts#L19)

___

### needsFocus

• `Readonly` **needsFocus**: `boolean`

Can this event be dispatched without a target?

#### Inherited from

[PointerEvent](pointerevent.md).[needsFocus](pointerevent.md#needsfocus)

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/Event.ts#L21)

___

### target

• `Readonly` **target**: ``null`` \| [`Widget`](widget.md)

The target of this event. Can be null

#### Inherited from

[PointerEvent](pointerevent.md).[target](pointerevent.md#target)

#### Defined in

[events/Event.ts:12](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/Event.ts#L12)

___

### x

• `Readonly` **x**: `number`

Pointer event position's X coordinate in pixels. Not an integer.

#### Inherited from

[PointerEvent](pointerevent.md).[x](pointerevent.md#x)

#### Defined in

[events/PointerEvent.ts:16](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/PointerEvent.ts#L16)

___

### y

• `Readonly` **y**: `number`

Pointer event position's Y coordinate in pixels. Not an integer.

#### Inherited from

[PointerEvent](pointerevent.md).[y](pointerevent.md#y)

#### Defined in

[events/PointerEvent.ts:18](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/PointerEvent.ts#L18)

## Methods

### cloneWithTarget

▸ **cloneWithTarget**(`target`): [`PointerPress`](pointerpress.md)

Create a new Event with the same properties as this, except with a new
given target.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Returns

[`PointerPress`](pointerpress.md)

#### Overrides

[PointerEvent](pointerevent.md).[cloneWithTarget](pointerevent.md#clonewithtarget)

#### Defined in

[events/PointerPress.ts:24](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/PointerPress.ts#L24)

___

### correctOffset

▸ **correctOffset**(`xOffset`, `yOffset`): [`PointerPress`](pointerpress.md)

Create a new PointerEvent event with the same properties as this, except
with new [x](pointerpress.md#x) and [y](pointerpress.md#y) values corrected for a given offset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `xOffset` | `number` |
| `yOffset` | `number` |

#### Returns

[`PointerPress`](pointerpress.md)

#### Overrides

[PointerEvent](pointerevent.md).[correctOffset](pointerevent.md#correctoffset)

#### Defined in

[events/PointerPress.ts:20](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/PointerPress.ts#L20)
