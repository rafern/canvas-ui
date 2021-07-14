[canvas-ui](../README.md) / KeyEvent

# Class: KeyEvent

A keyboard [Event](event.md). This is an abstract class and is implemented in the
child classes [KeyPress](keypress.md) and [KeyRelease](keyrelease.md).

Has a focus type of [FocusType.Keyboard](../enums/focustype.md#keyboard) and needs focus.

## Hierarchy

- [`Event`](event.md)

  ↳ **`KeyEvent`**

  ↳↳ [`KeyPress`](keypress.md)

  ↳↳ [`KeyRelease`](keyrelease.md)

## Table of contents

### Constructors

- [constructor](keyevent.md#constructor)

### Properties

- [focusType](keyevent.md#focustype)
- [key](keyevent.md#key)
- [needsFocus](keyevent.md#needsfocus)
- [target](keyevent.md#target)

### Methods

- [cloneWithTarget](keyevent.md#clonewithtarget)

## Constructors

### constructor

• **new KeyEvent**(`key`, `target`)

Create a new KeyEvent. Sets [key](keyevent.md#key), [target](keyevent.md#target),
[focusType](keyevent.md#focustype) to [FocusType.Keyboard](../enums/focustype.md#keyboard) and [needsFocus](keyevent.md#needsfocus) to
true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Overrides

[Event](event.md).[constructor](event.md#constructor)

#### Defined in

[events/KeyEvent.ts:19](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/KeyEvent.ts#L19)

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

### key

• `Readonly` **key**: `string`

This event's key. Uses the same values as the
[KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
Web API.

#### Defined in

[events/KeyEvent.ts:19](https://github.com/playkostudios/canvas-ui/blob/fabb89a/src/events/KeyEvent.ts#L19)

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
