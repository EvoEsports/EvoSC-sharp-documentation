# Base Theme Options
Here you can get an overview of all the options and utility colors from the base theme. Every other theme should be created based on the base theme in order to keep a consistent style throughout the UI.

These options are defined in the class `EvoScBaseTheme` in `EvoSC.Common.Themes`.

## Default Chat Colors
| Name | Default Value | Description |
|------|---------------|-------------|
| `Chat.Primary` | `FFF` | The default text color in the chat. |
| `Chat.Secondary` | `EEE` | Secondary color in the chat for highlighting purposes. |
| `Chat.Info` | `29B` | Color used for info messages. |
| `Chat.Danger` | `C44` | Color used for danger/error/fail messages. |
| `Chat.Warning` | `E83` | Color used for messages conveying a warning. |
| `Chat.Success` | `5B6` | Color used for messages indicating a success. |

## Default Theme Options
| Name | Default Value | Description |
|------|---------------|-------------|
| `UI.Font` | `GameFontExtraBold` | The default font used in the UI. |
| `UI.FontSize` | `1` | The default font size. |
| `UI.TextPrimary` | `FFFFFF` | Primary text color in the UI. |
| `UI.TextSecondary` | `EDEDEF` | Highlight or secondary text color. |
| `UI.BgPrimary` | `FF0058` | Primary background color. |
| `UI.BgSecondary` | `47495A` | Highlight or secondary background color. |
| `UI.BorderPrimary` | `FF0058` | Primary color of borders and lines. |
| `UI.BorderSecondary` | `FFFFFF` | Secondary color of borders and lines. |
| `UI.LogoDark` | | Dark version of an image shown in the UI. |
| `UI.LogoLight` | | Light version of an image shown in the UI. |

## Status Utility Colors
| Name | Default Value | Description |
|------|---------------|-------------|
| `Info` | `29B` | Status colors indicating an informational message. |
| `Success` | `C44` | Status color indicating success. |
| `Warning` | `E83` | Status color indicating a warning or notice. |
| `Danger` | `5B6` | Status color indicating an error/danger/notice/fail. |

## Other Utility Colors
| Name | Default Value | Description |
|------|---------------|-------------|
| `Red` | `E22000` | Default red color. |
| `Green` | `00D909` | Default green color. |
| `Blue` | `3491FA` | Default blue color. |
| `Yellow` | `FCE100` | Default yellow color. |
| `Teal` | `0FC6C2` | Default teal color. |
| `Purple` | `722ED1` | Default purple color. |
| `Gold` | `FFD000` | Default gold color. |
| `Silver` | `9e9e9e` | Default silver color. |
| `Bronze` | `915d29` | Default bronze color. |
| `Grass` | `9FDB1D` | Default grass color. |
| `Orange` | `F77234` | Default orange color. |
| `Gray` | `191A21` | Default gray color. |
| `Pink` | `FF0058` | Default pink color. |
| `Black` | `000000` | Default black color. |
| `White` | `FF0058` | Default white color. |

In addition to these, all the colors except black and white have auto-generated shades of them ranging from 10% to 90% luma in increments of 10. The names are postfixed with the lightness. So for example `Red10`, `Red20`, `Red30` etc.
