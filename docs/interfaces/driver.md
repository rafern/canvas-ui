[canvas-ui](../README.md) / Driver

# Interface: Driver

Drivers are modular expansions to [Roots](../classes/root.md). Drivers can be
registered to multiple roots at the same time and contain hooks which are
called by registered roots.

Drivers are commonly used to provide input to roots, but they could be used
to provide other functionality.

## Implemented by

- [`KeyboardDriver`](../classes/keyboarddriver.md)
- [`PointerDriver`](../classes/pointerdriver.md)

## Table of contents

### Methods

- [onDisable](driver.md#ondisable)
- [onEnable](driver.md#onenable)
- [onFocusCapturerChanged](driver.md#onfocuscapturerchanged)
- [onFocusChanged](driver.md#onfocuschanged)
- [update](driver.md#update)

## Methods

### onDisable

▸ **onDisable**(`root`): `void`

Hook called when driver is unregistered from an enabled root or when a
root that this driver is registered to is disabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](../classes/root.md) |

#### Returns

`void`

#### Defined in

[core/Driver.ts:27](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Driver.ts#L27)

___

### onEnable

▸ **onEnable**(`root`): `void`

Hook called when driver is registered to an enabled root or when a root
that this driver is registered to is enabled.

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](../classes/root.md) |

#### Returns

`void`

#### Defined in

[core/Driver.ts:22](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Driver.ts#L22)

___

### onFocusCapturerChanged

▸ **onFocusCapturerChanged**(`root`, `focusType`, `oldCapturer`, `newCapturer`): `void`

Hook called by [Root.dispatchEvent](../classes/root.md#dispatchevent)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](../classes/root.md) |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `oldCapturer` | ``null`` \| [`Widget`](../classes/widget.md) |
| `newCapturer` | ``null`` \| [`Widget`](../classes/widget.md) |

#### Returns

`void`

#### Defined in

[core/Driver.ts:31](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Driver.ts#L31)

___

### onFocusChanged

▸ **onFocusChanged**(`root`, `focusType`, `newFocus`): `void`

Hook called by [Root.requestFocus](../classes/root.md#requestfocus) and [Root.clearFocus](../classes/root.md#clearfocus)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](../classes/root.md) |
| `focusType` | [`FocusType`](../enums/focustype.md) |
| `newFocus` | ``null`` \| [`Widget`](../classes/widget.md) |

#### Returns

`void`

#### Defined in

[core/Driver.ts:29](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Driver.ts#L29)

___

### update

▸ **update**(`root`): `void`

Hook called by [Root.preLayoutUpdate](../classes/root.md#prelayoutupdate)

#### Parameters

| Name | Type |
| :------ | :------ |
| `root` | [`Root`](../classes/root.md) |

#### Returns

`void`

#### Defined in

[core/Driver.ts:17](https://github.com/playkostudios/canvas-ui/blob/4e43a87/src/core/Driver.ts#L17)
