# Window
General purpose window that can hold any type of component.
The window is designed to only be used once per Manialink.

## Import
```xml:no-line-numbers
<import component="EvoSC.Containers.Window" as="Window" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string`](#) | `evosc-window` | The ID of the window. Default is 'evosc-window' || **`x`** | [`double`](#) | `-50` | The X position of the window. || **`y`** | [`double`](#) | `30` | The Y position of the window. || **`width`** | [`double`](#) | `100` | The width of the window's outer bounds. || **`height`** | [`double`](#) | `60` | The height of the window's outer bounds. || **`title`** | [`string`](#) | `New Window` | The text to show in the titlebar. || **`icon`** | [`string`](#) | `⬜` | The icon to show in the titlebar. || **`style`** | [`string`](#) | `default` | The style of the window, can be default or secondary. || **`canClose`** | [`bool`](#) | `true` | Whether to show the close button. || **`canMinimize`** | [`bool`](#) | `false` | Whether to show the minimize button. || **`canMove`** | [`bool`](#) | `true` | Whether the user can drag the window around. || **`padding`** | [`double`](#) | `3` | Padding from the window border to the window contents || **`scrollable`** | [`bool`](#) | `false` | Whether the contents of the window can be scrolled |