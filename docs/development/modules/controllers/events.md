# Events
EvoSC# provides an event system that can be used to raise events which can be subscribed to anywhere in the code.

## Event Subscriptions
There are currently two ways to subscribe to events in EvoSC#. Either through the `IEventManager` service or using the subscription pattern in Controllers.

### Subscribing with the `IEventManager` service
Injecting the `IEventManager` service exposes the `Subscribe` method. It has several overloads depending on the situation you may use it in. But the most used overload is the builder method, which we will present here.

Let's take an example. Let's say you want to react to players connecting to the server:
```csharp
_eventManager.Subscribe(s => s
    .WithEvent(GbxRemoteEvent.PlayerConnect) // name of the event to subscribe to
    .WithInstance(this) // the instance of the class which the handler is part of
    .WithInstanceClass<MyHandlerClass>() // the instance of the class which the handler is part of
    .WithHandlerMethod<PlayerConnectGbxEventArgs>(OnPlayerConnectAsync) // the handler method itself
    .WithPriority(EventPriority.High) // priority of which to call this subscription handler
);
```

In this case we are subscribing to the PlayerConnect event, so we can implement the handler method like this:
```csharp
private async Task OnPlayerConnectAsync(object sender, PlayerConnectGbxEventArgs e)
{
    var player = await _playerManager.GetOnlinePlayerAsync(PlayerUtils.ConvertLoginToAccountId(e.Login));
    await _remote.InfoMessageAsync($"Player {player.NickName} joined the server!");
}
```

When developing modules, you will most likely not need to use this way of subscribing to events, because it is actually much easier to do within a module using controllers.

### Subscribing with Controllers
Let's subscribe to the same event above with the same parameters, but using the Controller way.

We can start by creating a controller with the `EventControllerContext` context:
```csharp
[Controller]
public class ExampleEventController : EvoScController<EventControllerContext> // [!code focus]
{

}
```

Now let's subscribe to the PlayerConnect event with a handler method:
```csharp
[Controller]
public class ExampleEventController : EvoScController<EventControllerContext>
{
    [Subscribe(GbxRemoteEvent.PlayerConnect, EventPriority.High)] // [!code focus:6]
    public async Task PlayerConnectAsync(object sender, PlayerConnectGbxEventArgs e)
    {
        var player = await _playerManager.GetOnlinePlayerAsync(PlayerUtils.ConvertLoginToAccountId(e.Login));
        await _remote.InfoMessageAsync($"Player {player.NickName} joined the server!");
    }
}
```

And that's it! No need to inject the event manager service and much easier than using the `Subscribe` method directly.

::: tip
We recommend using Controllers to subscribe to events as much as possible, as it is not only easier, but also more organized, readable and maintainable.
:::

### Event Priority
From the examples, you have gotten a taste of how priorities work. There are three levels of priority, low, medium and high. If priority is not set, the default priority is medium.

Subscriptions with higher priority will be called first.

::: info
By design, you cannot define your own priority values as this typically causes a mess when modules are fighting for priority.

Be wary and rational when using priorities. Most of the time default is good enough.
:::

### Async Subscriptions
By default, subscriptions are called in-order of their registration and priority. However, sometimes your event may take alot of computation time, which may block other events from firing.

You can then define your subscription as async. This prevents other events having to wait for your event to finish processing.

## Raising Events
To create and fire a new event, which is called "raising an event" in EvoSC#, we can use the `RaiseAsync` method from the `IEventManager` service.

It takes the name and arguments of the event to raise. You can also specify the sender if that is required.

For example:
```csharp
await eventManager.RaiseAsync(GbxRemoteEvent.PlayerConnect, new PlayerConnectGbxEventArgs { /* ... */});
```