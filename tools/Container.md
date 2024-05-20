# Container
Whether the container is hidden by default

## Import
```xml:no-line-numbers
<import component="EvoSC.Containers.Container" as="Container" />
```

## Properties
| Name | Type | Default | Description |
|------|------|---------|-------------|
| **`id`** | [`string](#) | `evosc_container` | Unique identifier for the container |
| **`x`** | [`double](#) | `0.0` | X location of the container |
| **`y`** | [`double](#) | `0.0` | Y location of the container |
| **`width`** | [`double](#) | `0.0` | Width of the container |
| **`height`** | [`double](#) | `0.0` | Height of the container |
| **`scrollable`** | [`bool](#) | `false` | Whether the contents of the container can be scrolled |
| **`scrollGridSnap`** | [`bool](#) | `false` | Whether the scrolling will snap to a grid |
| **`scrollHeight`** | [`double](#) | `0.0` | Height of the scrollable area. This should be container <contents height> - <container height> |
| **`scrollWidth`** | [`double](#) | `0.0` | Width the scrollable area. This should be container <contents width> - <container width> |
| **`scrollGridX`** | [`double](#) | `0.0` | Intervals to snap the scrolling to for the X axis |
| **`scrollGridY`** | [`double](#) | `0.0` | Intervals to snap the scrolling to for the Y axis |
| **`zIndex`** | [`double](#) | `0` | Z index of the container |
| **`rotate`** | [`double](#) | `0` | Rotation of the container in degrees |
| **`scale`** | [`double](#) | `1` | Scale of the container |
| **`className`** | [`string](#) | `` | Styling class to pass to the container |
| **`hidden`** | [`bool](#) | `false` | Whether the container is hidden by default |
