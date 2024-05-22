# LinkButton
Opens a link in the user's web browser when clicked.

## Import
```xml:no-line-numbers
<import component="EvoSC.Controls.LinkButton" as="LinkButton" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string`](#) | `None` | The ID of the button. |
| **`text`** | [`string`](#) | `None` | Text to display in the button |
| **`url`** | [`string`](#) | `None` | The URL to open in the player's default web browser |
| **`x`** | [`double`](#) | `0.0` | X position of the button. |
| **`y`** | [`double`](#) | `0.0` | Y position of the button. |
| **`width`** | [`double`](#) | `25.0` | Width of the button background. |
| **`height`** | [`double`](#) | `5.0` | Height of the button background. |
| **`bgColor`** | [`string?`](#) | `null` | None |
| **`type`** | [`string`](#) | `primary` | The button style type, can be primary or secondary. |
| **`action`** | [`string`](#) | `` | The action to call when clicking the button. This disables script events. |
| **`disabled`** | [`bool`](#) | `false` | Whether the button is disabled or not. If disabled, the button wont fire events. |
| **`className`** | [`string`](#) | `evosc-linkbutton` | Class to assign to the button. |
