# Tag
Generic tag that can be used to display additional info, values or status.

## Import
```xml:no-line-numbers
<import component="EvoSC.Controls.Tag" as="Tag" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string`](#) | `evosc_tag` | Unique identifier of the tag || **`text`** | [`string`](#) | `` | Text to show on the tag || **`x`** | [`double`](#) | `0.0` | X position of the tag || **`y`** | [`double`](#) | `0.0` | Y position of the tag || **`width`** | [`double`](#) | `15` | Width of the tag || **`height`** | [`double`](#) | `3` | Height of the tag || **`style`** | [`string`](#) | `Square` | Layout style of the tag, can be: Round or Square || **`closable`** | [`string`](#) | `false` | Whether the tag is closable || **`hidden`** | [`bool`](#) | `false` | Whether the tag is hidden by default || **`severity`** | [`string`](#) | `primary` | Severity color of the tag, can be: primary, secondary, success, info, warning or danger || **`bgColor`** | [`string?`](#) | `` | Custom background color of the tag || **`textColor`** | [`string?`](#) | `` | Custom text color of the tag || **`centerText`** | [`bool`](#) | `true` | Whether to center the text on the tag background |