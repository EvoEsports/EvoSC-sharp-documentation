# Permissions in Manialink Actions
You can control access to manialink actions using the groups and permission system in EvoSC. This works by simply specifying the permission required for an action.

For example, imagine you want to secure an action that does something only an admin should do:
```csharp
[Controller]
public class AdminActionsController : ManialinkController
{
    [ManialinkRoute(Route = "KickPlayer/{player}", Permission = "Admin.KickPlayer")]
    public async Task KickPlayerAsync(IPlayer player)
    {
        // ...
    }
}
```

When you call `AdminActions/KickPlayer/somePlayer`, EvoSC will check if the the user that called it, has permission to execute this action. If so, the method will be executed, otherwise a message will be shown to the user that they don't have sufficient permissions.
