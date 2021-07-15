[canvas-ui](../README.md) / PointerHint

# Enumeration: PointerHint

A [PointerDriver](../classes/pointerdriver.md)'s pointer hint; each registered pointer has a pointer
hint which tracks whether the pointer is not in use, hovering a root or
pressing a root. Useful for styling pointers depending on if they are
hovering/pressing a root or not.

## Table of contents

### Enumeration members

- [Hovering](pointerhint.md#hovering)
- [None](pointerhint.md#none)
- [Pressing](pointerhint.md#pressing)

## Enumeration members

### Hovering

• **Hovering** = `1`

The pointer is currently hovering a root.

#### Defined in

[drivers/PointerHint.ts:13](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/drivers/PointerHint.ts#L13)

___

### None

• **None** = `0`

The pointer is currently not hovering any root.

#### Defined in

[drivers/PointerHint.ts:11](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/drivers/PointerHint.ts#L11)

___

### Pressing

• **Pressing** = `2`

The pointer is currently hovering and pressing a root.

#### Defined in

[drivers/PointerHint.ts:15](https://github.com/playkostudios/canvas-ui/blob/ab8ca6c/src/drivers/PointerHint.ts#L15)
