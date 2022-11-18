# Module Settings & Configuration
EvoSC# utilizes [Config.Net](https://github.com/aloneguid/config) as the background handler for all configuration. A module's configuration is called settings, and it is saved in the database using a key-value approach.

## Defining Settings
To define settings, create an new interface. For example let's call our new settings for `IMySettings`.

We then create the new interface and annotate it with the `[Settings]` attribute:

```csharp
[Settings]
public interface IMySettings
{
    [Option(DefaultValue = "default value")]
    public string MyOption { get; set; }
}
```

Inside this interface, we define all the options. As you can see, we can set a default value for an option using the `[Option]` attribute from [Config.Net](https://github.com/aloneguid/config).

::: info
Providing default values for options is not required, but it is recommended to always do this.
:::

### Sub Settings

You can also create sub-settings, you do this by creating another interface just like the one in the example. However, *don't* annotate it with the `[Settings]` attribute.

To illustrate what I mean, check this example:

```csharp
// the root settings interface
[Settings]
public interface IMySettings
{
    public IMySubSettings MyOption { get; set; }
}
```

```csharp
// the subsettings, note that we are not annotating with [Settings] because we don't
// want the application to add this as a root settings object
public interface IMySubSettings
{
    [Option(DefaultValue = "default value")]
    public string MyOption { get; set; }
}
```

## Accessing Settings
Settings are added to the DI container. This means that we can access the settings object through dependency injection.

For example, imagine you need access to the settings in a controller:
```csharp
[Controller]
public class ExampleController : EvoScController<IControllerContext>
{
    public ExampleController(IMySettings mySettings)
    {
        // you can now access the options
        Console.Log(mySettings.MyOption);
    }
}
```

## Modifying Option Values
The configuration system uses a set of tricks to hook into the setter and getter methods of the object properties. This allows us to abstract away all loading and saving logic from the developer.

When an option's value is requested, the application first check the value cache and if there is a cache miss, the value is retrieved from the database.

So when you set an option's value, the value is then automatically saved into the database. This means that all you need to do to save the value of an option is to simply set the property and you're done!

Example:
```csharp
mySettings.MyOption = "my new value";
```

::: details
![Reference Graph](./img/magic-meme.gif)
:::