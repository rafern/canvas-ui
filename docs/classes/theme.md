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
- [getString](theme.md#getstring)

## Constructors

### constructor

• **new Theme**(`properties?`, `fallback?`)

Creates a new Theme.

Sets [properties](theme.md#properties) and [fallback](theme.md#fallback).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `properties` | ``null`` \| `Map`<[`ThemeProperty`](../enums/themeproperty.md), `unknown`\> | `null` | This theme's [ThemeProperty](../enums/themeproperty.md) values. If null, the default theme properties are used, which consist of mostly semi-transparent black backgrounds and azure blue accents, inspired by material design colours. |
| `fallback` | ``null`` \| [`Theme`](theme.md) | `null` | - |

#### Defined in

[theme/Theme.ts:61](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L61)

## Properties

### fallback

• **fallback**: ``null`` \| [`Theme`](theme.md)

The fallback theme. If this theme has a missing property, the fallback
theme's property will be used instead

#### Defined in

[theme/Theme.ts:61](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L61)

___

### properties

• **properties**: `Map`<[`ThemeProperty`](../enums/themeproperty.md), `unknown`\>

The values associated to each [ThemeProperty](../enums/themeproperty.md) for this theme.

#### Defined in

[theme/Theme.ts:56](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L56)

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

[theme/Theme.ts:132](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L132)

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

[theme/Theme.ts:138](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L138)

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

[theme/Theme.ts:144](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L144)

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

[theme/Theme.ts:150](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L150)

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

[theme/Theme.ts:116](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L116)

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

[theme/Theme.ts:126](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L126)

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

[theme/Theme.ts:87](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L87)

___

### getString

▸ `Private` **getString**(`themeProperty`): `string`

Same as [getProperty](theme.md#getproperty), but with type checking for string.
For internal use only.

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`string`

#### Defined in

[theme/Theme.ts:106](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L106)
