[canvas-ui](../README.md) / LayoutContext

# Class: LayoutContext

A layout context is an object used to keep track of how much flex ratio and
basis each [Widget](widget.md) wants when resolving layout. It also keeps track of
the maximum width and height flexbox-like layouts can expand to and the
verticality of the layout.

## Table of contents

### Constructors

- [constructor](layoutcontext.md#constructor)

### Properties

- [hBasis](layoutcontext.md#hbasis)
- [hFlex](layoutcontext.md#hflex)
- [maxHeight](layoutcontext.md#maxheight)
- [maxWidth](layoutcontext.md#maxwidth)
- [sizeChanged](layoutcontext.md#sizechanged)
- [vBasis](layoutcontext.md#vbasis)
- [vFlex](layoutcontext.md#vflex)
- [vertical](layoutcontext.md#vertical)

### Methods

- [addBasis](layoutcontext.md#addbasis)
- [clone](layoutcontext.md#clone)

## Constructors

### constructor

• **new LayoutContext**(`maxWidth`, `maxHeight`, `vertical`)

Create a new LayoutContext. Sets [maxWidth](layoutcontext.md#maxwidth), [maxHeight](layoutcontext.md#maxheight) and
[vertical](layoutcontext.md#vertical).

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxWidth` | `number` |
| `maxHeight` | `number` |
| `vertical` | `boolean` |

#### Defined in

[core/LayoutContext.ts:26](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L26)

## Properties

### hBasis

• **hBasis**: `number` = `0`

The currently wanted horizontal basis

#### Defined in

[core/LayoutContext.ts:18](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L18)

___

### hFlex

• **hFlex**: `number` = `0`

The current sum of all wanted horizontal flex ratios

#### Defined in

[core/LayoutContext.ts:22](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L22)

___

### maxHeight

• **maxHeight**: `number`

The maximum height a flexbox-like layout can expand to

#### Defined in

[core/LayoutContext.ts:13](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L13)

___

### maxWidth

• **maxWidth**: `number`

The maximum width a flexbox-like layout can expand to

#### Defined in

[core/LayoutContext.ts:11](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L11)

___

### sizeChanged

• **sizeChanged**: `boolean` = `false`

Has the size changed?

#### Defined in

[core/LayoutContext.ts:26](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L26)

___

### vBasis

• **vBasis**: `number` = `0`

The currently wanted vertical basis

#### Defined in

[core/LayoutContext.ts:20](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L20)

___

### vFlex

• **vFlex**: `number` = `0`

The current sum of all wanted vertical flex ratios

#### Defined in

[core/LayoutContext.ts:24](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L24)

___

### vertical

• **vertical**: `boolean`

Is this layout vertical (grows down)? If not, grows right

#### Defined in

[core/LayoutContext.ts:15](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L15)

## Methods

### addBasis

▸ **addBasis**(`hBasis`, `vBasis`): `void`

Add basis to this layout context.

If this is a vertical layout, vertical basis will be added to
[vBasis](layoutcontext.md#vbasis) while horizontal basis will be set to the maximum of the
new horizontal basis and [hBasis](layoutcontext.md#hbasis).

If this is not a vertical layout, horizontal basis will be added to
[hBasis](layoutcontext.md#hbasis) while vertical basis will be set to the maximum of the new
vertical basis and [vBasis](layoutcontext.md#vbasis).

#### Parameters

| Name | Type |
| :------ | :------ |
| `hBasis` | `number` |
| `vBasis` | `number` |

#### Returns

`void`

#### Defined in

[core/LayoutContext.ts:63](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L63)

___

### clone

▸ **clone**(): [`LayoutContext`](layoutcontext.md)

Create a new LayoutContext with the exact same properties as this layout
context, except sizeChanged which will be false.

#### Returns

[`LayoutContext`](layoutcontext.md)

#### Defined in

[core/LayoutContext.ts:42](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/LayoutContext.ts#L42)
