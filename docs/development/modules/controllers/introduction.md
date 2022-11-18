# Introduction to Controllers
A controller is a class in which you can subscribe to various events and actions occuring in the controller and from the game server. The controllers respond to things that occur and *controls* what will happen.

For example, if a player triggered a chat command, this is sent to a handler method inside a controller. Maybe you want to do something when a player connects to the server? You can then subscribe to this event on an event handler in the controller.

The EvoSC module framework provides convenient ways to subscribe to these various events with controllers. We will look into this in the next pages of this documentation.

But for now, let's first look at how to create a controller!

## Creating A Controller
Controllers are simply a class that inherits `EvoScController`. You can tell the application to register the controller for you by annotating the class with the `[Controller]` attribute.

For example, let's say you have your module project set up. You have created the module class and is ready to implement some features for your module. We'll start by defining the controller class:

```csharp
[Controller]
public class MyController : EvoScController<IControllerContext>
{
}
```

This is the most basic controller definition and it does nothing as you didn't specify any action to respond to. So this brings us to the next point.

## Controller Actions
An *action* refers to any type of event in the application. Whether it is from the event system, a chat command or a manialink action, it can all be handled through a controller.

Whenever an action occurs that a controller is subscribed to, the controller is instantiated for that particular action. Each action has a *context* attached to it.

The context contains information related to the action that occured. So for example, if a player triggered a chat command, the context holds information like what player triggered it, information about the command itself etc.

The context is highly dependent on the type of action that occured. This is important because you typically want to define your controller for one type of action only.

You will most likely never need to subscribe to multiple types of actions within the same controller. Currently, there are two types of actions:

| Action | Description | Context |
|--------|-------------|---------|
| Event | Raised by the event system and can be any generic event. | `IControllerContext` |
| Chat Command | The command system triggers these actions and occurs when a player calls a valid command. | `CommandInteractionContext` |

## Controller Action Context
When you inherit the `EvoScController` base type, you must specify the type of context for your actions.

For example:
```csharp
// IControllerContext context type, can be used for all actions
EvoScController<IControllerContext>
```

```csharp
// CommandInteractionContext context type, can be used for chat commands
EvoScController<CommandInteractionContext>
```

All contextes will inherit the base type `IControllerContext` and you can use this type for any action type.

But the problem with `IControllerContext` is that it contains a very limited amount of information about the action that occured. Because events do not really have any context assigned to them, they are simply events with some arguments, you can use `IControllerContext` when subscribing to pure events.

::: warning
The most important thing to be aware of when specifying the context type is, if you have an action that is not supported by the context, the application will throw an error as it fails to cast the context to your specified context type.

***Make sure you use the correct context type for the actions in your controller!***
:::