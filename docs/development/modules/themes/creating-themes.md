# Creating Themes
Every theme is defined by a class which then provides options and component replacements. Here we will look into how one can create a new Theme within a module.

## How Themes Work
When a theme class is defined, EvoSC# will automatically add this theme to the theme manager. In this process, if the theme is unique to the other themes, it is also activated. It is possible to have multiple themes active at the same time, with each, implementing their own set of options and component replacements.

It is also possible to define a theme as overriding another theme. In this case, the theme will completely replace the theme which it is overriding.

## Creating A New Theme
So the first thing to do, is to define the basic theme class. It is done by inheriting `Theme<>` and annotating it with the `[Theme]` attribute.

For example:
```cs
[Theme(Name = "MyTheme", Description = "This is my custom theme.")]
public class MyTheme : Theme<MyTheme>
{
    public override Task ConfigureAsync()
    {
        return Task.CompletedTask;
    }
}
```

The `ConfigureAsync` method is used to define all the options and component replacements the theme has to offer. So let's create some options by using the `Set(OptionKey).To(OptionValue)` pattern:
```cs
[Theme(Name = "MyTheme", Description = "This is my custom theme.")]
public class MyTheme : Theme<MyTheme>
{
    public override Task ConfigureAsync()
    {
        Set("MyModule.MyManialink.Text").To("FFFFFF");
        Set("MyModule.MyManialink.Bg").To("000000");

        return Task.CompletedTask;
    }
}
```

Here we set two options, one for the text color and one for the background color of our manialink. Note that we prefix these options with the module name and the manialink name. It is good practice to do it like this as it avoids conflicts with other themes. The option names also have certain naming conventions so that we can keep consistency between the option names.

### Theme Option Naming Conventions
In order to keep consistency and avoid conflicts and confusion, all theme options should follow these rules:

- Default theme options should always be prefixed with `Default`.
> *For example, let's say we have a default option called `MyModule.MyManialink.Text`. If this is the default option text color option for this manialink, it should be named `MyModule.MyManialink.Default.Text`. This allows us to separate the default options and additional options which may be optional.*

- Always prefix the option name with the module name.
> *This avoids conflicts with other modules as we can have multiple themes active at the same time.*

- In addition to the module name, the option should be prefixed with the section of the Manialink, or the Component name itself.
> *This avoid conflicts within the same module, and also helps understanding what the option is used for and where it belongs to. Note that in certain cases, such as having general purpose options for a module, one can omit this.*

- Don't postfix options with redundant names such as "Color".
> *Because these options are almost always used for colors, we can avoid verbose names such as "TextColor" or "BgColor", and simply call them "Text" and "Bg".*

- Option names should be as simple and descriptive as possible, typically one word of it's primary usage.
> *For example: "Text", "Bg" for BackGround, "Border", "Divider" etc.*

- Postfix option names with their purpose if they have secondary usages, so that the name is PrimaryusageSecondaryusage.
> *For example, let's say you have a secondary text color, you can call it TextSecondary. Other examples are BgHeaderGrad1, BgHeaderGrad2, BgContent, BgRow etc.*

### Using Base Theme Options
The constructor of a theme class allows Dependency Injection. This means that we can inject the Current Theme Object, use existing options for our theme. It allows us to use the base theme to style our Manialink, in order to keep a consistent style.

You may be wondering, can't we just use the base theme options directly instead of creating a theme with new options that uses them? This is where the philosophy of the controller comes in. Because we wan't provide people with a highly customizable and versatile server controller so that they can make it exactly how they want. So everything within a Manialink has it's own option, which can be overriden in the config or by other Modules to modify the look of it.

So now that you understand why we do it this way, let's see an example that uses some of the base options:

```cs
[Theme(Name = "MyTheme", Description = "This is my custom theme.")]
public class MyTheme : Theme<MyTheme>
{
    private readonly dynamic _theme;

    public MyTheme(IThemeManager theme) => _theme = theme.Theme;

    public override Task ConfigureAsync()
    {
        Set("MyModule.MyManialink.Text").To(_theme.UI_TextPrimary);
        Set("MyModule.MyManialink.Bg").To(_theme.UI_BgPrimary);

        return Task.CompletedTask;
    }
}
```

### Replacing Existing Manialink Components
It is also possible to replace existing Manialink components with new ones. So let's say you implemented a custom Button and want the entire UI to use that button instead. You can then use the `Replace(OldComponentName).With(NewComponentName)` pattern:

```cs
[Theme(Name = "MyTheme", Description = "This is my custom theme.")]
public class MyTheme : Theme<MyTheme>
{
    public override Task ConfigureAsync()
    {
        Replace("UI.Button").With("MyModule.MyButton");

        return Task.CompletedTask;
    }
}
```

The way this work now, is that whenever `UI.Button` is imported or referenced in some way, it will actually use `MyModule.MyButton` instead.

### Overriding Existing Themes
A theme can also override existing themes using the `Override` option in the `[Theme]` attribute.

So let's say we want to override the theme for the Button component. We can then do the following:

```cs
[Theme(Name = "NewButtonTheme", Description = "New theme for the button.", Override = typeof(DefaultButtonTheme))]
public class MyTheme : DefaultButtonTheme
{
    public override async Task ConfigureAsync()
    {
        await base.ConfigureAsync();

        Set("UI.Button.Default.Bg").To("0000FF"); // set button background to blue
    }
}
```

This shows another feature of the Theme Framework. We can inherit other themes. This is very useful if you just want to replace certain options, and not having to re-define every single option the original theme provides.

#### Overriding the Base Theme
The base EvoSC# theme resides in the class `BaseEvoScTheme` from `EvoSC.Common.Themes`. This is where all the base options, as well as utility colors, default font and size are defined. If you wish to create a module that changes the overall theme of the controller, the best way to do this is to override this theme using the technique explained above.