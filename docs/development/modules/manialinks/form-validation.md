# Form Validation in Manialinks
Often you need to make sure that the input from users are correct. And this can quickly result in messy and duplicate code. Therefore EvoSC tries to solve this problem by providing some helpful functionality to validate user input.

EvoSC takes advantage of the model validation system that comes with .NET and is the same one used in ASP.NET. It does not implement it 1:1 and much of it is different. But when it comes to custom model validation and validation attributes, it is essentially the same.

We will go over how it works in EvoSC, but you can find the official documentation [here](https://learn.microsoft.com/en-us/aspnet/core/mvc/models/validation?view=aspnetcore-7.0). Notably validation attributes and IValidatableObject.

## Validation Attributes
Validation attributes provides *class-level validation*, which means we can define how to validate a property within the model class itself.

These attributes can be used to define validation rules on the model properties.

For example, let's take the nickname model we saw in previous pages. We want to make sure that the user wrote at least 3 characters for their nickname:
```csharp
[EntryModel]
public class SetNicknameInput
{
    [MinLength(3)]
    public string Nickname { get; set; }
}
```

For a list of built-in attributes check out [this page](https://learn.microsoft.com/en-us/dotnet/api/system.componentmodel.dataannotations?view=net-8.0).

### Custom Validation Attributes
You can create a custom validation attribute by creating an attribute class which inherits `ValidationAttribute`. You can then override the `IsValid` method to implement that validation code:
```csharp
[AttributeUsage(AttributeTargets.Property)]
public class MyValidationAttribute : ValidationAttribute
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        // check validation ...
    }
}
```
After implementing the validation code, you can now use it on properties in a model:
```csharp
[EntryModel]
public class SetNicknameInput
{
    [MyValidation] // [!code hl]
    public string Nickname { get; set; }
}
```

## Class-level validation without attributes
EvoSC provides access to two different methods to validate a model with custom code. This is in addition to custom validation attributes, and can be used if you need specific validation code for a model instead of creating an attribute.

Entry models can inherit either `IValidatableObject` or `IAsyncValidatableObject` to implement such validation.

### `IValidatableObject`
This is the synchronous version of the validatable object.

::: details Example
```csharp
[EntryModel]
public class ExampleFormModel : IValidatableObject
{
    public string Nickname { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Nickname.Length < 3)
        {
            yield return new ValidationResult("Nickname not long enough.", new[] {nameof(Username)});
        }
    }
}
```
:::

### `IAsyncValidatableObject`
Implementing this interface allows you to create asynchronous validation code, this can be useful if you need access to async methods in EvoSC like a database call.

::: details Example
```csharp
[EntryModel]
public class ExampleFormModel : IAsyncValidatableObject
{
    public string Nickname { get; set; }

    public Task<IEnumerable<ValidationResult>> ValidateAsync(ValidationContext validationContext)
    {
        var results = new List<ValidationResult>();
        
        if (Nickname.Length < 3)
        {
            results.Add(new ValidationResult("Nickname not long enough.", new[] {nameof(Username)}));
        }

        return results;
    }
}
```
:::

## Validating a Model
The `ManialinkController` class implement automatic form validation in the background. You can also manually trigger this validation by calling the `ValidateModelAsync` instance method.

This will both return the validation result, and also set the validation result for the current context. However, it is typically not necessary to call this method.

For most cases, all you need to do in order to check if a model is valid, is to check if `IsModelValid` is true.

You can also access the `ModelValidation` property to obtain the validation result. This also contains more details about which properties are valid/invalid and error messages.

::: details Example
```csharp
[Controller]
public class MyActionsController : ManialinkController
{
    private readonly IServerClient _server;

    public MyActionsController(IServerClient server)
    {
        _server = server;
    }

    public Task SetNicknameAsync(SetNicknameInput userInput)
    {
        if (IsModelValid) // [!code hl]
        { 
            return _server.SuccessMessageAsync($"Nickname set to {userInput.Nickname}!", Context.Player);
        }
        else
        {
            return _server.ErrorMessageAsync($"You must enter at least 3 characters!", Context.Player);
        }
    }
}
```
:::

## Validation Responses
When you show manialinks from a ManialinkController inherited class, EvoSC will auto-inject validation result into the data sent to the manialink template. We can take advantage of this to automate validation responses.

So let's illustrate this with an example. EvoSC provides its own manialink components which all modules can use. One of them is the `FormEntry` component. This component will automatically read any validation result and show an error message in case of invalid input data.

To expand even further on the previous example, we want to create a manialink that allows users to set a nickname. It requires some form of validation and a way to tell the user if they did something wrong. So we can use the `FormEntry` component in our manialink:
```xml
<component>
    <using namespace="EvoSC.Manialinks.Validation" />
    <import component="EvoSC.FormEntry" as="FormEntry" />
    
    <property type="FormValidationResult" name="Validation" />
    <property type="string" name="Nickname" default="" />
    
    <template>
        <frame pos="0 0">
            <FormEntry
                    validationResults='{{ Validation?.GetResult("Nickname") }}'
                    value='{{ Username }}'
                    name="Nickname"
                    label="Nickname:"
                    w="30"
            />
            <FormSubmit x="18" y="-21" text="Login" action="MyActions/SetNickname" />
        </frame>
    </template>
    <script resource="Scripts.MyManialinkScript" />
</component>
```
Here we import the `EvoSC.FormEntry` and set the XML tag to `FormEntry` which we can use in the component code. We also need to make sure to tell the template engine where to find the validation models, under `EvoSC.Manialinks.Validation`.

Then we set two properties, the `Validation` and `Nickname` property. The `Validation` property will be set automatically by EvoSC, and the idea is to send back the user's input in the `Nickname` property. We do this ourselves.

Inside the controller we check if the validation was successful, and if not, send the manialink back to the user:
```csharp
[Controller]
public class MyActionsController : ManialinkController
{
    private readonly IServerClient _server;

    public MyActionsController(IServerClient server)
    {
        _server = server;
    }

    public Task SetNicknameAsync(SetNicknameInput userInput)
    {
        if (IsModelValid)
        { 
            return _server.SuccessMessageAsync($"Nickname set to {userInput.Nickname}!", Context.Player);
        }
        else
        {
            return ShowAsync("MyModule.SetNickname", new { Nickname = userInput.Nickname }); // [!code hl]
        }
    }
}
```

This is all you need to do in order to show validation errors to the user. As you can see, we need to set the `Nickname` property ourselves. That way we show an error under the value which the user entered, to make it more clear.

## Dependency Injection
The entry models also supports dependency injection in the constructor.

For example, if we want access to the logger when validating the model we can inject it in the constructor of the model:

```csharp
[EntryModel]
public class SetNicknameInput : IValidatableObject
{
    private readonly ILogger<ExampleFormModel> _logger;
    
    public ExampleFormModel(ILogger<ExampleFormModel> logger)
    {
        _logger = logger;
    }

    public string Nickname { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Nickname.Length < 3)
        {
            _logger.LogError("Nickname not long enough");
        }
    }
}
```