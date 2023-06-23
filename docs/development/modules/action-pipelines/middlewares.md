# Middlewares
Middlwares are used to create components within an Action Pipeline. It can be done in modules by creating a class attributed by the type of pipeline to add the middleware to.

Let's try and example, where we want to log all commands called:
```csharp
[Middleware(For = PipelineType.ControllerAction)]
public class CommandLoggerMiddleware
{
    private readonly ActionDelegate _next;
    private readonly ILogger<MyMiddleware> _logger;
    
    public CommandLoggerMiddleware(ActionDelegate next, ILogger<MyMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public Task ExecuteAsync(IPipelineContext context)
    {
        var commandContext = context as CommandInteractionContext;

        if (commandContext != null)
        {
            _logger.LogInformation("Command executed: {Command}", commandContext.CommandExecuted.Name);
        }
        
        return _next(context);
    }
}
```

Middlewares requires a certain signature to work. The first argument in the constructor must be a delegate to the next component. The next arguments works just like normal dependency injection. Next the method `ExecuteAsync` must be defined, and the argument for this method must be a class or interface that inherits `IPipelineContext`. EvoSC# will complain if these middleware classes are not set up correctly.

The `Middleware` attribute must be used to register the middleware and specify which pipeline the middleware is added to, using the `For` argument.

All controller contexts implements the `IPipelineContext` interface, and it is therefore possible to cast to these in order to obtain the context data. We take advantage of this here by checking if the controller action is a command, and if so log it.

We then have a very important step. Because in order for the pipeline to continue, we must call the next component in the pipeline ourselves. This is provided by an ActionDelegate in the constructor of the middleware.

If we wish to not continue the pipeline, we would simply omit calling the `_next` delegate. This will also prevent the action handler from being called entirely.