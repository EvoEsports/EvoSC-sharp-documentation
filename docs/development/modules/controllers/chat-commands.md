# Chat Commands
EvoSC# provides a framework for defining actions that can be called from the chat. All chat commands in EvoSC are prefixed with forward slash `/` with the exception of aliases.

## Defining Chat Commands
Before you can define chat commands, you need to set up a controller with the `CommandInteractionContext` context:

```csharp
[Controller]
public class ExampleCommandsController : EvoScController<CommandInteractionContext> // [!code focus]
{
}
```

We can now define commands and their callback method within this controller using the `[ChatCommand]` attribute.

Example:
```csharp
[Controller]
public class ExampleCommandsController : EvoScController<CommandInteractionContext>
{
    private readonly IServerClient _server;

    public ExampleCommandsController(IServerClient server) => _server = server;
    
    [ChatCommand("ping", "Ping the server controller!")] // [!code focus:2]
    public async Task PingAsync() => _server.SuccessMessageAsync("Pong!", Context.Player);
}
```

You can now call this command ingame by sending the message `/ping` in the chat.

### Permissions
It is possible to set the permission required to execute a command by providing an identifier or name for a permission in the 3rd parameter.

For example:
```csharp
[ChatCommand("kick", "Kick a player.", AdminPermission.KickPlayer)]
```

### Commands without prefix
The forth argument can be used to create commands that does not require the prefix `/` to be executed.

::: warning
It is not recommended to use this option, but instead use aliases for commands without a prefix. This is more consistent and allows us to
always have the original command available with a prefix.
:::

## Command Aliases
Command aliases is a powerful way to create alternative variations of a chat command. Let's say you want to create a way for players to rate a map in the chat.

We want to give players the possibility to type "++", "+", "--" and so on to rate the map. Now, we could make a prefex-less command for each and every one of those, but that is cumbersome and not very elegant.

What we can do instead is using command aliases, so first, let's create a `/ratemap` command so we have something to start with.

```csharp
[Controller]
public class ExampleCommandsController : EvoScController<CommandInteractionContext>
{
    private readonly IServerClient _server;

    public ExampleCommandsController(IServerClient server) => _server = server;
    
    [ChatCommand("ratemap", "Rate a map.")] // [!code focus:2]
    public async Task RateMapAsync(uint rating) => _server.SuccessMessageAsync($"You gave the rating: {rating}", Context.Player);
}
```

Now players can type, for example `/ratemap 60` to give the map a rating of 60 points. But we don't want players to type out this entire command with some number. But instead the typical "++" or "--" that we all know so well in Trackmania.

So let's create some aliases:

```csharp
[Controller]
public class ExampleCommandsController : EvoScController<CommandInteractionContext>
{
    private readonly IServerClient _server;

    public ExampleCommandsController(IServerClient server) => _server = server;
    
    [ChatCommand("ratemap", "Rate a map.")] // [!code focus:8]
    [CommandAlias("+++", 100)] // [!code ++:6]
    [CommandAlias("++", 80)]
    [CommandAlias("+", 60)]
    [CommandAlias("-", 40)]
    [CommandAlias("--", 20)]
    [CommandAlias("---", 0)]
    public async Task RateMapAsync(uint rating) => _server.SuccessMessageAsync($"You gave the rating: {rating}", Context.Player);
}
```

We can use the `CommandAlias` attribute to define attributes for a given command on the same handler method. The way this works is that you can give aliases a set of pre-defined arguments that are automatically sent to the command. In this case, we create a set of pre-set ratings for each of the aliases. In the case where not all arguments are set within an alias, the user will have to send in the remaining arguments for the command.

Aliases does not care about command prefixes, so what you write is what you get. EvoSC# looks for the exact match of an alias, so you can have literally anything as an alias, any character or even entire sentences!

### Hiding typed aliases
By default, when a player types a command alias, it is also shown in the chat that they typed it. You can prevent this, and make it act like a normal command by setting the `hide` parameter to true.

For example:
```csharp
[CommandAlias("my-alias", false)]
```

In this case, when a player types `my-alias` in the chat, the chat message will not show up in the chat.