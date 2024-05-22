# IconButton
Shows a button with an icon.

## Import
```xml:no-line-numbers
<import component="EvoSC.Controls.IconButton" as="IconButton" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string`](#) | `None` | The ID of the button. || **`icon`** | [`string`](#) | `None` | The icon to display in the button. || **`text`** | [`string`](#) | `` | The text to display in the button. || **`x`** | [`double`](#) | `0.0` | The X position of the button. || **`y`** | [`double`](#) | `0.0` | The Y position of the button. || **`width`** | [`double`](#) | `17.0` | The width of the button background. || **`height`** | [`double`](#) | `5.0` | The height of the button background. || **`type`** | [`string`](#) | `primary` | The style type of the button, can be default or secondary. || **`action`** | [`string`](#) | `` | The action to call when the button is clicked. This disables event scripts. || **`disabled`** | [`bool`](#) | `false` | Whether the button is disabled or not. If disabled, the button wont fire events. || **`hasText`** | [`bool`](#) | `false` | Whether the button has text on it. || **`style`** | [`string`](#) | `normal` | Possible values: normal, round || **`iconPos`** | [`string`](#) | `left` | The position of the icon relative to the button text. || **`className`** | [`string`](#) | `evosc-iconbutton` | Custom style || **`data`** | [`string`](#) | `` | Custom data passed to the component || **`size`** | [`string`](#) | `normal` | Size of the button can be normal, small, big or custom. |