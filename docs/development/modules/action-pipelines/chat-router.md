# Chat Router
The chat router pipeline is responsible for processing incoming chat messages. If the pipeline reaches the end, the chat message is displayed in the in-game chat.

The pipeline context also allows modifying the message, so that we can create formatted chat messages or remove certain elements and so on.

We will go over and example where we create a profanity filter, which replaces cursing words.

```csharp
[Middleware(For = PipelineType.ChatRouter)]
public class ProfanityFilterMiddleware
{
    private readonly ActionDelegate _next;
    
    public ProfanityFilterMiddleware(ActionDelegate next)
    {
        _next = next;
    }

    public Task ExecuteAsync(ChatRouterPipelineContext context)
    {
        context.MessageText = context.MessageText.Replace("fuck", "f**k");
        
        return _next(context);
    }
}
```

The process for creating a component for the chat router is exactly the same as controller actions, except for the pipeline type we use `PipelineType.ChatRouter` instead.

In the `ExecuteAsync` method, we pass a `ChatRouterPipelineContext`, which contains information about the chat message. In this case, we replace a curse word with it's censored version so that `fuck` is displayed as `f**k` in the chat.
