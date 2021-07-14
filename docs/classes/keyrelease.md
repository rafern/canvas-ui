[canvas-ui](../README.md) / KeyRelease

# Class: KeyRelease

A key release [KeyEvent](keyevent.md) (key up).

Has a focus type of [FocusType.Keyboard](../enums/focustype.md#keyboard) and needs focus.

## Hierarchy

- [`KeyEvent`](keyevent.md)

  ↳ **`KeyRelease`**

## Table of contents

### Constructors

- [constructor](keyrelease.md#constructor)

### Properties

- [focusType](keyrelease.md#focustype)
- [key](keyrelease.md#key)
- [needsFocus](keyrelease.md#needsfocus)
- [target](keyrelease.md#target)

### Methods

- [cloneWithTarget](keyrelease.md#clonewithtarget)

## Constructors

### constructor

• **new KeyRelease**(`key`, `target`)

Create a new KeyEvent. Sets [key](keyrelease.md#key), [target](keyrelease.md#target),
[focusType](keyrelease.md#focustype) to [FocusType.Keyboard](../enums/focustype.md#keyboard) and [needsFocus](keyrelease.md#needsfocus) to
true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Inherited from

[KeyEvent](keyevent.md).[constructor](keyevent.md#constructor)

#### Defined in

[events/KeyEvent.ts:19](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/events/KeyEvent.ts#L19)

## Properties

### focusType

• `Readonly` **focusType**: ``null`` \| [`FocusType`](../enums/focustype.md)

The focus type of this event. Can be null.

If null, this event cannot be focused, since events are focused by their
[FocusType](../enums/focustype.md) as a group.

#### Inherited from

[KeyEvent](keyevent.md).[focusType](keyevent.md#focustype)

#### Defined in

[events/Event.ts:19](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/events/Event.ts#L19)

___

### key

• `Readonly` **key**: `string`

This event's key. Uses the same values as the
[KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
Web API.

#### Inherited from

[KeyEvent](keyevent.md).[key](keyevent.md#key)

#### Defined in

[events/KeyEvent.ts:19](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/events/KeyEvent.ts#L19)

___

### needsFocus

• `Readonly` **needsFocus**: `boolean`

Can this event be dispatched without a target?

#### Inherited from

[KeyEvent](keyevent.md).[needsFocus](keyevent.md#needsfocus)

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/events/Event.ts#L21)

___

### target

• `Readonly` **target**: ``null`` \| [`Widget`](widget.md)

The target of this event. Can be null

#### Inherited from

[KeyEvent](keyevent.md).[target](keyevent.md#target)

#### Defined in

[events/Event.ts:12](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/events/Event.ts#L12)

## Methods

### cloneWithTarget

▸ **cloneWithTarget**(`target`): [`KeyRelease`](keyrelease.md)

Create a new Event with the same properties as this, except with a new
given target.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Returns

[`KeyRelease`](keyrelease.md)

#### Overrides

[KeyEvent](keyevent.md).[cloneWithTarget](keyevent.md#clonewithtarget)

#### Defined in

[events/KeyRelease.ts:12](https://github.com/playkostudios/canvas-ui/blob/84bdd1a/src/events/KeyRelease.ts#L12)
