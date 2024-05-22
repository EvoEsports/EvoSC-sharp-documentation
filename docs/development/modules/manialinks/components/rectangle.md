# Rectangle
Draws a rectangle.

## Import
```xml:no-line-numbers
<import component="EvoSC.Drawing.Rectangle" as="Rectangle" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string`](#) | `evosc_rectangle` | Unique identifier of the rectangle || **`cornerRadius`** | [`double`](#) | `0` | Corner radius of the rectangle for rounded corners || **`x`** | [`double`](#) | `0.0` | X location of the rectangle || **`y`** | [`double`](#) | `0.0` | Y location of the rectangle || **`width`** | [`double`](#) | `None` | Width of the rectangle || **`height`** | [`double`](#) | `None` | Height of the rectangle || **`scriptEvents`** | [`bool`](#) | `false` | Enable/disable script events of the rectangle || **`action`** | [`string`](#) | `` | Action to trigger when clicking the rectawngle || **`bgColor`** | [`string`](#) | `00000000` | Background color of the rectangle || **`zIndex`** | [`double`](#) | `0` | Z index of the rectangle || **`hidden`** | [`bool`](#) | `false` | Whether to hide the rectangle by default || **`rotate`** | [`double`](#) | `0` | Rotation of the rectangle in degrees || **`corners`** | [`string`](#) | `TopLeft,TopRight,BottomLeft,BottomRight` | Corners to round off, can be a combined comma-separated list of the following values: TopLeft, TopRight, BottomLeft or BottomRight || **`className`** | [`string`](#) | `` | Styling class to pass to the rectangle || **`dataId`** | [`string`](#) | `` | Data Id attribute to set |