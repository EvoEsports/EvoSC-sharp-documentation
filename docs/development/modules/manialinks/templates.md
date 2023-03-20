# Manialink Templates

In order to provide dynamic and stateful manialinks, EvoSC make use of a templating engine used to generate the manialink output. It also makes it easier and quicker to build up a manialink UI. The [ManiaTemplates](https://github.com/EvoTM/ManiaTemplates) library is being used and is being developed alongside EvoSC.

This page explains how to create manialink templates in EvoSC and basic usage of the library. For detailed explanation on how the templating engine works, head over to the [ManiaTemplates Documentation](https://github.com/EvoTM/ManiaTemplates).

## Creating a new template
All template files must be embedded within the assembly for EvoSC to find the files. So we need to set up the project for this.

### Prepare the project
If you used the project template or generator, you do not need to do this step. But you can still verify that it is correct.

Open your `.csproj` project file and make sure the following line is under one of the `<ItemGroup>` tags:
```xml
<EmbeddedResource Include="Templates\**\*" />
```

This makes sure that everything within a `Templates` directory becomes embedded with the assembly.

### Create the `Templates` directory
In your project's root, create a project directory called `Templates`. All template files should be created under this directory.

### Create a new Manialink template
Under the `Templates` directory, you can now create your templates. All manialink templates must end with the `.mt` extension.

Let's do an example. Create a file called `HelloPlayer.mt`

Fill in the file with the following contents:
```xml
<template>
    <property type="string" name="Name" />

    <component>
        <label text="Hello {{ Name }}"/>
    </component>
</template>
```

Everything related to a template must be within the `<template>` tag. The actual content that is displayed must be within the `<component>` tag.

This will display a label saying `Hello <name>` where Name is a parameter that we will send to the manialink when display it.

## Template Directives
The template directives are used to configure things like imports and properties that can be used within a template.

### The `property` directive
The `property` directive is used to tell the template engine that we want to expose a property for the template component. The property must have a defined type and a name. Optionally a default value can be specified.

Example:
```xml
<property type="string" name="NickName" default="Player" />
```
In this example, we create a new property for the component that is a string with the name *NickName* and if this property is not set, it will fall back to the default value of *Player*.

### The `using` directive
The using directive works the same way as C# `using` directive. It allows you to use types which are defined within a certain namespace without having to use the full namespace. This directive is required for any type that is not a native type.

Example:
```xml
<using namespace="EvoSC.Common.Interfaces.Models" />
```
In this example, we expose the *EvoSC.Common.Interfaces.Models* namespace, which in EvoSC provides access to all models that EvoSC uses.

### The `import` directive
The `import` directive is used to import other template components to be used in the template as a custom component.

So for example, let's say we have a template that greets a player. This component is created inside a module called `MyModule`:
`GreetPlayer.xml`:
```xml
<template>
    <property type="string" name="NickName" />

    <component>
        <label text="Hello {{ NickName }}"/>
    </component>
</template>
```

We can now use this component in other templates:
```xml
<template>
    <import component="MyModule.GreetPlayer" as="GreetPlayer" /> // [!code focus]

    <component>
        <GreetPlayer NickName="My Nickname" /> // [!code focus]
    </component>
</template>
```

### The `script` directive
The `script` is used to import ManiaScript files.

For more information about this, check out the [ManiaScript](maniascript.md) page.

## Displaying & Hiding Manialinks
To create a simple set up to test your manialink. Let's create a command to send the manialink with the Manialink Manager:

```csharp
[Controller]
public class ShowMyManialinkController : EvoScController<CommandInteractionContext>
{
    private readonly IManialinkManager _manialinks;
    
    public ExampleController2(IManialinkManager manialinks)
    {
        _manialinks = manialinks;
    }

    [ChatCommand("show", "Show a manialink")]
    public async Task ShowManialink()
    {
        await _manialinks.SendManialinkAsync(Context.Player, "MyModule.HelloPlayer", new // [!code focus]
        { // [!code focus]
            // Same property name as the one in our manialink template // [!code focus]
            Name = Context.Player.NickName // [!code focus]
        }); // [!code focus]
    }
}
```

Sending `/show` in the chat in-game will now display a text `Hello <your nickname>` on your screen. 

### Hiding Manialinks
You can also hide/remove manialinks from the players by calling the `HideManialinkAsync` methods in the manialink manager.

So for our example, to hide the manialink, we can create a new command to hide the manialink

```csharp
[ChatCommand("hide", "Hide the manialink.")]
public async Task ShowManialink()
{
    await _manialinks.HideManialinkAsync(Context.Player, "MyModule.HelloPlayer"); // [!code focus]
}
```

Sending `/hide` in the in-game chat will remove the shown text.

#### A note on how manialink hiding works
Because there doesn't exist a XMLRPC call to hide manialinks for specific players, we will need to do a trick instead. The way it works is that we display a new manialink, which has the same ID of the manialink we want to hide. But this manialink is empty and contains no UI elements or code. This will replace the manialink with the same ID, effectively hide it.

One problem with this is that the manialink still exists in the player's memory. To resolve this, we make use of the auto hide functionality of manialinks. The empty manialink is therefore automatically deleted and removed from memory after 3 seconds.