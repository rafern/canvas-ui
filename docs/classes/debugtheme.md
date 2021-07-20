[canvas-ui](../README.md) / DebugTheme

# Class: DebugTheme

A theme which always gives out a random fill colour. Used for debugging when
painting occurs. Has no properties but always has a fallback theme.

## Hierarchy

- [`Theme`](theme.md)

  ↳ **`DebugTheme`**

## Table of contents

### Constructors

- [constructor](debugtheme.md#constructor)

### Properties

- [fallback](debugtheme.md#fallback)
- [properties](debugtheme.md#properties)

### Methods

- [getAlignment](debugtheme.md#getalignment)
- [getAlignment2D](debugtheme.md#getalignment2d)
- [getFill](debugtheme.md#getfill)
- [getFont](debugtheme.md#getfont)
- [getNumber](debugtheme.md#getnumber)
- [getPadding](debugtheme.md#getpadding)
- [getSize](debugtheme.md#getsize)
- [getString](debugtheme.md#getstring)

## Constructors

### constructor

• **new DebugTheme**(`fallback`)

Create a new DebugTheme instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fallback` | [`Theme`](theme.md) | The actual theme to use. Fill colors will be ignored as they are randomly generated. |

#### Overrides

[Theme](theme.md).[constructor](theme.md#constructor)

#### Defined in

[theme/DebugTheme.ts:10](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/DebugTheme.ts#L10)

## Properties

### fallback

• **fallback**: ``null`` \| [`Theme`](theme.md)

The fallback theme. If this theme has a missing property, the fallback
theme's property will be used instead

#### Inherited from

[Theme](theme.md).[fallback](theme.md#fallback)

#### Defined in

[theme/Theme.ts:18](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L18)

___

### properties

• **properties**: `Map`<[`ThemeProperty`](../enums/themeproperty.md), `unknown`\>

The values associated to each [ThemeProperty](../enums/themeproperty.md) for this theme.

#### Inherited from

[Theme](theme.md).[properties](theme.md#properties)

#### Defined in

[theme/Theme.ts:13](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L13)

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

#### Inherited from

[Theme](theme.md).[getAlignment](theme.md#getalignment)

#### Defined in

[theme/Theme.ts:85](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L85)

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

#### Inherited from

[Theme](theme.md).[getAlignment2D](theme.md#getalignment2d)

#### Defined in

[theme/Theme.ts:91](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L91)

___

### getFill

▸ **getFill**(`themeProperty`): `string`

Equivalent to [getString](debugtheme.md#getstring)

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`string`

#### Overrides

[Theme](theme.md).[getFill](theme.md#getfill)

#### Defined in

[theme/DebugTheme.ts:20](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/DebugTheme.ts#L20)

___

### getFont

▸ **getFont**(`themeProperty`): `string`

Equivalent to [getString](debugtheme.md#getstring)

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`string`

#### Inherited from

[Theme](theme.md).[getFont](theme.md#getfont)

#### Defined in

[theme/Theme.ts:103](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L103)

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

#### Inherited from

[Theme](theme.md).[getNumber](theme.md#getnumber)

#### Defined in

[theme/Theme.ts:69](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L69)

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

#### Inherited from

[Theme](theme.md).[getPadding](theme.md#getpadding)

#### Defined in

[theme/Theme.ts:79](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L79)

___

### getSize

▸ **getSize**(`themeProperty`): `number`

Equivalent to [getNumber](debugtheme.md#getnumber)

**`deprecated`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `themeProperty` | [`ThemeProperty`](../enums/themeproperty.md) |

#### Returns

`number`

#### Inherited from

[Theme](theme.md).[getSize](theme.md#getsize)

#### Defined in

[theme/Theme.ts:111](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L111)

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

#### Inherited from

[Theme](theme.md).[getString](theme.md#getstring)

#### Defined in

[theme/Theme.ts:57](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/theme/Theme.ts#L57)
