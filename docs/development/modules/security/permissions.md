# Permissions
EvoSC# provides access control with user groups and permissions. A player can be part of multiple groups and each group contains a set of permissions assigned to that group.

Every player has a *display group* which is shown in-game. While the display group is shown, the player will still inherit permissions from all other groups they are part of.

The access controll system in EvoSC# can be used with any player interaction that occurs with the controller. Actions such as [Manialink Actions](/development/modules/manialinks/permissions) and [Chat Commands](/development/modules/controllers/chat-commands) provides automatic checks for permissions before execution. These are explained in their respective pages.

On this page, we will introduce the general concepts and how the access control system works in EvoSC#.

## Defining Permissions in Modules
Modules provides an easy way to define permissions that can be used within the module. This is done by annotating an enum with the `[PermissionGroup]` attribute. EvoSC# will look for this attribute, and build up permission names within the enum. The [EnumIdentifier](/development/modules/utility/enum-identifier) system can be used to create custom names.

Example:
```csharp
[PermissionGroup]
public enum AdminPermissions
{
    [Description("Can kick players.")]
    KickPlayer,

    [Description("Can ban and blacklist players.")]
    BanPlayer,

    [Description("Can mute players from the chat.")]
    MutePlayer
}
```

By providing a description to the permissions, it helps explaining exactly what is the permission allows and can be shown in the UI in-game for a better UX.

These permissions will now be automatically installed in the database when the module loads, and can be assigned to groups and used everywhere!

## Check a Player's Permission
The `IPermissionManager` service exposes various methods for managing groups and permissions. But most importantly, it provides a way to check if a player has a permission.

For this, you can call the `HasPermissionAsync` method. For example:
```csharp
if (await permissionManager.HasPermissionAsync(thePlayer, AdminPermissions.KickPlayer))
{
    // has permission to kick a player
}
```
