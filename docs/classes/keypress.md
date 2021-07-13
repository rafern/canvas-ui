[canvas-ui](../README.md) / KeyPress

# Class: KeyPress

A key press [KeyEvent](keyevent.md) (key down).

Has a focus type of [FocusType.Keyboard](../enums/focustype.md#keyboard) and needs focus.

## Hierarchy

- [`KeyEvent`](keyevent.md)

  ↳ **`KeyPress`**

## Table of contents

### Constructors

- [constructor](keypress.md#constructor)

### Properties

- [focusType](keypress.md#focustype)
- [key](keypress.md#key)
- [needsFocus](keypress.md#needsfocus)
- [target](keypress.md#target)

### Methods

- [cloneWithTarget](keypress.md#clonewithtarget)

## Constructors

### constructor

• **new KeyPress**(`key`, `target`)

Create a new KeyEvent. Sets [key](keypress.md#key), [target](keypress.md#target),
[focusType](keypress.md#focustype) to [FocusType.Keyboard](../enums/focustype.md#keyboard) and [needsFocus](keypress.md#needsfocus) to
true.

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `string` |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Inherited from

[KeyEvent](keyevent.md).[constructor](keyevent.md#constructor)

#### Defined in

[events/KeyEvent.ts:19](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/KeyEvent.ts#L19)

## Properties

### focusType

• `Readonly` **focusType**: ``null`` \| [`FocusType`](../enums/focustype.md)

The focus type of this event. Can be null.

If null, this event cannot be focused, since events are focused by their
[FocusType](../enums/focustype.md) as a group.

#### Inherited from

[KeyEvent](keyevent.md).[focusType](keyevent.md#focustype)

#### Defined in

[events/Event.ts:19](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/Event.ts#L19)

___

### key

• `Readonly` **key**: `string`

This event's key. Uses the same values as the
[KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values)
Web API.

#### Inherited from

[KeyEvent](keyevent.md).[key](keyevent.md#key)

#### Defined in

[events/KeyEvent.ts:19](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/KeyEvent.ts#L19)

___

### needsFocus

• `Readonly` **needsFocus**: `boolean`

Can this event be dispatched without a target?

#### Inherited from

[KeyEvent](keyevent.md).[needsFocus](keyevent.md#needsfocus)

#### Defined in

[events/Event.ts:21](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/Event.ts#L21)

___

### target

• `Readonly` **target**: ``null`` \| [`Widget`](widget.md)

The target of this event. Can be null

#### Inherited from

[KeyEvent](keyevent.md).[target](keyevent.md#target)

#### Defined in

[events/Event.ts:12](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/Event.ts#L12)

## Methods

### cloneWithTarget

▸ **cloneWithTarget**(`target`): [`KeyPress`](keypress.md)

Create a new Event with the same properties as this, except with a new
given target.

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | ``null`` \| [`Widget`](widget.md) |

#### Returns

[`KeyPress`](keypress.md)

#### Overrides

[KeyEvent](keyevent.md).[cloneWithTarget](keyevent.md#clonewithtarget)

#### Defined in

[events/KeyPress.ts:12](https://github.com/playkostudios/canvas-ui/blob/2407796/src/events/KeyPress.ts#L12)
