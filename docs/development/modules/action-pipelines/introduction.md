# Introduction to Action Pipelines
When an action occurs within the module, a series of tasks need to be executed and configured before the action's callback handler is invoked. This sequence of tasks is commonly referred to as an Action Pipeline. Essentially, an Action Pipeline is a collection of code components that run synchronously and have the ability to manipulate preceding actions or even terminate the entire process.

In EvoSC#, developers can leverage the extensibility of modules to hook into these pipelines. Action Pipelines provide a robust mechanism for controlling the module's behavior and enabling the inclusion of supplementary data in action handlers. They can be employed to perform various operations such as filtering chat messages, performing permission checks automatically, preprocessing data for all actions, and more.

Currently, there are two types of Action Pipelines available in EvoSC#: the *ControllerAction* pipeline and the *ChatRouter* pipeline.
