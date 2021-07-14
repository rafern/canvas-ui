[canvas-ui](../README.md) / Theme

# Class: Theme

A theme. Provides styling for widgets.

## Hierarchy

- **`Theme`**

  ↳ [`DebugTheme`](debugtheme.md)

## Table of contents

### Constructors

- [constructor](theme.md#constructor)

### Properties

- [fallback](theme.md#fallback)
- [properties](theme.md#properties)

### Methods

- [getAlignment](theme.md#getalignment)
- [getAlignment2D](theme.md#getalignment2d)
- [getFill](theme.md#getfill)
- [getFont](theme.md#getfont)
- [getNumber](theme.md#getnumber)
- [getPadding](theme.md#getpadding)
- [getProperty](theme.md#getproperty)
- [getSize](theme.md#getsize)
- [getString](theme.md#getstring)

## Constructors

### constructor

• **new Theme**(`properties`, `fallback?`)

Creates a new Theme.

Sets [properties](theme.md#properties) and [fallback](theme.md#fallback).

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `properties` | `Map`<[`ThemeProperty`](../enums/themeproperty.md), `unknown`\> | `undefined` |
| `fallback` | ``null`` \| [`Theme`](theme.md) | `null` |

#### Defined in

[theme/Theme.ts:18](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L18)

## Properties

### fallback

• **fallback**: ``null`` \| [`Theme`](theme.md)

The fallback theme. If this theme has a missing property, the fallback
theme's property will be used instead

#### Defined in

[theme/Theme.ts:18](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L18)

___

### properties

• **properties**: `Map`<[`ThemeProperty`](../enums/themeproperty.md), `unknown`\>

The values associated to each [ThemeProperty](../enums/themeproperty.md) for this theme.

#### Defined in

[theme/Theme.ts:13](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L13)

## Methods

### getAlignment

▸ **getAlignment**(`themeProperty`): [`Alignment`](../enums/alignment.md)

Same as [getProperty](theme.md#getproperty), but casts value to [Alignment](../enums/alignment.md).

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

[`Alignment`](../enums/alignment.md)

#### Defined in

[theme/Theme.ts:85](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L85)

___

### getAlignment2D

▸ **getAlignment2D**(`themeProperty`): [`Alignment2D`](../interfaces/alignment2d.md)

Same as [getProperty](theme.md#getproperty), but casts value to [Alignment2D](../interfaces/alignment2d.md).

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

[`Alignment2D`](../interfaces/alignment2d.md)

#### Defined in

[theme/Theme.ts:91](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L91)

___

### getFill

▸ **getFill**(`themeProperty`): `string`

Equivalent to [getString](theme.md#getstring)

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`string`

#### Defined in

[theme/Theme.ts:97](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L97)

___

### getFont

▸ **getFont**(`themeProperty`): `string`

Equivalent to [getString](theme.md#getstring)

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`string`

#### Defined in

[theme/Theme.ts:103](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L103)

___

### getNumber

▸ **getNumber**(`themeProperty`): `number`

Same as [getProperty](theme.md#getproperty), but with type checking for number.

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`number`

#### Defined in

[theme/Theme.ts:69](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L69)

___

### getPadding

▸ **getPadding**(`themeProperty`): [`Padding`](../interfaces/padding.md)

Same as [getProperty](theme.md#getproperty), but casts value to [Padding](../interfaces/padding.md).

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

[`Padding`](../interfaces/padding.md)

#### Defined in

[theme/Theme.ts:79](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L79)

___

### getProperty

▸ `Private` **getProperty**(`themeProperty`): `unknown`

Get the value associated with a given [ThemeProperty](../enums/themeproperty.md).

If the value is missing, the [fallback](theme.md#fallback) is tried. If there is no
fallback, an exception is thrown.

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`unknown`

Returns the value associated with the theme property. This could be any type.

#### Defined in

[theme/Theme.ts:38](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L38)

___

### getSize

▸ **getSize**(`themeProperty`): `number`

Equivalent to [getNumber](theme.md#getnumber)

**`deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`number`

#### Defined in

[theme/Theme.ts:111](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L111)

___

### getString

▸ **getString**(`themeProperty`): `string`

Same as [getProperty](theme.md#getproperty), but with type checking for string.

**`deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`string`

#### Defined in

[theme/Theme.ts:57](https://github.com/playkostudios/canvas-ui/blob/68aef90/src/theme/Theme.ts#L57)
