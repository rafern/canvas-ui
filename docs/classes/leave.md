[canvas-ui](../README.md) / Leave

# Class: Leave

A leave [Event](event.md). Dispatched when the pointer leaves the root or the
focus capturer changes to another widget.

Has a focus type of [FocusType.Pointer](../enums/focustype.md#pointer) and needs focus.

## Hierarchy

- [`Event`](event.md)

  ↳ **`Leave`**

## Table of contents

### Constructors

- [constructor](leave.md#constructor)

### Properties

- [focusType](leave.md#focustype)
- [needsFocus](leave.md#needsfocus)
- [target](leave.md#target)

### Methods

- [cloneWithTarget](leave.md#clonewithtarget)

## Constructors

### constructor

• **new Leave**(`target?`)

Create a new KeyEvent. Sets [target](leave.md#target), [focusType](leave.md#focustype) to
[FocusType.Pointer](../enums/focustype.md#pointer) and [needsFocus](leave.md#needsfocus) to true.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) | `null` |

#### Overrides

[Event](event.md).[constructor](event.md#constructor)

#### Defined in

[events/Leave.ts:13](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/events/Leave.ts#L13)

## Properties

### focusType

• `Readonly` **focusType**: ``null`` \| [`FocusType`](../enums/focustype.md)

The focus type of this event. Can be null.

If null, this event cannot be focused, since events are focused by their
[FocusType](../enums/focustype.md) as a group.

#### Inherited from

[Event](event.md).[focusType](event.md#focustype)

#### Defined in

[events/Event.ts:19](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/events/Event.ts#L19)

___

### needsFocus

• `Readonly` **needsFocus**: `boolean`

Can this event be dispatched without a target?

#### Inherited from

[Event](event.md).[needsFocus](event.md#needsfocus)

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/events/Event.ts#L21)

___

### target

• `Readonly` **target**: ``null`` \| [`Widget`](widget.md)

The target of this event. Can be null

#### Inherited from

[Event](event.md).[target](event.md#target)

#### Defined in

[events/Event.ts:12](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/events/Event.ts#L12)

## Methods

### cloneWithTarget

▸ **cloneWithTarget**(`target`): [`Leave`](leave.md)

Create a new Event with the same properties as this, except with a new
given target.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Returns

[`Leave`](leave.md)

#### Overrides

[Event](event.md).[cloneWithTarget](event.md#clonewithtarget)

#### Defined in

[events/Leave.ts:22](https://github.com/playkostudios/canvas-ui/blob/9f91374/src/events/Leave.ts#L22)
