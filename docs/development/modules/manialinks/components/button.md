# Button
Custom data passed to the component

## Import
```xml:no-line-numbers
<import component="EvoSC.Controls.Button" as="Button" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string](#) | `None` | The ID of the button. |
| **`text`** | [`string](#) | `` | Text to display in the button |
| **`x`** | [`double](#) | `0.0` | X position of the button. |
| **`y`** | [`double](#) | `0.0` | Y position of the button. |
| **`width`** | [`double](#) | `17.0` | Width of the button background. |
| **`height`** | [`double](#) | `5.0` | Height of the button background, size must be set to "custom" to take effect. |
| **`size`** | [`string](#) | `normal` | Size of the button can be normal, small, big or custom. |
| **`type`** | [`string](#) | `primary` | The button style type, can be primary, secondary or accent. |
| **`style`** | [`string](#) | `normal` | Possible values: normal, round |
| **`bgColor`** | [`string?](#) | `null` | Set a custom background color for the button |
| **`action`** | [`string](#) | `` | The action to call when clicking the button. This disables script events. |
| **`disabled`** | [`bool](#) | `false` | Whether the button is disabled or not. If disabled, the button wont fire events. |
| **`className`** | [`string](#) | `evosc-button` | Custom style |
| **`data`** | [`string](#) | `` | Custom data passed to the component |
