# Introduction to the EvoSC# Module Framework
When developing modules there are a set of guidelines and rules one should follow so that everything is as consistent and maintainable as possible between all modules. This page introduces general concepts that one should follow when developing modules. More specific rules are typically explained in their respective sections.

## Naming Convention
Naming conventions are crucial for maintaining a consistent and organized codebase in any software project. They help improve code readability, collaboration, and maintenance. This document outlines the recommended naming convention guidelines for modules within EvoSC#.

### 1. General Principles

- **Clarity**: Names should be clear, descriptive, and reflect the purpose of the module.
- **Consistency**: Maintain a uniform naming style throughout the project to improve codebase readability and understanding.
- **PascalCase**: Module names should use PascalCase, where each word is capitalized without spaces or underscores.
- **Meaningful Names**: Choose names that clearly convey the module's functionality and responsibility.
- **Module postfix**: All modules should have the Module postfix after the module name. E.g. MapsModule.

### 2. Namespace Naming

Namespaces are used to organize code and prevent naming conflicts. They should follow a similar structure to your project's directory structure.

- **Root Namespace**: Use the organization name as the root namespace, followed by project-specific namespaces. 
  Example: `EvoSC.Modules.<AuthorOrgName>.<ModuleName>Module`

- **Sub-namespaces**: Use sub-namespaces to group related modules or components within a namespace.
  Example: `EvoSC.Modules.<AuthorOrgName>.<ModuleName>Module.Utilities`


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

## Services
Services should follow the [Single Responsibility Principle](https://en.wikipedia.org/wiki/Single-responsibility_principle). If a service becomes huge with lots of dependencies, it is usually a sign that you might want to split it up.

Use the appropriate lifestyle for a service. Always use Transient if state or context is not needed.
## Unit Tests
As much of the code as possible within a module should also be covered by unit tests. We recommend using [Moq 4](https://github.com/moq/moq4) to mock objects for tests.

## Avoid re-inventing the wheel
The module framework and core already does a lot of things for you, and the chances are that you don't have to re-create a common function. For example, there are dedicated services and helpers for editing [Match Settings](/development/modules/advanced/matchsettings) or building [formatted chat messages](/development/modules/advanced/text-formatting). Another example could be showing [Manialinks](/development/modules/manialinks/introduction) to newly connected players is as simple as sending a persistent Manialink. Even sending [chat messages](/development/modules/advanced/server-chat-message) are simplified.

Have a look around in the documentation and available classes to see what is possible!

## Events
It is recommended to fire events for actions or events that occur within a module, so that depending modules have a way to communicate.

## Identifiers
When creating names for things such as events, permissions or anything that require some kind of "identifier" that are used to reference the certain object or action. It is recommended to avoid using string literals.

Most of these functions have support for [Enum Identifier](/development/modules/utility/enum-identifier), so use this instead as much as possible. This is much more maintainable and less prone for error.

## Localization
[Localization](/development/modules/advanced/localization.html) should be used whenever possible to provide a consistent UX for players. It also makes it much easier to maintain and translate UI text.

### Naming Conventions
- Localization displayed in audits should be prefixed with `Audit.`
- Localization displayed in Manialinks should be prefixed with `UI.`
- Use alphanumeric names in PascalCase, and use `.` to denote locale categories and sub categories.
- The name should be similar to the actual text displayed.

## Auditing
Whenever a protected or sensitive action occurs, always create an [audit record](/development/modules/security/auditing.html).