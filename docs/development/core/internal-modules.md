# Internal Modules
The development of internal modules are mostly the same with a few differences. To learn more about developing plugins, head over to the [Module Documentation](/development/modules/).

## Creating a new internal module
All internal modules should be created in `src/Modules` in their own projects.

Begin by creating a new project on the `EvoSC` solution. Select **Class Library** and set the project name to the name of your new module.

Next, make sure the **Project Directory** is under `src/Modules` and create the project. Before you can begin creating the module class, you need to make sure
that the **Root namespace** is set to `EvoSC.Modules.Official.<Project Name>`, and the target framework should be `net6.0`.

You can now create the main module class. By convention, postfix your module's name with `Module`. So, call the module class `<Module Name>Module`. For example, if your module is called `Player`, the module class should be called `PlayerModule`. This helps with readability when adding the module to the application later.

Create the module class the same as explained in the [Module Documentation](/development/modules/). But make sure you include `IsInternal = True` in the module attribute, for example:

```csharp
[Module("Player", "General player handling.", IsInternal = true)]
public class PlayerModule : EvoScModule
{
}
```

## Adding internal modules to the application
Adding internal modules require you to reference the module and add it to the internal module list in the `EvoSC` project.

Open the `InternalModules.cs` file and add the type of your module class to the `Modules` list. So for example, if your plugin was called `PlayerModule`, the `Modules` list should look like this:

```csharp
public static List<Type> Modules = new()
{
    typeof(PlayerModule),
    // ... other modules
};
```

## Begin developing
If you have done all the steps explained on this page correctly, you should now be able to begin developing your internal module!

Again, for more information on developing modules, head over to the [Module Documentation](/development/modules/).