[canvas-ui](../README.md) / Viewport

# Class: Viewport

Viewports are internally used to manage a canvas' size and painting. It is
used by [Root](root.md) and [ViewportWidget](viewportwidget.md).

## Table of contents

### Constructors

- [constructor](viewport.md#constructor)

### Properties

- [\_maxDimensions](viewport.md#_maxdimensions)
- [canvas](viewport.md#canvas)
- [context](viewport.md#context)
- [forceLayout](viewport.md#forcelayout)
- [vertical](viewport.md#vertical)

### Accessors

- [canvasDimensions](viewport.md#canvasdimensions)
- [maxDimensions](viewport.md#maxdimensions)

### Methods

- [paintToCanvas](viewport.md#painttocanvas)
- [populateChildsLayout](viewport.md#populatechildslayout)
- [resolveChildsLayout](viewport.md#resolvechildslayout)

## Constructors

### constructor

• **new Viewport**(`startingWidth?`, `startingHeight?`)

Create a new Viewport.

Creates a new canvas with a starting width and height, setting
[canvas](viewport.md#canvas) and [context](viewport.md#context). Failure to get a canvas context
results in an exception.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `startingWidth` | `number` | `64` |
| `startingHeight` | `number` | `64` |

#### Defined in

[core/Viewport.ts:27](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L27)

## Properties

### \_maxDimensions

• `Private` **\_maxDimensions**: [`number`, `number`]

Maximum size of viewport. For internal use only.

See [maxDimensions](viewport.md#maxdimensions).

#### Defined in

[core/Viewport.ts:17](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L17)

___

### canvas

• `Readonly` **canvas**: `HTMLCanvasElement`

The internal canvas. Widgets are painted to this

#### Defined in

[core/Viewport.ts:22](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L22)

___

### context

• `Readonly` **context**: `CanvasRenderingContext2D`

The internal canvas' context. Alpha is enabled.

#### Defined in

[core/Viewport.ts:24](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L24)

___

### forceLayout

• `Private` **forceLayout**: `boolean` = `false`

Does the viewport need to force-mark layout as dirty?

#### Defined in

[core/Viewport.ts:19](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L19)

___

### vertical

• **vertical**: `boolean` = `true`

Is the layout context vertical?

#### Defined in

[core/Viewport.ts:27](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L27)

## Accessors

### canvasDimensions

• `get` **canvasDimensions**(): [`number`, `number`]

The current dimensions of the [internal canvas](viewport.md#canvas)

#### Returns

[`number`, `number`]

#### Defined in

[core/Viewport.ts:51](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L51)

___

### maxDimensions

• `get` **maxDimensions**(): [`number`, `number`]

Maximum size of viewport. This is passed as a hint to children.  If an
axis' maximum length is 0, then there is no maximum for that axis, but it
also means that flex components won't expand in that axis.

See [_maxDimensions](viewport.md#_maxdimensions).

#### Returns

[`number`, `number`]

#### Defined in

[core/Viewport.ts:71](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L71)

• `set` **maxDimensions**(`maxDimensions`): `void`

Maximum size of viewport. This is passed as a hint to children.  If an
axis' maximum length is 0, then there is no maximum for that axis, but it
also means that flex components won't expand in that axis.

See [_maxDimensions](viewport.md#_maxdimensions).

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxDimensions` | [`number`, `number`] |

#### Returns

`void`

#### Defined in

[core/Viewport.ts:62](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L62)

## Methods

### paintToCanvas

▸ **paintToCanvas**(`child`): `boolean`

Paint a given child to [canvas](viewport.md#canvas).

Nothing is done if the child was not dirty.

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`Widget`](widget.md) |

#### Returns

`boolean`

Returns true if the child was dirty, else, false.

#### Defined in

[core/Viewport.ts:166](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L166)

___

### populateChildsLayout

▸ **populateChildsLayout**(`child`): ``null`` \| [`LayoutContext`](layoutcontext.md)

Populates the given child's layout by calling
[Widget.populateLayout](widget.md#populatelayout).

If [forceLayout](viewport.md#forcelayout) is true, then it is reset to false and
[Widget.forceLayoutDirty](widget.md#forcelayoutdirty) is called.

If the child's layout is not dirty, then populateLayout is not called and
no layout context is returned, else, a layout context is returned which
should be used with [resolveChildsLayout](viewport.md#resolvechildslayout).

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`Widget`](widget.md) |

#### Returns

``null`` \| [`LayoutContext`](layoutcontext.md)

#### Defined in

[core/Viewport.ts:86](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L86)

___

### resolveChildsLayout

▸ **resolveChildsLayout**(`child`, `layoutCtx`): `boolean`

Resolves the given child's layout with a given layout context by calling
[Widget.resolveLayout](widget.md#resolvelayout).

If the child's layout is not dirty or the given layout context is null,
then resolveLayout is not called.

Expands [canvas](viewport.md#canvas) if the new layout is too big for the current
canvas. Expansion is done in powers of 2 to avoid issues with external 3D
libraries.

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`Widget`](widget.md) |
| `layoutCtx` | ``null`` \| [`LayoutContext`](layoutcontext.md) |

#### Returns

`boolean`

Returns true if the child was resized, else, false.

#### Defined in

[core/Viewport.ts:120](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/core/Viewport.ts#L120)
