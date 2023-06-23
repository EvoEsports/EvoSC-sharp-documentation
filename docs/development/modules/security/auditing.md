# Auditing
Audit logging refers to the process of recording actvities and events that has occured, along with any users who triggered such events and other detailed data about them. The purpose is to provide an audit trail that can be used for accountability, troubleshooting and security.

The difference between the audit logs and the normal logs which EvoSC# outputs is that the audit logs provides detailed information of activities and who did them, typically more granular than the output logs. You will be able to look back and see exactly what happened on your server.

Audit logging is viewed as a requirement for any action that requires a permission, and you will recieve a warning if there isn't any logging for a protected action. The audit logs in EvoSC# is much more structured and can even be viewed in-game.

In EvoSC#, audit logs are permanently stored in the database, but can also output them in the normal logs. EvoSC# provides an interface to easily set up and building an audit record.

::: tip
Whenever a protected action or event occurs, it is **highly recommended** to create an audit record.
:::

## Creating an Audit for a Protected Action
Let's say we have a command that performs some kind of moderation action, like kicking a player from the server. We set up our command in a controller:

```csharp
[Controller]
public class ExampleController2 : EvoScController<CommandInteractionContext>
{
    [ChatCommand("kick", "Kick a player", "kickPlayerPermission")]
    public async Task ShowManialink()
    {
        // code to kick player ...
    }
}
```

If you run this command, you will see a warning in the logs that we are missing audit logging. So how do we create a new audit record?

Every controller comes with a context for an event or action, and inside this context you will always have an `AuditEvent` property available. This property is an AuditEventBuilder that allows you to create a new audit record.

So let's create one:
```csharp
[Controller]
public class ExampleController2 : EvoScController<CommandInteractionContext>
{
    [ChatCommand("kick", "Kick a player", "kickPlayerPermission")]
    public async Task KickPlayerAsync()
    {
        // ...

        Context.AuditEvent.Success() // [!code focus:4]
            .WithEventName("PlayerKicked")
            .HavingProperties(new {Player = playerToKick})
            .Comment("Player was kicked.");
    }
}
```

Here we are creating a new audit event that indicates the event was a success. Nextd, we provide a unique name to this event that is used to group and identify similar events.

Further, we provide detailed data that occured with the event, in this case the player that was kicked. We also set a comment for our audit, which is a user-friendly description of what happened and can be anything. The AuditEventBuilder class provides many more options to describe the events, which is described below.

One thing that is important is knowing who actually triggered this event. For all player interactions, EvoSC# will automatically assign the actor. You can also override or set this manually with the `CausedBy` method which accepts a `IPlayer` instance.

## Auditing in Services
Because services are user-made and does not inherit action context by default, we have to do it slightly differently.

There is a scoped service of `IContextService` that holds the current context for the current action that occured. To gain access to this, you need to make sure that your service is also running on a Scoped lifestyle.

::: warning
Before using `IContextService`, make sure your service has a Scoped lifestyle.
:::

`IContextService` exposes a `Audit()` method that can be used to access the AuditEvent of the current context. From this, the process for creating an audit is exactly the same as within a controller.

Let's give an example:
```csharp
[Service(LifeStyle = ServiceLifeStyle.Scoped)]
public class AdminActions : IAdminActions
{
    private readonly IContextService _context;

    public AdminActions(IContextService context)
    {
        _context = context;
    }

    public async Task KickPlayerAsync(IPlayer playerToKick)
    {
        // ...

        _context.Audit().Success()
            .WithEventName("PlayerKicked")
            .HavingProperties(new {Player = playerToKick})
            .Comment("Player was kicked.");
    }
}
```

## The Audit Service
The Audit Service `IAuditService` is what controls all creation and handling of audit events. It exposes several methods for creating a new events such as `NewEvent`, `NewSuccessEvent`, `NewErrorEvent` and `NewInfoEvent`. All of these methods returns an `AuditEventBuilder` that can be used to create a new audit record.

When using this service, audit records are not automatically created. But one can trigger the creation by calling the `LogAsync` method on the AuditEventBuilder instance.

## The Audit Event Builder
The `AuditEventBuilder` is the main class for creating an new audit record. Here we will go over the different methods and what they can be used for.

### The Constructor
The constructor always requires an instance of the `IAuditService`, which is used to create the actual record. You can also provide a name of the event. Most of the time, you will not need to instantiate the AuditEventBuilder yourself, but instead get an instance to work with.

### `WithStatus`
The `WithStatus` method is used to set the status of the event. You can also set the status with the helper methods `Success()`, `Info()` and `Error()`.

### `WithEventName`
The `WithEventName` method sets the unique name for the event. It should be alphanumeric and in PascalCase. A dot `.` can be used to group certain events together. The method also supports [EnumIdentifier](/development/modules/utility/enum-identifier.html) for strongly typed audit events.

### `HavingProperties`
`HavingProperties` is used to set additional details about an event. It accepts any kind of data, which is serialized into JSON when stored, so make sure your data is JSON serializable.

::: warning
When using `HavingProperties`, make sure the data you set can be serialized into JSON.
:::

### `CausedBy`
`CausedBy` is used to set who actually did or triggered the event. This is very useful for moderation or admin actions, and allows you to see exactly who did what on the server.

### `Comment`
You can set a user-friendly description for an event with the `Comment` method. It is recommended to keep this comment as short as possible.

### `Cancel` and `UnCancel`
If you, for some reason during an action, it is decided that one no longer need to create an audit record. You can call the `Cancel` method to not record the audit. The `UnCancel` method will allow the audit system to create the record again.
