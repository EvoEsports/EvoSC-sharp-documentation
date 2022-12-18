# Internal Modules
The development of internal modules are mostly the same with a few differences. To learn more about developing plugins, head over to the [Module Documentation](/development/modules/).

## Creating a new internal module
All internal modules should be created in `src/Modules` in their own projects.

### Step 1: The project & Module Class
Begin by creating a new project on the `EvoSC` solution. Select **Class Library** and set the project name to the name of your new module.

Next, make sure the **Project Directory** is under `src/Modules` and create the project. Before you can begin creating the module class, you need to make sure
that the **Root namespace** is set to `EvoSC.Modules.Official.<Project Name>`, and the target framework should be `net6.0`.

You can now create the main module class. By convention, postfix your module's name with `Module`. So, call the module class `<Module Name>Module`. For example, if your module is called `Player`, the module class should be called `PlayerModule`. This helps with readability when adding the module to the application later.

Create the module class the same as explained in the [Module Documentation](/development/modules/). But make sure you include `IsInternal = True` in the module attribute, for example:

```csharp
[Module(IsInternal = true)]
public class PlayerModule : EvoScModule
{
}
```

The project directory structure should now look like this:
```
src/
└─ Modules/
   └─ Player/
      ├─ Player.csproj
      └─ PlayerModule.cs <-- The module class
```

### Step 2: Module Meta Information
Modules require some information about them such as version and descriptions. A module's meta info also defines any dependencies the module requires.

The meta info is defined within a TOML file called `info.toml` and is placed in the project's root. Here is an example of this file:
```toml
[info]
# A unique name for this module, this is used as a identifier
name = "PlayerModule"
# The title of the module
title = "Player Module"
# A short description of what the module is and does
summary = "A module for handling and managing players."
# The current version of this module, using SEMVER
version = "1.0.0"
# The name of the author that created this module
author = "Evo"
```

To keep consistency across modules, the version must follow the [Semantic Versioning](https://semver.org/) format.

You can also specify any dependencies that is needed for this module by adding entries under the dependencies section. This section is optional and you don't need to include it at all:
```toml
[dependencies]
# Unique Name = "Version"
MyDependency1 = "1.0.0"
MyDependency2 = "2.2.0"
# ...
```

Each entry under `[dependencies]` must be a key with the unique name of the module set to the version that is required.

The project directory structure should now look like this:
```
src/
└─ Modules/
   └─ Player/
      ├─ Player.csproj
      ├─ PlayerModule.cs
      └─ info.toml // [!code ++]
```

### Step 3: Generating the meta info for the assembly
For internal modules, just adding this `info.toml` file is not enough. You don't need to copy this file to the output directory.
But since the application does not have access to the `info.toml` file for internal modules, we need to define this information in another way.

The `info.toml` is created in order to keep a consistent development flow between internal and external modules. But internal modules requires this information to be defined on the assembly itself. Now, you can go ahead and do this all manually, but this seems like duplicate work.

Instead, we created a source generator that internal modules can use, which generates this information automatically at compilation.

Open the project file (the `.csproj` file) and paste the following code under the `<Project>` tag:
```xml
<ItemGroup>
    <ProjectReference Include="..\..\EvoSC.Modules.SourceGeneration\EvoSC.Modules.SourceGeneration.csproj" OutputItemType="Analyzer" ReferenceOutputAssembly="false" />
</ItemGroup>
```

And thats it! You now have a complete project set up to develop an internal module.

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