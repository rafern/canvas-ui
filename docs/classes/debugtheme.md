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

## Constructors

### constructor

• **new DebugTheme**(`fallback?`)

Create a new DebugTheme instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fallback` | [`Theme`](theme.md) | The actual theme to use. Fill colors will be ignored as they are randomly generated. If none supplied, then the default theme found in [Theme.constructor](theme.md#constructor) is used |

#### Overrides

[Theme](theme.md).[constructor](theme.md#constructor)

#### Defined in

[theme/DebugTheme.ts:10](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/DebugTheme.ts#L10)

## Properties

### fallback

• **fallback**: ``null`` \| [`Theme`](theme.md)

The fallback theme. If this theme has a missing property, the fallback
theme's property will be used instead

#### Inherited from

[Theme](theme.md).[fallback](theme.md#fallback)

#### Defined in

[theme/Theme.ts:61](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L61)

___

### properties

• **properties**: `Map`<[`ThemeProperty`](../enums/themeproperty.md), `unknown`\>

The values associated to each [ThemeProperty](../enums/themeproperty.md) for this theme.

#### Inherited from

[Theme](theme.md).[properties](theme.md#properties)

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

#### Inherited from

[Theme](theme.md).[getAlignment](theme.md#getalignment)

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

#### Inherited from

[Theme](theme.md).[getAlignment2D](theme.md#getalignment2d)

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

#### Overrides

[Theme](theme.md).[getFill](theme.md#getfill)

#### Defined in

[theme/DebugTheme.ts:20](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/DebugTheme.ts#L20)

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

#### Inherited from

[Theme](theme.md).[getFont](theme.md#getfont)

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

#### Inherited from

[Theme](theme.md).[getNumber](theme.md#getnumber)

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

#### Inherited from

[Theme](theme.md).[getPadding](theme.md#getpadding)

#### Defined in

[theme/Theme.ts:126](https://github.com/playkostudios/canvas-ui/blob/d57dd85/src/theme/Theme.ts#L126)
