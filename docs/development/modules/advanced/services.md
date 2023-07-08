# Module Services
Module services provides a way for modules to abstract away general and low level logic into methods. Since controllers are not stateful, services provides a way to keep state in memory between controller actions.

There are currently two types of lifetime supported for services, transient and singleton. The differences between these two are:

* **Transient:** Instantiated every single time it is requested and cannot keep state.
* **Singleton:** Instantiated only one time the first time it is requested, it lives for the whole duration of the application and can keep state between requests.

The general rule for lifetime management of services is that you should avoid singletons if possible. If you absolutely need to keep some kind of state in memory over a longer period and between requests, then singletons can be a great way to achieve this.

Singletons essentially acts as a background service and it is therefore important to know what type of resources must be freed upon disabling and unloading the module. Otherwise it can cause unexpected bugs to occur.

## Defining a Module Service
To create a module service, first create an interface for it. EvoSC will not accept services without an interface. This is because we want to follow the [principle of dependency inversion](https://en.wikipedia.org/wiki/Dependency_inversion_principle).

To let EvoSC know that you want to register a class as a service, annotate it with the `[Service]` attribute and specify the wanted lifetime.

### Example
Let's go through an example to help understanding how to create module services.

We want to create a service that greets a player when they join the server. So let's start with creating the interface:

```csharp
public interface IPlayerGreeterService
{
    public void SayHello(string login);
}
```

We then create the actual service implementation. Remember to annotate the `[Service]` attribute to let EvoSC know that we want to register this class as a service in the DI container.

```csharp
// no state is needed, so the lifetime should be transient
[Service(LifeStyle = ServiceLifeStyle.Transient)]
public class PlayerGreeterService : IPlayerGreeterService
{
    private readonly IServerClient _server;
    
    // we are injecting the server client so we can access the XMLRPC protocol for the server
    public PlayerGreeterService(IServerClient server) => _server = server;

    public async Task SayHello(string login)
    {
        // get player info, which includes the nickname for us to greet
        var playerInfo = await _server.Remote.GetPlayerInfoAsync(login);
        
        // send a greeting to the player in the chat
        await _server.Remote.ChatSendServerMessageAsync($"Welcome, {playerInfo.NickName}!");
    }
}
```

Since we don't keep state over for a longer time over multiple requests, we define the lifestyle as transient.

We can then create a controller and subscribe to the player connect event, which then calls the method from our service:
```csharp
[Controller]
public class PlayerGreeterController : EvoScController<IControllerContext>
{
    private IPlayerGreeterService _playerGreeter;
    
    // inject our player greeter service
    public PlayerGreeterController(IPlayerGreeterService playerGreeter)
    {
        _playerGreeter = playerGreeter;
    }

    [Subscribe(GbxRemoteEvent.PlayerConnect)]
    public Task OnPlayerConnect(object sender, PlayerConnectEventArgs args) =>
        // greet the player that just joined!
        _playerGreeter.SayHello(args.Login);
}
```

## Background Services
Background services are services are services that typically runs something in the background, in a separate thread. These services are instantiated automatically and executed.

Perhaps you need to manage a network connection, or have a timer that executes ever so often. Background services would be the perfect option for these cases.

These services are only executed once EvoSC# is ready and has established a connection with the game server and database. These services can also be used for graceful shutdown of background services to clean up any states.

To create a background service, begin by creating a normal service which implements the `IBackgroundService` interface:

```csharp
[Service]
public class MyBackgroundService : IBackgroundService
{
    public Task StartAsync()
    {
        return Task.CompletedTask;
    }

    public Task StopAsync()
    {
        return Task.CompletedTask;
    }
}
```

The interface exposes two methods, `StartAsync` and `StopAsync`. They are pretty self explainatory, but `StartAsync` is automatically called when the module is enabled, and `StopAsync` is called when the module is disabled. This allows you to both start and stop any background service that might be running for a module.

::: warning
If you wish to interact with the background service, do not try to inject this service. Instead, create a *singleton* service, that the background service controls with the Start/Stop methods. You can then interact with the background service anywhere by injecting this new singleton service.

Keep in mind that you will need to make sure the singleton service is thread safe.
:::