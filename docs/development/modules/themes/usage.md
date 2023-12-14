# Using the Theme Framework

## Accessing Theme Options
There are two main ways to access the options of a theme. Most often, you will only really need the theme options within a Manialink and the current Theme is available as a global variable inside the Manialink template.

But if you need access to the theme options outside of Manialinks, the current theme option is also available through Dependency Injection.

### The Current Theme Object
The Current Theme Object contains all available options set by the current activated themes. It is a dynamic object and one can access the options by it's key name and replacing `.` with `_`.

For example, let's say we have a theme option called `MyModule.MyManialink.MyThemeOption`, to access the value of this option, you can retrieve it from the Current Theme Object like this:
```cs
var optionValue = Theme.MyModule_MyManialink_MyThemeOption;
// .. do something with it
```

### Using the `Theme` Global Manialink Variable
Accessing the Current Theme Object from a Manialink is quite simple. There is no set up required as it is available as a global variable.

So for example, if you want to set the color of a label, you can do something like this:
```xml
<label text="Hello!" textcolor="{{ Theme.HelloLabel.TextColor }}" />
```

## Customizing the Theme
EvoSC# provides two ways to customizing the theme, from a user or developer perspective. For developers creating new custom themes, we recommend to check out the section on [Creating Themes](./creating-themes.md).

For users, let's talk about the config file.

### Using the Config File
The Theme Framework is designed in such a way that any Theme Options defined in the main config file, will always override whatever value is set from the Theme objects. This means that users have full control over the theme if they wish to customize it, without having to create a completely new module.

In the `main.toml` config file, one can define Theme options under the `[Theme]` section. So let's say, we want to set a custom primary background color for the UI. We can do the following in the config file:
```toml
[Theme]
UI.BgPrimary = "ff0058"
```

The `UI.BgPrimary` is part of the base options in EvoSC#, which are explained in more-depth [here](./base-options.md).