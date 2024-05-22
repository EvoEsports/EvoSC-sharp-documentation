# Panel
Customizable background panel which can contain components.
Features multiple properties such as background, border, rounded corners, and transforms.

## Import
```xml:no-line-numbers
<import component="EvoSC.Controls.Panel" as="Panel" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string`](#) | `evosc_panel` | Unique identifier of the panel. |
| **`x`** | [`double`](#) | `0.0` | X position of the panel. |
| **`y`** | [`double`](#) | `0.0` | Y position of the panel. |
| **`width`** | [`double`](#) | `None` | Width of the panel. |
| **`height`** | [`double`](#) | `None` | Height of the panel |
| **`padding`** | [`double`](#) | `0.0` | Padding from the outside border to the panel content. |
| **`bgColor`** | [`string`](#) | `00000000` | Background color of the panel. |
| **`cornerRadius`** | [`double`](#) | `0.0` | Radius of the corners for the panel, used for rounded corners. |
| **`zIndex`** | [`double`](#) | `0` | The Z index of the panel. |
| **`className`** | [`string`](#) | `0` | Custom style class of the panel. |
| **`rotate`** | [`double`](#) | `0` | Rotation of the panel in degrees |
| **`hidden`** | [`bool`](#) | `false` | Whether the panel is hidden or not by default |
| **`scriptEvents`** | [`bool`](#) | `false` | Enable/disable script events on the panel's components. |
| **`border`** | [`double`](#) | `0` | The thickness of the panel's border. |
| **`borderColor`** | [`string`](#) | `ffffff` | Color of the panel's border. |
| **`data`** | [`string`](#) | `` | Custom data attribute to set. |
| **`dataId`** | [`string`](#) | `` | ID data attribute to set. |
| **`overflow`** | [`bool`](#) | `false` | Whether the panel allows contents to overflow its boundaries. If disabled, contents is cut off. |
