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

[theme/Theme.ts:18](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L18)

## Properties

### fallback

• **fallback**: ``null`` \| [`Theme`](theme.md)

The fallback theme. If this theme has a missing property, the fallback
theme's property will be used instead

#### Defined in

[theme/Theme.ts:18](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L18)

___

### properties

• **properties**: `Map`<[`ThemeProperty`](../enums/themeproperty.md), `unknown`\>

The values associated to each [ThemeProperty](../enums/themeproperty.md) for this theme.

#### Defined in

[theme/Theme.ts:13](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L13)

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

[theme/Theme.ts:86](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L86)

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

[theme/Theme.ts:92](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L92)

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

[theme/Theme.ts:98](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L98)

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

[theme/Theme.ts:104](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L104)

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

[theme/Theme.ts:70](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L70)

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

[theme/Theme.ts:80](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L80)

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

Returns the value associated with the theme property. This could
be any type.

#### Defined in

[theme/Theme.ts:39](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L39)

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

[theme/Theme.ts:112](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L112)

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

[theme/Theme.ts:58](https://github.com/playkostudios/canvas-ui/blob/2407796/src/theme/Theme.ts#L58)
