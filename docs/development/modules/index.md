# Introduction to the EvoSC# Module Framework
EvoSC# is designed as a modular framework with individual modules responsible for a set of features. The core provides this framework and a library of tools and utilities for developing functionality and logic. The modules provides the actual functionality of the controller and controls the logic.

The framework itself provides a set of coding rules and patterns for developers to implement their desired functionality into the controller.

It is built around *controllers* which holds most of the logic. Controllers respond to actions and events, which are handled and responded to if desired.

## Logic Abstraction Levels
The code within a module have different levels of abstraction. For example, we try to avoid any logic in the main module class. And while controllers are meant to handle the logic, we also abstract lower level logic out of the controllers and put them in [services](/development/modules/advanced/services).

This helps with the test- and maintainability of the code, and it is easier to read and understand what is happening.

To give you a more concrete example, let's say you create a command to kick a player. You create the module class, we don't need to define anything in this class as we can define commands within a controller. Now imagine you created the controller class, and defined the method for the command.

Here is some examples of what we mean with abstracting the low level logic out of the controller:

**BAD:**
```csharp
[Controller]
public class MyController : EvoScController<CommandInteractionContext>
{
    private readonly IServerClient _server;

    public MyController(IServerClient server) => _server = server;

    [ChatCommand("kick", "Kicks a player.")]
    public Task KickPlayerCommand(IPlayer player) =>
        // don't put the "raw logic" here
        _server.Remote.KickAsync(PlayerUtils.ConvertAccountIdToLogin(player.AccountId)); // [!code error]
}
```

**GOOD:**
```csharp
[Controller]
public class MyController : EvoScController<CommandInteractionContext>
{
    private readonly IPlayerService _players;

    public MyController(IPlayerService players) => _players = players;

    [ChatCommand("kick", "Kicks a player.")]
    public Task KickPlayerCommand(IPlayer player) =>
        // Abstract the kick logic out of the controller and in a service
        _players.KickAsync(player);
}
```
