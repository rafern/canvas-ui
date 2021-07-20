[canvas-ui](../README.md) / Event

# Class: Event

A generic event. This is an abstract class and must be implemented in child
classes.

## Hierarchy

- **`Event`**

  ↳ [`KeyEvent`](keyevent.md)

  ↳ [`Leave`](leave.md)

  ↳ [`PointerEvent`](pointerevent.md)

## Table of contents

### Constructors

- [constructor](event.md#constructor)

### Properties

- [focusType](event.md#focustype)
- [needsFocus](event.md#needsfocus)
- [target](event.md#target)

### Methods

- [cloneWithTarget](event.md#clonewithtarget)

## Constructors

### constructor

• **new Event**(`target`, `focusType`, `needsFocus`)

Create a new Event. Sets [target](event.md#target), [focusType](event.md#focustype) and
[needsFocus](event.md#needsfocus)

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) |
| `focusType` | ``null`` \| [`FocusType`](../enums/focustype.md) |
| `needsFocus` | `boolean` |

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/events/Event.ts#L21)

## Properties

### focusType

• `Readonly` **focusType**: ``null`` \| [`FocusType`](../enums/focustype.md)

The focus type of this event. Can be null.

If null, this event cannot be focused, since events are focused by their
[FocusType](../enums/focustype.md) as a group.

#### Defined in

[events/Event.ts:19](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/events/Event.ts#L19)

___

### needsFocus

• `Readonly` **needsFocus**: `boolean`

Can this event be dispatched without a target?

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/events/Event.ts#L21)

___

### target

• `Readonly` **target**: ``null`` \| [`Widget`](widget.md)

The target of this event. Can be null

#### Defined in

[events/Event.ts:12](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/events/Event.ts#L12)

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

#### Defined in

[events/Event.ts:37](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/events/Event.ts#L37)
