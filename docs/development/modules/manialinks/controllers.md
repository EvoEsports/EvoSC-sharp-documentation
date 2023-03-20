# Manialink Controllers
Manialink controllers allows you to define routes and callbacks for those routes. They also provides easy ways to respond, display or hide manialinks. Ideally, you want to use these controllers for most of the interactions between the user, UI and EvoSC.

To get started, create a controller and inherit the `ManialinkController` type:
```csharp
[Controller]
public class ExampleManialinkController : ManialinkController
{
}
```

## Responding to actions
In it's most simple form, create a new method within the controller and annotate it with the `ManialinkRoute` attribute:

```csharp
[Controller]
public class ExampleManialinkController : ManialinkController
{
    public Task MyActionAsync()
    {
        Console.WriteLine("Hello from controller!");
    }
}
```

EvoSC has automatic route building capabilities so that you don't need to explicitly define routes for actions. If nothing is explicitly defined, EvoSC will use the class name of the controller (and imitting the `Controller` postfix) as the root route component. It will then use the method name as the sub component in the route (omitting the `Async` prefix).

So in the example above, the route for the `MyActionAsync` will be `ExampleManialink/MyAction`.

### Explicitly defining routes
To define routes, you will need to annotate either the class or the method with the `ManialinkRoute` attribute.

For example to create a custom route to a controller:

```csharp
[Controller]
[ManialinkRoute(Route = "MyActions")]
public class ExampleManialinkController : ManialinkController
{
    public Task MyActionAsync()
    {
        Console.WriteLine("Hello from controller!");
    }
}
```
The resulting route for this will now be `MyActions/MyAction`

Extending this, you can do the same for the method:

```csharp
[Controller]
[ManialinkRoute(Route = "MyActions")]
public class ExampleManialinkController : ManialinkController
{
    [ManialinkRoute(Route = "PrintConsole")]
    public Task MyActionAsync()
    {
        Console.WriteLine("Hello from controller!");
    }
}
```
This will result in the route: `MyActions/PrintConsole`

::: tip
By default, all methods becomes subroutes of the controller's route like `MyController/Method1`, `MyController/Method2` etc.

However, if you prefix a route with `/` the route will become a root route instead. So for example defining the route `Method1/AnAction` becomes `MyController/Method1/AnAction`. But if you define the route as `/Method1/AnAction` the route becomes `Method1/AnAction`.
:::

## Displaying Manialinks
The `ManialinkController` class exposes helper methods for displaying manialinks within a controller with the `ShowAsync` methods.

For example this code sends the manialink `MyModule.MyManialink` to all users:
```csharp
[Controller]
public class ExampleManialinkController : ManialinkController
{
    public Task MyActionAsync()
    {
        return ShowAsync("MyModule.MyManialink"); // [!code focus]
    }
}
```

You can also send to specific player. For example to send to the player that triggered the action:
```csharp
[Controller]
public class ExampleManialinkController : ManialinkController
{
    public Task MyActionAsync()
    {
        return ShowAsync(Context.Player, "MyModule.MyManialink"); // [!code focus]
    }
}
```

These methods also accepts property data to manialink components.

## Hiding Manialinks
Hiding manialinks has similar methods with the `HideAsync` methods.

For example:
```csharp
[Controller]
public class ExampleManialinkController : ManialinkController
{
    public Task MyActionAsync()
    {
        return HideAsync(Context.Player, "MyModule.MyManialink"); // [!code focus]
    }
}
```