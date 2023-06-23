# Introduction to Action Pipelines
When an action occurs, several things has to be processed and set up before the action's callback handler is called. This process is also known as an Action Pipeline. Essentially, it is a set of code components that runs synchronously and can act on the previous or even cancel the entire process.

In EvoSC# it is possible to hook into these pipelines from modules. Action Pipelines gives powerful control over what happens and include additional data to action handlers. It can be used to filter chat messages, automatically check permissions, pre-process data for all actions and so on.

There are currently two types of Action Pipelines in EvoSC#, the *ControllerAction* and *ChatRouter*.