# The Module Class
Every module needs a module class. This class is essentially the "entrypoint" of a module. In many cases, the class does nothing other than providing some meta information about the module.

The application's core will look for any class that annotates the `[Module]` attribute and check if it inherits `EvoScModule`.

Besides the class providing some basic information about a module, it can also handle module specific events. These events includes enabling and disabling a module, as well as installing and uninstalling a module.

## Defining the module class
The module class definition is very simple. Create a new class, annotate it with the `[Module]` attribute and inherit `EvoScModule` and you are done! Optionally, inherit interfaces to handle enabling/disabling or installing/uninstalling.

For example, let's define a module class of a new module `ExampleModule`:
```csharp
[Module]
public class ExampleModule : EvoScModule
{
}
```

## Loading a module
The constructor of a module class acts as a "On Load" handler. When you load an event, you are only meant to set up basic things like variables or lists. The "on load" event for modules is therefore intentionally restricted to constructors, as you are not meant to put much logic in here.

If you need some type of logic to set something up, perhaps you need to set things up in a async context, then use enable/disable or install/uninstall methods which is explained later.

The constructor also supports dependency injection, and it will have access to the core's services, as well as the module's own services:
```csharp
[Module]
public class ExampleModule : EvoScModule
{
    public ExampleModule(MyService service) // [!code focus:4]
    {
        // do something with MyService ...
    }
}
```

## Toggleable Modules
If you only use the framework's functionality providers, you normally don't need to handle the enabling or disabling events. However, sometimes it is neccessary to create some background service or custom service that requires the ability to be enabled or disabled.

In order to ensure that modules are enabled and disabled when a user clicks those buttons, you can inherit the `IToggleable` interface.

The interface exposes two asynchronous methods, `EnableAsync` and `DisableAsync`. These method names are pretty self-explainatory, but keep in mind that enabling or disabling a module does not mean loading or unloading a module.

::: info
When a module is disabled, it is still loaded in memory, but the logic should not respond to anything.
:::

::: tip
For things that might run in the background for a prolonged time, it is recommended to use [Background Services](/development/modules/advanced/services.html#background-services).
:::

Example with `IToggleable`:
```csharp
[Module]
public class ExampleModule : EvoScModule, IToggleable// [!code focus]
{
    public Task EnableAsync()// [!code focus:9]
    {
        // enable stuff in the module
    }

    public Task DisableAsync()
    {
        // disable stuff from the module
    }
}
```

## Installable Modules
Before a module is enabled, it is "installed". This typically means setting up more permanent objects and data such as running database migrations, or creating and editing certain files. It is possible to hook into this event by implementing the `IInstallable` interface on the module class.

It provides two methods, one for when a module is installed (`InstallAsync`), and another for when a module is uninstalled (`UninstallAsync`).

Keep in mind that things such as running migrations is already automatically done and does not need to be triggered by implementing this interface.

Example with `IInstallable`
```csharp
[Module]
public class ExampleModule : EvoScModule, IInstallable// [!code focus]
{
    public Task InstallAsync()// [!code focus:9]
    {
        // install more permanent things for the module
    }

    public Task UninstallAsync()
    {
        // uninstall, remove and clean up any changes
    }
}
```

## Module Loading Process
Understanding the way modules are loaded and and the order in which the special module events are triggered can be useful.

On start up, the application looks for assemblies with a class that annotates the `[Module]` attribute. If this attribute is found, it checks if the class inherits `EvoScModule`.

If these two conditions are met, the application will look for any dependencies defined by the module. If there are any dependencies, these are loaded first.

Before the module class itself is loaded, the applicaiton looks for any framework defined entities, for example controllers, settings, permissions, middlewares, database migrations etc.

The module class is then loaded, which means the class itself is instantiated and the constructor called.

After the module is loaded, it is then installed. This sets up things like permissions or database migrations.

If installation is successful, the module is enabled. When a module is enabled, it adds things like controllers, middlewares, events, chat commands, module services etc. All of these things should be enabled automatically.