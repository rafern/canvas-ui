[canvas-ui](../README.md) / PointerEvent

# Class: PointerEvent

A pointer [Event](event.md). This is an abstract class and is implemented in the
child classes [PointerMove](pointermove.md), [PointerPress](pointerpress.md) and
[PointerRelease](pointerrelease.md).

Has a focus type of decided by the child classes and does not need focus.

## Hierarchy

- [`Event`](event.md)

  ↳ **`PointerEvent`**

  ↳↳ [`PointerMove`](pointermove.md)

  ↳↳ [`PointerPress`](pointerpress.md)

  ↳↳ [`PointerRelease`](pointerrelease.md)

## Table of contents

### Constructors

- [constructor](pointerevent.md#constructor)

### Properties

- [focusType](pointerevent.md#focustype)
- [needsFocus](pointerevent.md#needsfocus)
- [target](pointerevent.md#target)
- [x](pointerevent.md#x)
- [y](pointerevent.md#y)

### Methods

- [cloneWithTarget](pointerevent.md#clonewithtarget)
- [correctOffset](pointerevent.md#correctoffset)

## Constructors

### constructor

• **new PointerEvent**(`x`, `y`, `target?`, `focusType?`)

Create a new PointerEvent. Sets [x](pointerevent.md#x), [y](pointerevent.md#y), [target](pointerevent.md#target),
[focusType](pointerevent.md#focustype) and [needsFocus](pointerevent.md#needsfocus) to false.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `x` | `number` | `undefined` |
| `y` | `number` | `undefined` |
| `target` | ``null`` \| [`Widget`](widget.md) | `null` |
| `focusType` | ``null`` \| [`FocusType`](../enums/focustype.md) | `null` |

#### Overrides

[Event](event.md).[constructor](event.md#constructor)

#### Defined in

[events/PointerEvent.ts:18](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/PointerEvent.ts#L18)

## Properties

### focusType

• `Readonly` **focusType**: ``null`` \| [`FocusType`](../enums/focustype.md)

The focus type of this event. Can be null.

If null, this event cannot be focused, since events are focused by their
[FocusType](../enums/focustype.md) as a group.

#### Inherited from

[Event](event.md).[focusType](event.md#focustype)

#### Defined in

[events/Event.ts:19](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/Event.ts#L19)

___

### needsFocus

• `Readonly` **needsFocus**: `boolean`

Can this event be dispatched without a target?

#### Inherited from

[Event](event.md).[needsFocus](event.md#needsfocus)

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/Event.ts#L21)

___

### target

• `Readonly` **target**: ``null`` \| [`Widget`](widget.md)

The target of this event. Can be null

#### Inherited from

[Event](event.md).[target](event.md#target)

#### Defined in

[events/Event.ts:12](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/Event.ts#L12)

___

### x

• `Readonly` **x**: `number`

Pointer event position's X coordinate in pixels. Not an integer.

#### Defined in

[events/PointerEvent.ts:16](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/PointerEvent.ts#L16)

___

### y

• `Readonly` **y**: `number`

Pointer event position's Y coordinate in pixels. Not an integer.

#### Defined in

[events/PointerEvent.ts:18](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/PointerEvent.ts#L18)

## Methods

### cloneWithTarget

▸ `Abstract` **cloneWithTarget**(`target`): [`Event`](event.md)

Create a new Event with the same properties as this, except with a new
given target.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Returns

[`Event`](event.md)

#### Inherited from

[Event](event.md).[cloneWithTarget](event.md#clonewithtarget)

#### Defined in

[events/Event.ts:37](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/Event.ts#L37)

___

### correctOffset

▸ `Abstract` **correctOffset**(`xOffset`, `yOffset`): [`PointerEvent`](pointerevent.md)

Create a new PointerEvent event with the same properties as this, except
with new [x](pointerevent.md#x) and [y](pointerevent.md#y) values corrected for a given offset.

#### Parameters

| Name | Type |
| :------ | :------ |
| `xOffset` | `number` |
| `yOffset` | `number` |

#### Returns

[`PointerEvent`](pointerevent.md)

#### Defined in

[events/PointerEvent.ts:34](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/PointerEvent.ts#L34)
