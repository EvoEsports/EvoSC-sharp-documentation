# Manialink Actions
To communicate user actions from manialinks to the controller, EvoSC make use of the page action callbacks from XMLRPC which can be triggered through various ways in manialinks.

## Routing
Every Manialink action has a so called "route" which you can call to trigger an action. The routing system is very similar to HTTP API routing.

The difference however, is that routes does not start with a slash. For example, a simple route would be `myController/myAction`

You can also pass parameters dynamic parameters to the route, which can be picked up by the action method.

For example `myController/myAction/{myParam}` has a parameter `myParam`, so you can call the route like `myController/myAction/1`, `myController/myAction/2`, `myController/myAction/342` etc.

The controller allows you to define more complex combinations of static route components an parameters like `a/{b}/c/{d}/{e}`.

### Allowed route patterns
The design decisions for route matching allows different scenarios such as:

- **Parameterless routes** like `a/b/c`
- **Equal length routes with different names**. Like having both `a/b/c` and `a/b/d`
- **Route with parameters** such as `a/b/{c}/{d}/{e}`
- **Route with parameters in arbitrary positions** such as `a/{b}/c/{d}`
- **Root routes** like `a`, `b`, `myroute` etc.
- Allowed characters in the route components are alphanumeric (`0-9`, `a-z`, `A-Z`), `_` and `.`

### Disallowed route patterns
Routing does have certain restrictions which helps with consistency and avoids certain mistakes and errors such as:

- **Ambiguous routes** such as defining both `a/b` and `a/{b}`
- **Two equal routes for different actions**
- **Empty routes**
- **Routes starting with a slash** `/`
- **Route overloading**. For example `a/{b}` with `{b}` being a string and `a/{c}` with `{c}` being an integer.
- The allowed characters in route components are restricted to alphanumeric and `_` and `.`. The forward slash `/` is used as a separator in routes.

### Defining Actions
Actions are defined within a manialink controller. Head over to [Manialink Controllers](controllers.md) to see how this is done.

## Form Actions
Some manlialink tags such as label or quad exposes an `action` attribute. This makes the UI element clickable which calls the page action callback. We can call this a *form action* because it works similar to HTML forms.

You can also define `<entry>` tags which are input elements where the user can write things in like text, a number, a password etc. You also have other input elements like `<textedit>`. What is common about these elements is that the values which the user inserts into these elements gets sent along with the action.

You can also group these elements within a `<frame>` so you can isolate input elements within a frame, and only those values get sent with the action.

Let's take an example:
```xml
<frame>
    <entry name="nickname" />
    <label action="route/to/action" text="Submit!" />
</frame>
```

In this example, when we call the action `route/to/action`. The entry value will be sent along with the action in a key-value relationship. In this case the name of the entry is `nickname`.

## The `TriggerPageAction` function
In ManiaScript it is also possible to trigger page actions with the `TriggerPageAction` function. So you can call routes like:

```
main() {
    TriggerPageAction("route/to/action");
}
```
