# Chip
Custom text color of the chip

## Import
```xml:no-line-numbers
<import component="EvoSC.Controls.Chip" as="Chip" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string`](#) | `evosc_chip` | Unique identifier for the chip |
| **`text`** | [`string`](#) | `` | Text to show on the chip |
| **`x`** | [`double`](#) | `0.0` | X Position of the chip |
| **`y`** | [`double`](#) | `0.0` | Y position of the chip |
| **`width`** | [`double`](#) | `15` | Width of the chip |
| **`style`** | [`string`](#) | `Square` | The layout style, can be: Round or Square |
| **`closable`** | [`bool`](#) | `false` | Whether this chip can be closed/removed/hidden. Shows a close button |
| **`hidden`** | [`bool`](#) | `false` | Whether to hide this chip by default |
| **`severity`** | [`string`](#) | `primary` | The severity color of the chip, can be: primary, secondary, success, info, warning, danger |
| **`bgColor`** | [`string?`](#) | `` | Custom background color of the chip |
| **`textColor`** | [`string?`](#) | `` | Custom text color of the chip |
